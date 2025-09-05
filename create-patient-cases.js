const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// Generate JWT token
const token = jwt.sign(
  { userId: 'admin', role: 'admin' }, 
  'second-opinion-jwt-secret-2025',
  { expiresIn: '24h' }
);

// 20 diverse patient cases with comprehensive medical data
const patientCases = [
  {
    // Patient Information
    patient: {
      firstName: "Maria",
      middleName: "Demo",
      lastName: "Rodriguez",
      dateOfBirth: "1967-04-15",
      gender: "female",
      email: "maria.demo.rodriguez@email.com",
      phone: "+1-555-0101",
      address: "123 Oak Street, San Diego, CA 92101",
      emergencyContact: {
        name: "Carlos Rodriguez",
        relationship: "husband",
        phone: "+1-555-0102"
      },
      insurance: {
        provider: "Blue Cross Blue Shield",
        policyNumber: "BCBS789456123"
      }
    },
    // Case Information
    case: {
      patientName: "Maria Demo Rodriguez",
      diseaseType: "BREAST_CANCER",
      description: "56-year-old Hispanic female with invasive ductal carcinoma, ER/PR positive, HER2 negative, requiring second opinion on adjuvant treatment options",
      patientAge: 56,
      patientGender: "female",
      primaryLanguage: "en",
      patientLocation: "California, USA",
      expertiseLevel: "SENIOR",
      urgency: "STANDARD",
      documents: [
        {
          type: "PATHOLOGY_REPORT",
          name: "Breast Biopsy Pathology Report",
          content: "Invasive ductal carcinoma, Grade 2, ER positive (95%), PR positive (80%), HER2 negative, Ki-67 15%"
        },
        {
          type: "MEDICAL_IMAGING",
          name: "Bilateral Mammography",
          content: "Left breast mass 2.3cm with spiculated margins, no lymphadenopathy visible"
        },
        {
          type: "LABORATORY_RESULTS",
          name: "Complete Blood Count",
          content: "Normal CBC, adequate for chemotherapy consideration"
        }
      ],
      previousTreatments: ["lumpectomy"],
      comorbidities: ["hypertension", "diabetes type 2"]
    }
  },
  {
    patient: {
      firstName: "Robert",
      middleName: "Demo",
      lastName: "Chen",
      dateOfBirth: "1955-08-22",
      gender: "male",
      email: "robert.demo.chen@email.com",
      phone: "+1-555-0201",
      address: "456 Pine Avenue, Boston, MA 02101",
      emergencyContact: {
        name: "Linda Chen",
        relationship: "wife",
        phone: "+1-555-0202"
      },
      insurance: {
        provider: "Medicare",
        policyNumber: "MCARE567890123"
      }
    },
    case: {
      patientName: "Robert Demo Chen",
      diseaseType: "LUNG_CANCER",
      description: "68-year-old Asian male with stage IIIA non-small cell lung cancer, adenocarcinoma, EGFR wild-type, seeking opinion on trimodality therapy",
      patientAge: 68,
      patientGender: "male",
      primaryLanguage: "en",
      patientLocation: "Massachusetts, USA",
      expertiseLevel: "EXPERT",
      urgency: "URGENT",
      documents: [
        {
          type: "PATHOLOGY_REPORT",
          name: "Lung Biopsy Pathology",
          content: "Adenocarcinoma, moderately differentiated, EGFR wild-type, ALK negative, PD-L1 expression 45%"
        },
        {
          type: "MEDICAL_IMAGING",
          name: "PET-CT Scan",
          content: "Right upper lobe mass 4.2cm, mediastinal lymphadenopathy, no distant metastases"
        },
        {
          type: "GENOMIC_TESTING",
          name: "Next-Generation Sequencing",
          content: "EGFR wild-type, KRAS G12C mutation detected, ALK/ROS1 negative"
        }
      ],
      previousTreatments: [],
      comorbidities: ["COPD", "coronary artery disease"]
    }
  },
  {
    patient: {
      firstName: "Jennifer",
      middleName: "Demo",
      lastName: "Williams",
      dateOfBirth: "1985-12-03",
      gender: "female",
      email: "jennifer.demo.williams@email.com",
      phone: "+1-555-0301",
      address: "789 Maple Drive, Austin, TX 78701",
      emergencyContact: {
        name: "Michael Williams",
        relationship: "husband",
        phone: "+1-555-0302"
      },
      insurance: {
        provider: "Aetna",
        policyNumber: "AETNA123789456"
      }
    },
    case: {
      patientName: "Jennifer Demo Williams",
      diseaseType: "MELANOMA",
      description: "38-year-old Caucasian female with stage IIB melanoma, ulcerated primary lesion, negative sentinel lymph node biopsy, considering adjuvant therapy",
      patientAge: 38,
      patientGender: "female",
      primaryLanguage: "en",
      patientLocation: "Texas, USA",
      expertiseLevel: "SENIOR",
      urgency: "STANDARD",
      documents: [
        {
          type: "PATHOLOGY_REPORT",
          name: "Melanoma Pathology Report",
          content: "Malignant melanoma, Breslow depth 2.8mm, ulcerated, mitotic rate 6/mm², BRAF V600E mutation positive"
        },
        {
          type: "MEDICAL_IMAGING",
          name: "CT Chest/Abdomen/Pelvis",
          content: "No evidence of distant metastatic disease"
        },
        {
          type: "GENOMIC_TESTING",
          name: "BRAF Mutation Testing",
          content: "BRAF V600E mutation detected (suitable for targeted therapy)"
        }
      ],
      previousTreatments: ["wide excision", "sentinel lymph node biopsy"],
      comorbidities: []
    }
  },
  {
    patient: {
      firstName: "Ahmed",
      middleName: "Demo",
      lastName: "Hassan",
      dateOfBirth: "1972-06-18",
      gender: "male",
      email: "ahmed.demo.hassan@email.com",
      phone: "+1-555-0401",
      address: "321 Cedar Street, Detroit, MI 48201",
      emergencyContact: {
        name: "Fatima Hassan",
        relationship: "wife",
        phone: "+1-555-0402"
      },
      insurance: {
        provider: "United Healthcare",
        policyNumber: "UHC456123789"
      }
    },
    case: {
      patientName: "Ahmed Demo Hassan",
      diseaseType: "COLORECTAL_CANCER",
      description: "51-year-old Middle Eastern male with stage III colon adenocarcinoma, T3N1M0, microsatellite stable, seeking second opinion on adjuvant chemotherapy duration",
      patientAge: 51,
      patientGender: "male",
      primaryLanguage: "en",
      patientLocation: "Michigan, USA",
      expertiseLevel: "SENIOR",
      urgency: "STANDARD",
      documents: [
        {
          type: "PATHOLOGY_REPORT",
          name: "Colon Resection Pathology",
          content: "Adenocarcinoma, moderately differentiated, T3N1M0, 3/15 lymph nodes positive, microsatellite stable"
        },
        {
          type: "MEDICAL_IMAGING",
          name: "Post-operative CT Scan",
          content: "Status post right hemicolectomy, no residual disease, normal liver"
        },
        {
          type: "GENOMIC_TESTING",
          name: "Microsatellite Instability Testing",
          content: "Microsatellite stable (MSS), KRAS wild-type, suitable for anti-EGFR therapy consideration"
        }
      ],
      previousTreatments: ["right hemicolectomy"],
      comorbidities: ["diabetes type 2"]
    }
  },
  {
    patient: {
      firstName: "Susan",
      middleName: "Demo",
      lastName: "Johnson",
      dateOfBirth: "1963-03-28",
      gender: "female",
      email: "susan.demo.johnson@email.com",
      phone: "+1-555-0501",
      address: "654 Elm Street, Portland, OR 97201",
      emergencyContact: {
        name: "David Johnson",
        relationship: "husband",
        phone: "+1-555-0502"
      },
      insurance: {
        provider: "Kaiser Permanente",
        policyNumber: "KP789123456"
      }
    },
    case: {
      patientName: "Susan Demo Johnson",
      diseaseType: "OVARIAN_CANCER",
      description: "60-year-old Caucasian female with high-grade serous ovarian carcinoma, stage IIIC, BRCA1 positive, seeking opinion on maintenance therapy options",
      patientAge: 60,
      patientGender: "female",
      primaryLanguage: "en",
      patientLocation: "Oregon, USA",
      expertiseLevel: "EXPERT",
      urgency: "STANDARD",
      documents: [
        {
          type: "PATHOLOGY_REPORT",
          name: "Ovarian Cancer Pathology",
          content: "High-grade serous carcinoma, stage IIIC, extensive peritoneal involvement"
        },
        {
          type: "GENOMIC_TESTING",
          name: "BRCA Testing",
          content: "BRCA1 pathogenic mutation detected (c.5266dupC), homologous recombination deficient"
        },
        {
          type: "LABORATORY_RESULTS",
          name: "CA-125 Levels",
          content: "CA-125: 45 U/mL (post-chemotherapy, previously 1200 U/mL)"
        }
      ],
      previousTreatments: ["debulking surgery", "carboplatin/paclitaxel chemotherapy"],
      comorbidities: ["osteoporosis"]
    }
  },
  {
    patient: {
      firstName: "Michael",
      middleName: "Demo",
      lastName: "Brown",
      dateOfBirth: "1958-11-12",
      gender: "male",
      email: "michael.demo.brown@email.com",
      phone: "+1-555-0601",
      address: "987 Birch Lane, Denver, CO 80201",
      emergencyContact: {
        name: "Patricia Brown",
        relationship: "wife",
        phone: "+1-555-0602"
      },
      insurance: {
        provider: "Cigna",
        policyNumber: "CIGNA987654321"
      }
    },
    case: {
      patientName: "Michael Demo Brown",
      diseaseType: "PROSTATE_CANCER",
      description: "65-year-old African American male with intermediate-risk prostate adenocarcinoma, Gleason 7 (3+4), PSA 8.5, seeking treatment decision guidance",
      patientAge: 65,
      patientGender: "male",
      primaryLanguage: "en",
      patientLocation: "Colorado, USA",
      expertiseLevel: "SENIOR",
      urgency: "STANDARD",
      documents: [
        {
          type: "PATHOLOGY_REPORT",
          name: "Prostate Biopsy Pathology",
          content: "Adenocarcinoma, Gleason score 7 (3+4), 4/12 cores positive, 30% core involvement"
        },
        {
          type: "MEDICAL_IMAGING",
          name: "MRI Prostate",
          content: "PI-RADS 4 lesion in left peripheral zone, no extracapsular extension"
        },
        {
          type: "LABORATORY_RESULTS",
          name: "PSA and Testosterone",
          content: "PSA: 8.5 ng/mL, Free PSA: 15%, Testosterone: 380 ng/dL"
        }
      ],
      previousTreatments: [],
      comorbidities: ["benign prostatic hyperplasia"]
    }
  },
  {
    patient: {
      firstName: "Lisa",
      middleName: "Demo",
      lastName: "Kim",
      dateOfBirth: "1978-09-05",
      gender: "female",
      email: "lisa.demo.kim@email.com",
      phone: "+1-555-0701",
      address: "147 Willow Street, Seattle, WA 98101",
      emergencyContact: {
        name: "James Kim",
        relationship: "husband",
        phone: "+1-555-0702"
      },
      insurance: {
        provider: "Premera Blue Cross",
        policyNumber: "PBC147258369"
      }
    },
    case: {
      patientName: "Lisa Demo Kim",
      diseaseType: "THYROID_CANCER",
      description: "45-year-old Korean American female with papillary thyroid carcinoma, 1.8cm, no lymph node involvement, considering extent of surgery",
      patientAge: 45,
      patientGender: "female",
      primaryLanguage: "en",
      patientLocation: "Washington, USA",
      expertiseLevel: "JUNIOR",
      urgency: "STANDARD",
      documents: [
        {
          type: "PATHOLOGY_REPORT",
          name: "Thyroid FNA Cytology",
          content: "Papillary thyroid carcinoma, classical variant, 1.8cm nodule, Bethesda VI"
        },
        {
          type: "MEDICAL_IMAGING",
          name: "Thyroid Ultrasound",
          content: "1.8cm hypoechoic nodule with microcalcifications, no suspicious lymph nodes"
        },
        {
          type: "LABORATORY_RESULTS",
          name: "Thyroid Function Tests",
          content: "TSH: 2.1 mIU/L, Free T4: 1.2 ng/dL, Thyroglobulin: 15 ng/mL"
        }
      ],
      previousTreatments: [],
      comorbidities: []
    }
  },
  {
    patient: {
      firstName: "Carlos",
      middleName: "Demo",
      lastName: "Martinez",
      dateOfBirth: "1951-07-30",
      gender: "male",
      email: "carlos.demo.martinez@email.com",
      phone: "+1-555-0801",
      address: "258 Palm Avenue, Miami, FL 33101",
      emergencyContact: {
        name: "Elena Martinez",
        relationship: "wife",
        phone: "+1-555-0802"
      },
      insurance: {
        provider: "Humana",
        policyNumber: "HUM258369147"
      }
    },
    case: {
      patientName: "Carlos Demo Martinez",
      diseaseType: "PANCREATIC_CANCER",
      description: "72-year-old Hispanic male with pancreatic ductal adenocarcinoma, borderline resectable, seeking second opinion on neoadjuvant therapy approach",
      patientAge: 72,
      patientGender: "male",
      primaryLanguage: "es",
      patientLocation: "Florida, USA",
      expertiseLevel: "EXPERT",
      urgency: "URGENT",
      documents: [
        {
          type: "PATHOLOGY_REPORT",
          name: "Pancreatic Biopsy",
          content: "Ductal adenocarcinoma, moderately differentiated, KRAS mutated, p53 altered"
        },
        {
          type: "MEDICAL_IMAGING",
          name: "Pancreatic Protocol CT",
          content: "3.2cm mass in pancreatic head, abutting SMA <180°, borderline resectable"
        },
        {
          type: "LABORATORY_RESULTS",
          name: "Tumor Markers",
          content: "CA 19-9: 450 U/mL, CEA: 8.2 ng/mL, normal bilirubin"
        }
      ],
      previousTreatments: [],
      comorbidities: ["diabetes type 2", "coronary artery disease"]
    }
  },
  {
    patient: {
      firstName: "Rachel",
      middleName: "Demo",
      lastName: "Davis",
      dateOfBirth: "1969-01-14",
      gender: "female",
      email: "rachel.demo.davis@email.com",
      phone: "+1-555-0901",
      address: "369 Spruce Street, Atlanta, GA 30301",
      emergencyContact: {
        name: "Thomas Davis",
        relationship: "husband",
        phone: "+1-555-0902"
      },
      insurance: {
        provider: "Anthem",
        policyNumber: "ANT369147258"
      }
    },
    case: {
      patientName: "Rachel Demo Davis",
      diseaseType: "CERVICAL_CANCER",
      description: "54-year-old African American female with stage IB2 squamous cell carcinoma of cervix, HPV16 positive, considering treatment options",
      patientAge: 54,
      patientGender: "female",
      primaryLanguage: "en",
      patientLocation: "Georgia, USA",
      expertiseLevel: "SENIOR",
      urgency: "STANDARD",
      documents: [
        {
          type: "PATHOLOGY_REPORT",
          name: "Cervical Biopsy",
          content: "Squamous cell carcinoma, moderately differentiated, HPV16 positive, stage IB2"
        },
        {
          type: "MEDICAL_IMAGING",
          name: "Pelvic MRI",
          content: "4.5cm cervical mass, no parametrial invasion, normal lymph nodes"
        },
        {
          type: "LABORATORY_RESULTS",
          name: "HPV Testing",
          content: "HPV16 positive, high-risk HPV detected"
        }
      ],
      previousTreatments: [],
      comorbidities: ["hypertension"]
    }
  },
  {
    patient: {
      firstName: "Daniel",
      middleName: "Demo",
      lastName: "Anderson",
      dateOfBirth: "1962-05-20",
      gender: "male",
      email: "daniel.demo.anderson@email.com",
      phone: "+1-555-1001",
      address: "741 Oak Ridge Drive, Nashville, TN 37201",
      emergencyContact: {
        name: "Mary Anderson",
        relationship: "wife",
        phone: "+1-555-1002"
      },
      insurance: {
        provider: "BlueCross BlueShield Tennessee",
        policyNumber: "BCBSTN741852"
      }
    },
    case: {
      patientName: "Daniel Demo Anderson",
      diseaseType: "RENAL_CELL_CARCINOMA",
      description: "61-year-old Caucasian male with stage T2a clear cell renal carcinoma, post-nephrectomy, considering adjuvant therapy",
      patientAge: 61,
      patientGender: "male",
      primaryLanguage: "en",
      patientLocation: "Tennessee, USA",
      expertiseLevel: "SENIOR",
      urgency: "STANDARD",
      documents: [
        {
          type: "PATHOLOGY_REPORT",
          name: "Nephrectomy Specimen",
          content: "Clear cell renal carcinoma, Fuhrman grade 2, T2a, margins negative"
        },
        {
          type: "MEDICAL_IMAGING",
          name: "Post-operative CT",
          content: "Status post left radical nephrectomy, no residual disease, normal right kidney"
        },
        {
          type: "LABORATORY_RESULTS",
          name: "Renal Function",
          content: "Creatinine: 1.2 mg/dL, eGFR: 65 mL/min, normal electrolytes"
        }
      ],
      previousTreatments: ["radical nephrectomy"],
      comorbidities: ["hypertension"]
    }
  },
  {
    patient: {
      firstName: "Patricia",
      middleName: "Demo",
      lastName: "Wilson",
      dateOfBirth: "1966-10-08",
      gender: "female",
      email: "patricia.demo.wilson@email.com",
      phone: "+1-555-1101",
      address: "852 Valley Road, Phoenix, AZ 85001",
      emergencyContact: {
        name: "Robert Wilson",
        relationship: "husband",
        phone: "+1-555-1102"
      },
      insurance: {
        provider: "Health Net",
        policyNumber: "HN852963741"
      }
    },
    case: {
      patientName: "Patricia Demo Wilson",
      diseaseType: "UTERINE_CANCER",
      description: "57-year-old postmenopausal female with grade 2 endometrioid adenocarcinoma, stage IA, considering adjuvant treatment",
      patientAge: 57,
      patientGender: "female",
      primaryLanguage: "en",
      patientLocation: "Arizona, USA",
      expertiseLevel: "JUNIOR",
      urgency: "STANDARD",
      documents: [
        {
          type: "PATHOLOGY_REPORT",
          name: "Hysterectomy Specimen",
          content: "Endometrioid adenocarcinoma, grade 2, stage IA, <50% myometrial invasion"
        },
        {
          type: "MEDICAL_IMAGING",
          name: "Pelvic MRI",
          content: "Post-surgical changes, no residual disease, normal ovaries"
        },
        {
          type: "LABORATORY_RESULTS",
          name: "Hormone Receptors",
          content: "ER positive, PR positive, suitable for hormone therapy consideration"
        }
      ],
      previousTreatments: ["total hysterectomy", "bilateral salpingo-oophorectomy"],
      comorbidities: ["obesity", "diabetes type 2"]
    }
  },
  {
    patient: {
      firstName: "James",
      middleName: "Demo",
      lastName: "Taylor",
      dateOfBirth: "1974-12-25",
      gender: "male",
      email: "james.demo.taylor@email.com",
      phone: "+1-555-1201",
      address: "963 Highland Avenue, Minneapolis, MN 55401",
      emergencyContact: {
        name: "Jennifer Taylor",
        relationship: "wife",
        phone: "+1-555-1202"
      },
      insurance: {
        provider: "HealthPartners",
        policyNumber: "HP963741852"
      }
    },
    case: {
      patientName: "James Demo Taylor",
      diseaseType: "TESTICULAR_CANCER",
      description: "49-year-old Caucasian male with nonseminomatous germ cell tumor, stage IIA, post-orchiectomy, considering chemotherapy",
      patientAge: 49,
      patientGender: "male",
      primaryLanguage: "en",
      patientLocation: "Minnesota, USA",
      expertiseLevel: "JUNIOR",
      urgency: "URGENT",
      documents: [
        {
          type: "PATHOLOGY_REPORT",
          name: "Orchiectomy Specimen",
          content: "Mixed nonseminomatous germ cell tumor (embryonal carcinoma 60%, teratoma 40%), stage IIA"
        },
        {
          type: "MEDICAL_IMAGING",
          name: "CT Chest/Abdomen/Pelvis",
          content: "2.3cm retroperitoneal lymph node, no pulmonary metastases"
        },
        {
          type: "LABORATORY_RESULTS",
          name: "Tumor Markers",
          content: "AFP: 145 ng/mL, β-hCG: 850 mIU/mL, LDH: 450 U/L"
        }
      ],
      previousTreatments: ["radical orchiectomy"],
      comorbidities: []
    }
  },
  {
    patient: {
      firstName: "Sarah",
      middleName: "Demo",
      lastName: "Garcia",
      dateOfBirth: "1981-02-18",
      gender: "female",
      email: "sarah.demo.garcia@email.com",
      phone: "+1-555-1301",
      address: "159 Mountain View Drive, Salt Lake City, UT 84101",
      emergencyContact: {
        name: "Luis Garcia",
        relationship: "husband",
        phone: "+1-555-1302"
      },
      insurance: {
        provider: "SelectHealth",
        policyNumber: "SH159753486"
      }
    },
    case: {
      patientName: "Sarah Demo Garcia",
      diseaseType: "HODGKIN_LYMPHOMA",
      description: "42-year-old Hispanic female with classical Hodgkin lymphoma, nodular sclerosis subtype, stage IIB, seeking second opinion on treatment",
      patientAge: 42,
      patientGender: "female",
      primaryLanguage: "en",
      patientLocation: "Utah, USA",
      expertiseLevel: "SENIOR",
      urgency: "STANDARD",
      documents: [
        {
          type: "PATHOLOGY_REPORT",
          name: "Lymph Node Biopsy",
          content: "Classical Hodgkin lymphoma, nodular sclerosis subtype, CD30+, CD15+, PAX5 weak+"
        },
        {
          type: "MEDICAL_IMAGING",
          name: "PET-CT Scan",
          content: "Bulky mediastinal adenopathy, bilateral hilar involvement, Deauville score 5"
        },
        {
          type: "LABORATORY_RESULTS",
          name: "Complete Metabolic Panel",
          content: "Normal CBC except mild anemia, ESR elevated at 65 mm/hr"
        }
      ],
      previousTreatments: [],
      comorbidities: []
    }
  },
  {
    patient: {
      firstName: "Kevin",
      middleName: "Demo",
      lastName: "Lee",
      dateOfBirth: "1959-08-11",
      gender: "male",
      email: "kevin.demo.lee@email.com",
      phone: "+1-555-1401",
      address: "753 Riverside Drive, Sacramento, CA 95814",
      emergencyContact: {
        name: "Helen Lee",
        relationship: "wife",
        phone: "+1-555-1402"
      },
      insurance: {
        provider: "Kaiser Permanente",
        policyNumber: "KP753951847"
      }
    },
    case: {
      patientName: "Kevin Demo Lee",
      diseaseType: "BLADDER_CANCER",
      description: "64-year-old Asian American male with muscle-invasive urothelial carcinoma, T2, considering neoadjuvant chemotherapy vs immediate cystectomy",
      patientAge: 64,
      patientGender: "male",
      primaryLanguage: "en",
      patientLocation: "California, USA",
      expertiseLevel: "SENIOR",
      urgency: "STANDARD",
      documents: [
        {
          type: "PATHOLOGY_REPORT",
          name: "TURBT Pathology",
          content: "High-grade urothelial carcinoma, muscle-invasive (T2), CIS present"
        },
        {
          type: "MEDICAL_IMAGING",
          name: "CT Urography",
          content: "Irregular bladder mass 3.5cm, no hydronephrosis, normal upper tracts"
        },
        {
          type: "LABORATORY_RESULTS",
          name: "Renal Function",
          content: "Creatinine: 1.0 mg/dL, eGFR: 75 mL/min, suitable for cisplatin"
        }
      ],
      previousTreatments: ["TURBT"],
      comorbidities: ["smoking history"]
    }
  },
  {
    patient: {
      firstName: "Michelle",
      middleName: "Demo",
      lastName: "Thompson",
      dateOfBirth: "1970-04-02",
      gender: "female",
      email: "michelle.demo.thompson@email.com",
      phone: "+1-555-1501",
      address: "486 Forest Lane, Charlotte, NC 28201",
      emergencyContact: {
        name: "Mark Thompson",
        relationship: "husband",
        phone: "+1-555-1502"
      },
      insurance: {
        provider: "Aetna Better Health",
        policyNumber: "ABH486159753"
      }
    },
    case: {
      patientName: "Michelle Demo Thompson",
      diseaseType: "NON_HODGKIN_LYMPHOMA",
      description: "53-year-old Caucasian female with diffuse large B-cell lymphoma, stage IIIA, seeking second opinion on R-CHOP vs alternative regimens",
      patientAge: 53,
      patientGender: "female",
      primaryLanguage: "en",
      patientLocation: "North Carolina, USA",
      expertiseLevel: "SENIOR",
      urgency: "STANDARD",
      documents: [
        {
          type: "PATHOLOGY_REPORT",
          name: "Lymph Node Biopsy",
          content: "Diffuse large B-cell lymphoma, germinal center B-cell type, CD20+, BCL-6+"
        },
        {
          type: "GENOMIC_TESTING",
          name: "FISH Analysis",
          content: "MYC rearrangement negative, BCL-2 rearrangement negative, not double hit"
        },
        {
          type: "LABORATORY_RESULTS",
          name: "LDH and Beta-2 Microglobulin",
          content: "LDH: 650 U/L (elevated), β2-microglobulin: 3.2 mg/L"
        }
      ],
      previousTreatments: [],
      comorbidities: ["hypothyroidism"]
    }
  },
  {
    patient: {
      firstName: "David",
      middleName: "Demo",
      lastName: "Miller",
      dateOfBirth: "1946-09-15",
      gender: "male",
      email: "david.demo.miller@email.com",
      phone: "+1-555-1601",
      address: "357 Sunset Boulevard, Las Vegas, NV 89101",
      emergencyContact: {
        name: "Barbara Miller",
        relationship: "wife",
        phone: "+1-555-1602"
      },
      insurance: {
        provider: "Medicare Advantage",
        policyNumber: "MA357864291"
      }
    },
    case: {
      patientName: "David Demo Miller",
      diseaseType: "GASTRIC_CANCER",
      description: "77-year-old Caucasian male with gastric adenocarcinoma, T3N1, considering perioperative chemotherapy vs surgery alone",
      patientAge: 77,
      patientGender: "male",
      primaryLanguage: "en",
      patientLocation: "Nevada, USA",
      expertiseLevel: "EXPERT",
      urgency: "STANDARD",
      documents: [
        {
          type: "PATHOLOGY_REPORT",
          name: "Gastric Biopsy",
          content: "Adenocarcinoma, intestinal type, moderately differentiated, H. pylori negative"
        },
        {
          type: "MEDICAL_IMAGING",
          name: "CT Chest/Abdomen",
          content: "Gastric antral mass 4.8cm, perigastric lymphadenopathy, no distant metastases"
        },
        {
          type: "GENOMIC_TESTING",
          name: "HER2 Testing",
          content: "HER2 negative by IHC and FISH, microsatellite stable"
        }
      ],
      previousTreatments: [],
      comorbidities: ["atrial fibrillation", "chronic kidney disease stage 3"]
    }
  },
  {
    patient: {
      firstName: "Laura",
      middleName: "Demo",
      lastName: "Rodriguez",
      dateOfBirth: "1987-11-28",
      gender: "female",
      email: "laura.demo.rodriguez@email.com",
      phone: "+1-555-1701",
      address: "642 Harbor View Street, San Francisco, CA 94102",
      emergencyContact: {
        name: "Carlos Rodriguez",
        relationship: "husband",
        phone: "+1-555-1702"
      },
      insurance: {
        provider: "Blue Shield of California",
        policyNumber: "BSC642918375"
      }
    },
    case: {
      patientName: "Laura Demo Rodriguez",
      diseaseType: "SARCOMA",
      description: "36-year-old Hispanic female with synovial sarcoma of left thigh, 6cm, high-grade, considering neoadjuvant chemotherapy",
      patientAge: 36,
      patientGender: "female",
      primaryLanguage: "es",
      patientLocation: "California, USA",
      expertiseLevel: "EXPERT",
      urgency: "URGENT",
      documents: [
        {
          type: "PATHOLOGY_REPORT",
          name: "Soft Tissue Biopsy",
          content: "Synovial sarcoma, high-grade, 6cm, deep to fascia, positive margins on biopsy"
        },
        {
          type: "GENOMIC_TESTING",
          name: "Molecular Testing",
          content: "SYT-SSX1 fusion confirmed, consistent with synovial sarcoma"
        },
        {
          type: "MEDICAL_IMAGING",
          name: "MRI Left Thigh",
          content: "6.2cm heterogeneous mass deep to vastus lateralis, no neurovascular involvement"
        }
      ],
      previousTreatments: ["core needle biopsy"],
      comorbidities: []
    }
  },
  {
    patient: {
      firstName: "William",
      middleName: "Demo",
      lastName: "Jones",
      dateOfBirth: "1954-06-07",
      gender: "male",
      email: "william.demo.jones@email.com",
      phone: "+1-555-1801",
      address: "918 Pine Forest Road, Houston, TX 77001",
      emergencyContact: {
        name: "Dorothy Jones",
        relationship: "wife",
        phone: "+1-555-1802"
      },
      insurance: {
        provider: "Molina Healthcare",
        policyNumber: "MOL918375642"
      }
    },
    case: {
      patientName: "William Demo Jones",
      diseaseType: "HEAD_NECK_CANCER",
      description: "69-year-old African American male with squamous cell carcinoma of larynx, T3N0, HPV negative, considering treatment modalities",
      patientAge: 69,
      patientGender: "male",
      primaryLanguage: "en",
      patientLocation: "Texas, USA",
      expertiseLevel: "EXPERT",
      urgency: "STANDARD",
      documents: [
        {
          type: "PATHOLOGY_REPORT",
          name: "Laryngeal Biopsy",
          content: "Squamous cell carcinoma, moderately differentiated, HPV negative, p16 negative"
        },
        {
          type: "MEDICAL_IMAGING",
          name: "CT Neck with Contrast",
          content: "Left vocal cord mass 2.8cm, no cartilage invasion, no suspicious lymph nodes"
        },
        {
          type: "LABORATORY_RESULTS",
          name: "Pulmonary Function",
          content: "FEV1: 65% predicted, suitable for potential surgery consideration"
        }
      ],
      previousTreatments: [],
      comorbidities: ["COPD", "smoking history 40 pack-years"]
    }
  },
  {
    patient: {
      firstName: "Nancy",
      middleName: "Demo",
      lastName: "White",
      dateOfBirth: "1965-01-30",
      gender: "female",
      email: "nancy.demo.white@email.com",
      phone: "+1-555-1901",
      address: "275 Meadowbrook Drive, Indianapolis, IN 46201",
      emergencyContact: {
        name: "Steven White",
        relationship: "husband",
        phone: "+1-555-1902"
      },
      insurance: {
        provider: "Anthem Blue Cross Blue Shield",
        policyNumber: "ABCBS275849167"
      }
    },
    case: {
      patientName: "Nancy Demo White",
      diseaseType: "MULTIPLE_MYELOMA",
      description: "58-year-old Caucasian female with newly diagnosed multiple myeloma, IgG lambda, ISS stage II, considering initial therapy options",
      patientAge: 58,
      patientGender: "female",
      primaryLanguage: "en",
      patientLocation: "Indiana, USA",
      expertiseLevel: "EXPERT",
      urgency: "STANDARD",
      documents: [
        {
          type: "PATHOLOGY_REPORT",
          name: "Bone Marrow Biopsy",
          content: "40% plasma cells, IgG lambda monoclonal protein, deletion 17p negative"
        },
        {
          type: "LABORATORY_RESULTS",
          name: "Myeloma Workup",
          content: "M-protein: 3.2 g/dL, Free light chains: λ/κ ratio 15.2, β2-microglobulin: 4.1 mg/L"
        },
        {
          type: "MEDICAL_IMAGING",
          name: "Skeletal Survey",
          content: "Lytic lesions in spine and pelvis, no pathologic fractures"
        }
      ],
      previousTreatments: [],
      comorbidities: ["osteoporosis", "chronic kidney disease stage 2"]
    }
  }
];

// Function to create dummy document files
function createDummyDocuments() {
  const documentsDir = path.join(__dirname, 'patient-documents');
  
  if (!fs.existsSync(documentsDir)) {
    fs.mkdirSync(documentsDir, { recursive: true });
  }

  console.log('📄 Creating dummy document files...\n');

  patientCases.forEach((caseData, index) => {
    const patientDir = path.join(documentsDir, `patient-${index + 1}-${caseData.patient.lastName.toLowerCase()}`);
    
    if (!fs.existsSync(patientDir)) {
      fs.mkdirSync(patientDir, { recursive: true });
    }

    // Create document files
    caseData.case.documents.forEach((doc, docIndex) => {
      const fileName = `${doc.type.toLowerCase()}_${docIndex + 1}.txt`;
      const filePath = path.join(patientDir, fileName);
      
      const documentContent = `
PATIENT: ${caseData.case.patientName}
DOCUMENT TYPE: ${doc.name}
DATE: ${new Date().toISOString().split('T')[0]}

${doc.content}

Generated for demo purposes - Second Opinion Platform
      `.trim();
      
      fs.writeFileSync(filePath, documentContent);
    });

    // Create dummy image files (placeholder)
    ['ct_scan.jpg', 'mri_image.jpg', 'pathology_slide.jpg'].forEach(imageName => {
      const imagePath = path.join(patientDir, imageName);
      const imageContent = `[DUMMY IMAGE FILE - ${imageName} for ${caseData.case.patientName}]`;
      fs.writeFileSync(imagePath, imageContent);
    });

    console.log(`✅ Created documents for Patient ${index + 1}: ${caseData.case.patientName}`);
  });
}

async function loadPatientsAndCases() {
  console.log('🏥 Loading 20 Diverse Patient Cases\n');

  // Create document files first
  createDummyDocuments();
  
  let customerSuccessCount = 0;
  let caseSuccessCount = 0;
  
  for (let i = 0; i < patientCases.length; i++) {
    const { patient, case: caseData } = patientCases[i];
    
    try {
      console.log(`\n📋 Processing Case ${i + 1}/20: ${patient.firstName} ${patient.middleName} ${patient.lastName}`);
      console.log(`   🎯 Cancer Type: ${caseData.diseaseType}`);
      console.log(`   👤 Age: ${caseData.patientAge}, Gender: ${caseData.patientGender}`);
      console.log(`   🌍 Location: ${caseData.patientLocation}`);
      console.log(`   ⚡ Urgency: ${caseData.urgency}, Expertise: ${caseData.expertiseLevel}`);

      // Step 1: Create customer in customer portal service
      const customerResponse = await fetch('http://localhost:4001/api/v1/customers/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          firstName: patient.firstName,
          middleName: patient.middleName,
          lastName: patient.lastName,
          email: patient.email,
          phone: patient.phone,
          dateOfBirth: patient.dateOfBirth,
          gender: patient.gender,
          address: patient.address,
          emergencyContact: patient.emergencyContact,
          insurance: patient.insurance
        })
      });
      
      const customerResult = await customerResponse.json();
      
      if (customerResult.success) {
        console.log(`   ✅ Customer created: ${customerResult.data.customerNumber}`);
        customerSuccessCount++;
        
        // Step 2: Create case in case management service
        const caseResponse = await fetch('http://localhost:4012/api/v1/cases', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            customerNumber: customerResult.data.customerNumber,
            patientName: caseData.patientName,
            diseaseType: caseData.diseaseType,
            description: caseData.description,
            patientAge: caseData.patientAge,
            patientGender: caseData.patientGender,
            primaryLanguage: caseData.primaryLanguage,
            patientLocation: caseData.patientLocation,
            expertiseLevel: caseData.expertiseLevel,
            urgency: caseData.urgency,
            documents: caseData.documents,
            previousTreatments: caseData.previousTreatments,
            comorbidities: caseData.comorbidities
          })
        });
        
        const caseResult = await caseResponse.json();
        
        if (caseResult.success) {
          console.log(`   ✅ Case created: ${caseResult.data.case.caseNumber}`);
          console.log(`   📊 Complexity: ${caseResult.data.profile.estimatedComplexity} (Score: ${caseResult.data.profile.complexityScore})`);
          caseSuccessCount++;
        } else {
          console.log(`   ❌ Case creation failed: ${caseResult.error}`);
        }
        
      } else {
        console.log(`   ❌ Customer creation failed: ${customerResult.error}`);
      }
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 200));
      
    } catch (error) {
      console.error(`   ❌ Error processing ${patient.firstName}: ${error.message}`);
    }
  }
  
  console.log(`\n📊 Loading Complete:`);
  console.log(`✅ Customers successfully created: ${customerSuccessCount}/20`);
  console.log(`✅ Cases successfully created: ${caseSuccessCount}/20`);
  console.log(`📄 Document files created in: ./patient-documents/`);
  
  if (caseSuccessCount > 0) {
    console.log(`\n🎉 SUCCESS: ${caseSuccessCount} patient cases loaded with comprehensive medical documentation!`);
    console.log(`\n📋 Case Types Loaded:`);
    
    const caseTypes = {};
    patientCases.slice(0, caseSuccessCount).forEach(p => {
      caseTypes[p.case.diseaseType] = (caseTypes[p.case.diseaseType] || 0) + 1;
    });
    
    Object.entries(caseTypes).forEach(([type, count]) => {
      console.log(`   ${type}: ${count} case${count > 1 ? 's' : ''}`);
    });
  }
}

// Run the loading process
loadPatientsAndCases().catch(console.error);