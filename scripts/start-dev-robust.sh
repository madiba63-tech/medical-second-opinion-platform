#!/bin/bash

# Robust Development Environment Startup Script
set -euo pipefail  # Exit on error, undefined vars, pipe failures

echo "🚀 Starting Second Opinion Platform - DEVELOPMENT Environment (Robust)"
echo "======================================================================"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Development environment variables
export NODE_ENV=development
export DATABASE_URL="postgresql://dev_user:dev_password@localhost:5433/secondopinion_dev?schema=public"
export JWT_SECRET="dev-jwt-secret-for-development-32-chars"
export REDIS_PASSWORD="dev_redis_password"
export REDIS_URL="redis://:dev_redis_password@localhost:6380"

# Development service URLs  
export FRONTEND_URL="http://localhost:4000"
export PATIENT_IDENTITY_SERVICE_URL="http://localhost:4001"
export CASE_MANAGEMENT_SERVICE_URL="http://localhost:4002" 
export AI_ANALYSIS_SERVICE_URL="http://localhost:4003"
export PROFESSIONAL_SERVICE_URL="http://localhost:4004"
export NOTIFICATION_SERVICE_URL="http://localhost:4005"
export PROFESSIONAL_RECRUITMENT_SERVICE_URL="http://localhost:4006"
export PAYMENT_BILLING_SERVICE_URL="http://localhost:4007"
export PROFESSIONAL_WORKPLACE_SERVICE_URL="http://localhost:4008"
export ADMIN_MANAGEMENT_SERVICE_URL="http://localhost:4009"
export WORKFLOW_ENGINE_SERVICE_URL="http://localhost:4010"

# Feature flags for development
export ENABLE_DEBUG_LOGGING=true
export ENABLE_MOCK_PAYMENTS=true
export SKIP_EMAIL_VERIFICATION=true

# Function to check if a port is available
check_port() {
    local port=$1
    if lsof -i:$port >/dev/null 2>&1; then
        echo -e "${RED}Port $port is already in use${NC}"
        return 1
    fi
    return 0
}

# Function to wait for service to be ready
wait_for_service() {
    local port=$1
    local service_name=$2
    local max_attempts=30
    local attempt=1
    
    echo -e "${YELLOW}⏳ Waiting for $service_name on port $port...${NC}"
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s http://localhost:$port/health >/dev/null 2>&1 || \
           curl -s http://localhost:$port >/dev/null 2>&1; then
            echo -e "${GREEN}✅ $service_name is ready on port $port${NC}"
            return 0
        fi
        
        if [ $((attempt % 5)) -eq 0 ]; then
            echo -e "${YELLOW}   Still waiting... (attempt $attempt/$max_attempts)${NC}"
        fi
        
        sleep 2
        attempt=$((attempt + 1))
    done
    
    echo -e "${RED}❌ $service_name failed to start on port $port after ${max_attempts} attempts${NC}"
    return 1
}

# Function to start a microservice
start_service() {
    local service_dir=$1
    local service_file=$2
    local port=$3
    local service_name=$4
    local extra_env=${5:-""}
    
    echo -e "${BLUE}🔄 Starting $service_name on port $port...${NC}"
    
    # Check if port is available
    if ! check_port $port; then
        echo -e "${YELLOW}⚠️  Skipping $service_name - port $port already in use${NC}"
        return 1
    fi
    
    # Check if service file exists
    if [ ! -f "microservices/$service_dir/$service_file" ]; then
        echo -e "${RED}❌ Service file not found: microservices/$service_dir/$service_file${NC}"
        return 1
    fi
    
    # Start the service in background
    (
        cd "microservices/$service_dir" || exit 1
        eval "PORT=$port DATABASE_URL=\"$DATABASE_URL\" JWT_SECRET=\"$JWT_SECRET\" $extra_env node $service_file" &
        echo $! > "/tmp/dev-service-$port.pid"
    ) &
    
    # Give service time to start
    sleep 3
    
    return 0
}

# Cleanup function
cleanup() {
    echo -e "${YELLOW}🧹 Cleaning up development services...${NC}"
    
    # Kill services by PID files
    for pid_file in /tmp/dev-service-*.pid; do
        if [ -f "$pid_file" ]; then
            pid=$(cat "$pid_file")
            if ps -p $pid > /dev/null 2>&1; then
                kill $pid 2>/dev/null || true
            fi
            rm -f "$pid_file"
        fi
    done
    
    # Kill any remaining processes on development ports
    for port in {4000..4010}; do
        if lsof -ti:$port >/dev/null 2>&1; then
            echo "Stopping process on port $port"
            kill $(lsof -ti:$port) 2>/dev/null || true
        fi
    done
}

# Set trap for cleanup on exit
trap cleanup EXIT INT TERM

echo -e "${BLUE}🔧 Development Environment Configuration:${NC}"
echo "  • Database: PostgreSQL (localhost:5433/secondopinion_dev)"
echo "  • Redis: localhost:6380 with dev authentication"
echo "  • Frontend: http://localhost:4000"
echo "  • Services: http://localhost:4001-4010"
echo ""

echo -e "${YELLOW}⚠️  DEVELOPMENT MODE - Safe for testing and development${NC}"
echo -e "${YELLOW}⚠️  Uses separate database and ports from staging${NC}"
echo ""

# Start development databases using Docker
echo -e "${BLUE}🗄️ Starting development databases...${NC}"
if ! docker compose -f docker-compose.dev-db.yml up -d; then
    echo -e "${RED}❌ Failed to start development databases${NC}"
    exit 1
fi

# Wait for databases to be ready
echo -e "${YELLOW}⏳ Waiting for databases to be ready...${NC}"
sleep 5

# Check database health
if docker exec second-opinion-dev-postgres pg_isready -U dev_user -d secondopinion_dev >/dev/null 2>&1; then
    echo -e "${GREEN}✅ Development PostgreSQL is ready${NC}"
else
    echo -e "${RED}❌ Development PostgreSQL failed to start${NC}"
    exit 1
fi

if docker exec second-opinion-dev-redis redis-cli -a "dev_redis_password" ping >/dev/null 2>&1; then
    echo -e "${GREEN}✅ Development Redis is ready${NC}"
else
    echo -e "${RED}❌ Development Redis failed to start${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}🎯 Starting Development Services...${NC}"

# Array of services to start (directory, file, port, name, extra_env)
declare -a services=(
    "patient-identity-service enhanced-server.js 4001 'Patient Identity Service'"
    "case-management-service enhanced-server.js 4002 'Case Management Service'"
    "ai-analysis-service simple-server.js 4003 'AI Analysis Service'"
    "professional-service enhanced-server.js 4004 'Professional Service'"
    "notification-service simple-server.js 4005 'Notification Service'"
    "professional-recruitment-service recruitment-server.js 4006 'Professional Recruitment Service'"
    "payment-billing-service payment-billing-server.js 4007 'Payment & Billing Service'"
    "professional-workplace-service workplace-server.js 4008 'Professional Workplace Service'"
    "admin-management-service admin-server.js 4009 'Admin Management Service' 'NOTIFICATION_SERVICE_URL=\"$NOTIFICATION_SERVICE_URL\" WORKFLOW_SERVICE_URL=\"$WORKFLOW_ENGINE_SERVICE_URL\"'"
    "workflow-engine-service workflow-server.js 4010 'Workflow Engine Service' 'REDIS_URL=\"$REDIS_URL\"'"
)

# Start frontend first
echo -e "${BLUE}🌐 Starting Frontend on port 4000...${NC}"
if check_port 4000; then
    PORT=4000 npm run dev > /tmp/dev-frontend.log 2>&1 &
    echo $! > /tmp/dev-service-4000.pid
    sleep 3
else
    echo -e "${YELLOW}⚠️  Frontend port 4000 already in use${NC}"
fi

# Start each microservice
for service_config in "${services[@]}"; do
    read -r service_dir service_file port service_name extra_env <<< "$service_config"
    # Remove quotes from service_name
    service_name=$(echo $service_name | tr -d "'")
    start_service "$service_dir" "$service_file" "$port" "$service_name" "$extra_env"
    sleep 2  # Stagger service starts
done

echo ""
echo -e "${BLUE}🔍 Verifying service health...${NC}"

# Verify services are running
declare -a failed_services=()

# Check frontend
if wait_for_service 4000 "Frontend"; then
    echo -e "${GREEN}✅ Frontend verified${NC}"
else
    failed_services+=("Frontend (4000)")
fi

# Check microservices
for service_config in "${services[@]}"; do
    read -r service_dir service_file port service_name extra_env <<< "$service_config"
    service_name=$(echo $service_name | tr -d "'")
    
    if wait_for_service "$port" "$service_name"; then
        echo -e "${GREEN}✅ $service_name verified${NC}"
    else
        failed_services+=("$service_name ($port)")
    fi
done

echo ""
if [ ${#failed_services[@]} -eq 0 ]; then
    echo -e "${GREEN}🎉 All development services started successfully!${NC}"
else
    echo -e "${YELLOW}⚠️  Some services failed to start:${NC}"
    for failed in "${failed_services[@]}"; do
        echo -e "${RED}   ❌ $failed${NC}"
    done
fi

echo ""
echo -e "${GREEN}✅ Development environment startup complete!${NC}"
echo -e "${BLUE}🌐 Access your development platform at: http://localhost:4000${NC}"
echo ""
echo -e "${BLUE}🔧 Development Services:${NC}"
echo "  • Frontend:              http://localhost:4000"
echo "  • Patient Identity:      http://localhost:4001"
echo "  • Case Management:       http://localhost:4002"
echo "  • AI Analysis:           http://localhost:4003"
echo "  • Professional Service:  http://localhost:4004"
echo "  • Notifications:         http://localhost:4005"
echo "  • Professional Recruitment: http://localhost:4006"
echo "  • Payment & Billing:     http://localhost:4007"
echo "  • Professional Workplace: http://localhost:4008"
echo "  • Admin Management:      http://localhost:4009"
echo "  • Workflow Engine:       http://localhost:4010"
echo ""
echo -e "${BLUE}📊 Development Databases:${NC}"
echo "  • PostgreSQL: localhost:5433/secondopinion_dev (dev_user/dev_password)"
echo "  • Redis: localhost:6380 (password: dev_redis_password)"
echo ""
echo -e "${YELLOW}💡 To stop all development services, run: ./scripts/stop-dev.sh${NC}"
echo -e "${YELLOW}📋 Service logs are available in /tmp/dev-*.log${NC}"

# Keep script running to maintain services
echo ""
echo -e "${BLUE}🔄 Development environment is running. Press Ctrl+C to stop all services.${NC}"

# Wait for interrupt
wait