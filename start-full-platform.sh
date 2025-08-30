#!/bin/bash

echo "🚀 Starting Second Opinion Platform v2.0 - Full Business Logic"
echo "=============================================================="

# Create directories
mkdir -p logs pids uploads

# Function to start enhanced services
start_service() {
    local service_name=$1
    local service_path=$2
    local service_file=$3
    local port=$4
    
    echo "🌟 Starting $service_name on port $port..."
    
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
start_service "identity-service" "microservices/patient-identity-service" "enhanced-server.js" 3001

echo ""
echo "2️⃣ Starting Enhanced Case Management Service..."
echo "=============================================="
start_service "case-service" "microservices/case-management-service" "enhanced-server.js" 3002

echo ""  
echo "3️⃣ Starting Basic AI Analysis Service..."
echo "======================================="
start_service "ai-service" "microservices/ai-analysis-service" "simple-server.js" 3003

echo ""
echo "4️⃣ Starting Enhanced Professional Service..."
echo "============================================"
start_service "professional-service" "microservices/professional-service" "enhanced-server.js" 3004

echo ""
echo "5️⃣ Starting Basic Notification Service..."
echo "========================================"
start_service "notification-service" "microservices/notification-service" "simple-server.js" 3005

echo ""
echo "6️⃣ Starting Basic API Gateway..."
echo "==============================="
echo "🌐 Starting Basic Gateway on port 3000..."
node basic-gateway.js > logs/gateway.log 2>&1 &
gateway_pid=$!
echo $gateway_pid > pids/gateway.pid
echo "   PID: $gateway_pid"

# Wait for services to initialize
echo ""
echo "⏳ Waiting for services to initialize..."
sleep 8

# Health check all services
echo ""
echo "7️⃣ Testing Service Health..."
echo "============================"

services=(
    "API-Gateway:3000"
    "Identity-Service:3001"
    "Case-Management:3002"
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
    echo "🎉 SUCCESS! Full Platform v2.0 with Business Logic is operational!"
    echo ""
    echo "🌐 Platform Access Points:"
    echo "  • API Gateway:           http://localhost:3000"
    echo "  • Service Health:        http://localhost:3000/health/services"
    echo ""
    echo "🔐 Authentication Service (Identity):"
    echo "  • Register User:         POST http://localhost:3001/api/v1/auth/register"
    echo "  • Login User:            POST http://localhost:3001/api/v1/auth/login"
    echo "  • Get Profile:           GET  http://localhost:3001/api/v1/auth/me"
    echo "  • Demo User:             demo@example.com / demo123"
    echo ""
    echo "📋 Case Management Service:"
    echo "  • Create Case:           POST http://localhost:3002/api/v1/cases"
    echo "  • Get Cases:             GET  http://localhost:3002/api/v1/cases"
    echo "  • Upload Documents:      POST http://localhost:3002/api/v1/cases/{id}/documents"
    echo "  • Submit Case:           POST http://localhost:3002/api/v1/cases/{id}/submit"
    echo "  • Case Statistics:       GET  http://localhost:3002/api/v1/cases/stats"
    echo ""
    echo "👩‍⚕️ Professional Service:"
    echo "  • Register Professional: POST http://localhost:3004/api/v1/professionals/register"
    echo "  • Login Professional:    POST http://localhost:3004/api/v1/professionals/login"  
    echo "  • Get Profile:           GET  http://localhost:3004/api/v1/professionals/me"
    echo "  • Update Availability:   PUT  http://localhost:3004/api/v1/professionals/availability"
    echo "  • Search Professionals:  GET  http://localhost:3004/api/v1/professionals/search"
    echo "  • Demo Professional:     dr.smith@hospital.com / doctor123"
    echo ""
    echo "🤖 AI Analysis Service:"
    echo "  • Service Ready:         http://localhost:3003/health"
    echo "  • (AI integration coming next)"
    echo ""
    echo "📧 Notification Service:"  
    echo "  • Service Ready:         http://localhost:3005/health"
    echo "  • (Notification features ready)"
    echo ""
    echo "📊 Quick Demo Commands:"
    echo ""
    echo "  # Register a new patient"
    echo '  curl -X POST http://localhost:3001/api/v1/auth/register \'
    echo '    -H "Content-Type: application/json" \'
    echo '    -d {"email":"patient@example.com","password":"pass123","firstName":"John","lastName":"Doe"}'
    echo ""
    echo "  # Create a medical case (after getting auth token)"
    echo '  curl -X POST http://localhost:3002/api/v1/cases \'
    echo '    -H "Content-Type: application/json" \'
    echo '    -H "Authorization: Bearer YOUR_TOKEN" \'
    echo '    -d {"title":"Chest Pain","description":"Experiencing chest pain","category":"CARDIOLOGY","firstName":"John","lastName":"Doe","dateOfBirth":"1985-01-01","email":"patient@example.com"}'
    echo ""
    echo "  # Register a medical professional"
    echo '  curl -X POST http://localhost:3004/api/v1/professionals/register \'
    echo '    -H "Content-Type: application/json" \'
    echo '    -d {"email":"doctor@hospital.com","password":"doc123","firstName":"Dr. Jane","lastName":"Smith","title":"MD","specialization":["CARDIOLOGY"],"licenseNumber":"MD456789","licenseState":"CA","hospitalAffiliation":"General Hospital","yearsOfExperience":10}'
    echo ""
    echo "🛑 To stop platform: ./stop-microservices.sh"
else
    echo "⚠️ Some services are not healthy"
    echo "📝 Check logs in ./logs/ for details"
fi

echo ""
echo "📊 Platform Features Now Available:"
echo "  ✅ Complete User Authentication & Authorization"
echo "  ✅ Full Case Management (Create, Update, Submit, Track)"  
echo "  ✅ Document Upload & Management"
echo "  ✅ Professional Registration & Onboarding"
echo "  ✅ Professional Credential Management"
echo "  ✅ Case Assignment & Availability Management"
echo "  ✅ Professional Search & Discovery"
echo "  ✅ Comprehensive API with JWT Security"
echo "  ✅ Multi-role System (Patients & Professionals)"
echo "  ✅ Real-time Health Monitoring"
echo "  ✅ Structured Medical Data Management"
echo "  ✅ File Upload & Processing Pipeline"
echo ""
echo "🔮 Coming Next:"
echo "  • Database Integration (PostgreSQL)"
echo "  • Frontend Integration (Next.js)"
echo "  • AI Analysis Service"
echo "  • Real-time Notifications"