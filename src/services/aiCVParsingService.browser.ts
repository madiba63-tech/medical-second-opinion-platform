// Browser-compatible AI CV Parsing Service (Demo Mode)
// This version runs in the browser without Node.js dependencies

import { 
  AIExtractedCVData, 
  AIProcessingResult
} from '@/types/dual-path-recruitment';

// ========================================================================================
// BROWSER-COMPATIBLE AI CV PARSING SERVICE - DEMO MODE
// ========================================================================================

interface CVParsingConfig {
  confidenceThreshold: number;
}

const DEFAULT_CONFIG: CVParsingConfig = {
  confidenceThreshold: 0.7
};

class BrowserAICVParsingService {
  private config: CVParsingConfig;

  constructor(config: Partial<CVParsingConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Demo CV parsing that simulates AI extraction
   * In production, this would make an API call to a server-side AI service
   */
  async parseCVFromFile(
    file: File,
    candidateId: string
  ): Promise<{
    success: boolean;
    extractedData?: AIExtractedCVData;
    processingResult: Omit<AIProcessingResult, 'id' | 'createdAt'>;
    issues?: string[];
  }> {
    const processingStartedAt = new Date();

    try {
      // In demo mode, we'll simulate AI extraction with realistic demo data
      // In production, this would send the file to a server-side API
      console.log(`Starting demo AI CV parsing for candidate ${candidateId}`);

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate demo extracted data based on filename or random selection
      const demoData = this.generateDemoExtractedData(file.name);

      const processingResult: Omit<AIProcessingResult, 'id' | 'createdAt'> = {
        candidateId,
        documentType: 'CV',
        originalFilename: file.name,
        s3Key: `demo-${candidateId}-${Date.now()}`,
        aiService: 'demo-mode',
        processingStatus: 'COMPLETED',
        confidenceScore: 0.85,
        extractedData: demoData as any,
        errorDetails: undefined,
        processingStartedAt,
        processingCompletedAt: new Date()
      };

      console.log(`Demo AI CV parsing completed for candidate ${candidateId}`);

      return {
        success: true,
        extractedData: demoData,
        processingResult
      };

    } catch (error) {
      console.error(`Demo AI CV parsing failed for candidate ${candidateId}:`, error);

      const processingResult: Omit<AIProcessingResult, 'id' | 'createdAt'> = {
        candidateId,
        documentType: 'CV',
        originalFilename: file.name,
        s3Key: `demo-${candidateId}-${Date.now()}`,
        aiService: 'demo-mode',
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
   * Generate realistic demo data for AI CV extraction
   */
  private generateDemoExtractedData(filename: string): AIExtractedCVData {
    // Generate different demo profiles based on filename
    const profiles = [
      {
        personalInfo: {
          firstName: "Dr. Sarah",
          middleName: "Elizabeth",
          lastName: "Johnson",
          email: "s.johnson@citymedical.org",
          phone: "+1-555-0123",
          nationality: "American"
        },
        education: {
          medicalDegree: {
            institution: "Harvard Medical School",
            year: "2010",
            degree: "MD"
          },
          residency: {
            institution: "Johns Hopkins Hospital",
            specialty: "Internal Medicine",
            startYear: "2010",
            endYear: "2013"
          },
          fellowship: {
            institution: "Memorial Sloan Kettering",
            specialty: "Medical Oncology",
            year: "2014"
          }
        },
        professional: {
          currentAffiliation: "City Medical Center - Department of Oncology",
          yearsPractice: 11,
          subspecialties: ["Medical Oncology", "Hematology", "Breast Cancer"],
          publications: 23,
          clinicalTrials: true,
          teachingRoles: true
        },
        licensing: {
          licenseNumber: "MD-NY-45789",
          licenseCountry: "United States",
          boardCertifications: ["Internal Medicine", "Medical Oncology"]
        },
        confidence: {
          overall: 0.92,
          personal: 0.95,
          education: 0.88,
          professional: 0.90,
          licensing: 0.85
        }
      },
      {
        personalInfo: {
          firstName: "Prof. Michael",
          middleName: "James",
          lastName: "Chen",
          email: "m.chen@universityhospital.edu",
          phone: "+44-20-7123-4567",
          nationality: "British"
        },
        education: {
          medicalDegree: {
            institution: "University of Oxford",
            year: "2005",
            degree: "MBBS"
          },
          residency: {
            institution: "Royal Marsden Hospital",
            specialty: "Clinical Oncology",
            startYear: "2005",
            endYear: "2010"
          },
          fellowship: {
            institution: "MD Anderson Cancer Center",
            specialty: "Radiation Oncology",
            year: "2011"
          }
        },
        professional: {
          currentAffiliation: "University College London Hospitals - Cancer Centre",
          yearsPractice: 16,
          subspecialties: ["Radiation Oncology", "Lung Cancer", "Head and Neck Cancer"],
          publications: 67,
          clinicalTrials: true,
          teachingRoles: true
        },
        licensing: {
          licenseNumber: "GMC-7234567",
          licenseCountry: "United Kingdom",
          boardCertifications: ["Clinical Oncology", "Radiation Oncology"]
        },
        confidence: {
          overall: 0.88,
          personal: 0.92,
          education: 0.85,
          professional: 0.90,
          licensing: 0.82
        }
      }
    ];

    // Select profile based on filename hash or random
    const profileIndex = Math.abs(filename.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % profiles.length;
    return profiles[profileIndex];
  }

  /**
   * Health check for browser service
   */
  async healthCheck(): Promise<{ status: string; details: any }> {
    return {
      status: 'demo-mode',
      details: {
        mode: 'browser-demo',
        available: true,
        note: 'Running in demo mode - would connect to server-side AI service in production'
      }
    };
  }
}

// Export browser-compatible service
export function getBrowserAICVParsingService(config?: Partial<CVParsingConfig>): BrowserAICVParsingService {
  return new BrowserAICVParsingService(config);
}

export { BrowserAICVParsingService };
export type { CVParsingConfig };