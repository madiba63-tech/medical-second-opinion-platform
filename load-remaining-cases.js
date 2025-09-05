const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// Generate JWT token
const token = jwt.sign(
  { userId: 'admin', role: 'admin' }, 
  'second-opinion-jwt-secret-2025',
  { expiresIn: '24h' }
);

// Get the patient cases from the original script (starting from case 6 which failed due to rate limiting)
const patientCasesToLoad = [
  {
    // Patient Information
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
    // Case Information
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
  }
];

async function loadRemainingCases() {
  console.log('🏥 Loading Remaining Patient Cases with Rate Limiting Protection\n');
  
  let loadedCount = 0;
  let failedCount = 0;
  const delayBetweenRequests = 15000; // 15 seconds between each case
  
  for (let i = 0; i < patientCasesToLoad.length; i++) {
    const { patient, case: caseData } = patientCasesToLoad[i];
    
    try {
      console.log(`\n📋 Processing Case ${i + 1}/${patientCasesToLoad.length}: ${patient.firstName} ${patient.middleName} ${patient.lastName}`);
      console.log(`   🎯 Cancer Type: ${caseData.diseaseType}`);
      console.log(`   👤 Age: ${caseData.patientAge}, Gender: ${caseData.patientGender}`);
      console.log(`   🌍 Location: ${caseData.patientLocation}`);
      console.log(`   ⚡ Urgency: ${caseData.urgency}, Expertise: ${caseData.expertiseLevel}`);

      // Step 1: Create customer with multiple retry attempts
      let customerResult = null;
      let retryCount = 0;
      const maxRetries = 3;
      
      while (retryCount < maxRetries && !customerResult) {
        try {
          console.log(`   👤 Attempting customer registration (attempt ${retryCount + 1}/${maxRetries})...`);
          
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
          
          if (customerResponse.ok) {
            customerResult = await customerResponse.json();
            if (customerResult.success) {
              console.log(`   ✅ Customer created: ${customerResult.data.customerNumber}`);
              break;
            }
          } else {
            const errorText = await customerResponse.text();
            console.log(`   ⚠️  Customer registration failed: ${customerResponse.status} - ${errorText}`);
            
            if (customerResponse.status === 429) {
              console.log(`   ⏳ Rate limited, waiting ${(retryCount + 1) * 20} seconds before retry...`);
              await new Promise(resolve => setTimeout(resolve, (retryCount + 1) * 20000));
            } else if (errorText.includes('already exists')) {
              console.log(`   ⚠️  Customer already exists, skipping to case creation...`);
              // For existing customers, we need to get their number somehow or skip
              throw new Error('Customer already exists - skipping');
            }
          }
          
        } catch (fetchError) {
          console.log(`   ❌ Customer registration error: ${fetchError.message}`);
        }
        
        retryCount++;
        if (retryCount < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 5000));
        }
      }
      
      if (!customerResult || !customerResult.success) {
        console.log(`   ❌ Failed to create customer after ${maxRetries} attempts`);
        failedCount++;
        continue;
      }

      // Step 2: Create case
      console.log(`   📋 Creating case for customer ${customerResult.data.customerNumber}...`);
      
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
      
      if (caseResponse.ok) {
        const caseResult = await caseResponse.json();
        
        if (caseResult.success) {
          console.log(`   ✅ Case created: ${caseResult.data.case.caseNumber}`);
          console.log(`   📊 Complexity: ${caseResult.data.profile.estimatedComplexity} (Score: ${caseResult.data.profile.complexityScore})`);
          console.log(`   🧬 Profiling: ${caseResult.data.profile.primarySpecialtyRequired}`);
          loadedCount++;
        } else {
          console.log(`   ❌ Case creation failed: ${caseResult.error}`);
          failedCount++;
        }
      } else {
        const errorText = await caseResponse.text();
        console.log(`   ❌ Case creation request failed: ${caseResponse.status} - ${errorText}`);
        failedCount++;
      }
      
    } catch (error) {
      console.error(`   ❌ Error processing ${patient.firstName} ${patient.lastName}: ${error.message}`);
      failedCount++;
    }
    
    // Wait between cases to avoid rate limiting
    if (i < patientCasesToLoad.length - 1) {
      console.log(`   ⏳ Waiting ${delayBetweenRequests/1000} seconds before next case to avoid rate limiting...`);
      await new Promise(resolve => setTimeout(resolve, delayBetweenRequests));
    }
  }
  
  console.log(`\n📊 Loading Complete:`);
  console.log(`✅ Cases successfully loaded: ${loadedCount}/${patientCasesToLoad.length}`);
  console.log(`❌ Cases failed to load: ${failedCount}/${patientCasesToLoad.length}`);
  
  if (loadedCount > 0) {
    console.log(`\n🎉 SUCCESS: ${loadedCount} additional patient cases loaded successfully!`);
    console.log(`\n🔍 Run verification script to see all loaded cases:`);
    console.log(`node verify-cases.js`);
  }
}

// Run the loading process
loadRemainingCases().catch(console.error);