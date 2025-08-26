#!/bin/bash

# Test Runner Script for Second Opinion Platform
# This script runs comprehensive tests with different configurations

set -e  # Exit on any error

echo "🧪 Starting Test Suite for Second Opinion Platform"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    print_status "Installing dependencies..."
    npm install
fi

# Create test directories if they don't exist
mkdir -p test-results
mkdir -p coverage-reports

# Function to run tests with specific configuration
run_test_suite() {
    local suite_name=$1
    local test_command=$2
    local output_file=$3
    
    print_status "Running $suite_name..."
    
    if eval "$test_command" > "test-results/$output_file" 2>&1; then
        print_success "$suite_name completed successfully"
        return 0
    else
        print_error "$suite_name failed. Check test-results/$output_file for details."
        return 1
    fi
}

# Track overall success
overall_success=true

# 1. Run linting first
print_status "Running ESLint..."
if npm run lint > test-results/lint-results.txt 2>&1; then
    print_success "Linting passed"
else
    print_warning "Linting found issues. Check test-results/lint-results.txt"
fi

# 2. Run unit tests
print_status "Running unit tests..."
if npm run test > test-results/unit-tests.txt 2>&1; then
    print_success "Unit tests passed"
else
    print_error "Unit tests failed"
    overall_success=false
fi

# 3. Run tests with coverage
print_status "Running tests with coverage..."
if npm run test:coverage > test-results/coverage-tests.txt 2>&1; then
    print_success "Coverage tests passed"
    # Copy coverage report
    if [ -d "coverage" ]; then
        cp -r coverage/* coverage-reports/ 2>/dev/null || true
    fi
else
    print_error "Coverage tests failed"
    overall_success=false
fi

# 4. Run tests in watch mode (non-interactive)
print_status "Running tests in CI mode..."
if npm run test:ci > test-results/ci-tests.txt 2>&1; then
    print_success "CI tests passed"
else
    print_error "CI tests failed"
    overall_success=false
fi

# 5. Run specific test suites
print_status "Running component tests..."
if npx jest src/components/__tests__/ --verbose > test-results/component-tests.txt 2>&1; then
    print_success "Component tests passed"
else
    print_error "Component tests failed"
    overall_success=false
fi

print_status "Running API tests..."
if npx jest src/app/api/__tests__/ --verbose > test-results/api-tests.txt 2>&1; then
    print_success "API tests passed"
else
    print_error "API tests failed"
    overall_success=false
fi

print_status "Running page tests..."
if npx jest src/app/__tests__/ --verbose > test-results/page-tests.txt 2>&1; then
    print_success "Page tests passed"
else
    print_error "Page tests failed"
    overall_success=false
fi

# 6. Generate test summary
print_status "Generating test summary..."
{
    echo "Test Summary Report"
    echo "=================="
    echo "Generated: $(date)"
    echo ""
    echo "Test Results:"
    echo "-------------"
    
    if [ -f "test-results/unit-tests.txt" ]; then
        echo "✅ Unit Tests: $(grep -c 'PASS\|✓' test-results/unit-tests.txt || echo '0') passed"
        echo "❌ Unit Tests: $(grep -c 'FAIL\|✗' test-results/unit-tests.txt || echo '0') failed"
    fi
    
    if [ -f "test-results/coverage-tests.txt" ]; then
        echo "📊 Coverage: Available in coverage-reports/"
    fi
    
    echo ""
    echo "Detailed Results:"
    echo "----------------"
    echo "• Lint results: test-results/lint-results.txt"
    echo "• Unit tests: test-results/unit-tests.txt"
    echo "• Coverage tests: test-results/coverage-tests.txt"
    echo "• CI tests: test-results/ci-tests.txt"
    echo "• Component tests: test-results/component-tests.txt"
    echo "• API tests: test-results/api-tests.txt"
    echo "• Page tests: test-results/page-tests.txt"
    
} > test-results/test-summary.txt

# 7. Display final results
echo ""
echo "=================================================="
echo "🧪 Test Suite Complete"
echo "=================================================="

if [ "$overall_success" = true ]; then
    print_success "All tests completed successfully!"
    echo ""
    echo "📋 Summary:"
    cat test-results/test-summary.txt
    echo ""
    print_success "Test results saved to test-results/ directory"
    print_success "Coverage reports saved to coverage-reports/ directory"
    exit 0
else
    print_error "Some tests failed. Check the test-results/ directory for details."
    echo ""
    echo "📋 Summary:"
    cat test-results/test-summary.txt
    echo ""
    print_error "Please fix the failing tests before proceeding."
    exit 1
fi
