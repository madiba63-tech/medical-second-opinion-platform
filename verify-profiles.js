const jwt = require('jsonwebtoken');

// Generate JWT token
const token = jwt.sign(
  { userId: 'admin', role: 'admin' }, 
  'second-opinion-jwt-secret-2025',
  { expiresIn: '24h' }
);

async function verifyProfiles() {
  console.log('🔍 Verifying Loaded Professional Profiles\n');
  
  try {
    const response = await fetch('http://localhost:4014/api/v1/professionals/all', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log(`✅ Found ${result.data.length} professionals in the system\n`);
      
      // Group by seniority level
      const bySeniority = {};
      const bySpecialty = {};
      const byLicensing = {};
      const byLanguage = {};
      const byTier = {};
      
      let demoCount = 0;
      
      result.data.forEach((prof, index) => {
        console.log(`${index + 1}. ${prof.firstName || 'Unknown'} ${prof.middleName || ''} ${prof.lastName || 'Unknown'} (${prof.professionalId})`);
        console.log(`   🏥 Specialization: ${prof.specialization?.join(', ') || 'None'}`);
        console.log(`   📅 Experience: ${prof.yearsOfExperience || 0} years`);
        
        // Check if middle name is "Demo"
        if (prof.middleName === 'Demo') {
          demoCount++;
        }
        
        console.log(''); // Empty line for readability
      });
      
      console.log(`📊 Summary:`);
      console.log(`✅ Total professionals: ${result.data.length}`);
      console.log(`🎭 Professionals with "Demo" middle name: ${demoCount}`);
      
      if (demoCount === 20) {
        console.log('\n🎉 SUCCESS: All 20 demo professionals are loaded correctly!');
      } else {
        console.log(`\n⚠️  WARNING: Expected 20 "Demo" professionals, found ${demoCount}`);
      }
      
    } else {
      console.error('❌ Failed to fetch professionals:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Error verifying profiles:', error.message);
  }
}

verifyProfiles();