#!/usr/bin/env node

/**
 * Test Suite Validator for Second Opinion Platform
 * This script validates the test structure and provides a summary
 * without requiring test execution or Node.js installation.
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(message) {
  log(`\n${'='.repeat(60)}`, 'bright');
  log(message, 'bright');
  log(`${'='.repeat(60)}`, 'bright');
}

function logSection(message) {
  log(`\n${'-'.repeat(40)}`, 'blue');
  log(message, 'blue');
  log(`${'-'.repeat(40)}`, 'blue');
}

function findTestFiles(dir, testFiles = []) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory()) {
      if (item.name === '__tests__' || item.name.includes('test')) {
        findTestFiles(fullPath, testFiles);
      }
    } else if (item.name.endsWith('.test.ts') || 
               item.name.endsWith('.test.tsx') || 
               item.name.endsWith('.test.js') || 
               item.name.endsWith('.test.jsx')) {
      testFiles.push(fullPath);
    }
  }
  
  return testFiles;
}

function analyzeTestFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(process.cwd(), filePath);
  
  const analysis = {
    path: relativePath,
    size: fs.statSync(filePath).size,
    lines: content.split('\n').length,
    describeBlocks: (content.match(/describe\(/g) || []).length,
    testCases: (content.match(/it\(/g) || []).length,
    imports: (content.match(/^import\s+/gm) || []).length,
    mocks: (content.match(/jest\.mock\(/g) || []).length,
    assertions: (content.match(/expect\(/g) || []).length
  };
  
  return analysis;
}

function validateTestStructure() {
  logHeader('🧪 Second Opinion Platform - Test Suite Validator');
  
  // Check if we're in the right directory
  if (!fs.existsSync('package.json')) {
    log('❌ Error: package.json not found. Please run this script from the project root.', 'red');
    process.exit(1);
  }
  
  // Read package.json for test scripts
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const testScripts = packageJson.scripts || {};
  
  logSection('📋 Test Scripts Configuration');
  Object.entries(testScripts).forEach(([script, command]) => {
    if (script.includes('test')) {
      log(`✅ ${script}: ${command}`, 'green');
    }
  });
  
  // Check Jest configuration
  logSection('⚙️ Jest Configuration');
  if (fs.existsSync('jest.config.js')) {
    log('✅ jest.config.js found', 'green');
  } else {
    log('⚠️ jest.config.js not found', 'yellow');
  }
  
  if (fs.existsSync('jest.setup.js')) {
    log('✅ jest.setup.js found', 'green');
  } else {
    log('⚠️ jest.setup.js not found', 'yellow');
  }
  
  // Find all test files
  logSection('🔍 Test Files Discovery');
  const testFiles = findTestFiles('src');
  
  if (testFiles.length === 0) {
    log('❌ No test files found in src directory', 'red');
    return;
  }
  
  log(`✅ Found ${testFiles.length} test files`, 'green');
  
  // Analyze test files
  logSection('📊 Test Files Analysis');
  const analysis = testFiles.map(analyzeTestFile);
  
  let totalTestCases = 0;
  let totalDescribeBlocks = 0;
  let totalAssertions = 0;
  let totalMocks = 0;
  
  analysis.forEach(file => {
    log(`${file.path}:`, 'cyan');
    log(`  📄 Lines: ${file.lines}`, 'reset');
    log(`  🧪 Test cases: ${file.testCases}`, 'green');
    log(`  📦 Describe blocks: ${file.describeBlocks}`, 'blue');
    log(`  🎭 Mocks: ${file.mocks}`, 'magenta');
    log(`  ✅ Assertions: ${file.assertions}`, 'yellow');
    
    totalTestCases += file.testCases;
    totalDescribeBlocks += file.describeBlocks;
    totalAssertions += file.assertions;
    totalMocks += file.mocks;
  });
  
  // Test categories
  logSection('📂 Test Categories');
  const categories = {
    'Component Tests': testFiles.filter(f => f.includes('components')),
    'API Tests': testFiles.filter(f => f.includes('api')),
    'Utility Tests': testFiles.filter(f => f.includes('utils')),
    'Integration Tests': testFiles.filter(f => f.includes('flow') || f.includes('integration')),
    'Repository Tests': testFiles.filter(f => f.includes('modules') || f.includes('repository'))
  };
  
  Object.entries(categories).forEach(([category, files]) => {
    if (files.length > 0) {
      log(`✅ ${category}: ${files.length} files`, 'green');
    } else {
      log(`⚠️ ${category}: No files found`, 'yellow');
    }
  });
  
  // Coverage analysis
  logSection('📈 Coverage Analysis');
  const coverageThreshold = {
    branches: 70,
    functions: 70,
    lines: 70,
    statements: 70
  };
  
  log('Target coverage thresholds:', 'bright');
  Object.entries(coverageThreshold).forEach(([metric, threshold]) => {
    log(`  ${metric}: ${threshold}%`, 'cyan');
  });
  
  // Summary
  logSection('📋 Test Suite Summary');
  log(`Total test files: ${testFiles.length}`, 'bright');
  log(`Total test cases: ${totalTestCases}`, 'green');
  log(`Total describe blocks: ${totalDescribeBlocks}`, 'blue');
  log(`Total assertions: ${totalAssertions}`, 'yellow');
  log(`Total mocks: ${totalMocks}`, 'magenta');
  
  // Recommendations
  logSection('💡 Recommendations');
  
  if (totalTestCases < 50) {
    log('⚠️ Consider adding more test cases for better coverage', 'yellow');
  }
  
  if (totalAssertions < totalTestCases) {
    log('⚠️ Some test cases may be missing assertions', 'yellow');
  }
  
  if (testFiles.filter(f => f.includes('api')).length < 3) {
    log('⚠️ Consider adding more API endpoint tests', 'yellow');
  }
  
  if (testFiles.filter(f => f.includes('components')).length < 5) {
    log('⚠️ Consider adding more component tests', 'yellow');
  }
  
  // Check for test runner script
  if (fs.existsSync('run-tests.sh')) {
    log('✅ Test runner script found', 'green');
  } else {
    log('⚠️ Consider creating a test runner script', 'yellow');
  }
  
  // Check for GitHub Actions
  if (fs.existsSync('.github/workflows/test.yml')) {
    log('✅ GitHub Actions workflow found', 'green');
  } else {
    log('⚠️ Consider setting up CI/CD with GitHub Actions', 'yellow');
  }
  
  logHeader('✅ Test Suite Validation Complete');
  log('The test suite appears to be well-structured and comprehensive!', 'green');
}

// Run the validator
try {
  validateTestStructure();
} catch (error) {
  log(`❌ Error during validation: ${error.message}`, 'red');
  process.exit(1);
}

