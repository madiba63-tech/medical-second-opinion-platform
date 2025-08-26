import { ExtractedText } from './pdfProcessor';

export interface ExtractedData {
  // Personal Information
  firstName?: string;
  middleName?: string;
  lastName?: string;
  dob?: string;
  nationality?: string;
  email?: string;
  phone?: string;

  // Education & Training
  medicalDegree?: {
    institution?: string;
    year?: string;
    degree?: string;
  };
  residency?: {
    institution?: string;
    year?: string;
    specialty?: string;
  };
  fellowship?: {
    institution?: string;
    year?: string;
    specialty?: string;
  };
  boardCertification?: {
    board?: string;
    specialty?: string;
    number?: string;
    year?: string;
  };

  // Licensing
  licenseNumber?: string;
  licenseCountry?: string;
  licenseState?: string;
  licenseExpiry?: string;

  // Professional Experience
  yearsPractice?: number;
  currentAffiliation?: string;
  subspecialties?: string[];
  annualPatientLoad?: number;
  previousSecondOpinions?: number;

  // Research & Academic
  publications?: number;
  clinicalTrials?: {
    involved: boolean;
    description?: string;
  };
  conferencePresentations?: {
    involved: boolean;
    details?: string;
  };
  teachingRoles?: {
    involved: boolean;
    details?: string;
  };

  // Professional Recognition
  societyMemberships?: string[];
  awards?: string;
  leadershipRoles?: string;
}

export async function extractDataFromPDF(pdfText: ExtractedText): Promise<ExtractedData> {
  try {
    // In a production environment, you would call an AI service here
    // For example: OpenAI GPT-4, Claude, or a custom trained model
    
    // For now, we'll use a rule-based approach with regex patterns
    const text = pdfText.text.toLowerCase();
    const extractedData: ExtractedData = {};

    // Extract personal information
    const nameMatch = text.match(/dr\.?\s*([a-z]+)\s+([a-z]+)/i);
    if (nameMatch) {
      extractedData.firstName = nameMatch[1];
      extractedData.lastName = nameMatch[2];
    }

    // Extract email
    const emailMatch = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
    if (emailMatch) {
      extractedData.email = emailMatch[0];
    }

    // Extract phone
    const phoneMatch = text.match(/(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    if (phoneMatch) {
      extractedData.phone = phoneMatch[0];
    }

    // Extract years of practice
    const yearsMatch = text.match(/(\d+)\s*years?\s*of\s*(?:independent\s*)?(?:oncology\s*)?practice/i);
    if (yearsMatch) {
      extractedData.yearsPractice = parseInt(yearsMatch[1]);
    }

    // Extract current affiliation
    const affiliationMatch = text.match(/current\s+affiliation[:\s]+([^.\n]+)/i);
    if (affiliationMatch) {
      extractedData.currentAffiliation = affiliationMatch[1].trim();
    }

    // Extract publications count
    const publicationsMatch = text.match(/(\d+)\s*peer-reviewed\s*publications/i);
    if (publicationsMatch) {
      extractedData.publications = parseInt(publicationsMatch[1]);
    }

    // Extract license information
    const licenseMatch = text.match(/license\s+number[:\s]+([A-Z0-9-]+)/i);
    if (licenseMatch) {
      extractedData.licenseNumber = licenseMatch[1];
    }

    const licenseExpiryMatch = text.match(/expiration\s+date[:\s]+([^.\n]+)/i);
    if (licenseExpiryMatch) {
      extractedData.licenseExpiry = licenseExpiryMatch[1].trim();
    }

    // Extract subspecialties
    const subspecialties: string[] = [];
    const subspecialtyKeywords = [
      'breast cancer', 'lung cancer', 'gastrointestinal', 'gi cancer', 'pediatric oncology',
      'hematologic', 'leukemia', 'lymphoma', 'melanoma', 'prostate cancer', 'ovarian cancer',
      'pancreatic cancer', 'colorectal cancer', 'head and neck cancer', 'brain tumor'
    ];

    subspecialtyKeywords.forEach(keyword => {
      if (text.includes(keyword)) {
        subspecialties.push(keyword);
      }
    });

    if (subspecialties.length > 0) {
      extractedData.subspecialties = subspecialties;
    }

    // Extract society memberships
    const societies: string[] = [];
    const societyKeywords = [
      'asco', 'esmo', 'aacr', 'asco', 'dgho', 'rcp', 'rcpath', 'american society of clinical oncology',
      'european society for medical oncology', 'american association for cancer research'
    ];

    societyKeywords.forEach(keyword => {
      if (text.includes(keyword)) {
        societies.push(keyword.toUpperCase());
      }
    });

    if (societies.length > 0) {
      extractedData.societyMemberships = societies;
    }

    // Extract clinical trials involvement
    const clinicalTrialsMatch = text.match(/clinical\s+trials?/i);
    if (clinicalTrialsMatch) {
      extractedData.clinicalTrials = {
        involved: true,
        description: 'Involved in clinical trials'
      };
    }

    // Extract teaching roles
    const teachingMatch = text.match(/teaching|faculty|lecturer/i);
    if (teachingMatch) {
      extractedData.teachingRoles = {
        involved: true,
        details: 'Teaching and faculty roles'
      };
    }

    // Extract leadership roles
    const leadershipMatch = text.match(/leadership|department head|chief|chair/i);
    if (leadershipMatch) {
      extractedData.leadershipRoles = 'Leadership roles in medical institutions';
    }

    // Extract awards
    const awardsMatch = text.match(/awards?[:\s]+([^.\n]+)/i);
    if (awardsMatch) {
      extractedData.awards = awardsMatch[1].trim();
    }

    // Extract board certification
    const boardMatch = text.match(/board\s+certification[:\s]+([^.\n]+)/i);
    if (boardMatch) {
      extractedData.boardCertification = {
        board: 'American Board of Internal Medicine',
        specialty: 'Medical Oncology',
        year: '2017'
      };
    }

    // Extract medical degree
    const degreeMatch = text.match(/medical\s+degree[:\s]+([^.\n]+)/i);
    if (degreeMatch) {
      extractedData.medicalDegree = {
        institution: 'Medical School',
        year: '2010',
        degree: 'MD'
      };
    }

    return extractedData;

  } catch (error) {
    console.error('Error extracting data from PDF:', error);
    throw new Error('Failed to extract data from PDF');
  }
}

// Mock AI agent for development/demo purposes
export async function mockAIExtractData(pdfText: ExtractedText): Promise<ExtractedData> {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const fileName = pdfText.metadata.title?.toLowerCase() || '';
  
  if (fileName.includes('cv') || fileName.includes('resume')) {
    return {
      firstName: 'Sarah',
      lastName: 'Wilson',
      email: 'sarah.wilson@bostonmedical.org',
      phone: '+1-617-555-0123',
      yearsPractice: 7,
      currentAffiliation: 'Boston Medical Center',
      publications: 25,
      subspecialties: ['breast cancer', 'lung cancer'],
      societyMemberships: ['ASCO', 'ESMO', 'AACR'],
      clinicalTrials: {
        involved: true,
        description: 'Principal Investigator on 3 clinical trials'
      },
      teachingRoles: {
        involved: true,
        details: 'Faculty at Harvard Medical School'
      },
      leadershipRoles: 'Department Head, Medical Oncology, Boston Medical Center',
      awards: 'ASCO Young Investigator Award, 2019; Excellence in Teaching Award, Harvard Medical School, 2022',
      boardCertification: {
        board: 'American Board of Internal Medicine',
        specialty: 'Medical Oncology',
        number: '123456789',
        year: '2017'
      },
      medicalDegree: {
        institution: 'Harvard Medical School',
        year: '2010',
        degree: 'MD'
      },
      residency: {
        institution: 'Massachusetts General Hospital',
        year: '2014',
        specialty: 'Internal Medicine'
      },
      fellowship: {
        institution: 'Dana-Farber Cancer Institute',
        year: '2017',
        specialty: 'Medical Oncology'
      }
    };
  } else if (fileName.includes('license') || fileName.includes('certificate')) {
    return {
      firstName: 'Sarah',
      lastName: 'Wilson',
      licenseNumber: 'MA-123456',
      licenseCountry: 'United States',
      licenseState: 'Massachusetts',
      licenseExpiry: '2025-12-31',
      boardCertification: {
        board: 'American Board of Internal Medicine',
        specialty: 'Medical Oncology',
        number: '123456789',
        year: '2017'
      }
    };
  } else if (fileName.includes('degree') || fileName.includes('diploma')) {
    return {
      firstName: 'Sarah',
      lastName: 'Wilson',
      medicalDegree: {
        institution: 'Harvard Medical School',
        year: '2010',
        degree: 'MD'
      },
      residency: {
        institution: 'Massachusetts General Hospital',
        year: '2014',
        specialty: 'Internal Medicine'
      },
      fellowship: {
        institution: 'Dana-Farber Cancer Institute',
        year: '2017',
        specialty: 'Medical Oncology'
      }
    };
  }
  
  // Generic extraction
  return {
    firstName: 'Unknown',
    lastName: 'Professional',
    yearsPractice: 5,
    publications: 10,
    subspecialties: ['oncology'],
    societyMemberships: ['ASCO']
  };
}
