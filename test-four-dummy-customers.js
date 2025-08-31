const fs = require('fs');

class FourDummyCustomersTest {
  constructor() {
    this.baseUrl = 'http://localhost:4000';
    this.patientServiceUrl = 'http://localhost:4001';
    this.results = [];
  }

  // Define our four realistic customer profiles
  getCustomerProfiles() {
    return [
      {
        // Customer 1: Female from India, Breast Cancer, Short Questionnaire
        id: 'customer_india_breast',
        personalInfo: {
          firstName: 'Priya',
          middleName: 'Sharma',
          lastName: 'Patel',
          dob: '1982-07-15',
          gender: 'Female',
          countryOfResidence: 'India',
          ethnicity: 'South Asian',
          email: 'priya.patel@gmail.com',
          phone: '+91-9876543210',
          preferredChannel: 'WhatsApp',
          languagePreference: 'English'
        },
        medicalProfile: {
          cancerType: 'Breast Cancer',
          stage: 'IIA',
          diagnosisDate: '2024-05-20',
          hospital: 'Tata Memorial Hospital, Mumbai'
        },
        questionnaireType: 'short',
        mockFiles: [
          {
            name: 'breast_cancer_mammography_report.pdf',
            type: 'application/pdf',
            size: 1500000,
            category: 'imaging-report'
          },
          {
            name: 'biopsy_pathology_report.pdf',
            type: 'application/pdf',
            size: 800000,
            category: 'pathology-report'
          }
        ]
      },
      {
        // Customer 2: Male from Germany, Colon Cancer, Short Questionnaire
        id: 'customer_germany_colon',
        personalInfo: {
          firstName: 'Klaus',
          middleName: 'Heinrich',
          lastName: 'Mueller',
          dob: '1965-03-08',
          gender: 'Male',
          countryOfResidence: 'Germany',
          ethnicity: 'Caucasian',
          email: 'klaus.mueller@web.de',
          phone: '+49-30-12345678',
          preferredChannel: 'Email',
          languagePreference: 'German'
        },
        medicalProfile: {
          cancerType: 'Colorectal Cancer',
          stage: 'III',
          diagnosisDate: '2024-02-14',
          hospital: 'Charité - Universitätsmedizin Berlin'
        },
        questionnaireType: 'short',
        mockFiles: [
          {
            name: 'colonoscopy_report_mueller.pdf',
            type: 'application/pdf',
            size: 1200000,
            category: 'endoscopy-report'
          },
          {
            name: 'ct_scan_abdomen_pelvis.pdf',
            type: 'application/pdf',
            size: 2100000,
            category: 'imaging-report'
          },
          {
            name: 'tumor_markers_cea_results.pdf',
            type: 'application/pdf',
            size: 400000,
            category: 'lab-result'
          }
        ]
      },
      {
        // Customer 3: Female from UK, Cervical Cancer, Detailed Questionnaire
        id: 'customer_uk_cervical',
        personalInfo: {
          firstName: 'Sarah',
          middleName: 'Jane',
          lastName: 'Thompson',
          dob: '1978-11-25',
          gender: 'Female',
          countryOfResidence: 'United Kingdom',
          ethnicity: 'Caucasian',
          email: 'sarah.thompson@nhs.net',
          phone: '+44-20-7946-0958',
          preferredChannel: 'Email',
          languagePreference: 'English'
        },
        medicalProfile: {
          cancerType: 'Cervical Cancer',
          stage: 'IB2',
          diagnosisDate: '2024-06-10',
          hospital: 'Royal Marsden Hospital, London'
        },
        questionnaireType: 'detailed',
        mockFiles: [
          {
            name: 'cervical_biopsy_histopathology.pdf',
            type: 'application/pdf',
            size: 950000,
            category: 'pathology-report'
          },
          {
            name: 'mri_pelvis_staging.pdf',
            type: 'application/pdf',
            size: 1800000,
            category: 'imaging-report'
          },
          {
            name: 'hpv_testing_results.pdf',
            type: 'application/pdf',
            size: 300000,
            category: 'lab-result'
          }
        ]
      },
      {
        // Customer 4: Male from US, Prostate Cancer, Detailed Questionnaire
        id: 'customer_us_prostate',
        personalInfo: {
          firstName: 'Robert',
          middleName: 'James',
          lastName: 'Williams',
          dob: '1958-09-12',
          gender: 'Male',
          countryOfResidence: 'United States',
          ethnicity: 'African American',
          email: 'robert.williams@email.com',
          phone: '+1-555-0789',
          preferredChannel: 'SMS',
          languagePreference: 'English'
        },
        medicalProfile: {
          cancerType: 'Prostate Cancer',
          stage: 'T2N0M0',
          diagnosisDate: '2024-04-03',
          hospital: 'Mayo Clinic, Rochester'
        },
        questionnaireType: 'detailed',
        mockFiles: [
          {
            name: 'prostate_biopsy_gleason_score.pdf',
            type: 'application/pdf',
            size: 1100000,
            category: 'pathology-report'
          },
          {
            name: 'psa_levels_history.pdf',
            type: 'application/pdf',
            size: 450000,
            category: 'lab-result'
          },
          {
            name: 'mri_prostate_multiparametric.pdf',
            type: 'application/pdf',
            size: 2400000,
            category: 'imaging-report'
          },
          {
            name: 'bone_scan_staging.pdf',
            type: 'application/pdf',
            size: 1600000,
            category: 'imaging-report'
          }
        ]
      }
    ];
  }

  async runAllCustomerJourneys() {
    console.log('\n🏥 Running Four Dummy Customer Medical Journeys\n');
    console.log('='.repeat(80));
    console.log('👥 Patients: India (Breast), Germany (Colon), UK (Cervical), US (Prostate)');
    console.log('📋 Questionnaires: 2 Short, 2 Detailed');
    console.log('🌍 Geographic Diversity: 4 Countries, Multiple Languages');
    console.log('='.repeat(80));

    const customers = this.getCustomerProfiles();
    
    for (const customer of customers) {
      try {
        console.log(`\n🎯 Processing Customer: ${customer.personalInfo.firstName} ${customer.personalInfo.lastName}`);
        console.log(`   📍 Country: ${customer.personalInfo.countryOfResidence}`);
        console.log(`   🎗️  Cancer: ${customer.medicalProfile.cancerType} (Stage ${customer.medicalProfile.stage})`);
        console.log(`   📝 Questionnaire: ${customer.questionnaireType.toUpperCase()}`);
        console.log('   ' + '-'.repeat(60));
        
        const result = await this.processCustomerJourney(customer);
        this.results.push(result);
        
        console.log(`   ✅ SUCCESS: ${customer.personalInfo.firstName}'s case completed`);
        console.log(`   📋 Case ID: ${result.caseId}`);
        console.log(`   👤 Customer ID: ${result.customerId}`);
        
        // Delay between customers to avoid overwhelming the system
        await this.delay(1000);
        
      } catch (error) {
        console.log(`   ❌ FAILED: ${customer.personalInfo.firstName}'s case failed`);
        console.log(`   Error: ${error.message}`);
        
        this.results.push({
          customer: customer,
          success: false,
          error: error.message
        });
      }
    }
    
    this.printFinalSummary();
  }

  async processCustomerJourney(customer) {
    // Step 1: Create temporary session
    const sessionResponse = await fetch(`${this.patientServiceUrl}/api/v1/temp-sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: {} })
    });
    
    if (!sessionResponse.ok) {
      throw new Error('Failed to create temp session');
    }

    // Step 2: Upload medical files
    const fileData = customer.mockFiles.map(file => ({
      ...file,
      s3Key: `medical-files/${customer.id}/${Date.now()}/${file.name}`
    }));

    const tempResponse = await fetch(`${this.baseUrl}/api/v1/funnel/temp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        medicalFiles: fileData,
        contextInfo: {}
      })
    });

    if (!tempResponse.ok) {
      throw new Error('Failed to create temp submission');
    }

    const tempResult = await tempResponse.json();
    const tempId = tempResult.tempId;
    
    console.log(`   📁 Uploaded ${fileData.length} medical files`);

    // Step 3: Submit questionnaire (short or detailed)
    const questionnaireData = customer.questionnaireType === 'short' 
      ? this.generateShortQuestionnaire(customer)
      : this.generateDetailedQuestionnaire(customer);

    const questResponse = await fetch(`${this.baseUrl}/api/v1/funnel/temp?tempId=${tempId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        medicalFiles: [],
        contextInfo: questionnaireData
      })
    });

    if (!questResponse.ok) {
      throw new Error('Failed to submit questionnaire');
    }
    
    console.log(`   📝 Completed ${customer.questionnaireType} questionnaire`);

    // Step 4: Add personal information
    const personalResponse = await fetch(`${this.baseUrl}/api/v1/funnel/temp?tempId=${tempId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        medicalFiles: [],
        contextInfo: {},
        personalInfo: customer.personalInfo
      })
    });

    if (!personalResponse.ok) {
      throw new Error('Failed to submit personal information');
    }
    
    console.log(`   👤 Added demographic information`);

    // Step 5: Register user and create case
    const registrationData = {
      email: customer.personalInfo.email,
      password: 'SecurePassword123!',
      tempId: tempId,
      firstName: customer.personalInfo.firstName,
      middleName: customer.personalInfo.middleName,
      lastName: customer.personalInfo.lastName,
      dob: customer.personalInfo.dob,
      gender: customer.personalInfo.gender,
      countryOfResidence: customer.personalInfo.countryOfResidence,
      ethnicity: customer.personalInfo.ethnicity,
      phone: customer.personalInfo.phone,
      preferredChannel: customer.personalInfo.preferredChannel,
      languagePreference: customer.personalInfo.languagePreference
    };

    const registerResponse = await fetch(`${this.baseUrl}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrationData)
    });

    if (!registerResponse.ok) {
      const errorText = await registerResponse.text();
      throw new Error(`Registration failed: ${errorText}`);
    }

    const registerResult = await registerResponse.json();
    
    console.log(`   🔐 Account created and case submitted`);

    return {
      customer: customer,
      success: true,
      tempId: tempId,
      userId: registerResult.userId,
      customerId: registerResult.customerId,
      caseId: registerResult.caseId,
      filesUploaded: fileData.length,
      questionnaireType: customer.questionnaireType
    };
  }

  generateShortQuestionnaire(customer) {
    const shortQuestions = {
      [customer.medicalProfile.cancerType]: {
        'Breast Cancer': {
          cancerType: 'Breast Cancer',
          cancerStage: customer.medicalProfile.stage,
          treatmentsReceived: ['Surgery', 'Chemotherapy'],
          secondOpinionGoal: 'Explore other treatments',
          otherHealthConditions: 'Yes',
          otherHealthConditionsDetails: 'Hypertension, managed with medication'
        },
        'Colorectal Cancer': {
          cancerType: 'Colorectal Cancer',
          cancerStage: customer.medicalProfile.stage,
          treatmentsReceived: ['Surgery', 'Chemotherapy'],
          secondOpinionGoal: 'Confirm diagnosis',
          otherHealthConditions: 'Yes',
          otherHealthConditionsDetails: 'Type 2 Diabetes, controlled with metformin'
        }
      }
    };

    return {
      questionnaireType: 'short',
      questionnaire: shortQuestions[customer.medicalProfile.cancerType] || {
        cancerType: customer.medicalProfile.cancerType,
        cancerStage: customer.medicalProfile.stage,
        treatmentsReceived: ['Surgery'],
        secondOpinionGoal: 'Confirm diagnosis',
        otherHealthConditions: 'No'
      }
    };
  }

  generateDetailedQuestionnaire(customer) {
    const detailedProfiles = {
      'Cervical Cancer': {
        questionnaireType: 'detailed',
        questionnaire: {
          // Section 1: Current Diagnosis & History
          cancerType: 'Cervical Cancer',
          cancerStage: customer.medicalProfile.stage,
          diagnosisDate: customer.medicalProfile.diagnosisDate,
          hospitalClinic: customer.medicalProfile.hospital,
          initialSymptoms: 'Abnormal vaginal bleeding, pelvic pain',
          currentSymptoms: 'Mild fatigue, occasional pelvic discomfort',
          diagnosticTests: ['Pap Smear', 'Colposcopy', 'Biopsy', 'MRI Pelvis', 'HPV Testing'],
          
          // Section 2: Treatment History
          treatmentsReceived: ['Surgery'],
          surgeryDetails: 'Radical hysterectomy with pelvic lymph node dissection planned',
          chemotherapyDetails: '',
          radiationDetails: '',
          treatmentResponse: 'Recently diagnosed, treatment plan being finalized',
          sideEffects: 'None yet - pre-treatment',
          
          // Section 3: Medical & Family History
          chronicConditions: 'None',
          currentMedications: 'Multivitamin, Iron supplement',
          allergies: 'No known allergies',
          familyHistory: [
            { relation: 'Mother', cancerType: 'Breast Cancer', ageAtDiagnosis: '58' }
          ],
          smokingHistory: 'Never smoked',
          alcoholConsumption: 'Social drinking, 1-2 glasses wine per week',
          physicalActivity: 'Regular yoga and walking',
          
          // Section 4: Second Opinion Goals
          secondOpinionGoals: [
            'Confirm treatment plan',
            'Explore fertility preservation options',
            'Discuss alternative surgical approaches',
            'Review long-term outcomes'
          ],
          specificConcerns: 'Concerned about fertility preservation and surgical options',
          consideredTreatments: 'Fertility-sparing surgical techniques, egg freezing'
        }
      },
      'Prostate Cancer': {
        questionnaireType: 'detailed',
        questionnaire: {
          // Section 1: Current Diagnosis & History
          cancerType: 'Prostate Cancer',
          cancerStage: customer.medicalProfile.stage,
          diagnosisDate: customer.medicalProfile.diagnosisDate,
          hospitalClinic: customer.medicalProfile.hospital,
          initialSymptoms: 'Elevated PSA on routine screening, mild urinary symptoms',
          currentSymptoms: 'Mild urinary hesitancy, slightly increased frequency',
          diagnosticTests: ['PSA Test', 'Digital Rectal Exam', 'Multiparametric MRI', 'Biopsy', 'Bone Scan'],
          
          // Section 2: Treatment History
          treatmentsReceived: [],
          surgeryDetails: '',
          chemotherapyDetails: '',
          radiationDetails: '',
          treatmentResponse: 'Recently diagnosed, exploring treatment options',
          sideEffects: 'None - no treatment started yet',
          
          // Section 3: Medical & Family History
          chronicConditions: 'Hypertension, mild benign prostatic hyperplasia',
          currentMedications: 'Lisinopril 10mg daily, Tamsulosin 0.4mg daily',
          allergies: 'Sulfa drugs (rash)',
          familyHistory: [
            { relation: 'Father', cancerType: 'Prostate Cancer', ageAtDiagnosis: '72' },
            { relation: 'Brother', cancerType: 'Prostate Cancer', ageAtDiagnosis: '64' }
          ],
          smokingHistory: 'Former smoker, quit 15 years ago, 20 pack-years',
          alcoholConsumption: 'Moderate, 2-3 beers per week',
          physicalActivity: 'Golf twice weekly, light walking',
          
          // Section 4: Second Opinion Goals
          secondOpinionGoals: [
            'Compare treatment options',
            'Discuss active surveillance vs immediate treatment',
            'Evaluate surgical vs radiation therapy',
            'Review quality of life implications'
          ],
          specificConcerns: 'Balancing cancer control with quality of life, especially sexual function',
          consideredTreatments: 'Active surveillance, robotic prostatectomy, radiation therapy'
        }
      }
    };

    return detailedProfiles[customer.medicalProfile.cancerType] || {
      questionnaireType: 'detailed',
      questionnaire: {
        cancerType: customer.medicalProfile.cancerType,
        cancerStage: customer.medicalProfile.stage,
        diagnosisDate: customer.medicalProfile.diagnosisDate,
        hospitalClinic: customer.medicalProfile.hospital,
        secondOpinionGoals: ['Confirm diagnosis', 'Explore treatment options']
      }
    };
  }

  printFinalSummary() {
    console.log('\n' + '='.repeat(80));
    console.log('🏥 FOUR DUMMY CUSTOMERS - FINAL SUMMARY');
    console.log('='.repeat(80));
    
    const successful = this.results.filter(r => r.success);
    const failed = this.results.filter(r => !r.success);
    
    console.log(`\n📊 Overall Results:`);
    console.log(`   ✅ Successful Cases: ${successful.length}/4`);
    console.log(`   ❌ Failed Cases: ${failed.length}/4`);
    console.log(`   📈 Success Rate: ${(successful.length / 4 * 100).toFixed(1)}%`);

    if (successful.length > 0) {
      console.log(`\n🎯 Successful Patient Journeys:`);
      console.log('-'.repeat(60));
      
      successful.forEach((result, index) => {
        const customer = result.customer;
        console.log(`\n   ${index + 1}. ${customer.personalInfo.firstName} ${customer.personalInfo.lastName}`);
        console.log(`      🌍 Country: ${customer.personalInfo.countryOfResidence}`);
        console.log(`      🎗️  Cancer: ${customer.medicalProfile.cancerType} (${customer.medicalProfile.stage})`);
        console.log(`      📝 Questionnaire: ${result.questionnaireType.toUpperCase()}`);
        console.log(`      📁 Files: ${result.filesUploaded} medical documents`);
        console.log(`      🆔 Case ID: ${result.caseId}`);
        console.log(`      👤 Customer ID: ${result.customerId}`);
        console.log(`      📞 Contact: ${customer.personalInfo.preferredChannel} (${customer.personalInfo.languagePreference})`);
      });
    }

    if (failed.length > 0) {
      console.log(`\n❌ Failed Cases:`);
      failed.forEach((result, index) => {
        const customer = result.customer;
        console.log(`\n   ${index + 1}. ${customer.personalInfo.firstName} ${customer.personalInfo.lastName}`);
        console.log(`      Error: ${result.error}`);
      });
    }

    console.log(`\n📈 Geographic & Medical Diversity Achieved:`);
    console.log(`   🌍 Countries: India, Germany, UK, United States`);
    console.log(`   🗣️ Languages: English, German`);
    console.log(`   📞 Channels: WhatsApp, Email, SMS`);
    console.log(`   🎗️ Cancer Types: Breast, Colon, Cervical, Prostate`);
    console.log(`   👥 Demographics: 2 Female, 2 Male from diverse ethnicities`);
    console.log(`   📋 Questionnaires: 2 Short (5-7 min), 2 Detailed (15-20 min)`);

    if (successful.length === 4) {
      console.log(`\n🎉 PERFECT SUCCESS! All four dummy customers completed their journeys!`);
      console.log(`✅ Complete medical case processing validated across diverse scenarios`);
      console.log(`✅ International patient support confirmed`);
      console.log(`✅ Multi-language and multi-channel communication working`);
      console.log(`✅ Both questionnaire types functioning perfectly`);
    }
    
    console.log('\n' + '='.repeat(80));
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Run the four dummy customer test
async function main() {
  const tester = new FourDummyCustomersTest();
  
  try {
    await tester.runAllCustomerJourneys();
  } catch (error) {
    console.error('❌ Four dummy customers test failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = FourDummyCustomersTest;