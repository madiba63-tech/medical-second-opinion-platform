#!/bin/bash

echo "🚀 Starting Second Opinion Platform v2.0 - Microservices"
echo "========================================================"

# Function to wait for service health
wait_for_health() {
    local service_name=$1
    local port=$2
    local max_attempts=20
    local attempt=1
    
    echo "⏳ Waiting for $service_name on port $port..."
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s -f "http://localhost:$port/health" > /dev/null 2>&1; then
            echo "✅ $service_name is healthy"
            return 0
        fi
        
        echo "   Attempt $attempt/$max_attempts..."
        sleep 3
        ((attempt++))
    done
    
    echo "❌ $service_name failed to start"
    return 1
}

# Create directories
mkdir -p logs pids

# Start services in background and track PIDs
echo ""
echo "1️⃣ Starting Identity Service (port 3001)..."
cd microservices/patient-identity-service
npm install --silent > /dev/null 2>&1
npm run dev > ../../logs/identity-service.log 2>&1 &
identity_pid=$!
echo $identity_pid > ../../pids/identity-service.pid
echo "🆔 Identity Service PID: $identity_pid"
cd - > /dev/null

echo ""
echo "2️⃣ Starting Case Management Service (port 3002)..."
cd microservices/case-management-service
npm install --silent > /dev/null 2>&1
npm run dev > ../../logs/case-service.log 2>&1 &
case_pid=$!
echo $case_pid > ../../pids/case-service.pid
echo "🆔 Case Service PID: $case_pid"
cd - > /dev/null

echo ""
echo "3️⃣ Starting AI Analysis Service (port 3003)..."
cd microservices/ai-analysis-service
npm install --silent > /dev/null 2>&1
npm run dev > ../../logs/ai-service.log 2>&1 &
ai_pid=$!
echo $ai_pid > ../../pids/ai-service.pid
echo "🆔 AI Service PID: $ai_pid"
cd - > /dev/null

echo ""
echo "4️⃣ Starting Professional Service (port 3004)..."
cd microservices/professional-service
npm install --silent > /dev/null 2>&1
npm run dev > ../../logs/professional-service.log 2>&1 &
professional_pid=$!
echo $professional_pid > ../../pids/professional-service.pid
echo "🆔 Professional Service PID: $professional_pid"
cd - > /dev/null

echo ""
echo "5️⃣ Starting Notification Service (port 3005)..."
cd microservices/notification-service
npm install --silent > /dev/null 2>&1
npm run dev > ../../logs/notification-service.log 2>&1 &
notification_pid=$!
echo $notification_pid > ../../pids/notification-service.pid
echo "🆔 Notification Service PID: $notification_pid"
cd - > /dev/null

echo ""
echo "6️⃣ Starting API Gateway (port 3000)..."
node simple-api-gateway.js > logs/api-gateway.log 2>&1 &
gateway_pid=$!
echo $gateway_pid > pids/api-gateway.pid
echo "🆔 API Gateway PID: $gateway_pid"

echo ""
echo "🔍 Waiting for all services to be healthy..."
echo "============================================"

# Wait for each service (giving them time to start)
sleep 10

# Check health of all services
services=(
    "Identity-Service:3001"
    "Case-Service:3002" 
    "AI-Service:3003"
    "Professional-Service:3004"
    "Notification-Service:3005"
    "API-Gateway:3000"
)

all_healthy=true
for service_info in "${services[@]}"; do
    IFS=':' read -r name port <<< "$service_info"
    if ! wait_for_health "$name" "$port"; then
        all_healthy=false
    fi
done

echo ""
if [ "$all_healthy" = true ]; then
    echo "🎉 All services are running and healthy!"
    echo ""
    echo "🌐 Access Points:"
    echo "  • API Gateway:    http://localhost:3000"
    echo "  • Platform Health: http://localhost:3000/health"
    echo "  • Service Status:  http://localhost:3000/health/services"
    echo ""
    echo "🔧 Individual Services:"
    echo "  • Identity:       http://localhost:3001/health"
    echo "  • Case Mgmt:      http://localhost:3002/health"
    echo "  • AI Analysis:    http://localhost:3003/health"
    echo "  • Professional:   http://localhost:3004/health"
    echo "  • Notification:   http://localhost:3005/health"
    echo ""
    echo "📊 To stop all services: ./stop-microservices.sh"
else
    echo "⚠️ Some services failed to start properly"
    echo "📝 Check logs in ./logs/ directory for details"
fi

echo ""
echo "📝 Logs: ./logs/"
echo "🆔 PIDs: ./pids/"