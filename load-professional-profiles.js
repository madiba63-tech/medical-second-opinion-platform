const jwt = require('jsonwebtoken');

// Generate JWT token
const token = jwt.sign(
  { userId: 'admin', role: 'admin' }, 
  'second-opinion-jwt-secret-2025',
  { expiresIn: '24h' }
);

// 20 diverse professional profiles with middle name "Demo"
const professionalProfiles = [
  {
    email: "sarah.demo.chen@hospital.com",
    password: "demo123",
    firstName: "Sarah",
    middleName: "Demo",
    lastName: "Chen",
    title: "MD, PhD",
    specialization: ["LUNG_CANCER", "THORACIC_ONCOLOGY"],
    yearsOfExperience: 18,
    profile: {
      clinicalSeniority: "EXPERT",
      primarySpecialty: ["LUNG_CANCER"],
      secondarySpecialties: ["THORACIC_ONCOLOGY", "MEDICAL_IMAGING"],
      diagnosticExpertise: ["RADIOLOGY_FOCUSED", "MULTIMODAL_REVIEWER"],
      regionalLicensing: ["US_LICENSED", "CROSS_LICENSED"],
      languageCapabilities: ["ENGLISH", "MANDARIN", "SPANISH"],
      availabilityTier: "RAPID_RESPONSE",
      preferences: {
        caseTypes: ["complex", "urgent"],
        maxCasesPerWeek: 8,
        preferredResponseTime: 24
      }
    }
  },
  {
    email: "marcus.demo.rodriguez@clinic.com",
    password: "demo123",
    firstName: "Marcus",
    middleName: "Demo",
    lastName: "Rodriguez",
    title: "MD",
    specialization: ["BREAST_CANCER", "HORMONAL_THERAPY"],
    yearsOfExperience: 12,
    profile: {
      clinicalSeniority: "SENIOR",
      primarySpecialty: ["BREAST_CANCER"],
      secondarySpecialties: ["HORMONAL_THERAPY"],
      diagnosticExpertise: ["PATHOLOGY_FOCUSED", "GENOMICS_SPECIALIST"],
      regionalLicensing: ["EU_LICENSED"],
      languageCapabilities: ["ENGLISH", "SPANISH", "PORTUGUESE"],
      availabilityTier: "STANDARD",
      preferences: {
        caseTypes: ["routine", "moderate"],
        maxCasesPerWeek: 12,
        preferredResponseTime: 48
      }
    }
  },
  {
    email: "aisha.demo.patel@research.com",
    password: "demo123",
    firstName: "Aisha",
    middleName: "Demo",
    lastName: "Patel",
    title: "MD, MSc",
    specialization: ["PEDIATRIC_LEUKEMIA", "PEDIATRIC_SOLID_TUMORS"],
    yearsOfExperience: 8,
    profile: {
      clinicalSeniority: "JUNIOR",
      primarySpecialty: ["PEDIATRIC_LEUKEMIA"],
      secondarySpecialties: ["PEDIATRIC_SOLID_TUMORS"],
      diagnosticExpertise: ["GENOMICS_SPECIALIST", "PATHOLOGY_FOCUSED"],
      regionalLicensing: ["APAC_LICENSED"],
      languageCapabilities: ["ENGLISH", "HINDI", "GUJARATI"],
      availabilityTier: "STANDARD",
      preferences: {
        caseTypes: ["pediatric", "routine"],
        maxCasesPerWeek: 10,
        preferredResponseTime: 72
      }
    }
  },
  {
    email: "erik.demo.andersen@university.com",
    password: "demo123",
    firstName: "Erik",
    middleName: "Demo",
    lastName: "Andersen",
    title: "MD, PhD, FRCPC",
    specialization: ["BRAIN_TUMOR", "NEUROBLASTOMA"],
    yearsOfExperience: 25,
    profile: {
      clinicalSeniority: "DISTINGUISHED",
      primarySpecialty: ["BRAIN_TUMOR"],
      secondarySpecialties: ["NEUROBLASTOMA", "RARE_CANCERS"],
      diagnosticExpertise: ["RADIOLOGY_FOCUSED", "MULTIMODAL_REVIEWER"],
      regionalLicensing: ["EU_LICENSED", "US_LICENSED"],
      languageCapabilities: ["ENGLISH", "NORWEGIAN", "DANISH", "GERMAN"],
      availabilityTier: "COMPLEX_CASES",
      preferences: {
        caseTypes: ["complex", "exceptional"],
        maxCasesPerWeek: 4,
        preferredResponseTime: 96
      }
    }
  },
  {
    email: "maria.demo.santos@hospital.com",
    password: "demo123",
    firstName: "Maria",
    middleName: "Demo",
    lastName: "Santos",
    title: "MD",
    specialization: ["COLORECTAL_CANCER", "GASTROINTESTINAL_STROMAL"],
    yearsOfExperience: 15,
    profile: {
      clinicalSeniority: "EXPERT",
      primarySpecialty: ["COLORECTAL_CANCER"],
      secondarySpecialties: ["GASTROINTESTINAL_STROMAL"],
      diagnosticExpertise: ["PATHOLOGY_FOCUSED", "MULTIMODAL_REVIEWER"],
      regionalLicensing: ["EU_LICENSED"],
      languageCapabilities: ["ENGLISH", "SPANISH", "PORTUGUESE"],
      availabilityTier: "RAPID_RESPONSE",
      preferences: {
        caseTypes: ["urgent", "complex"],
        maxCasesPerWeek: 7,
        preferredResponseTime: 36
      }
    }
  },
  {
    email: "david.demo.kim@medical.com",
    password: "demo123",
    firstName: "David",
    middleName: "Demo",
    lastName: "Kim",
    title: "MD, PhD",
    specialization: ["HEPATOCELLULAR_CARCINOMA", "PANCREATIC_CANCER"],
    yearsOfExperience: 20,
    profile: {
      clinicalSeniority: "DISTINGUISHED",
      primarySpecialty: ["HEPATOCELLULAR_CARCINOMA"],
      secondarySpecialties: ["PANCREATIC_CANCER"],
      diagnosticExpertise: ["GENOMICS_SPECIALIST", "MULTIMODAL_REVIEWER"],
      regionalLicensing: ["APAC_LICENSED", "US_LICENSED"],
      languageCapabilities: ["ENGLISH", "KOREAN", "JAPANESE"],
      availabilityTier: "COMPLEX_CASES",
      preferences: {
        caseTypes: ["complex", "exceptional"],
        maxCasesPerWeek: 5,
        preferredResponseTime: 72
      }
    }
  },
  {
    email: "elena.demo.volkov@clinic.com",
    password: "demo123",
    firstName: "Elena",
    middleName: "Demo",
    lastName: "Volkov",
    title: "MD",
    specialization: ["OVARIAN_CANCER", "CERVICAL_CANCER"],
    yearsOfExperience: 10,
    profile: {
      clinicalSeniority: "SENIOR",
      primarySpecialty: ["OVARIAN_CANCER"],
      secondarySpecialties: ["CERVICAL_CANCER"],
      diagnosticExpertise: ["RADIOLOGY_FOCUSED", "PATHOLOGY_FOCUSED"],
      regionalLicensing: ["EU_LICENSED"],
      languageCapabilities: ["ENGLISH", "RUSSIAN", "UKRAINIAN"],
      availabilityTier: "STANDARD",
      preferences: {
        caseTypes: ["routine", "moderate"],
        maxCasesPerWeek: 11,
        preferredResponseTime: 48
      }
    }
  },
  {
    email: "james.demo.oconnor@hospital.com",
    password: "demo123",
    firstName: "James",
    middleName: "Demo",
    lastName: "O'Connor",
    title: "MD, FRCR",
    specialization: ["PROSTATE_CANCER", "TESTICULAR_CANCER"],
    yearsOfExperience: 16,
    profile: {
      clinicalSeniority: "EXPERT",
      primarySpecialty: ["PROSTATE_CANCER"],
      secondarySpecialties: ["TESTICULAR_CANCER"],
      diagnosticExpertise: ["RADIOLOGY_FOCUSED", "GENOMICS_SPECIALIST"],
      regionalLicensing: ["EU_LICENSED", "CROSS_LICENSED"],
      languageCapabilities: ["ENGLISH", "IRISH_GAELIC"],
      availabilityTier: "RAPID_RESPONSE",
      preferences: {
        caseTypes: ["urgent", "complex"],
        maxCasesPerWeek: 9,
        preferredResponseTime: 24
      }
    }
  },
  {
    email: "fatima.demo.al-zahra@medical.com",
    password: "demo123",
    firstName: "Fatima",
    middleName: "Demo",
    lastName: "Al-Zahra",
    title: "MD, MSc",
    specialization: ["THYROID_CANCER", "ADRENAL_TUMORS"],
    yearsOfExperience: 7,
    profile: {
      clinicalSeniority: "JUNIOR",
      primarySpecialty: ["THYROID_CANCER"],
      secondarySpecialties: ["ADRENAL_TUMORS"],
      diagnosticExpertise: ["PATHOLOGY_FOCUSED", "MULTIMODAL_REVIEWER"],
      regionalLicensing: ["EU_LICENSED"],
      languageCapabilities: ["ENGLISH", "ARABIC", "FRENCH"],
      availabilityTier: "STANDARD",
      preferences: {
        caseTypes: ["routine", "moderate"],
        maxCasesPerWeek: 13,
        preferredResponseTime: 60
      }
    }
  },
  {
    email: "hiroshi.demo.tanaka@university.com",
    password: "demo123",
    firstName: "Hiroshi",
    middleName: "Demo",
    lastName: "Tanaka",
    title: "MD, PhD",
    specialization: ["GASTRIC_CANCER", "ESOPHAGEAL_CANCER"],
    yearsOfExperience: 22,
    profile: {
      clinicalSeniority: "DISTINGUISHED",
      primarySpecialty: ["GASTRIC_CANCER"],
      secondarySpecialties: ["ESOPHAGEAL_CANCER"],
      diagnosticExpertise: ["GENOMICS_SPECIALIST", "MULTIMODAL_REVIEWER"],
      regionalLicensing: ["APAC_LICENSED"],
      languageCapabilities: ["ENGLISH", "JAPANESE"],
      availabilityTier: "COMPLEX_CASES",
      preferences: {
        caseTypes: ["complex", "exceptional"],
        maxCasesPerWeek: 6,
        preferredResponseTime: 84
      }
    }
  },
  {
    email: "sophia.demo.mueller@clinic.com",
    password: "demo123",
    firstName: "Sophia",
    middleName: "Demo",
    lastName: "Mueller",
    title: "MD",
    specialization: ["MELANOMA", "SKIN_CANCER"],
    yearsOfExperience: 9,
    profile: {
      clinicalSeniority: "SENIOR",
      primarySpecialty: ["MELANOMA"],
      secondarySpecialties: ["SKIN_CANCER"],
      diagnosticExpertise: ["PATHOLOGY_FOCUSED", "RADIOLOGY_FOCUSED"],
      regionalLicensing: ["EU_LICENSED"],
      languageCapabilities: ["ENGLISH", "GERMAN", "DUTCH"],
      availabilityTier: "STANDARD",
      preferences: {
        caseTypes: ["routine", "moderate"],
        maxCasesPerWeek: 14,
        preferredResponseTime: 48
      }
    }
  },
  {
    email: "carlos.demo.mendoza@hospital.com",
    password: "demo123",
    firstName: "Carlos",
    middleName: "Demo",
    lastName: "Mendoza",
    title: "MD, PhD",
    specialization: ["SARCOMA", "BONE_TUMORS"],
    yearsOfExperience: 19,
    profile: {
      clinicalSeniority: "EXPERT",
      primarySpecialty: ["SARCOMA"],
      secondarySpecialties: ["BONE_TUMORS"],
      diagnosticExpertise: ["RADIOLOGY_FOCUSED", "MULTIMODAL_REVIEWER"],
      regionalLicensing: ["US_LICENSED", "CROSS_LICENSED"],
      languageCapabilities: ["ENGLISH", "SPANISH"],
      availabilityTier: "RAPID_RESPONSE",
      preferences: {
        caseTypes: ["complex", "urgent"],
        maxCasesPerWeek: 6,
        preferredResponseTime: 36
      }
    }
  },
  {
    email: "priya.demo.sharma@research.com",
    password: "demo123",
    firstName: "Priya",
    middleName: "Demo",
    lastName: "Sharma",
    title: "MD, MSc",
    specialization: ["MULTIPLE_MYELOMA", "NON_HODGKIN_LYMPHOMA"],
    yearsOfExperience: 6,
    profile: {
      clinicalSeniority: "JUNIOR",
      primarySpecialty: ["MULTIPLE_MYELOMA"],
      secondarySpecialties: ["NON_HODGKIN_LYMPHOMA"],
      diagnosticExpertise: ["GENOMICS_SPECIALIST", "PATHOLOGY_FOCUSED"],
      regionalLicensing: ["APAC_LICENSED"],
      languageCapabilities: ["ENGLISH", "HINDI", "PUNJABI"],
      availabilityTier: "STANDARD",
      preferences: {
        caseTypes: ["routine", "moderate"],
        maxCasesPerWeek: 15,
        preferredResponseTime: 72
      }
    }
  },
  {
    email: "antoine.demo.dubois@medical.com",
    password: "demo123",
    firstName: "Antoine",
    middleName: "Demo",
    lastName: "Dubois",
    title: "MD, PhD",
    specialization: ["RENAL_CELL_CARCINOMA", "BLADDER_CANCER"],
    yearsOfExperience: 17,
    profile: {
      clinicalSeniority: "EXPERT",
      primarySpecialty: ["RENAL_CELL_CARCINOMA"],
      secondarySpecialties: ["BLADDER_CANCER"],
      diagnosticExpertise: ["RADIOLOGY_FOCUSED", "GENOMICS_SPECIALIST"],
      regionalLicensing: ["EU_LICENSED"],
      languageCapabilities: ["ENGLISH", "FRENCH", "ITALIAN"],
      availabilityTier: "RAPID_RESPONSE",
      preferences: {
        caseTypes: ["urgent", "complex"],
        maxCasesPerWeek: 8,
        preferredResponseTime: 30
      }
    }
  },
  {
    email: "lisa.demo.johnson@clinic.com",
    password: "demo123",
    firstName: "Lisa",
    middleName: "Demo",
    lastName: "Johnson",
    title: "MD",
    specialization: ["HODGKIN_LYMPHOMA", "ACUTE_LEUKEMIA"],
    yearsOfExperience: 11,
    profile: {
      clinicalSeniority: "SENIOR",
      primarySpecialty: ["HODGKIN_LYMPHOMA"],
      secondarySpecialties: ["ACUTE_LEUKEMIA"],
      diagnosticExpertise: ["PATHOLOGY_FOCUSED", "MULTIMODAL_REVIEWER"],
      regionalLicensing: ["US_LICENSED"],
      languageCapabilities: ["ENGLISH"],
      availabilityTier: "STANDARD",
      preferences: {
        caseTypes: ["routine", "moderate"],
        maxCasesPerWeek: 12,
        preferredResponseTime: 48
      }
    }
  },
  {
    email: "ahmed.demo.hassan@hospital.com",
    password: "demo123",
    firstName: "Ahmed",
    middleName: "Demo",
    lastName: "Hassan",
    title: "MD, PhD",
    specialization: ["MOLECULAR_ONCOLOGY", "RARE_CANCERS"],
    yearsOfExperience: 23,
    profile: {
      clinicalSeniority: "DISTINGUISHED",
      primarySpecialty: ["MOLECULAR_ONCOLOGY"],
      secondarySpecialties: ["RARE_CANCERS"],
      diagnosticExpertise: ["GENOMICS_SPECIALIST", "MULTIMODAL_REVIEWER"],
      regionalLicensing: ["EU_LICENSED", "CROSS_LICENSED"],
      languageCapabilities: ["ENGLISH", "ARABIC", "FRENCH"],
      availabilityTier: "COMPLEX_CASES",
      preferences: {
        caseTypes: ["exceptional", "complex"],
        maxCasesPerWeek: 3,
        preferredResponseTime: 120
      }
    }
  },
  {
    email: "nina.demo.petrov@university.com",
    password: "demo123",
    firstName: "Nina",
    middleName: "Demo",
    lastName: "Petrov",
    title: "MD",
    specialization: ["CHRONIC_LEUKEMIA", "MYELODYSPLASTIC_SYNDROME"],
    yearsOfExperience: 8,
    profile: {
      clinicalSeniority: "JUNIOR",
      primarySpecialty: ["CHRONIC_LEUKEMIA"],
      secondarySpecialties: ["MYELODYSPLASTIC_SYNDROME"],
      diagnosticExpertise: ["GENOMICS_SPECIALIST", "PATHOLOGY_FOCUSED"],
      regionalLicensing: ["EU_LICENSED"],
      languageCapabilities: ["ENGLISH", "RUSSIAN", "BULGARIAN"],
      availabilityTier: "STANDARD",
      preferences: {
        caseTypes: ["routine", "moderate"],
        maxCasesPerWeek: 13,
        preferredResponseTime: 60
      }
    }
  },
  {
    email: "michael.demo.brown@medical.com",
    password: "demo123",
    firstName: "Michael",
    middleName: "Demo",
    lastName: "Brown",
    title: "MD, FRCR",
    specialization: ["HEAD_NECK_CANCER", "ORAL_CANCER"],
    yearsOfExperience: 14,
    profile: {
      clinicalSeniority: "SENIOR",
      primarySpecialty: ["HEAD_NECK_CANCER"],
      secondarySpecialties: ["ORAL_CANCER"],
      diagnosticExpertise: ["RADIOLOGY_FOCUSED", "MULTIMODAL_REVIEWER"],
      regionalLicensing: ["US_LICENSED", "EU_LICENSED"],
      languageCapabilities: ["ENGLISH"],
      availabilityTier: "RAPID_RESPONSE",
      preferences: {
        caseTypes: ["urgent", "complex"],
        maxCasesPerWeek: 7,
        preferredResponseTime: 24
      }
    }
  },
  {
    email: "yuki.demo.nakamura@clinic.com",
    password: "demo123",
    firstName: "Yuki",
    middleName: "Demo",
    lastName: "Nakamura",
    title: "MD, MSc",
    specialization: ["CARCINOID_TUMORS", "NEUROENDOCRINE"],
    yearsOfExperience: 5,
    profile: {
      clinicalSeniority: "JUNIOR",
      primarySpecialty: ["CARCINOID_TUMORS"],
      secondarySpecialties: ["NEUROENDOCRINE"],
      diagnosticExpertise: ["PATHOLOGY_FOCUSED", "GENOMICS_SPECIALIST"],
      regionalLicensing: ["APAC_LICENSED"],
      languageCapabilities: ["ENGLISH", "JAPANESE", "KOREAN"],
      availabilityTier: "STANDARD",
      preferences: {
        caseTypes: ["routine", "moderate"],
        maxCasesPerWeek: 16,
        preferredResponseTime: 72
      }
    }
  },
  {
    email: "isabella.demo.rossi@hospital.com",
    password: "demo123",
    firstName: "Isabella",
    middleName: "Demo",
    lastName: "Rossi",
    title: "MD, PhD",
    specialization: ["UTERINE_CANCER", "GESTATIONAL_TROPHOBLASTIC"],
    yearsOfExperience: 21,
    profile: {
      clinicalSeniority: "DISTINGUISHED",
      primarySpecialty: ["UTERINE_CANCER"],
      secondarySpecialties: ["GESTATIONAL_TROPHOBLASTIC"],
      diagnosticExpertise: ["MULTIMODAL_REVIEWER", "PATHOLOGY_FOCUSED"],
      regionalLicensing: ["EU_LICENSED", "CROSS_LICENSED"],
      languageCapabilities: ["ENGLISH", "ITALIAN", "SPANISH", "FRENCH"],
      availabilityTier: "COMPLEX_CASES",
      preferences: {
        caseTypes: ["complex", "exceptional"],
        maxCasesPerWeek: 4,
        preferredResponseTime: 96
      }
    }
  }
];

async function loadProfessionalProfiles() {
  console.log('🩺 Loading 20 Diverse Professional Profiles\n');
  
  let successCount = 0;
  let failureCount = 0;
  
  for (let i = 0; i < professionalProfiles.length; i++) {
    const profile = professionalProfiles[i];
    
    try {
      console.log(`📋 Loading Profile ${i + 1}/20: Dr. ${profile.firstName} ${profile.middleName} ${profile.lastName}`);
      console.log(`   🏥 Specialty: ${profile.specialization.join(', ')}`);
      console.log(`   ⭐ Seniority: ${profile.profile.clinicalSeniority}`);
      console.log(`   🌍 Licensing: ${profile.profile.regionalLicensing.join(', ')}`);
      console.log(`   💬 Languages: ${profile.profile.languageCapabilities.join(', ')}`);
      console.log(`   ⚡ Availability: ${profile.profile.availabilityTier}`);
      
      const response = await fetch('http://localhost:4014/api/v1/professionals/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log(`   ✅ Success: ${result.data.professionalId}\n`);
        successCount++;
      } else {
        console.log(`   ❌ Failed: ${result.error}\n`);
        failureCount++;
      }
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.error(`   ❌ Error loading ${profile.firstName}: ${error.message}\n`);
      failureCount++;
    }
  }
  
  console.log(`\n📊 Loading Complete:`);
  console.log(`✅ Successfully loaded: ${successCount} professionals`);
  console.log(`❌ Failed to load: ${failureCount} professionals`);
  
  if (successCount > 0) {
    // Test the loaded profiles
    console.log(`\n🔍 Verifying loaded professionals...`);
    
    try {
      const listResponse = await fetch('http://localhost:4014/api/v1/professionals/profiles', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const listResult = await listResponse.json();
      
      if (listResult.success) {
        console.log(`✅ Verification successful: ${listResult.data.length} professionals in system`);
        
        // Show summary by seniority
        const bySeniority = {};
        listResult.data.forEach(prof => {
          const seniority = prof.profile?.clinicalSeniority || 'Unknown';
          bySeniority[seniority] = (bySeniority[seniority] || 0) + 1;
        });
        
        console.log(`\n📈 Professional Distribution by Seniority:`);
        Object.entries(bySeniority).forEach(([level, count]) => {
          console.log(`   ${level}: ${count} professionals`);
        });
      }
    } catch (error) {
      console.error(`❌ Verification failed: ${error.message}`);
    }
  }
}

// Run the loading process
loadProfessionalProfiles().catch(console.error);