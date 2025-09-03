#!/bin/bash

# Manual Testing Scenarios for Development Environment
# Second Opinion Platform - Development Testing Guide

echo "🧪 SECOND OPINION PLATFORM - MANUAL TESTING SCENARIOS"
echo "====================================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Development environment URLs
FRONTEND="http://localhost:4000"
SERVICES_BASE="http://localhost"

print_scenario() {
    echo -e "${BLUE}📋 SCENARIO: $1${NC}"
    echo "----------------------------------------"
}

print_step() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_test() {
    echo -e "${YELLOW}🧪 TEST: $1${NC}"
}

print_url() {
    echo -e "${BLUE}🌐 URL: $1${NC}"
}

# Check if development environment is running
check_environment() {
    print_scenario "Environment Check"
    
    echo "Checking if development services are running..."
    
    for port in {4001..4010}; do
        if curl -s "http://localhost:$port/health" >/dev/null 2>&1; then
            echo -e "✅ Service on port $port: ${GREEN}Running${NC}"
        else
            echo -e "❌ Service on port $port: ${RED}Not running${NC}"
        fi
    done
    
    echo ""
    echo "💡 If services are not running, start them with:"
    echo "   ./scripts/start-dev.sh"
    echo ""
}

# Manual test scenarios
scenario_1_frontend_access() {
    print_scenario "1. Frontend Application Access"
    print_step "Open your browser and navigate to the main application"
    print_url "$FRONTEND"
    print_test "Verify homepage loads correctly"
    print_test "Check navigation menu is present"
    print_test "Verify responsive design on different screen sizes"
    echo ""
}

scenario_2_user_registration() {
    print_scenario "2. User Registration & Authentication"
    print_step "Navigate to registration page"
    print_url "$FRONTEND/register"
    print_test "Fill out registration form with valid data"
    print_test "Submit form and verify success message"
    print_test "Check email verification (should be skipped in dev)"
    print_step "Test login with created credentials"
    print_url "$FRONTEND/login"
    echo ""
}

scenario_3_case_submission() {
    print_scenario "3. Medical Case Submission"
    print_step "Login as a patient user"
    print_step "Navigate to case submission page"
    print_url "$FRONTEND/submit-case"
    print_test "Fill out medical case form"
    print_test "Upload medical documents (images, PDFs)"
    print_test "Submit case and verify confirmation"
    print_test "Check case appears in user dashboard"
    echo ""
}

scenario_4_professional_registration() {
    print_scenario "4. Professional Registration"
    print_step "Navigate to professional registration"
    print_url "$FRONTEND/professional/apply"
    print_test "Test both AI-assisted and manual paths"
    print_test "Upload CV document (AI path)"
    print_test "Fill out professional credentials manually"
    print_test "Complete specialization and experience forms"
    print_test "Submit application and verify confirmation"
    echo ""
}

scenario_5_admin_dashboard() {
    print_scenario "5. Admin Dashboard"
    print_step "Access admin management interface"
    print_url "$FRONTEND/admin"
    print_test "Login with admin credentials (create if needed)"
    print_test "View pending case reviews"
    print_test "Manage professional applications"
    print_test "Check system analytics and reports"
    echo ""
}

scenario_6_api_testing() {
    print_scenario "6. Direct API Testing"
    print_step "Test individual microservices directly"
    
    echo "Service Health Checks:"
    for port in {4001..4010}; do
        echo "   curl http://localhost:$port/health"
    done
    
    echo ""
    echo "Authentication API Test:"
    echo '   curl -X POST http://localhost:4001/api/v1/auth/register \'
    echo '     -H "Content-Type: application/json" \'
    echo '     -d {"email":"test@dev.com","password":"Test123!","name":"Test User"}'
    
    echo ""
    echo "Case Management API Test:"
    echo '   curl -X POST http://localhost:4002/api/v1/cases \'
    echo '     -H "Content-Type: application/json" \'
    echo '     -H "Authorization: Bearer YOUR_TOKEN" \'
    echo '     -d {"title":"Test Case","description":"Test description"}'
    echo ""
}

scenario_7_payment_testing() {
    print_scenario "7. Payment System Testing (Mock Mode)"
    print_step "Navigate to payment/billing section"
    print_test "Initiate a consultation payment"
    print_test "Use test payment methods (mock mode enabled)"
    print_test "Verify payment confirmation"
    print_test "Check payment history in user account"
    echo ""
}

scenario_8_notification_testing() {
    print_scenario "8. Notification System Testing"
    print_step "Trigger various notification scenarios"
    print_test "User registration confirmation"
    print_test "Case submission acknowledgment"
    print_test "Professional application status updates"
    print_test "Check email logs (development mode)"
    echo ""
}

scenario_9_workflow_testing() {
    print_scenario "9. Workflow Engine Testing"
    print_step "Test automated workflows"
    print_test "Case assignment to professionals"
    print_test "Review workflow progression"
    print_test "Status updates and notifications"
    print_test "Workflow completion tracking"
    echo ""
}

scenario_10_integration_testing() {
    print_scenario "10. End-to-End Integration Testing"
    print_step "Complete patient journey test"
    print_test "Register → Submit Case → Get Assignment → Receive Review"
    print_step "Complete professional journey test"
    print_test "Register → Verify → Get Cases → Provide Reviews"
    print_step "Complete admin journey test"
    print_test "Monitor → Review → Approve → Manage"
    echo ""
}

# Interactive testing menu
show_menu() {
    echo ""
    echo -e "${BLUE}🎯 SELECT TESTING SCENARIO:${NC}"
    echo "=========================="
    echo "0. Check Environment Status"
    echo "1. Frontend Application Access"
    echo "2. User Registration & Authentication"
    echo "3. Medical Case Submission"
    echo "4. Professional Registration"
    echo "5. Admin Dashboard"
    echo "6. Direct API Testing"
    echo "7. Payment System Testing"
    echo "8. Notification System Testing"
    echo "9. Workflow Engine Testing"
    echo "10. End-to-End Integration Testing"
    echo "a. Run All Scenarios"
    echo "q. Quit"
    echo ""
}

# Run specific scenario
run_scenario() {
    case $1 in
        0) check_environment ;;
        1) scenario_1_frontend_access ;;
        2) scenario_2_user_registration ;;
        3) scenario_3_case_submission ;;
        4) scenario_4_professional_registration ;;
        5) scenario_5_admin_dashboard ;;
        6) scenario_6_api_testing ;;
        7) scenario_7_payment_testing ;;
        8) scenario_8_notification_testing ;;
        9) scenario_9_workflow_testing ;;
        10) scenario_10_integration_testing ;;
        a) 
            for i in {0..10}; do
                run_scenario $i
                echo ""
                read -p "Press Enter to continue to next scenario..." -r
                echo ""
            done
            ;;
        *) echo "Invalid option" ;;
    esac
}

# Main interactive loop
if [ "$1" = "--all" ]; then
    run_scenario "a"
elif [ "$1" != "" ]; then
    run_scenario "$1"
else
    while true; do
        show_menu
        read -p "Enter your choice: " -r choice
        echo ""
        
        if [ "$choice" = "q" ]; then
            echo "👋 Happy testing!"
            break
        fi
        
        run_scenario "$choice"
        
        echo ""
        read -p "Press Enter to return to menu..." -r
    done
fi