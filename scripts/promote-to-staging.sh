#!/bin/bash

# Development to Staging Promotion Script
set -euo pipefail

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Second Opinion Platform - Development to Staging Promotion${NC}"
echo "=============================================================="

# Configuration
PROMOTION_LOG="/tmp/promotion-$(date +%Y%m%d-%H%M%S).log"
BACKUP_DIR="/tmp/staging-backup-$(date +%Y%m%d-%H%M%S)"

# Functions
log_message() {
    local level=$1
    local message=$2
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] [$level] $message" >> "$PROMOTION_LOG"
    echo -e "$message"
}

check_git_status() {
    log_message "INFO" "${BLUE}📋 Checking Git repository status...${NC}"
    
    if ! git status >/dev/null 2>&1; then
        log_message "ERROR" "${RED}❌ Not in a Git repository${NC}"
        exit 1
    fi
    
    # Check for uncommitted changes
    if ! git diff-index --quiet HEAD --; then
        log_message "WARN" "${YELLOW}⚠️  Uncommitted changes detected${NC}"
        echo -e "${YELLOW}The following files have uncommitted changes:${NC}"
        git diff --name-only
        echo ""
        read -p "Continue with promotion? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            log_message "INFO" "Promotion cancelled by user"
            exit 0
        fi
    fi
    
    # Get current branch
    CURRENT_BRANCH=$(git branch --show-current)
    log_message "INFO" "Current branch: $CURRENT_BRANCH"
    
    # Get latest commit info
    LATEST_COMMIT=$(git rev-parse --short HEAD)
    COMMIT_MESSAGE=$(git log -1 --pretty=format:"%s")
    log_message "INFO" "Latest commit: $LATEST_COMMIT - $COMMIT_MESSAGE"
}

run_development_tests() {
    log_message "INFO" "${BLUE}🧪 Running development environment tests...${NC}"
    
    # Check if development environment is running
    if ! curl -s http://localhost:4000/health >/dev/null 2>&1 && ! curl -s http://localhost:4000 >/dev/null 2>&1; then
        log_message "WARN" "${YELLOW}⚠️  Development environment not running${NC}"
        echo -e "${YELLOW}Starting development environment for testing...${NC}"
        
        if ! ./scripts/start-dev-robust.sh >/dev/null 2>&1; then
            log_message "ERROR" "${RED}❌ Failed to start development environment${NC}"
            exit 1
        fi
        
        # Wait for services to be ready
        sleep 10
    fi
    
    # Run basic health checks on all development services
    declare -a dev_services=(
        "4000:Frontend"
        "4001:Patient Identity"
        "4002:Case Management" 
        "4003:AI Analysis"
        "4004:Professional Service"
        "4005:Notification Service"
        "4006:Professional Recruitment"
        "4007:Payment & Billing"
        "4008:Professional Workplace"
        "4009:Admin Management"
        "4010:Workflow Engine"
    )
    
    local failed_tests=0
    
    for service in "${dev_services[@]}"; do
        IFS=':' read -r port name <<< "$service"
        
        log_message "INFO" "Testing $name (port $port)..."
        
        if curl -s --connect-timeout 5 http://localhost:$port/health >/dev/null 2>&1 || \
           curl -s --connect-timeout 5 http://localhost:$port >/dev/null 2>&1; then
            log_message "INFO" "${GREEN}✅ $name - PASS${NC}"
        else
            log_message "ERROR" "${RED}❌ $name - FAIL${NC}"
            failed_tests=$((failed_tests + 1))
        fi
    done
    
    if [ $failed_tests -gt 0 ]; then
        log_message "ERROR" "${RED}❌ $failed_tests development tests failed${NC}"
        echo -e "${RED}Cannot promote to staging with failing tests${NC}"
        exit 1
    fi
    
    log_message "INFO" "${GREEN}✅ All development tests passed${NC}"
}

backup_staging() {
    log_message "INFO" "${BLUE}💾 Creating staging environment backup...${NC}"
    
    mkdir -p "$BACKUP_DIR"
    
    # Backup current codebase state
    log_message "INFO" "Backing up current commit state..."
    git rev-parse HEAD > "$BACKUP_DIR/previous_commit.txt"
    
    # Backup staging database
    log_message "INFO" "Backing up staging database..."
    if command -v pg_dump >/dev/null 2>&1; then
        PGPASSWORD=postgres pg_dump -h localhost -p 5432 -U postgres secondopinion > "$BACKUP_DIR/staging_database.sql" 2>/dev/null || {
            log_message "WARN" "${YELLOW}⚠️  Could not backup database directly${NC}"
            log_message "INFO" "Creating database backup via Docker..."
            docker exec -it second-opinion-postgres pg_dump -U postgres secondopinion > "$BACKUP_DIR/staging_database.sql" 2>/dev/null || true
        }
    fi
    
    # Backup environment files
    log_message "INFO" "Backing up environment configuration..."
    cp .env.staging "$BACKUP_DIR/" 2>/dev/null || true
    
    # Create staging services snapshot
    log_message "INFO" "Creating staging services snapshot..."
    curl -s http://localhost:3009/api/v1/admin/metrics > "$BACKUP_DIR/staging_metrics.json" 2>/dev/null || true
    
    log_message "INFO" "${GREEN}✅ Staging backup created at: $BACKUP_DIR${NC}"
}

stop_staging() {
    log_message "INFO" "${BLUE}🛑 Stopping staging environment...${NC}"
    
    # Stop staging services gracefully
    for port in 3000 3001 3002 3003 3004 3005 3007 3008 3009 3010; do
        if lsof -ti:$port >/dev/null 2>&1; then
            log_message "INFO" "Stopping service on port $port..."
            kill -TERM $(lsof -ti:$port) 2>/dev/null || true
            sleep 1
        fi
    done
    
    # Force kill any remaining processes
    for port in 3000 3001 3002 3003 3004 3005 3007 3008 3009 3010; do
        if lsof -ti:$port >/dev/null 2>&1; then
            log_message "WARN" "Force killing service on port $port..."
            kill -KILL $(lsof -ti:$port) 2>/dev/null || true
        fi
    done
    
    log_message "INFO" "${GREEN}✅ Staging environment stopped${NC}"
}

start_staging() {
    log_message "INFO" "${BLUE}🚀 Starting staging environment with new code...${NC}"
    
    # Use staging environment variables
    export NODE_ENV=production
    export APP_ENV=staging
    export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/secondopinion?schema=public"
    export JWT_SECRET="second-opinion-jwt-secret-2025"
    export REDIS_PASSWORD="redis_password"
    
    # Start staging services
    if [ -f "./start-full-platform.sh" ]; then
        log_message "INFO" "Starting staging platform..."
        ./start-full-platform.sh > "$PROMOTION_LOG.staging-start" 2>&1 &
        STAGING_START_PID=$!
        
        # Wait for services to start
        log_message "INFO" "Waiting for staging services to initialize..."
        sleep 15
        
        # Check if staging start process is still running (indicating issues)
        if ps -p $STAGING_START_PID > /dev/null 2>&1; then
            log_message "INFO" "Staging services are starting up..."
        fi
    else
        log_message "ERROR" "${RED}❌ start-full-platform.sh not found${NC}"
        return 1
    fi
    
    log_message "INFO" "${GREEN}✅ Staging environment start initiated${NC}"
}

verify_staging() {
    log_message "INFO" "${BLUE}🔍 Verifying staging environment...${NC}"
    
    # Wait for services to be fully ready
    local max_attempts=30
    local attempt=1
    
    log_message "INFO" "Waiting for staging services to be ready..."
    
    declare -a critical_services=(
        "3000:Frontend"
        "3007:Professional Workplace"
        "3008:Payment & Billing" 
        "3009:Admin Management"
        "3010:Workflow Engine"
    )
    
    while [ $attempt -le $max_attempts ]; do
        local ready_count=0
        
        for service in "${critical_services[@]}"; do
            IFS=':' read -r port name <<< "$service"
            
            if curl -s --connect-timeout 3 http://localhost:$port/health >/dev/null 2>&1 || \
               curl -s --connect-timeout 3 http://localhost:$port >/dev/null 2>&1; then
                ready_count=$((ready_count + 1))
            fi
        done
        
        if [ $ready_count -eq ${#critical_services[@]} ]; then
            log_message "INFO" "${GREEN}✅ All critical staging services are ready${NC}"
            break
        fi
        
        if [ $((attempt % 5)) -eq 0 ]; then
            log_message "INFO" "Staging verification attempt $attempt/$max_attempts ($ready_count/${#critical_services[@]} services ready)"
        fi
        
        sleep 5
        attempt=$((attempt + 1))
    done
    
    if [ $attempt -gt $max_attempts ]; then
        log_message "ERROR" "${RED}❌ Staging environment failed to start properly${NC}"
        return 1
    fi
    
    # Run staging smoke tests
    log_message "INFO" "Running staging smoke tests..."
    local test_failures=0
    
    # Test frontend
    if curl -s http://localhost:3000 | grep -q "Medical Second Opinion" 2>/dev/null; then
        log_message "INFO" "${GREEN}✅ Frontend smoke test - PASS${NC}"
    else
        log_message "ERROR" "${RED}❌ Frontend smoke test - FAIL${NC}"
        test_failures=$((test_failures + 1))
    fi
    
    # Test admin API
    if curl -s http://localhost:3009/health | grep -q "operational" 2>/dev/null; then
        log_message "INFO" "${GREEN}✅ Admin API smoke test - PASS${NC}"
    else
        log_message "ERROR" "${RED}❌ Admin API smoke test - FAIL${NC}"
        test_failures=$((test_failures + 1))
    fi
    
    if [ $test_failures -gt 0 ]; then
        log_message "ERROR" "${RED}❌ $test_failures staging smoke tests failed${NC}"
        return 1
    fi
    
    log_message "INFO" "${GREEN}✅ Staging environment verification complete${NC}"
}

rollback_staging() {
    log_message "ERROR" "${RED}🔙 Rolling back staging environment...${NC}"
    
    # Stop current staging
    stop_staging
    
    # Restore previous commit
    if [ -f "$BACKUP_DIR/previous_commit.txt" ]; then
        local previous_commit=$(cat "$BACKUP_DIR/previous_commit.txt")
        log_message "INFO" "Restoring to commit: $previous_commit"
        git checkout "$previous_commit" 2>/dev/null || true
    fi
    
    # Restore database
    if [ -f "$BACKUP_DIR/staging_database.sql" ]; then
        log_message "INFO" "Restoring staging database..."
        PGPASSWORD=postgres psql -h localhost -p 5432 -U postgres secondopinion < "$BACKUP_DIR/staging_database.sql" 2>/dev/null || {
            log_message "INFO" "Restoring database via Docker..."
            docker exec -i second-opinion-postgres psql -U postgres secondopinion < "$BACKUP_DIR/staging_database.sql" 2>/dev/null || true
        }
    fi
    
    # Restart staging with previous version
    start_staging
    
    log_message "ERROR" "${RED}❌ Rollback complete. Check logs at: $PROMOTION_LOG${NC}"
}

# Main promotion workflow
main() {
    log_message "INFO" "${PURPLE}🎯 Starting promotion workflow...${NC}"
    
    # Trap for cleanup on failure
    trap 'rollback_staging' ERR
    
    # Step 1: Pre-flight checks
    check_git_status
    
    # Step 2: Test development environment
    run_development_tests
    
    # Step 3: Create staging backup
    backup_staging
    
    # Step 4: Stop staging environment
    stop_staging
    
    # Step 5: Start staging with new code
    start_staging
    
    # Step 6: Verify staging environment
    if ! verify_staging; then
        log_message "ERROR" "${RED}❌ Staging verification failed${NC}"
        rollback_staging
        exit 1
    fi
    
    # Success!
    log_message "INFO" "${GREEN}🎉 Promotion to staging successful!${NC}"
    
    echo ""
    echo -e "${GREEN}✅ PROMOTION COMPLETE${NC}"
    echo -e "${BLUE}📋 Promotion Summary:${NC}"
    echo "   • Commit: $LATEST_COMMIT"
    echo "   • Message: $COMMIT_MESSAGE"
    echo "   • Backup: $BACKUP_DIR"
    echo "   • Log: $PROMOTION_LOG"
    echo ""
    echo -e "${BLUE}🌐 Staging Environment:${NC}"
    echo "   • Frontend: http://localhost:3000"
    echo "   • Admin: http://localhost:3009"
    echo "   • All services: ports 3000-3010"
    echo ""
    echo -e "${YELLOW}💡 Next Steps:${NC}"
    echo "   • Test staging environment thoroughly"
    echo "   • Run integration tests"
    echo "   • Prepare for production deployment"
    
    # Remove error trap on success
    trap - ERR
}

# Check for required dependencies
if ! command -v curl >/dev/null 2>&1; then
    echo -e "${RED}❌ curl is required but not installed${NC}"
    exit 1
fi

if ! command -v git >/dev/null 2>&1; then
    echo -e "${RED}❌ git is required but not installed${NC}"
    exit 1
fi

# Run main promotion workflow
main "$@"