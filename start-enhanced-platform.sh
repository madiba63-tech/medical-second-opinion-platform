#!/bin/bash

echo "🔐 Starting Second Opinion Platform v2.0 - Enhanced with Authentication"
echo "======================================================================"

# Create directories
mkdir -p logs pids

# Function to start enhanced services
start_enhanced_service() {
    local service_name=$1
    local service_path=$2
    local service_file=$3
    local port=$4
    
    echo "🚀 Starting $service_name on port $port..."
    
    cd "$service_path"
    node "$service_file" > "../../logs/$service_name.log" 2>&1 &
    local pid=$!
    echo $pid > "../../pids/$service_name.pid"
    echo "   PID: $pid"
    cd - > /dev/null
    
    sleep 2
}

# Stop any existing services
echo "🛑 Stopping existing services..."
./stop-microservices.sh > /dev/null 2>&1

echo ""
echo "1️⃣ Starting Enhanced Identity Service..."
echo "========================================"
start_enhanced_service "identity-service" "microservices/patient-identity-service" "enhanced-server.js" 3001

echo ""
echo "2️⃣ Starting Other Microservices..."
echo "================================="
start_enhanced_service "case-service" "microservices/case-management-service" "simple-server.js" 3002
start_enhanced_service "ai-service" "microservices/ai-analysis-service" "simple-server.js" 3003
start_enhanced_service "professional-service" "microservices/professional-service" "simple-server.js" 3004
start_enhanced_service "notification-service" "microservices/notification-service" "simple-server.js" 3005

echo ""
echo "3️⃣ Starting Enhanced API Gateway..."
echo "===================================="
echo "🌐 Starting Enhanced Gateway on port 3000..."
node enhanced-gateway.js > logs/enhanced-gateway.log 2>&1 &
gateway_pid=$!
echo $gateway_pid > pids/enhanced-gateway.pid
echo "   PID: $gateway_pid"

# Wait for services to initialize
echo ""
echo "⏳ Waiting for services to initialize..."
sleep 8

# Health check all services
echo ""
echo "4️⃣ Testing Service Health..."
echo "============================"

services=(
    "Enhanced-Gateway:3000"
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
    echo "🎉 SUCCESS! Enhanced Platform v2.0 is operational!"
    echo ""
    echo "🌐 Enhanced Platform Access:"
    echo "  • API Gateway:           http://localhost:3000"
    echo "  • API Documentation:     http://localhost:3000/api/docs" 
    echo "  • Service Health:        http://localhost:3000/health/services"
    echo ""
    echo "🔐 Authentication Endpoints:"
    echo "  • User Registration:     POST http://localhost:3000/api/v1/auth/register"
    echo "  • User Login:            POST http://localhost:3000/api/v1/auth/login"
    echo "  • Get Profile:           GET  http://localhost:3000/api/v1/auth/me"
    echo "  • Refresh Token:         POST http://localhost:3000/api/v1/auth/refresh"
    echo ""
    echo "👤 Demo User Account:"
    echo "  • Email:    demo@example.com"
    echo "  • Password: demo123"
    echo ""
    echo "📋 Quick Test Commands:"
    echo "  # Test login"
    echo '  curl -X POST http://localhost:3000/api/v1/auth/login \\'
    echo '    -H "Content-Type: application/json" \\'
    echo '    -d {"email":"demo@example.com","password":"demo123"}'
    echo ""
    echo "  # Test service health through gateway"
    echo "  curl -s http://localhost:3000/health/services | jq"
    echo ""
    echo "🛑 To stop platform: ./stop-microservices.sh"
else
    echo "⚠️ Some services are not healthy"
    echo "📝 Check logs in ./logs/ for details"
fi

echo ""
echo "📊 Platform Features:"
echo "  ✅ Microservices Architecture"
echo "  ✅ API Gateway with Service Routing"  
echo "  ✅ JWT Authentication & Authorization"
echo "  ✅ User Registration & Login"
echo "  ✅ Token Refresh & Session Management"
echo "  ✅ Health Monitoring & Aggregation"
echo "  ✅ Request Logging & Error Handling"
echo "  ✅ CORS Support & Security Headers"