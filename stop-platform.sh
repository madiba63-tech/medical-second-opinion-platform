#!/bin/bash

# Second Opinion Platform - Complete Shutdown Script
# This script stops all microservices and the API Gateway

set -e

echo "🛑 Stopping Second Opinion Platform v2.0"
echo "========================================"

# Function to stop a service by PID
stop_service() {
    local service_name=$1
    local pid_file="pids/$service_name.pid"
    
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        
        if ps -p $pid > /dev/null 2>&1; then
            echo "🛑 Stopping $service_name (PID: $pid)..."
            kill $pid
            
            # Wait for process to terminate
            local count=0
            while ps -p $pid > /dev/null 2>&1 && [ $count -lt 10 ]; do
                sleep 1
                ((count++))
            done
            
            if ps -p $pid > /dev/null 2>&1; then
                echo "⚠️  Force killing $service_name..."
                kill -9 $pid 2>/dev/null || true
            fi
            
            echo "✅ $service_name stopped"
        else
            echo "⚠️  $service_name process not found (PID: $pid)"
        fi
        
        rm -f "$pid_file"
    else
        echo "⚠️  No PID file found for $service_name"
    fi
}

# Function to stop services by port
stop_service_by_port() {
    local service_name=$1
    local port=$2
    
    echo "🔍 Looking for $service_name on port $port..."
    
    local pid=$(lsof -ti:$port 2>/dev/null | head -1)
    
    if [ ! -z "$pid" ]; then
        echo "🛑 Stopping $service_name (PID: $pid, Port: $port)..."
        kill $pid 2>/dev/null || true
        
        # Wait for process to terminate
        local count=0
        while lsof -ti:$port > /dev/null 2>&1 && [ $count -lt 10 ]; do
            sleep 1
            ((count++))
        done
        
        if lsof -ti:$port > /dev/null 2>&1; then
            echo "⚠️  Force killing process on port $port..."
            kill -9 $(lsof -ti:$port) 2>/dev/null || true
        fi
        
        echo "✅ $service_name stopped"
    else
        echo "ℹ️  No process found on port $port for $service_name"
    fi
}

# Stop services by PID files first
echo ""
echo "1️⃣ Stopping services by PID files..."
echo "===================================="

if [ -d "pids" ]; then
    services=(
        "API-Gateway"
        "Identity-Service"
        "Case-Service"
        "AI-Service"
        "Professional-Service"
        "Notification-Service"
    )
    
    for service in "${services[@]}"; do
        stop_service "$service"
    done
else
    echo "⚠️  No pids directory found"
fi

echo ""
echo "2️⃣ Stopping services by port (backup)..."
echo "========================================"

# Stop services by port as backup
port_services=(
    "API-Gateway:3000"
    "Identity-Service:3001"
    "Case-Service:3002"
    "AI-Service:3003"
    "Professional-Service:3004"
    "Notification-Service:3005"
)

for service_port in "${port_services[@]}"; do
    IFS=':' read -r service port <<< "$service_port"
    stop_service_by_port "$service" "$port"
done

echo ""
echo "3️⃣ Stopping development servers..."
echo "=================================="

# Stop any remaining npm/node processes related to the platform
echo "🔍 Looking for remaining npm/node processes..."

# Find and stop npm run dev processes
for pid in $(pgrep -f "npm run dev" 2>/dev/null || true); do
    if [ ! -z "$pid" ]; then
        local cmd=$(ps -p $pid -o command --no-headers 2>/dev/null || echo "unknown")
        if [[ "$cmd" == *"second-opinion"* ]]; then
            echo "🛑 Stopping npm dev process (PID: $pid): $cmd"
            kill $pid 2>/dev/null || true
        fi
    fi
done

# Find and stop node processes in our project directory
for pid in $(pgrep -f "node.*second-opinion" 2>/dev/null || true); do
    if [ ! -z "$pid" ]; then
        local cmd=$(ps -p $pid -o command --no-headers 2>/dev/null || echo "unknown")
        echo "🛑 Stopping node process (PID: $pid): $(echo $cmd | cut -c1-80)..."
        kill $pid 2>/dev/null || true
    fi
done

echo ""
echo "4️⃣ Cleaning up..."
echo "================="

# Remove PID directory
if [ -d "pids" ]; then
    rm -rf pids
    echo "🗑️  Removed PID files"
fi

# Check final status
echo ""
echo "5️⃣ Final Status Check..."
echo "======================="

ports=(3000 3001 3002 3003 3004 3005)
all_stopped=true

for port in "${ports[@]}"; do
    if lsof -ti:$port > /dev/null 2>&1; then
        echo "⚠️  Port $port is still in use"
        all_stopped=false
    else
        echo "✅ Port $port is free"
    fi
done

echo ""
if [ "$all_stopped" = true ]; then
    echo "🎉 All services stopped successfully!"
    echo "✅ Second Opinion Platform has been shut down completely."
else
    echo "⚠️  Some ports are still in use. You may need to manually stop remaining processes:"
    echo "   • Check running processes: ps aux | grep node"
    echo "   • Kill specific processes: kill -9 <PID>"
    echo "   • Check port usage: lsof -i :<PORT>"
fi

echo ""
echo "📝 Log files are preserved in the logs/ directory"
echo "🔄 To restart the platform, run: ./start-platform.sh"