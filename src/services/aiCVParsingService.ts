// Conditional imports to handle missing dependencies gracefully
let OpenAI: any = null;
let PDFExtract: any = null;

try {
  OpenAI = require('openai').default;
} catch (error) {
  console.warn('OpenAI package not available - AI CV parsing disabled');
}

try {
  const pdfExtractModule = require('pdf.js-extract');
  PDFExtract = pdfExtractModule.PDFExtract;
} catch (error) {
  console.warn('PDF.js-extract package not available - PDF parsing disabled');
}

import { 
  AIExtractedCVData, 
  AIExtractedCVDataSchema, 
  AIProcessingResult,
  AIProcessingResultSchema
} from '@/types/dual-path-recruitment';

// ========================================================================================
// AI CV PARSING SERVICE - OpenAI GPT-4 Integration
// ========================================================================================

interface CVParsingConfig {
  openaiApiKey: string;
  model: string;
  maxTokens: number;
  temperature: number;
  confidenceThreshold: number;
}

const DEFAULT_CONFIG: CVParsingConfig = {
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  model: 'gpt-4-1106-preview',
  maxTokens: 2000,
  temperature: 0.1,
  confidenceThreshold: 0.7
};

class AICVParsingService {
  private openai: any;
  private config: CVParsingConfig;
  private pdfExtract: any;
  private isAvailable: boolean;

  constructor(config: Partial<CVParsingConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.isAvailable = true;
    
    // Check if dependencies are available
    if (!OpenAI || !PDFExtract) {
      this.isAvailable = false;
      console.warn('AI CV Parsing Service: Required dependencies not available');
      return;
    }
    
    if (!this.config.openaiApiKey) {
      this.isAvailable = false;
      console.warn('AI CV Parsing Service: OpenAI API key not configured');
      return;
    }

    try {
      this.openai = new OpenAI({
        apiKey: this.config.openaiApiKey,
      });

      this.pdfExtract = new PDFExtract();
      console.log('AI CV Parsing Service: Initialized successfully');
    } catch (error) {
      this.isAvailable = false;
      console.error('AI CV Parsing Service: Initialization failed:', error);
    }
  }

  /**
   * Extract text content from PDF CV
   */
  private async extractPDFText(pdfBuffer: Buffer): Promise<string> {
    try {
      const data = await this.pdfExtract.extractBuffer(pdfBuffer);
      
      let extractedText = '';
      data.pages.forEach(page => {
        page.content.forEach(item => {
          if (item.str) {
            extractedText += item.str + ' ';
          }
        });
        extractedText += '\n';
      });

      return extractedText.trim();
    } catch (error) {
      console.error('PDF extraction error:', error);
      throw new Error(`Failed to extract text from PDF: ${error.message}`);
    }
  }

  /**
   * Create structured prompt for GPT-4 CV extraction
   */
  private createExtractionPrompt(cvText: string): string {
    return `
You are a professional CV parser specializing in medical professionals. Please extract structured information from the following CV text and return it as a JSON object with confidence scores.

IMPORTANT REQUIREMENTS:
1. Only extract information that is explicitly stated in the CV
2. Do not infer or guess information that is not clearly present
3. Assign confidence scores (0-1) based on how clearly each piece of information is stated
4. If information is unclear or missing, omit it from the response
5. Focus on medical professionals (doctors, physicians, specialists)

REQUIRED JSON STRUCTURE:
{
  "personalInfo": {
    "firstName": "string (if clearly stated)",
    "middleName": "string (if clearly stated)", 
    "lastName": "string (if clearly stated)",
    "email": "string (if clearly stated)",
    "phone": "string (if clearly stated)",
    "nationality": "string (if clearly stated)"
  },
  "education": {
    "medicalDegree": {
      "institution": "string",
      "year": "string", 
      "degree": "string (MD, MBBS, etc.)"
    },
    "residency": {
      "institution": "string",
      "specialty": "string",
      "startYear": "string",
      "endYear": "string"
    },
    "fellowship": {
      "institution": "string", 
      "specialty": "string",
      "year": "string"
    }
  },
  "professional": {
    "currentAffiliation": "string (current hospital/clinic)",
    "yearsPractice": "number (calculated from graduation/experience)",
    "subspecialties": ["array of medical specialties"],
    "publications": "number (count of publications if mentioned)",
    "clinicalTrials": "boolean (involved in clinical trials)",
    "teachingRoles": "boolean (academic/teaching positions)"
  },
  "licensing": {
    "licenseNumber": "string (if mentioned)",
    "licenseCountry": "string (if mentioned)", 
    "boardCertifications": ["array of board certifications"]
  },
  "confidence": {
    "overall": "number 0-1 (overall confidence in extraction)",
    "personal": "number 0-1 (confidence in personal info)",
    "education": "number 0-1 (confidence in education info)", 
    "professional": "number 0-1 (confidence in professional info)",
    "licensing": "number 0-1 (confidence in licensing info)"
  }
}

CONFIDENCE SCORING GUIDELINES:
- 0.9-1.0: Information is explicitly and clearly stated
- 0.7-0.9: Information is clearly present but may require minor interpretation
- 0.5-0.7: Information is somewhat present but unclear or incomplete
- 0.3-0.5: Information is vaguely mentioned or inferred
- 0.0-0.3: Information is not clearly present or highly uncertain

If the overall confidence is below 0.7, indicate this in the response.

CV TEXT TO PARSE:
${cvText}

Return only the JSON object, no additional text or formatting.
`;
  }

  /**
   * Parse CV using OpenAI GPT-4
   */
  private async parseWithGPT4(cvText: string): Promise<AIExtractedCVData> {
    try {
      const response = await this.openai.chat.completions.create({
        model: this.config.model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert CV parser for medical professionals. Extract only clearly stated information and provide accurate confidence scores.'
          },
          {
            role: 'user', 
            content: this.createExtractionPrompt(cvText)
          }
        ],
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature,
        response_format: { type: 'json_object' }
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No content received from OpenAI API');
      }

      // Parse and validate the JSON response
      const parsedData = JSON.parse(content);
      const validatedData = AIExtractedCVDataSchema.parse(parsedData);

      return validatedData;

    } catch (error) {
      console.error('OpenAI parsing error:', error);
      
      if (error instanceof SyntaxError) {
        throw new Error(`Invalid JSON response from AI service: ${error.message}`);
      }
      
      if (error.name === 'ZodError') {
        throw new Error(`AI response validation failed: ${error.message}`);
      }
      
      throw new Error(`AI CV parsing failed: ${error.message}`);
    }
  }

  /**
   * Validate extraction quality and confidence
   */
  private validateExtraction(extractedData: AIExtractedCVData): {
    isValid: boolean;
    issues: string[];
    overallConfidence: number;
  } {
    const issues: string[] = [];
    const confidence = extractedData.confidence;

    // Check overall confidence threshold
    if (confidence.overall < this.config.confidenceThreshold) {
      issues.push(`Overall confidence (${confidence.overall}) below threshold (${this.config.confidenceThreshold})`);
    }

    // Check for minimum required information
    const hasPersonalInfo = extractedData.personalInfo?.firstName && extractedData.personalInfo?.lastName;
    const hasEducation = extractedData.education?.medicalDegree?.institution;
    const hasProfessional = extractedData.professional?.currentAffiliation;

    if (!hasPersonalInfo && confidence.personal < 0.8) {
      issues.push('Personal information (name) is not clearly extractable');
    }

    if (!hasEducation && confidence.education < 0.8) {
      issues.push('Medical education information is not clearly extractable');
    }

    if (!hasProfessional && confidence.professional < 0.8) {
      issues.push('Professional experience information is not clearly extractable');
    }

    const isValid = issues.length === 0 || confidence.overall >= 0.8;

    return {
      isValid,
      issues,
      overallConfidence: confidence.overall
    };
  }

  /**
   * Main method to parse CV from PDF buffer
   */
  async parseCVFromPDF(
    pdfBuffer: Buffer,
    candidateId: string,
    originalFilename: string,
    s3Key: string
  ): Promise<{
    success: boolean;
    extractedData?: AIExtractedCVData;
    processingResult: Omit<AIProcessingResult, 'id' | 'createdAt'>;
    issues?: string[];
  }> {
    const processingStartedAt = new Date();
    
    // Check if service is available
    if (!this.isAvailable) {
      const processingResult: Omit<AIProcessingResult, 'id' | 'createdAt'> = {
        candidateId,
        documentType: 'CV',
        originalFilename,
        s3Key,
        aiService: 'openai-gpt4',
        processingStatus: 'FAILED',
        confidenceScore: 0,
        extractedData: {},
        errorDetails: 'AI service not available - missing dependencies or API key',
        processingStartedAt,
        processingCompletedAt: new Date()
      };

      return {
        success: false,
        processingResult,
        issues: ['AI service not available - missing dependencies or API key']
      };
    }
    
    try {
      console.log(`Starting AI CV parsing for candidate ${candidateId}`);

      // Extract text from PDF
      const cvText = await this.extractPDFText(pdfBuffer);
      
      if (!cvText || cvText.length < 100) {
        throw new Error('Insufficient text content extracted from PDF');
      }

      console.log(`Extracted ${cvText.length} characters from PDF, sending to GPT-4`);

      // Parse with GPT-4
      const extractedData = await this.parseWithGPT4(cvText);

      // Validate extraction quality
      const validation = this.validateExtraction(extractedData);

      const processingResult: Omit<AIProcessingResult, 'id' | 'createdAt'> = {
        candidateId,
        documentType: 'CV',
        originalFilename,
        s3Key,
        aiService: 'openai-gpt4',
        processingStatus: validation.isValid ? 'COMPLETED' : 'REJECTED',
        confidenceScore: validation.overallConfidence,
        extractedData: extractedData as any,
        errorDetails: validation.issues.length > 0 ? validation.issues.join('; ') : undefined,
        processingStartedAt,
        processingCompletedAt: new Date()
      };

      if (validation.isValid) {
        console.log(`AI CV parsing successful for candidate ${candidateId} with confidence ${validation.overallConfidence}`);
        
        return {
          success: true,
          extractedData,
          processingResult
        };
      } else {
        console.log(`AI CV parsing rejected for candidate ${candidateId}: ${validation.issues.join(', ')}`);
        
        return {
          success: false,
          processingResult,
          issues: validation.issues
        };
      }

    } catch (error) {
      console.error(`AI CV parsing failed for candidate ${candidateId}:`, error);

      const processingResult: Omit<AIProcessingResult, 'id' | 'createdAt'> = {
        candidateId,
        documentType: 'CV',
        originalFilename,
        s3Key,
        aiService: 'openai-gpt4',
        processingStatus: 'FAILED',
        confidenceScore: 0,
        extractedData: {},
        errorDetails: error.message,
        processingStartedAt,
        processingCompletedAt: new Date()
      };

      return {
        success: false,
        processingResult,
        issues: [error.message]
      };
    }
  }

  /**
   * Parse CV from file path (for testing)
   */
  async parseCVFromFile(filePath: string, candidateId: string): Promise<{
    success: boolean;
    extractedData?: AIExtractedCVData;
    issues?: string[];
  }> {
    const fs = require('fs').promises;
    
    try {
      const pdfBuffer = await fs.readFile(filePath);
      const result = await this.parseCVFromPDF(
        pdfBuffer, 
        candidateId, 
        filePath.split('/').pop() || 'test-cv.pdf',
        `test-${Date.now()}`
      );
      
      return {
        success: result.success,
        extractedData: result.extractedData,
        issues: result.issues
      };
    } catch (error) {
      return {
        success: false,
        issues: [error.message]
      };
    }
  }

  /**
   * Health check method
   */
  async healthCheck(): Promise<{ status: string; details: any }> {
    if (!this.isAvailable) {
      return {
        status: 'disabled',
        details: {
          available: false,
          reason: 'Missing dependencies or API key not configured',
          openaiAvailable: !!OpenAI,
          pdfExtractAvailable: !!PDFExtract,
          apiKeyConfigured: !!this.config.openaiApiKey
        }
      };
    }

    try {
      // Test OpenAI API connection
      const response = await this.openai.models.retrieve('gpt-4-1106-preview');
      
      return {
        status: 'healthy',
        details: {
          openaiConnected: true,
          model: response.id,
          configuredModel: this.config.model,
          confidenceThreshold: this.config.confidenceThreshold
        }
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        details: {
          openaiConnected: false,
          error: error.message,
          configuredModel: this.config.model
        }
      };
    }
  }
}

// Singleton instance
let aiCVParsingServiceInstance: AICVParsingService | null = null;

export function getAICVParsingService(config?: Partial<CVParsingConfig>): AICVParsingService {
  if (!aiCVParsingServiceInstance) {
    aiCVParsingServiceInstance = new AICVParsingService(config);
  }
  return aiCVParsingServiceInstance;
}

export { AICVParsingService };
export type { CVParsingConfig };