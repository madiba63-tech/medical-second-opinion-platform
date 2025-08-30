#!/bin/bash

echo "🚀 Starting Second Opinion Platform - Simple Test Setup"
echo "======================================================="

# Create directories
mkdir -p logs pids

# Function to start a service
start_simple_service() {
    local service_name=$1
    local service_path=$2
    local port=$3
    
    echo "▶️ Starting $service_name on port $port..."
    
    cd "$service_path"
    node simple-server.js > "../../logs/$service_name.log" 2>&1 &
    local pid=$!
    echo $pid > "../../pids/$service_name.pid"
    echo "   PID: $pid"
    cd - > /dev/null
    
    sleep 1
}

# Start all microservices
echo ""
echo "1️⃣ Starting Microservices..."
echo "=============================="

start_simple_service "identity-service" "microservices/patient-identity-service" 3001
start_simple_service "case-service" "microservices/case-management-service" 3002 
start_simple_service "ai-service" "microservices/ai-analysis-service" 3003
start_simple_service "professional-service" "microservices/professional-service" 3004
start_simple_service "notification-service" "microservices/notification-service" 3005

# Start API Gateway
echo ""
echo "2️⃣ Starting API Gateway..."
echo "=========================="
echo "▶️ Starting Basic Gateway on port 3000..."
node basic-gateway.js > logs/gateway.log 2>&1 &
gateway_pid=$!
echo $gateway_pid > pids/gateway.pid
echo "   PID: $gateway_pid"

# Wait for all services to be ready
echo ""
echo "3️⃣ Waiting for services to be ready..."
echo "======================================="
sleep 5

# Test all services
echo ""
echo "4️⃣ Testing Service Health..."
echo "============================"

services=(
    "API-Gateway:3000"
    "Identity-Service:3001"
    "Case-Service:3002"
    "AI-Service:3003"
    "Professional-Service:3004"
    "Notification-Service:3005"
)

all_healthy=true
for service_info in "${services[@]}"; do
    IFS=':' read -r name port <<< "$service_info"
    
    if curl -s -f "http://localhost:$port/health" >/dev/null 2>&1; then
        echo "✅ $name (port $port) - Healthy"
    else
        echo "❌ $name (port $port) - Unhealthy"
        all_healthy=false
    fi
done

echo ""
if [ "$all_healthy" = true ]; then
    echo "🎉 SUCCESS! All services are running and healthy!"
    echo ""
    echo "🌐 Platform Access:"
    echo "  • API Gateway:         http://localhost:3000"
    echo "  • Service Health:      http://localhost:3000/health/services"
    echo ""
    echo "🔧 Individual Services:"
    echo "  • Identity Service:    http://localhost:3001"
    echo "  • Case Management:     http://localhost:3002"
    echo "  • AI Analysis:         http://localhost:3003"
    echo "  • Professional:        http://localhost:3004"
    echo "  • Notification:        http://localhost:3005"
    echo ""
    echo "🛑 To stop platform: ./stop-microservices.sh"
else
    echo "⚠️ Some services are not healthy"
    echo "📝 Check logs in ./logs/ for details"
fi

echo ""
echo "📊 Test the complete platform health:"
echo "curl -s http://localhost:3000/health/services | jq"