const jwt = require('jsonwebtoken');

// Generate JWT token
const token = jwt.sign(
  { userId: 'test-user', role: 'admin' }, 
  'second-opinion-jwt-secret-2025',
  { expiresIn: '24h' }
);

// Test case creation
const testCase = {
  patientName: "John Doe",
  diseaseType: "LUNG_CANCER",
  description: "68-year-old male with stage IV non-small cell lung carcinoma, EGFR-positive, requiring second opinion on targeted therapy options",
  patientAge: 68,
  patientGender: "male",
  primaryLanguage: "en",
  patientLocation: "Germany",
  expertiseLevel: "EXPERT",
  urgency: "URGENT",
  documents: [
    {
      type: "PATHOLOGY_REPORT",
      name: "Lung Biopsy Report"
    },
    {
      type: "MEDICAL_IMAGING", 
      name: "PET-CT Scan"
    },
    {
      type: "GENOMIC_TESTING",
      name: "EGFR Mutation Analysis"
    }
  ],
  previousTreatments: ["chemotherapy", "radiation"],
  comorbidities: ["diabetes", "hypertension"]
};

async function testSystem() {
  console.log('🧪 Testing Professional Profiling and Matching System\n');

  try {
    // Test 1: Create a case with automatic profiling
    console.log('📋 Test 1: Creating case with automatic profiling...');
    const caseResponse = await fetch('http://localhost:4012/api/v1/cases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(testCase)
    });

    const caseResult = await caseResponse.json();
    console.log('Case Creation Result:', JSON.stringify(caseResult, null, 2));

    if (caseResult.success) {
      const caseId = caseResult.data.id;
      
      // Test 2: Get case profile (already returned in creation result)
      console.log('\n🧬 Test 2: Retrieved case profile from creation result');
      const profileResult = {
        success: true,
        data: caseResult.data.profile
      };

      // Test 3: Test professional matching
      console.log('\n🎯 Test 3: Finding matching professionals...');
      const matchingResponse = await fetch(`http://localhost:4014/api/v1/matching/find-professionals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          caseProfile: profileResult.data,
          maxResults: 5
        })
      });

      const matchingResult = await matchingResponse.json();
      console.log('Matching Results:', JSON.stringify(matchingResult, null, 2));

      // Test 4: Check professional profiles  
      console.log('\n👤 Test 4: Checking professional profiles...');
      const professionalsResponse = await fetch('http://localhost:4014/api/v1/professionals/list', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const professionalsResult = await professionalsResponse.json();
      console.log('Professional Profiles:', JSON.stringify(professionalsResult, null, 2));
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run tests
testSystem();