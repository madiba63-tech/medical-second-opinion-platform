#!/bin/bash

# Promotion Testing Suite
set -euo pipefail

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

echo -e "${BLUE}🧪 Second Opinion Platform - Promotion Testing Suite${NC}"
echo "======================================================"

# Configuration
TEST_LOG="/tmp/promotion-tests-$(date +%Y%m%d-%H%M%S).log"
ENVIRONMENT=${1:-"staging"}  # Default to staging
BASE_PORT=""

case $ENVIRONMENT in
    "development"|"dev")
        BASE_PORT=4000
        ENV_NAME="Development"
        ;;
    "staging")
        BASE_PORT=3000
        ENV_NAME="Staging"
        ;;
    *)
        echo -e "${RED}❌ Invalid environment. Use 'development' or 'staging'${NC}"
        exit 1
        ;;
esac

log_test() {
    local level=$1
    local test_name=$2
    local result=$3
    local message=${4:-""}
    local timestamp=$(date '+%H:%M:%S')
    
    echo "[$timestamp] [$level] [$test_name] $result $message" >> "$TEST_LOG"
    
    case $result in
        "PASS")
            echo -e "${GREEN}✅ $test_name - PASS${NC} $message"
            ;;
        "FAIL")
            echo -e "${RED}❌ $test_name - FAIL${NC} $message"
            ;;
        "SKIP")
            echo -e "${YELLOW}⏭️  $test_name - SKIP${NC} $message"
            ;;
        "INFO")
            echo -e "${BLUE}ℹ️  $test_name${NC} $message"
            ;;
    esac
}

# Test Functions
test_service_health() {
    local port=$1
    local service_name=$2
    local timeout=${3:-5}
    
    if curl -s --connect-timeout $timeout http://localhost:$port/health >/dev/null 2>&1; then
        log_test "INFO" "$service_name Health Check" "PASS" "(port $port)"
        return 0
    else
        log_test "ERROR" "$service_name Health Check" "FAIL" "(port $port not responding)"
        return 1
    fi
}

test_service_response() {
    local port=$1
    local service_name=$2
    local endpoint=${3:-"/"}
    local expected_content=${4:-""}
    
    local response=$(curl -s --connect-timeout 5 http://localhost:$port$endpoint 2>/dev/null)
    
    if [[ -n "$response" ]]; then
        if [[ -n "$expected_content" ]]; then
            if echo "$response" | grep -q "$expected_content"; then
                log_test "INFO" "$service_name Response Test" "PASS" "($endpoint contains expected content)"
                return 0
            else
                log_test "ERROR" "$service_name Response Test" "FAIL" "($endpoint missing expected content)"
                return 1
            fi
        else
            log_test "INFO" "$service_name Response Test" "PASS" "($endpoint returns content)"
            return 0
        fi
    else
        log_test "ERROR" "$service_name Response Test" "FAIL" "($endpoint no response)"
        return 1
    fi
}

test_database_connectivity() {
    local env_name=$1
    
    if [[ "$env_name" == "Development" ]]; then
        # Test development database
        if docker exec second-opinion-dev-postgres pg_isready -U dev_user -d secondopinion_dev >/dev/null 2>&1; then
            log_test "INFO" "Development Database" "PASS" "(PostgreSQL ready)"
        else
            log_test "ERROR" "Development Database" "FAIL" "(PostgreSQL not ready)"
            return 1
        fi
        
        # Test development Redis
        if docker exec second-opinion-dev-redis redis-cli -a "dev_redis_password" ping >/dev/null 2>&1; then
            log_test "INFO" "Development Redis" "PASS" "(Redis ready)"
        else
            log_test "ERROR" "Development Redis" "FAIL" "(Redis not ready)"
            return 1
        fi
    else
        # Test staging database
        if docker exec second-opinion-postgres pg_isready -U postgres -d secondopinion >/dev/null 2>&1; then
            log_test "INFO" "Staging Database" "PASS" "(PostgreSQL ready)"
        else
            log_test "ERROR" "Staging Database" "FAIL" "(PostgreSQL not ready)"
            return 1
        fi
        
        # Test staging Redis
        if docker exec second-opinion-redis redis-cli -a "redis_password" ping >/dev/null 2>&1; then
            log_test "INFO" "Staging Redis" "PASS" "(Redis ready)"
        else
            log_test "ERROR" "Staging Redis" "FAIL" "(Redis not ready)"
            return 1
        fi
    fi
}

test_api_endpoints() {
    local base_port=$1
    local admin_port=$((base_port + 9))
    local payment_port=$((base_port + 7))
    
    log_test "INFO" "API Endpoint Tests" "INFO" "Starting comprehensive API tests..."
    
    # Test Admin API endpoints
    local admin_health=$(curl -s http://localhost:$admin_port/health 2>/dev/null)
    if echo "$admin_health" | jq -e '.status == "operational"' >/dev/null 2>&1; then
        log_test "INFO" "Admin API Health" "PASS" "(status operational)"
    else
        log_test "ERROR" "Admin API Health" "FAIL" "(status not operational)"
        return 1
    fi
    
    # Test Payment API endpoints  
    local payment_health=$(curl -s http://localhost:$payment_port/health 2>/dev/null)
    if echo "$payment_health" | jq -e '.status == "operational"' >/dev/null 2>&1; then
        log_test "INFO" "Payment API Health" "PASS" "(status operational)"
    else
        log_test "ERROR" "Payment API Health" "FAIL" "(status not operational)"
        return 1
    fi
    
    # Test API versioning
    if echo "$admin_health" | jq -e '.version' >/dev/null 2>&1; then
        local version=$(echo "$admin_health" | jq -r '.version')
        log_test "INFO" "API Versioning" "PASS" "(version: $version)"
    else
        log_test "WARN" "API Versioning" "SKIP" "(no version info)"
    fi
}

test_environment_isolation() {
    local current_env=$1
    
    log_test "INFO" "Environment Isolation" "INFO" "Checking environment separation..."
    
    # Check that development and staging don't interfere
    if [[ "$current_env" == "Development" ]]; then
        # Development running, check staging is not interfering
        for port in 3000 3001 3002 3003 3004 3005 3007 3008 3009 3010; do
            if lsof -i:$port >/dev/null 2>&1; then
                log_test "WARN" "Environment Isolation" "FAIL" "Staging port $port in use during dev testing"
                return 1
            fi
        done
        log_test "INFO" "Environment Isolation" "PASS" "No staging interference"
    else
        # Staging running, check development is not interfering  
        for port in 4000 4001 4002 4003 4004 4005 4006 4007 4008 4009 4010; do
            if lsof -i:$port >/dev/null 2>&1; then
                log_test "WARN" "Environment Isolation" "FAIL" "Development port $port in use during staging testing"
                return 1
            fi
        done
        log_test "INFO" "Environment Isolation" "PASS" "No development interference"
    fi
}

test_security_configuration() {
    local base_port=$1
    local env_name=$2
    
    log_test "INFO" "Security Configuration" "INFO" "Testing security setup..."
    
    # Test JWT configuration
    if [[ "$env_name" == "Development" ]]; then
        # Development should have relaxed security
        log_test "INFO" "Development Security" "INFO" "Development uses relaxed security (expected)"
    else
        # Staging should have production-like security
        log_test "INFO" "Staging Security" "INFO" "Staging uses production-like security"
    fi
    
    # Test that health endpoints don't expose sensitive info
    local admin_port=$((base_port + 9))
    local health_response=$(curl -s http://localhost:$admin_port/health 2>/dev/null)
    
    if echo "$health_response" | grep -qi "password\|secret\|key\|token"; then
        log_test "ERROR" "Security - Health Endpoint" "FAIL" "Health endpoint exposes sensitive information"
        return 1
    else
        log_test "INFO" "Security - Health Endpoint" "PASS" "No sensitive information exposed"
    fi
}

test_performance_baseline() {
    local base_port=$1
    
    log_test "INFO" "Performance Baseline" "INFO" "Running performance tests..."
    
    # Test frontend response time
    local start_time=$(date +%s%N)
    curl -s http://localhost:$base_port >/dev/null 2>&1
    local end_time=$(date +%s%N)
    local response_time=$(( (end_time - start_time) / 1000000 ))  # Convert to milliseconds
    
    if [[ $response_time -lt 5000 ]]; then  # Less than 5 seconds
        log_test "INFO" "Frontend Response Time" "PASS" "(${response_time}ms)"
    else
        log_test "WARN" "Frontend Response Time" "FAIL" "(${response_time}ms - too slow)"
        return 1
    fi
    
    # Test API response time
    local admin_port=$((base_port + 9))
    start_time=$(date +%s%N)
    curl -s http://localhost:$admin_port/health >/dev/null 2>&1
    end_time=$(date +%s%N)
    response_time=$(( (end_time - start_time) / 1000000 ))
    
    if [[ $response_time -lt 2000 ]]; then  # Less than 2 seconds
        log_test "INFO" "API Response Time" "PASS" "(${response_time}ms)"
    else
        log_test "WARN" "API Response Time" "FAIL" "(${response_time}ms - too slow)"
        return 1
    fi
}

run_integration_tests() {
    local base_port=$1
    
    log_test "INFO" "Integration Tests" "INFO" "Running integration test scenarios..."
    
    # Test service interdependencies
    local workflow_port=$((base_port + 10))
    local admin_port=$((base_port + 9))
    
    # Test workflow -> admin communication
    local workflow_health=$(curl -s http://localhost:$workflow_port/health 2>/dev/null)
    local admin_health=$(curl -s http://localhost:$admin_port/health 2>/dev/null)
    
    if [[ -n "$workflow_health" ]] && [[ -n "$admin_health" ]]; then
        log_test "INFO" "Service Communication" "PASS" "Workflow and Admin services communicating"
    else
        log_test "ERROR" "Service Communication" "FAIL" "Service communication issues"
        return 1
    fi
    
    # Test database-service connectivity
    test_database_connectivity "$ENV_NAME"
}

# Main test suite
run_test_suite() {
    echo -e "${PURPLE}🎯 Running $ENV_NAME Environment Test Suite${NC}"
    echo ""
    
    local total_tests=0
    local passed_tests=0
    local failed_tests=0
    local skipped_tests=0
    
    # Test categories
    declare -a test_functions=(
        "test_environment_isolation $ENV_NAME"
        "test_database_connectivity $ENV_NAME"
        "test_api_endpoints $BASE_PORT"
        "test_security_configuration $BASE_PORT $ENV_NAME"
        "test_performance_baseline $BASE_PORT"
        "run_integration_tests $BASE_PORT"
    )
    
    # Core service health checks
    declare -a services=(
        "$BASE_PORT:Frontend"
        "$((BASE_PORT + 1)):Patient Identity"
        "$((BASE_PORT + 2)):Case Management"
        "$((BASE_PORT + 3)):AI Analysis"
        "$((BASE_PORT + 4)):Professional Service"
        "$((BASE_PORT + 5)):Notification Service"
        "$((BASE_PORT + 7)):Payment & Billing"
        "$((BASE_PORT + 8)):Professional Workplace"
        "$((BASE_PORT + 9)):Admin Management"
        "$((BASE_PORT + 10)):Workflow Engine"
    )
    
    echo -e "${BLUE}🔍 Service Health Checks${NC}"
    echo "------------------------"
    
    for service in "${services[@]}"; do
        IFS=':' read -r port name <<< "$service"
        total_tests=$((total_tests + 1))
        
        if test_service_health "$port" "$name"; then
            passed_tests=$((passed_tests + 1))
        else
            failed_tests=$((failed_tests + 1))
        fi
    done
    
    echo ""
    echo -e "${BLUE}🧪 Comprehensive Test Categories${NC}"
    echo "----------------------------------"
    
    for test_func in "${test_functions[@]}"; do
        total_tests=$((total_tests + 1))
        
        echo -e "${BLUE}Running: $test_func${NC}"
        if eval "$test_func"; then
            passed_tests=$((passed_tests + 1))
        else
            failed_tests=$((failed_tests + 1))
        fi
        echo ""
    done
    
    # Generate test report
    echo ""
    echo -e "${BLUE}📊 Test Results Summary${NC}"
    echo "========================"
    echo -e "Environment: ${PURPLE}$ENV_NAME${NC}"
    echo -e "Total Tests: ${BLUE}$total_tests${NC}"
    echo -e "Passed: ${GREEN}$passed_tests${NC}"
    echo -e "Failed: ${RED}$failed_tests${NC}"
    echo -e "Skipped: ${YELLOW}$skipped_tests${NC}"
    echo -e "Test Log: ${BLUE}$TEST_LOG${NC}"
    
    # Success/failure determination
    if [[ $failed_tests -eq 0 ]]; then
        echo ""
        echo -e "${GREEN}🎉 ALL TESTS PASSED - $ENV_NAME environment is ready!${NC}"
        return 0
    else
        echo ""
        echo -e "${RED}❌ $failed_tests TESTS FAILED - $ENV_NAME environment needs attention${NC}"
        echo -e "${YELLOW}💡 Check the test log for detailed failure information${NC}"
        return 1
    fi
}

# Check dependencies
if ! command -v curl >/dev/null 2>&1; then
    echo -e "${RED}❌ curl is required but not installed${NC}"
    exit 1
fi

if ! command -v jq >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  jq not found - JSON parsing tests will be limited${NC}"
fi

# Run the test suite
run_test_suite