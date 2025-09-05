const jwt = require('jsonwebtoken');

const token = jwt.sign(
  { userId: 'admin', role: 'admin' }, 
  'second-opinion-jwt-secret-2025',
  { expiresIn: '24h' }
);

async function verifyCases() {
  console.log('🔍 Verifying Loaded Patient Cases\n');
  
  try {
    // Get all cases
    const casesResponse = await fetch('http://localhost:4012/api/v1/cases', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (casesResponse.ok) {
      const casesResult = await casesResponse.json();
      
      if (casesResult.success && casesResult.data) {
        console.log(`✅ Found ${casesResult.data.length} cases in the system\n`);
        
        casesResult.data.forEach((caseData, index) => {
          console.log(`${index + 1}. ${caseData.patientName} (${caseData.caseNumber})`);
          console.log(`   🎯 Disease: ${caseData.diseaseType}`);
          console.log(`   👤 Age: ${caseData.patientAge}, Gender: ${caseData.patientGender}`);
          console.log(`   📊 Complexity: ${caseData.profile?.estimatedComplexity || 'N/A'} (Score: ${caseData.profile?.complexityScore || 'N/A'})`);
          console.log(`   🌍 Location: ${caseData.patientLocation}`);
          console.log(`   ⚡ Urgency: ${caseData.urgency}`);
          console.log(`   📄 Documents: ${caseData.documents?.length || 0} types`);
          console.log('');
        });
        
        // Group by disease type
        const diseaseTypes = {};
        casesResult.data.forEach(caseData => {
          diseaseTypes[caseData.diseaseType] = (diseaseTypes[caseData.diseaseType] || 0) + 1;
        });
        
        console.log('📊 Cases by Disease Type:');
        Object.entries(diseaseTypes).forEach(([type, count]) => {
          console.log(`   ${type}: ${count} case${count > 1 ? 's' : ''}`);
        });
        
      } else {
        console.log('❌ No cases found or error:', casesResult.error);
      }
    } else {
      console.log(`❌ Failed to fetch cases: ${casesResponse.status}`);
    }
    
  } catch (error) {
    console.error('❌ Error verifying cases:', error.message);
  }
}

verifyCases();