#!/bin/bash

# Development Environment Status Checker
set -euo pipefail

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📊 Second Opinion Platform - Development Environment Status${NC}"
echo "==========================================================="

# Function to check service health
check_service() {
    local port=$1
    local service_name=$2
    local endpoint=${3:-"/health"}
    
    local status_icon="❌"
    local status_text="DOWN"
    local details=""
    
    if lsof -i:$port >/dev/null 2>&1; then
        # Port is in use, check if service responds
        if curl -s --connect-timeout 3 http://localhost:$port$endpoint >/dev/null 2>&1; then
            status_icon="✅"
            status_text="UP"
            
            # Try to get service version/info
            local service_info=$(curl -s --connect-timeout 3 http://localhost:$port$endpoint 2>/dev/null || echo "")
            if [[ -n "$service_info" ]]; then
                local service_version=$(echo $service_info | jq -r '.version // .service // empty' 2>/dev/null || echo "")
                if [[ -n "$service_version" ]]; then
                    details=" ($service_version)"
                fi
            fi
        else
            status_icon="⚠️ "
            status_text="RUNNING"
            details=" (port in use, no health endpoint)"
        fi
    fi
    
    printf "  %-30s %s %-8s %s\n" "$service_name:" "$status_icon" "$status_text" "$details"
}

# Function to check database
check_database() {
    local container_name=$1
    local port=$2
    local service_name=$3
    local test_command=$4
    
    local status_icon="❌"
    local status_text="DOWN"
    local details=""
    
    if docker ps --filter "name=$container_name" --format "{{.Status}}" | grep -q "Up"; then
        if docker exec $container_name $test_command >/dev/null 2>&1; then
            status_icon="✅"
            status_text="UP"
            details=" (Docker: healthy)"
        else
            status_icon="⚠️ "
            status_text="STARTING"
            details=" (Docker: not ready)"
        fi
    else
        if docker ps -a --filter "name=$container_name" --format "{{.Status}}" | grep -q "Exited"; then
            status_text="STOPPED"
            details=" (Docker: exited)"
        else
            details=" (Docker: not found)"
        fi
    fi
    
    printf "  %-30s %s %-8s %s\n" "$service_name:" "$status_icon" "$status_text" "$details"
}

echo ""
echo -e "${BLUE}🌐 Frontend Services${NC}"
echo "-------------------"
check_service 4000 "Development Frontend" "/"

echo ""
echo -e "${BLUE}🔧 Microservices (Development - Ports 4001-4010)${NC}"
echo "-------------------------------------------------"
check_service 4001 "Patient Identity Service"
check_service 4002 "Case Management Service"
check_service 4003 "AI Analysis Service"
check_service 4004 "Professional Service"
check_service 4005 "Notification Service"
check_service 4006 "Professional Recruitment"
check_service 4007 "Payment & Billing Service"
check_service 4008 "Professional Workplace"
check_service 4009 "Admin Management Service"
check_service 4010 "Workflow Engine Service"

echo ""
echo -e "${BLUE}🗄️  Development Databases${NC}"
echo "-------------------------"
check_database "second-opinion-dev-postgres" 5433 "PostgreSQL (Development)" "pg_isready -U dev_user -d secondopinion_dev"
check_database "second-opinion-dev-redis" 6380 "Redis (Development)" "redis-cli -a dev_redis_password ping"

echo ""
echo -e "${BLUE}📋 Staging Environment Status (Reference)${NC}"
echo "------------------------------------------"
echo -e "${YELLOW}Staging services running on ports 3000-3010:${NC}"

# Quick check of staging services
declare -a staging_ports=(3000 3001 3002 3003 3004 3005 3007 3008 3009 3010)
declare -a staging_names=("Frontend" "Patient Identity" "Case Management" "AI Analysis" "Professional" "Notifications" "Workplace" "Payment/Billing" "Admin" "Workflow")

for i in "${!staging_ports[@]}"; do
    port=${staging_ports[$i]}
    name=${staging_names[$i]}
    
    if lsof -i:$port >/dev/null 2>&1; then
        echo -e "  ${name}: ${GREEN}✅ UP${NC} (port $port)"
    else
        echo -e "  ${name}: ${RED}❌ DOWN${NC} (port $port)"
    fi
done

echo ""
echo -e "${BLUE}📊 Port Usage Summary${NC}"
echo "----------------------"

# Count services by environment
dev_services=$(lsof -i TCP | grep LISTEN | awk '{print $9}' | grep -E ":40[0-9][0-9]" | wc -l || echo 0)
staging_services=$(lsof -i TCP | grep LISTEN | awk '{print $9}' | grep -E ":30[0-9][0-9]" | wc -l || echo 0)

echo -e "Development Services (4000-4010): ${BLUE}$dev_services running${NC}"
echo -e "Staging Services (3000-3010):     ${BLUE}$staging_services running${NC}"

# Check for port conflicts
echo ""
echo -e "${BLUE}⚠️  Port Conflict Check${NC}"
echo "-----------------------"
conflicts=0

for port in {4000..4010}; do
    if lsof -i:$port >/dev/null 2>&1; then
        staging_port=$((port - 1000))
        if lsof -i:$staging_port >/dev/null 2>&1; then
            echo -e "${RED}⚠️  Potential conflict: Port $port (dev) and $staging_port (staging) both in use${NC}"
            conflicts=$((conflicts + 1))
        fi
    fi
done

if [ $conflicts -eq 0 ]; then
    echo -e "${GREEN}✅ No port conflicts detected${NC}"
fi

echo ""
echo -e "${BLUE}🔧 Quick Actions${NC}"
echo "----------------"
echo "Start development:  ./scripts/start-dev-robust.sh"
echo "Stop development:   ./scripts/stop-dev.sh"
echo "Check logs:         ls -la /tmp/dev-*.log"
echo "Database logs:      docker logs second-opinion-dev-postgres"
echo "                    docker logs second-opinion-dev-redis"

# Show PID files status
echo ""
echo -e "${BLUE}📝 Process Tracking${NC}"
echo "------------------"
pid_files_count=$(ls /tmp/dev-service-*.pid 2>/dev/null | wc -l || echo 0)
if [ "$pid_files_count" -gt 0 ]; then
    echo -e "${GREEN}$pid_files_count PID files found in /tmp/${NC}"
    echo "Services are being tracked for clean shutdown"
else
    echo -e "${YELLOW}No PID files found${NC}"
    echo "Services may not be tracked (use robust startup script)"
fi