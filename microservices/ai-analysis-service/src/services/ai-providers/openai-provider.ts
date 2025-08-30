// OpenAI Provider for Medical Analysis
// Following v2.0 Architecture requirements for AI integration

import OpenAI from 'openai';
import { config } from '../../config/environment';
import { logger } from '../../utils/logger';
import { AIAnalysisProvider, AnalysisRequest, AnalysisResult, ModelCapabilities } from '../interfaces/ai-provider.interface';

export class OpenAIProvider implements AIAnalysisProvider {
  private client: OpenAI;
  private readonly providerName = 'openai';
  
  constructor() {
    this.client = new OpenAI({
      apiKey: config.ai.providers.openai.apiKey,
      organization: config.ai.providers.openai.organizationId,
    });
  }

  getProviderName(): string {
    return this.providerName;
  }

  async validateConnection(): Promise<boolean> {
    try {
      // Test with a simple completion request
      await this.client.models.list();
      return true;
    } catch (error) {
      logger.error('OpenAI connection validation failed:', error);
      return false;
    }
  }

  getCapabilities(): ModelCapabilities {
    return {
      documentAnalysis: true,
      medicalImaging: false, // OpenAI Vision can analyze medical images but requires careful prompt engineering
      symptomAnalysis: true,
      differentialDiagnosis: true,
      riskAssessment: true,
      treatmentRecommendation: true,
      drugInteractionCheck: true,
      labResultInterpretation: true,
      radiologyReporting: true,
      pathologyAnalysis: true,
      supportedLanguages: ['en', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'pl', 'ru', 'ja', 'ko', 'zh'],
      maxTokens: 128000, // GPT-4 Turbo context window
      supportsVision: true,
      supportsStreaming: true,
    };
  }

  async analyzeDocument(request: AnalysisRequest): Promise<AnalysisResult> {
    try {
      const startTime = Date.now();
      
      // Select appropriate model based on request complexity
      const model = this.selectModel(request);
      
      // Create system prompt for medical analysis
      const systemPrompt = this.createSystemPrompt(request.analysisType);
      
      // Prepare user prompt with medical context
      const userPrompt = this.createUserPrompt(request);
      
      const completion = await this.client.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.1, // Low temperature for medical analysis
        max_tokens: 4000,
        response_format: { type: 'json_object' },
      });

      const processingTime = Date.now() - startTime;
      
      if (!completion.choices[0]?.message?.content) {
        throw new Error('No response content from OpenAI');
      }

      const analysisData = JSON.parse(completion.choices[0].message.content);
      
      return {
        success: true,
        analysisId: request.analysisId,
        provider: this.providerName,
        model,
        confidence: analysisData.confidence || 0.7,
        results: {
          ...analysisData,
          processingTime,
          usage: completion.usage,
        },
        insights: this.extractInsights(analysisData),
        recommendations: this.extractRecommendations(analysisData),
        metadata: {
          model,
          provider: this.providerName,
          processingTime,
          tokenUsage: completion.usage,
        },
      };

    } catch (error) {
      logger.error('OpenAI analysis failed:', error);
      
      return {
        success: false,
        analysisId: request.analysisId,
        provider: this.providerName,
        error: (error as Error).message,
        metadata: {
          provider: this.providerName,
          failedAt: new Date().toISOString(),
        },
      };
    }
  }

  async analyzeImage(request: AnalysisRequest): Promise<AnalysisResult> {
    try {
      const startTime = Date.now();
      
      if (!request.imageData) {
        throw new Error('Image data is required for image analysis');
      }

      // Use GPT-4 Vision for medical image analysis
      const model = 'gpt-4-vision-preview';
      
      const systemPrompt = this.createMedicalImagingPrompt(request.analysisType);
      
      const completion = await this.client.chat.completions.create({
        model,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Please analyze this medical image. Context: ${request.context || 'General medical imaging analysis'}`
              },
              {
                type: 'image_url',
                image_url: {
                  url: request.imageData.dataUrl || `data:${request.imageData.mimeType};base64,${request.imageData.base64}`,
                  detail: 'high'
                }
              }
            ]
          }
        ],
        temperature: 0.1,
        max_tokens: 4000,
        response_format: { type: 'json_object' },
      });

      const processingTime = Date.now() - startTime;
      
      if (!completion.choices[0]?.message?.content) {
        throw new Error('No response content from OpenAI Vision');
      }

      const analysisData = JSON.parse(completion.choices[0].message.content);
      
      return {
        success: true,
        analysisId: request.analysisId,
        provider: this.providerName,
        model,
        confidence: analysisData.confidence || 0.6, // Generally lower confidence for image analysis
        results: {
          ...analysisData,
          processingTime,
          usage: completion.usage,
        },
        insights: this.extractInsights(analysisData),
        recommendations: this.extractRecommendations(analysisData),
        metadata: {
          model,
          provider: this.providerName,
          processingTime,
          tokenUsage: completion.usage,
          imageAnalysis: true,
        },
      };

    } catch (error) {
      logger.error('OpenAI image analysis failed:', error);
      
      return {
        success: false,
        analysisId: request.analysisId,
        provider: this.providerName,
        error: (error as Error).message,
        metadata: {
          provider: this.providerName,
          imageAnalysis: true,
          failedAt: new Date().toISOString(),
        },
      };
    }
  }

  private selectModel(request: AnalysisRequest): string {
    // Select model based on complexity and requirements
    if (request.priority === 'URGENT' || request.requiresHighAccuracy) {
      return 'gpt-4-0125-preview'; // Latest GPT-4 Turbo
    }
    
    if (request.inputData && JSON.stringify(request.inputData).length > 50000) {
      return 'gpt-4-0125-preview'; // Better for large contexts
    }
    
    return 'gpt-3.5-turbo-0125'; // Default model for standard analyses
  }

  private createSystemPrompt(analysisType: string): string {
    const basePrompt = `You are a highly skilled medical AI assistant specializing in clinical analysis. 
Your role is to provide accurate, evidence-based medical insights while clearly indicating the limitations of AI analysis.

IMPORTANT DISCLAIMERS:
- You are an AI assistant, not a licensed medical professional
- Your analysis should not replace professional medical judgment
- Always recommend consulting with qualified healthcare providers
- Indicate confidence levels and uncertainty where appropriate
- Highlight when urgent medical attention may be needed

Your response must be in JSON format with the following structure:
{
  "analysis_type": "${analysisType}",
  "confidence": 0.0-1.0,
  "findings": [],
  "insights": [],
  "recommendations": [],
  "risk_factors": [],
  "limitations": [],
  "disclaimers": []
}`;

    switch (analysisType) {
      case 'DOCUMENT_ANALYSIS':
        return basePrompt + `\n\nYou are analyzing medical documents. Focus on:
- Key medical findings and observations
- Diagnostic information and test results
- Treatment plans and medications
- Timeline of medical events
- Missing information or gaps in the record`;

      case 'SYMPTOM_ANALYSIS':
        return basePrompt + `\n\nYou are analyzing patient symptoms. Focus on:
- Symptom patterns and relationships
- Possible underlying conditions
- Urgency indicators
- Red flag symptoms requiring immediate attention
- Differential diagnosis considerations`;

      case 'DIFFERENTIAL_DIAGNOSIS':
        return basePrompt + `\n\nYou are providing differential diagnosis support. Focus on:
- Most likely diagnoses based on symptoms and findings
- Likelihood ranking with reasoning
- Additional tests or information needed
- Ruling out serious conditions
- Evidence supporting each diagnosis`;

      case 'RISK_ASSESSMENT':
        return basePrompt + `\n\nYou are performing medical risk assessment. Focus on:
- Identification of risk factors
- Risk stratification and scoring
- Prevention strategies
- Monitoring recommendations
- Long-term prognosis considerations`;

      case 'TREATMENT_RECOMMENDATION':
        return basePrompt + `\n\nYou are providing treatment guidance. Focus on:
- Evidence-based treatment options
- Treatment priorities and sequencing
- Contraindications and precautions
- Monitoring requirements
- Alternative approaches`;

      default:
        return basePrompt;
    }
  }

  private createUserPrompt(request: AnalysisRequest): string {
    let prompt = `Please analyze the following medical information:\n\n`;
    
    if (request.patientContext) {
      prompt += `Patient Context:\n${JSON.stringify(request.patientContext, null, 2)}\n\n`;
    }
    
    if (request.documentText) {
      prompt += `Medical Document Content:\n${request.documentText}\n\n`;
    }
    
    if (request.symptoms) {
      prompt += `Symptoms:\n${JSON.stringify(request.symptoms, null, 2)}\n\n`;
    }
    
    if (request.context) {
      prompt += `Additional Context:\n${request.context}\n\n`;
    }
    
    prompt += `Analysis Type: ${request.analysisType}\n`;
    
    if (request.specificQuestions) {
      prompt += `Specific Questions to Address:\n${request.specificQuestions.join('\n')}\n\n`;
    }
    
    return prompt;
  }

  private createMedicalImagingPrompt(analysisType: string): string {
    return `You are a medical AI specialized in medical imaging analysis. 

CRITICAL MEDICAL IMAGING GUIDELINES:
- You are analyzing medical images as an AI assistant, not as a radiologist
- Your analysis is for informational purposes only
- Always recommend professional radiological interpretation
- Indicate confidence levels and areas of uncertainty
- Highlight any findings that may require urgent attention
- Note image quality and limitations

Your response must be in JSON format:
{
  "analysis_type": "MEDICAL_IMAGING",
  "image_quality": "excellent|good|fair|poor",
  "confidence": 0.0-1.0,
  "observations": [],
  "potential_findings": [],
  "areas_of_concern": [],
  "recommendations": [],
  "limitations": [],
  "urgent_findings": []
}

Focus on:
- Overall image quality and technical adequacy
- Normal and abnormal findings
- Anatomical structures and their appearance
- Any suspicious or concerning areas
- Need for additional imaging or views
- Comparison with prior studies if mentioned`;
  }

  private extractInsights(analysisData: any): any[] {
    if (!analysisData.insights && !analysisData.findings) {
      return [];
    }
    
    const insights = [];
    
    // Extract findings as insights
    if (analysisData.findings) {
      for (const finding of analysisData.findings) {
        insights.push({
          type: 'finding',
          title: finding.title || finding.description?.substring(0, 50) || 'Medical Finding',
          description: finding.description || finding,
          severity: finding.severity || 'moderate',
          confidence: finding.confidence || 0.7,
        });
      }
    }
    
    // Extract structured insights
    if (analysisData.insights) {
      for (const insight of analysisData.insights) {
        insights.push({
          type: 'insight',
          title: insight.title || insight.description?.substring(0, 50) || 'Medical Insight',
          description: insight.description || insight,
          clinicalRelevance: insight.relevance || 0.8,
          confidence: insight.confidence || 0.7,
        });
      }
    }
    
    return insights;
  }

  private extractRecommendations(analysisData: any): any[] {
    if (!analysisData.recommendations) {
      return [];
    }
    
    return analysisData.recommendations.map((rec: any) => ({
      type: rec.type || 'general',
      title: rec.title || rec.description?.substring(0, 50) || 'Medical Recommendation',
      description: rec.description || rec,
      urgency: rec.urgency || 'routine',
      confidence: rec.confidence || 0.7,
      evidenceLevel: rec.evidence_level || 'moderate',
    }));
  }
}