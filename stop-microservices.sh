#!/bin/bash

echo "🛑 Stopping Second Opinion Platform v2.0"
echo "========================================"

# Function to stop service by PID file
stop_service_by_pid() {
    local service_name=$1
    local pid_file="pids/$service_name.pid"
    
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        
        if ps -p $pid > /dev/null 2>&1; then
            echo "🛑 Stopping $service_name (PID: $pid)..."
            kill $pid
            
            # Wait up to 10 seconds for graceful shutdown
            local count=0
            while ps -p $pid > /dev/null 2>&1 && [ $count -lt 10 ]; do
                sleep 1
                ((count++))
            done
            
            # Force kill if still running
            if ps -p $pid > /dev/null 2>&1; then
                echo "⚡ Force stopping $service_name..."
                kill -9 $pid 2>/dev/null || true
            fi
            
            echo "✅ $service_name stopped"
        else
            echo "ℹ️ $service_name was not running"
        fi
        
        rm -f "$pid_file"
    else
        echo "⚠️ No PID file for $service_name"
    fi
}

# Stop by port as backup
stop_by_port() {
    local port=$1
    local service_name=$2
    
    local pid=$(lsof -ti:$port 2>/dev/null | head -1)
    if [ ! -z "$pid" ]; then
        echo "🛑 Stopping $service_name on port $port (PID: $pid)..."
        kill $pid 2>/dev/null || true
        sleep 2
        
        # Force kill if still running
        if lsof -ti:$port > /dev/null 2>&1; then
            kill -9 $(lsof -ti:$port) 2>/dev/null || true
        fi
        echo "✅ Port $port freed"
    fi
}

# Stop services by PID files
echo ""
echo "1️⃣ Stopping services by PID..."
echo "============================="

if [ -d "pids" ]; then
    services=(
        "api-gateway"
        "identity-service"
        "case-service"
        "ai-service"
        "professional-service"
        "notification-service"
    )
    
    for service in "${services[@]}"; do
        stop_service_by_pid "$service"
    done
else
    echo "⚠️ No PIDs directory found"
fi

# Backup: stop by port
echo ""
echo "2️⃣ Stopping by port (backup)..."
echo "==============================="

ports_services=(
    "3000:API-Gateway"
    "3001:Identity-Service"
    "3002:Case-Service"
    "3003:AI-Service"
    "3004:Professional-Service"
    "3005:Notification-Service"
)

for port_service in "${ports_services[@]}"; do
    IFS=':' read -r port service <<< "$port_service"
    stop_by_port "$port" "$service"
done

# Clean up
echo ""
echo "3️⃣ Cleaning up..."
echo "================="

if [ -d "pids" ]; then
    rm -rf pids
    echo "🗑️ Removed PID files"
fi

# Final status check
echo ""
echo "4️⃣ Final Status..."
echo "=================="

ports=(3000 3001 3002 3003 3004 3005)
all_stopped=true

for port in "${ports[@]}"; do
    if lsof -ti:$port > /dev/null 2>&1; then
        echo "⚠️ Port $port still in use"
        all_stopped=false
    else
        echo "✅ Port $port is free"
    fi
done

echo ""
if [ "$all_stopped" = true ]; then
    echo "🎉 All services stopped successfully!"
else
    echo "⚠️ Some ports still in use. Check: lsof -i :PORT"
fi

echo ""
echo "📝 Logs preserved in ./logs/"