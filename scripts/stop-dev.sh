#!/bin/bash

# Robust Development Environment Stop Script
set -euo pipefail

echo "🛑 Stopping Second Opinion Platform - DEVELOPMENT Environment"
echo "============================================================="

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to stop service by PID file
stop_service_by_pid() {
    local pid_file=$1
    local service_name=${2:-"Unknown Service"}
    
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        if ps -p $pid > /dev/null 2>&1; then
            echo -e "${YELLOW}  Stopping $service_name (PID: $pid)...${NC}"
            kill -TERM $pid 2>/dev/null || true
            
            # Wait for graceful shutdown
            local count=0
            while ps -p $pid > /dev/null 2>&1 && [ $count -lt 10 ]; do
                sleep 1
                count=$((count + 1))
            done
            
            # Force kill if still running
            if ps -p $pid > /dev/null 2>&1; then
                echo -e "${RED}    Force killing $service_name...${NC}"
                kill -KILL $pid 2>/dev/null || true
            fi
        fi
        rm -f "$pid_file"
        return 0
    fi
    return 1
}

# Function to stop service by port
stop_service_by_port() {
    local port=$1
    local service_name=${2:-"Service on port $port"}
    
    if lsof -ti:$port >/dev/null 2>&1; then
        echo -e "${YELLOW}  Stopping $service_name...${NC}"
        local pids=$(lsof -ti:$port)
        
        # Send TERM signal first
        echo $pids | xargs -r kill -TERM 2>/dev/null || true
        sleep 2
        
        # Check if still running and force kill
        if lsof -ti:$port >/dev/null 2>&1; then
            echo -e "${RED}    Force killing $service_name...${NC}"
            lsof -ti:$port | xargs -r kill -KILL 2>/dev/null || true
        fi
        return 0
    fi
    return 1
}

echo -e "${BLUE}🔄 Stopping development services...${NC}"

# Stop services by PID files first (more reliable)
echo -e "${BLUE}📋 Stopping services by PID files...${NC}"
declare -a stopped_services=()

# Stop frontend
if stop_service_by_pid "/tmp/dev-service-4000.pid" "Frontend"; then
    stopped_services+=("Frontend (4000)")
fi

# Stop microservices
for port in {4001..4010}; do
    if stop_service_by_pid "/tmp/dev-service-$port.pid" "Service on port $port"; then
        stopped_services+=("Service ($port)")
    fi
done

# Stop any remaining services by port
echo -e "${BLUE}🔍 Checking for remaining services on development ports...${NC}"
declare -a remaining_services=()

for port in {4000..4010}; do
    if stop_service_by_port "$port" "Service on port $port"; then
        remaining_services+=("Port $port")
    fi
done

# Clean up log files
echo -e "${BLUE}🧹 Cleaning up log files...${NC}"
rm -f /tmp/dev-*.log 2>/dev/null || true

# Stop development databases
echo -e "${BLUE}🗄️ Stopping development databases...${NC}"
if docker compose -f docker-compose.dev-db.yml down --timeout 10; then
    echo -e "${GREEN}✅ Development databases stopped${NC}"
else
    echo -e "${RED}⚠️  Some issues stopping databases (may not have been running)${NC}"
fi

# Clean up any orphaned containers
echo -e "${BLUE}🐳 Cleaning up development containers...${NC}"
docker container prune -f --filter "label=com.docker.compose.project=second-opinion" >/dev/null 2>&1 || true

echo ""
if [ ${#stopped_services[@]} -gt 0 ]; then
    echo -e "${GREEN}✅ Stopped services:${NC}"
    for service in "${stopped_services[@]}"; do
        echo -e "${GREEN}   ✓ $service${NC}"
    done
fi

if [ ${#remaining_services[@]} -gt 0 ]; then
    echo -e "${YELLOW}🔄 Force-stopped remaining services:${NC}"
    for service in "${remaining_services[@]}"; do
        echo -e "${YELLOW}   ⚠ $service${NC}"
    done
fi

# Verify all development ports are free
echo -e "${BLUE}🔍 Verifying all development ports are free...${NC}"
declare -a busy_ports=()

for port in {4000..4010}; do
    if lsof -i:$port >/dev/null 2>&1; then
        busy_ports+=($port)
    fi
done

if [ ${#busy_ports[@]} -eq 0 ]; then
    echo -e "${GREEN}✅ All development ports (4000-4010) are now free${NC}"
else
    echo -e "${RED}⚠️  Some ports are still in use: ${busy_ports[*]}${NC}"
    echo -e "${YELLOW}💡 You may need to manually kill processes or restart your terminal${NC}"
fi

# Check development database ports
if docker ps --filter "name=second-opinion-dev" --format "table {{.Names}}\t{{.Status}}" | grep -q "second-opinion-dev"; then
    echo -e "${YELLOW}⚠️  Some development database containers are still running${NC}"
else
    echo -e "${GREEN}✅ Development databases are stopped${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Development environment shutdown complete!${NC}"
echo -e "${BLUE}🔧 All development services and databases have been shut down.${NC}"
echo -e "${YELLOW}💡 To restart development environment:${NC}"
echo "   • Standard: ./scripts/start-dev.sh"
echo "   • Robust:   ./scripts/start-dev-robust.sh"
echo ""
echo -e "${BLUE}📊 Your staging environment (ports 3000-3010) remains unaffected.${NC}"