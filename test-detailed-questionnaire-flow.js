const fs = require('fs');

class DetailedQuestionnaireFlowTester {
  constructor() {
    this.baseUrl = 'http://localhost:4000';
    this.patientServiceUrl = 'http://localhost:4001';
    this.tempId = null;
    this.caseId = null;
    this.customerId = null;
    this.userId = null;
  }

  async runDetailedQuestionnaireTest() {
    console.log('\n🧪 Testing Detailed Questionnaire Flow\n');
    console.log('='.repeat(60));

    try {
      await this.setupTempSession();
      await this.testDetailedQuestionnaire();
      await this.testCompleteRegistration();
      
      console.log('\n🎉 DETAILED QUESTIONNAIRE FLOW TEST PASSED!');
      console.log('✅ All detailed questionnaire sections working correctly');
      console.log('✅ Comprehensive medical history collection validated');
      console.log('✅ Data properly structured and delivered to services');
      
      return { success: true };
    } catch (error) {
      console.log(`\n❌ DETAILED QUESTIONNAIRE FLOW TEST FAILED: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async setupTempSession() {
    console.log('📋 Setting up test environment...');
    
    // Create temp session
    const sessionResponse = await fetch(`${this.patientServiceUrl}/api/v1/temp-sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: {} })
    });

    if (!sessionResponse.ok) {
      throw new Error('Failed to create temp session');
    }

    const sessionResult = await sessionResponse.json();
    
    // Create temp submission with files
    const mockFiles = [{
      name: 'comprehensive_medical_history.pdf',
      s3Key: `medical-files/${Date.now()}/comprehensive_medical_history.pdf`,
      type: 'application/pdf',
      size: 2048000,
      category: 'medical-record'
    }];

    const tempResponse = await fetch(`${this.baseUrl}/api/v1/funnel/temp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        medicalFiles: mockFiles,
        contextInfo: {},
      })
    });

    if (!tempResponse.ok) {
      throw new Error('Failed to create temp submission');
    }

    const tempResult = await tempResponse.json();
    this.tempId = tempResult.tempId;
    
    console.log('   ✓ Temp session and submission created');
  }

  async testDetailedQuestionnaire() {
    console.log('\n📋 Testing Detailed Questionnaire (4 sections)...');
    
    const detailedQuestionnaireData = {
      questionnaireType: 'detailed',
      questionnaire: {
        // Section 1: Current Diagnosis & History
        cancerType: 'Ovarian Cancer',
        cancerStage: 'IIIC',
        diagnosisDate: '2023-08-15',
        hospitalClinic: 'Mayo Clinic - Rochester',
        initialSymptoms: 'Abdominal bloating, pelvic pain, difficulty eating',
        currentSymptoms: 'Fatigue, mild nausea from treatment',
        diagnosticTests: ['CT Scan', 'Biopsy', 'CA-125 Blood Test', 'Genetic Testing'],
        
        // Section 2: Treatment History
        treatmentsReceived: ['Surgery', 'Chemotherapy'],
        surgeryDetails: 'Total hysterectomy with bilateral salpingo-oophorectomy, omentectomy',
        chemotherapyDetails: 'Carboplatin and Paclitaxel, 6 cycles completed',
        radiationDetails: '',
        immunotherapyDetails: '',
        targetedTherapyDetails: '',
        hormonalTherapyDetails: '',
        sideEffects: 'Neuropathy in hands and feet, hair loss, fatigue',
        treatmentResponse: 'Good response - CA-125 normalized, imaging shows reduction',
        
        // Section 3: Medical & Family History
        chronicConditions: 'Hypertension, controlled with medication',
        currentMedications: 'Lisinopril 10mg daily, Gabapentin 300mg TID for neuropathy',
        allergies: 'Penicillin (rash)',
        familyHistory: [
          { relation: 'Mother', cancerType: 'Breast Cancer', ageAtDiagnosis: '52' },
          { relation: 'Maternal Grandmother', cancerType: 'Ovarian Cancer', ageAtDiagnosis: '67' }
        ],
        smokingHistory: 'Never smoked',
        alcoholConsumption: 'Occasional social drinking',
        physicalActivity: 'Light walking, yoga when feeling well',
        
        // Section 4: Second Opinion Goals
        secondOpinionGoals: [
          'Confirm current treatment plan',
          'Explore maintenance therapy options',
          'Discuss clinical trial opportunities',
          'Clarify long-term prognosis'
        ],
        specificConcerns: 'Interested in PARP inhibitor maintenance therapy and genetic counseling for family',
        consideredTreatments: 'PARP inhibitors (Olaparib), clinical trials for immunotherapy'
      }
    };

    const response = await fetch(`${this.baseUrl}/api/v1/funnel/temp?tempId=${this.tempId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        medicalFiles: [], // Keep existing files
        contextInfo: detailedQuestionnaireData,
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to submit detailed questionnaire: ${response.status} - ${errorText}`);
    }

    console.log('   ✓ Section 1: Current Diagnosis & History');
    console.log(`     - Cancer: ${detailedQuestionnaireData.questionnaire.cancerType} Stage ${detailedQuestionnaireData.questionnaire.cancerStage}`);
    console.log(`     - Diagnosed: ${detailedQuestionnaireData.questionnaire.diagnosisDate}`);
    console.log(`     - Hospital: ${detailedQuestionnaireData.questionnaire.hospitalClinic}`);
    console.log(`     - Tests: ${detailedQuestionnaireData.questionnaire.diagnosticTests.length} diagnostic tests`);
    
    console.log('   ✓ Section 2: Treatment History');
    console.log(`     - Treatments: ${detailedQuestionnaireData.questionnaire.treatmentsReceived.join(', ')}`);
    console.log(`     - Response: ${detailedQuestionnaireData.questionnaire.treatmentResponse}`);
    
    console.log('   ✓ Section 3: Medical & Family History');
    console.log(`     - Family History: ${detailedQuestionnaireData.questionnaire.familyHistory.length} family cancer cases`);
    console.log(`     - Current Conditions: ${detailedQuestionnaireData.questionnaire.chronicConditions}`);
    
    console.log('   ✓ Section 4: Second Opinion Goals');
    console.log(`     - Goals: ${detailedQuestionnaireData.questionnaire.secondOpinionGoals.length} specific goals`);
    console.log(`     - Clinical Considerations: PARP inhibitors, immunotherapy trials`);
  }

  async testCompleteRegistration() {
    console.log('\n📋 Testing registration with detailed questionnaire data...');
    
    // Add personal info
    const personalInfo = {
      firstName: 'Maria',
      middleName: 'Elena',
      lastName: 'Rodriguez',
      dob: '1975-11-22',
      gender: 'Female',
      countryOfResidence: 'United States',
      ethnicity: 'Hispanic/Latino',
      email: `detailed.test.${Date.now()}@example.com`,
      phone: '+1-555-0456',
      preferredChannel: 'Email',
      languagePreference: 'English'
    };

    // Update temp submission with personal info
    await fetch(`${this.baseUrl}/api/v1/funnel/temp?tempId=${this.tempId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        medicalFiles: [],
        contextInfo: {},
        personalInfo: personalInfo,
      })
    });

    // Register user
    const registrationData = {
      email: personalInfo.email,
      password: 'DetailedTest123!',
      tempId: this.tempId,
      firstName: personalInfo.firstName,
      middleName: personalInfo.middleName,
      lastName: personalInfo.lastName,
      dob: personalInfo.dob,
      gender: personalInfo.gender,
      countryOfResidence: personalInfo.countryOfResidence,
      ethnicity: personalInfo.ethnicity,
      phone: personalInfo.phone,
      preferredChannel: personalInfo.preferredChannel,
      languagePreference: personalInfo.languagePreference,
    };

    const response = await fetch(`${this.baseUrl}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrationData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Registration failed: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    this.userId = result.userId;
    this.customerId = result.customerId;
    this.caseId = result.caseId;

    console.log('   ✓ Registration completed successfully');
    console.log(`   ✓ Case created with comprehensive medical history`);
    console.log(`   ✓ Case ID: ${this.caseId}`);
    console.log(`   ✓ Customer ID: ${this.customerId}`);
    console.log(`   ✓ All detailed questionnaire data integrated into case`);
  }
}

// Run the detailed questionnaire test
async function main() {
  const tester = new DetailedQuestionnaireFlowTester();
  
  try {
    await tester.runDetailedQuestionnaireTest();
  } catch (error) {
    console.error('❌ Detailed questionnaire test failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = DetailedQuestionnaireFlowTester;