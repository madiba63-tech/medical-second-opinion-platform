#!/bin/bash

# Second Opinion Platform - Complete Startup Script
# This script starts all microservices and the API Gateway

set -e

echo "🚀 Starting Second Opinion Platform v2.0 - Microservices Architecture"
echo "======================================================================"

# Function to wait for service to be ready
wait_for_service() {
    local service_name=$1
    local port=$2
    local max_attempts=30
    local attempt=1
    
    echo "⏳ Waiting for $service_name to start on port $port..."
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s -f http://localhost:$port/health >/dev/null 2>&1; then
            echo "✅ $service_name is ready!"
            return 0
        fi
        
        if [ $attempt -eq $max_attempts ]; then
            echo "❌ $service_name failed to start after $max_attempts attempts"
            return 1
        fi
        
        echo "   Attempt $attempt/$max_attempts - waiting..."
        sleep 2
        ((attempt++))
    done
}

# Function to start a service in the background
start_service() {
    local service_name=$1
    local service_dir=$2
    local port=$3
    
    echo "🔧 Starting $service_name..."
    
    cd "$service_dir"
    
    # Check if package.json exists
    if [ ! -f "package.json" ]; then
        echo "❌ package.json not found in $service_dir"
        return 1
    fi
    
    # Install dependencies if node_modules doesn't exist
    if [ ! -d "node_modules" ]; then
        echo "📦 Installing dependencies for $service_name..."
        npm install --silent
    fi
    
    # Start the service in background
    npm run dev > "logs/$service_name.log" 2>&1 &
    local pid=$!
    
    echo "🆔 $service_name PID: $pid"
    echo $pid > "pids/$service_name.pid"
    
    # Return to original directory
    cd - > /dev/null
    
    # Wait for service to be ready
    wait_for_service "$service_name" $port
    
    return $?
}

# Create necessary directories
mkdir -p logs pids

echo ""
echo "1️⃣ Starting Infrastructure Services..."
echo "======================================"

# Check if Redis is running
if ! pgrep -f redis-server > /dev/null; then
    echo "🔴 Redis is not running. Starting Redis..."
    redis-server --daemonize yes --port 6379 > /dev/null 2>&1 || {
        echo "❌ Failed to start Redis. Please install Redis or start it manually."
        exit 1
    }
    echo "✅ Redis started"
else
    echo "✅ Redis is already running"
fi

# Check if PostgreSQL is running
if ! pgrep -f postgres > /dev/null; then
    echo "🔴 PostgreSQL is not running. Please start PostgreSQL manually."
    echo "   You can start it with: brew services start postgresql"
    exit 1
else
    echo "✅ PostgreSQL is running"
fi

echo ""
echo "2️⃣ Starting Microservices..."
echo "=============================="

# Array of services to start (name, directory, port)
services=(
    "Identity-Service microservices/patient-identity-service 3001"
    "Case-Service microservices/case-management-service 3002"
    "AI-Service microservices/ai-analysis-service 3003"
    "Professional-Service microservices/professional-service 3004"
    "Notification-Service microservices/notification-service 3005"
)

# Start each microservice
for service_info in "${services[@]}"; do
    IFS=' ' read -r name dir port <<< "$service_info"
    
    # Skip if service directory doesn't exist
    if [ ! -d "$dir" ]; then
        echo "⚠️  Skipping $name - directory not found: $dir"
        continue
    fi
    
    if start_service "$name" "$dir" "$port"; then
        echo "✅ $name started successfully"
    else
        echo "❌ Failed to start $name"
        echo "   Check logs/$name.log for details"
    fi
    
    echo ""
done

echo ""
echo "3️⃣ Starting API Gateway..."
echo "=========================="

# Start API Gateway
if [ -d "api-gateway" ]; then
    if start_service "API-Gateway" "api-gateway" "3000"; then
        echo "✅ API Gateway started successfully"
    else
        echo "❌ Failed to start API Gateway"
        echo "   Check logs/API-Gateway.log for details"
        exit 1
    fi
else
    echo "⚠️  API Gateway directory not found"
fi

echo ""
echo "4️⃣ Platform Status Check..."
echo "==========================="

# Check all services
services_status=(
    "API Gateway:3000"
    "Identity Service:3001" 
    "Case Service:3002"
    "AI Service:3003"
    "Professional Service:3004"
    "Notification Service:3005"
)

all_healthy=true

for service_status in "${services_status[@]}"; do
    IFS=':' read -r name port <<< "$service_status"
    
    if curl -s -f http://localhost:$port/health >/dev/null 2>&1; then
        echo "✅ $name (port $port) - Healthy"
    else
        echo "❌ $name (port $port) - Unhealthy"
        all_healthy=false
    fi
done

echo ""
if [ "$all_healthy" = true ]; then
    echo "🎉 SUCCESS! Second Opinion Platform is fully operational!"
    echo ""
    echo "📡 Access Points:"
    echo "  • API Gateway:          http://localhost:3000"
    echo "  • API Documentation:    http://localhost:3000/api/docs"
    echo "  • Health Check:         http://localhost:3000/health"
    echo "  • Metrics:              http://localhost:3000/metrics"
    echo ""
    echo "🔧 Individual Services:"
    echo "  • Identity Service:     http://localhost:3001/health"
    echo "  • Case Service:         http://localhost:3002/health"
    echo "  • AI Service:           http://localhost:3003/health"
    echo "  • Professional Service: http://localhost:3004/health"
    echo "  • Notification Service: http://localhost:3005/health"
    echo ""
    echo "📊 Monitoring (if started):"
    echo "  • Prometheus:           http://localhost:9090"
    echo "  • Grafana:              http://localhost:3001"
    echo "  • Jaeger:               http://localhost:16686"
    echo ""
    echo "🛑 To stop all services, run: ./stop-platform.sh"
else
    echo "⚠️  Some services are not healthy. Check the logs in the logs/ directory."
    echo "🔍 Common issues:"
    echo "  • Database connection failures"
    echo "  • Port conflicts"
    echo "  • Missing environment variables"
    echo "  • Dependency issues"
fi

echo ""
echo "📝 Logs are available in the logs/ directory"
echo "🆔 Process IDs are stored in the pids/ directory"