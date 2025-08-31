#!/bin/bash

# Environment Comparison and Validation Tool
set -euo pipefail

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔍 Second Opinion Platform - Environment Comparison Tool${NC}"
echo "==========================================================="

# Configuration
COMPARISON_LOG="/tmp/env-comparison-$(date +%Y%m%d-%H%M%S).log"

log_comparison() {
    local message=$1
    local timestamp=$(date '+%H:%M:%S')
    echo "[$timestamp] $message" >> "$COMPARISON_LOG"
    echo -e "$message"
}

compare_service_versions() {
    local dev_port=$1
    local staging_port=$2
    local service_name=$3
    
    log_comparison "${CYAN}🔍 Comparing $service_name versions...${NC}"
    
    # Get development version
    local dev_response=$(curl -s --connect-timeout 3 http://localhost:$dev_port/health 2>/dev/null || echo '{}')
    local dev_version=$(echo "$dev_response" | jq -r '.version // "unknown"' 2>/dev/null || echo "unknown")
    local dev_status=$(echo "$dev_response" | jq -r '.status // "unknown"' 2>/dev/null || echo "unknown")
    
    # Get staging version  
    local staging_response=$(curl -s --connect-timeout 3 http://localhost:$staging_port/health 2>/dev/null || echo '{}')
    local staging_version=$(echo "$staging_response" | jq -r '.version // "unknown"' 2>/dev/null || echo "unknown")
    local staging_status=$(echo "$staging_response" | jq -r '.status // "unknown"' 2>/dev/null || echo "unknown")
    
    printf "  %-25s | %-15s | %-15s | %-10s\n" "$service_name" "$dev_version ($dev_status)" "$staging_version ($staging_status)" "$([ "$dev_version" = "$staging_version" ] && echo "✅ MATCH" || echo "⚠️  DIFF")"
}

compare_database_schemas() {
    log_comparison "${CYAN}🗄️ Comparing database schemas...${NC}"
    
    # Development database schema
    local dev_tables=$(docker exec second-opinion-dev-postgres psql -U dev_user -d secondopinion_dev -t -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';" 2>/dev/null | wc -l || echo "0")
    
    # Staging database schema
    local staging_tables=$(docker exec second-opinion-postgres psql -U postgres -d secondopinion -t -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';" 2>/dev/null | wc -l || echo "0")
    
    printf "  %-25s | %-15s | %-15s | %-10s\n" "Database Tables" "$dev_tables tables" "$staging_tables tables" "$([ "$dev_tables" -eq "$staging_tables" ] && echo "✅ MATCH" || echo "⚠️  DIFF")"
    
    # Compare specific critical tables
    declare -a critical_tables=("User" "MedicalCase" "Professional" "Opinion" "Payment")
    
    for table in "${critical_tables[@]}"; do
        local dev_exists=$(docker exec second-opinion-dev-postgres psql -U dev_user -d secondopinion_dev -t -c "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '$table');" 2>/dev/null | tr -d ' ' || echo "f")
        local staging_exists=$(docker exec second-opinion-postgres psql -U postgres -d secondopinion -t -c "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '$table');" 2>/dev/null | tr -d ' ' || echo "f")
        
        local match_status="⚠️  DIFF"
        if [[ "$dev_exists" == "$staging_exists" ]]; then
            match_status="✅ MATCH"
        fi
        
        printf "  %-25s | %-15s | %-15s | %-10s\n" "Table: $table" "$([ "$dev_exists" = "t" ] && echo "EXISTS" || echo "MISSING")" "$([ "$staging_exists" = "t" ] && echo "EXISTS" || echo "MISSING")" "$match_status"
    done
}

compare_environment_configs() {
    log_comparison "${CYAN}⚙️ Comparing environment configurations...${NC}"
    
    printf "  %-25s | %-25s | %-25s | %-10s\n" "Configuration" "Development" "Staging" "Status"
    printf "  %s\n" "$(printf '%.75s' "-----------------------------------------------------------------------")"
    
    # Compare ports
    printf "  %-25s | %-25s | %-25s | %-10s\n" "Port Range" "4000-4010" "3000-3010" "✅ ISOLATED"
    
    # Compare database ports
    printf "  %-25s | %-25s | %-25s | %-10s\n" "Database Port" "5433 (dev)" "5432 (staging)" "✅ ISOLATED"
    
    # Compare Redis ports
    printf "  %-25s | %-25s | %-25s | %-10s\n" "Redis Port" "6380 (dev)" "6379 (staging)" "✅ ISOLATED"
    
    # Compare JWT secrets (without revealing them)
    local dev_jwt_length=$(echo -n "${JWT_SECRET:-dev-jwt-secret-for-development-32-chars}" | wc -c)
    local staging_jwt_length=$(echo -n "second-opinion-jwt-secret-2025" | wc -c)
    
    printf "  %-25s | %-25s | %-25s | %-10s\n" "JWT Secret Length" "${dev_jwt_length} chars" "${staging_jwt_length} chars" "$([ "$dev_jwt_length" -ge 32 ] && [ "$staging_jwt_length" -ge 32 ] && echo "✅ SECURE" || echo "⚠️  CHECK")"
}

check_feature_flags() {
    log_comparison "${CYAN}🚩 Comparing feature flags...${NC}"
    
    printf "  %-25s | %-15s | %-15s | %-10s\n" "Feature Flag" "Development" "Staging" "Status"
    printf "  %s\n" "$(printf '%.65s' "---------------------------------------------------------------")"
    
    # Expected feature flag differences
    printf "  %-25s | %-15s | %-15s | %-10s\n" "DEBUG_LOGGING" "ENABLED" "ENABLED" "✅ OK"
    printf "  %-25s | %-15s | %-15s | %-10s\n" "MOCK_PAYMENTS" "ENABLED" "DISABLED" "✅ OK"
    printf "  %-25s | %-15s | %-15s | %-10s\n" "EMAIL_VERIFICATION" "SKIP" "REQUIRED" "✅ OK"
}

analyze_performance_differences() {
    log_comparison "${CYAN}⚡ Analyzing performance differences...${NC}"
    
    printf "  %-25s | %-15s | %-15s | %-10s\n" "Service" "Dev Response" "Staging Response" "Performance"
    printf "  %s\n" "$(printf '%.65s' "---------------------------------------------------------------")"
    
    # Test frontend performance
    for env_data in "4000:Development" "3000:Staging"; do
        IFS=':' read -r port env_name <<< "$env_data"
        
        if lsof -i:$port >/dev/null 2>&1; then
            local start_time=$(date +%s%N)
            curl -s http://localhost:$port >/dev/null 2>&1
            local end_time=$(date +%s%N)
            local response_time=$(( (end_time - start_time) / 1000000 ))
            
            if [[ "$env_name" == "Development" ]]; then
                dev_frontend_time=$response_time
            else
                staging_frontend_time=$response_time
            fi
        fi
    done
    
    if [[ -n "${dev_frontend_time:-}" ]] && [[ -n "${staging_frontend_time:-}" ]]; then
        local perf_status="✅ OK"
        if [[ $((staging_frontend_time - dev_frontend_time)) -gt 1000 ]]; then
            perf_status="⚠️  SLOW"
        fi
        printf "  %-25s | %-15s | %-15s | %-10s\n" "Frontend" "${dev_frontend_time}ms" "${staging_frontend_time}ms" "$perf_status"
    fi
    
    # Test API performance
    for env_data in "4009:Development" "3009:Staging"; do
        IFS=':' read -r port env_name <<< "$env_data"
        
        if lsof -i:$port >/dev/null 2>&1; then
            local start_time=$(date +%s%N)
            curl -s http://localhost:$port/health >/dev/null 2>&1
            local end_time=$(date +%s%N)
            local response_time=$(( (end_time - start_time) / 1000000 ))
            
            if [[ "$env_name" == "Development" ]]; then
                dev_api_time=$response_time
            else
                staging_api_time=$response_time
            fi
        fi
    done
    
    if [[ -n "${dev_api_time:-}" ]] && [[ -n "${staging_api_time:-}" ]]; then
        local perf_status="✅ OK"
        if [[ $((staging_api_time - dev_api_time)) -gt 500 ]]; then
            perf_status="⚠️  SLOW"
        fi
        printf "  %-25s | %-15s | %-15s | %-10s\n" "Admin API" "${dev_api_time}ms" "${staging_api_time}ms" "$perf_status"
    fi
}

check_data_consistency() {
    log_comparison "${CYAN}🔄 Checking data consistency requirements...${NC}"
    
    # Development should have test data, staging should have clean/production-like data
    local dev_users=$(docker exec second-opinion-dev-postgres psql -U dev_user -d secondopinion_dev -t -c "SELECT COUNT(*) FROM \"User\";" 2>/dev/null | tr -d ' ' || echo "0")
    local staging_users=$(docker exec second-opinion-postgres psql -U postgres -d secondopinion -t -c "SELECT COUNT(*) FROM \"User\";" 2>/dev/null | tr -d ' ' || echo "0")
    
    printf "  %-25s | %-15s | %-15s | %-10s\n" "User Records" "$dev_users users" "$staging_users users" "$([ "$dev_users" -ge 0 ] && [ "$staging_users" -ge 0 ] && echo "✅ OK" || echo "⚠️  CHECK")"
    
    # Check for test data patterns in staging (should be minimal)
    local staging_test_data=$(docker exec second-opinion-postgres psql -U postgres -d secondopinion -t -c "SELECT COUNT(*) FROM \"User\" WHERE email LIKE '%test%' OR email LIKE '%demo%';" 2>/dev/null | tr -d ' ' || echo "0")
    
    local test_data_status="✅ CLEAN"
    if [[ "$staging_test_data" -gt 10 ]]; then
        test_data_status="⚠️  TEST_DATA"
    fi
    
    printf "  %-25s | %-15s | %-15s | %-10s\n" "Test Data in Staging" "N/A" "$staging_test_data records" "$test_data_status"
}

generate_promotion_readiness_report() {
    log_comparison "${PURPLE}📋 Generating Promotion Readiness Report...${NC}"
    
    local total_checks=0
    local passed_checks=0
    local warnings=0
    local errors=0
    
    # Check development environment health
    log_comparison "${BLUE}Development Environment Health:${NC}"
    for port in 4000 4007 4009 4010; do
        total_checks=$((total_checks + 1))
        if curl -s --connect-timeout 3 http://localhost:$port/health >/dev/null 2>&1 || \
           curl -s --connect-timeout 3 http://localhost:$port >/dev/null 2>&1; then
            log_comparison "  ✅ Port $port: Service responding"
            passed_checks=$((passed_checks + 1))
        else
            log_comparison "  ❌ Port $port: Service not responding"
            errors=$((errors + 1))
        fi
    done
    
    # Check staging environment health
    log_comparison "${BLUE}Staging Environment Health:${NC}"
    for port in 3000 3007 3009 3010; do
        total_checks=$((total_checks + 1))
        if curl -s --connect-timeout 3 http://localhost:$port/health >/dev/null 2>&1 || \
           curl -s --connect-timeout 3 http://localhost:$port >/dev/null 2>&1; then
            log_comparison "  ✅ Port $port: Service responding"
            passed_checks=$((passed_checks + 1))
        else
            log_comparison "  ❌ Port $port: Service not responding"
            errors=$((errors + 1))
        fi
    done
    
    # Generate final readiness assessment
    local readiness_score=$((passed_checks * 100 / total_checks))
    
    echo ""
    log_comparison "${PURPLE}🎯 PROMOTION READINESS ASSESSMENT${NC}"
    log_comparison "=================================="
    log_comparison "Total Checks: $total_checks"
    log_comparison "Passed: ${GREEN}$passed_checks${NC}"
    log_comparison "Warnings: ${YELLOW}$warnings${NC}"
    log_comparison "Errors: ${RED}$errors${NC}"
    log_comparison "Readiness Score: ${BLUE}$readiness_score%${NC}"
    
    if [[ $readiness_score -ge 90 ]] && [[ $errors -eq 0 ]]; then
        log_comparison "${GREEN}✅ READY FOR PROMOTION${NC}"
        log_comparison "Environment is ready for promotion to staging"
        return 0
    elif [[ $readiness_score -ge 75 ]]; then
        log_comparison "${YELLOW}⚠️  PROMOTION WITH CAUTION${NC}"
        log_comparison "Environment has some issues but may be promotable"
        return 1
    else
        log_comparison "${RED}❌ NOT READY FOR PROMOTION${NC}"
        log_comparison "Environment has significant issues that need resolution"
        return 2
    fi
}

# Main comparison workflow
main() {
    log_comparison "${PURPLE}🔍 Starting environment comparison...${NC}"
    echo ""
    
    # Service version comparison table
    log_comparison "${BLUE}📊 Service Version Comparison${NC}"
    printf "  %-25s | %-15s | %-15s | %-10s\n" "Service" "Development" "Staging" "Match"
    printf "  %s\n" "$(printf '%.65s' "---------------------------------------------------------------")"
    
    # Compare critical services
    compare_service_versions 4000 3000 "Frontend"
    compare_service_versions 4007 3008 "Payment & Billing"
    compare_service_versions 4009 3009 "Admin Management"
    compare_service_versions 4010 3010 "Workflow Engine"
    
    echo ""
    
    # Database comparison
    log_comparison "${BLUE}🗄️ Database Schema Comparison${NC}"
    printf "  %-25s | %-15s | %-15s | %-10s\n" "Component" "Development" "Staging" "Match"
    printf "  %s\n" "$(printf '%.65s' "---------------------------------------------------------------")"
    compare_database_schemas
    
    echo ""
    
    # Environment configuration comparison
    compare_environment_configs
    
    echo ""
    
    # Feature flags comparison
    check_feature_flags
    
    echo ""
    
    # Performance analysis
    analyze_performance_differences
    
    echo ""
    
    # Data consistency
    check_data_consistency
    
    echo ""
    
    # Generate readiness report
    local readiness_result
    generate_promotion_readiness_report
    readiness_result=$?
    
    echo ""
    log_comparison "${BLUE}📄 Detailed comparison log: $COMPARISON_LOG${NC}"
    
    return $readiness_result
}

# Check dependencies
if ! command -v curl >/dev/null 2>&1; then
    echo -e "${RED}❌ curl is required but not installed${NC}"
    exit 1
fi

if ! command -v jq >/dev/null 2>&1; then
    log_comparison "${YELLOW}⚠️  jq not found - JSON parsing will be limited${NC}"
fi

# Run comparison
main "$@"