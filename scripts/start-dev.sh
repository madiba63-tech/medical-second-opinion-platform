#!/bin/bash

echo "🚀 Starting Second Opinion Platform - DEVELOPMENT Environment"
echo "================================================================"

# Set development environment
export NODE_ENV=development
export DATABASE_URL="postgresql://dev_user:dev_password@localhost:5433/secondopinion_dev?schema=public"
export JWT_SECRET="dev-jwt-secret-for-development-32-chars"
export REDIS_PASSWORD="dev_redis_password"

echo "🔧 Development Environment Configuration:"
echo "  • Database: PostgreSQL (localhost:5433/secondopinion_dev)"
echo "  • Redis: localhost:6380 with dev authentication"
echo "  • Frontend: http://localhost:4000"
echo "  • Services: http://localhost:4001-4010"
echo ""

echo "⚠️  DEVELOPMENT MODE - Safe for testing and development"
echo "⚠️  Uses separate database and ports from staging"
echo ""

# Start development databases using Docker
echo "🗄️ Starting development databases..."
docker compose -f docker-compose.dev-db.yml up -d

# Wait for databases to be ready
echo "⏳ Waiting for databases to be ready..."
sleep 5

# Check if databases are ready
if docker exec second-opinion-dev-postgres pg_isready -U dev_user -d secondopinion_dev >/dev/null 2>&1; then
    echo "✅ Development PostgreSQL is ready"
else
    echo "❌ Development PostgreSQL failed to start"
    exit 1
fi

if docker exec second-opinion-dev-redis redis-cli -a "dev_redis_password" ping >/dev/null 2>&1; then
    echo "✅ Development Redis is ready"
else
    echo "❌ Development Redis failed to start"
    exit 1
fi

echo ""
echo "🎯 Starting Development Services..."

# Development service URLs
export FRONTEND_URL="http://localhost:4000"
export PATIENT_IDENTITY_SERVICE_URL="http://localhost:4001"
export CASE_MANAGEMENT_SERVICE_URL="http://localhost:4002" 
export AI_ANALYSIS_SERVICE_URL="http://localhost:4003"
export PROFESSIONAL_SERVICE_URL="http://localhost:4004"
export NOTIFICATION_SERVICE_URL="http://localhost:4005"
export FILE_MANAGEMENT_SERVICE_URL="http://localhost:4006"
export PAYMENT_BILLING_SERVICE_URL="http://localhost:4007"
export PROFESSIONAL_WORKPLACE_SERVICE_URL="http://localhost:4008"
export ADMIN_MANAGEMENT_SERVICE_URL="http://localhost:4009"
export WORKFLOW_ENGINE_SERVICE_URL="http://localhost:4010"

# Feature flags for development
export ENABLE_DEBUG_LOGGING=true
export ENABLE_MOCK_PAYMENTS=true
export SKIP_EMAIL_VERIFICATION=true

echo "🌐 Starting Frontend on port 4000..."
PORT=4000 npm run dev &
sleep 2

echo "🔐 Starting Patient Identity Service on port 4001..."
cd microservices/patient-identity-service && PORT=4001 DATABASE_URL="$DATABASE_URL" JWT_SECRET="$JWT_SECRET" node identity-server.js &
cd - >/dev/null
sleep 1

echo "📋 Starting Case Management Service on port 4002..."
cd microservices/case-management-service && PORT=4002 DATABASE_URL="$DATABASE_URL" JWT_SECRET="$JWT_SECRET" node case-server.js &
cd - >/dev/null
sleep 1

echo "🤖 Starting AI Analysis Service on port 4003..."
cd microservices/ai-analysis-service && PORT=4003 DATABASE_URL="$DATABASE_URL" JWT_SECRET="$JWT_SECRET" node ai-server.js &
cd - >/dev/null
sleep 1

echo "👨‍⚕️ Starting Professional Service on port 4004..."
cd microservices/professional-service && PORT=4004 DATABASE_URL="$DATABASE_URL" JWT_SECRET="$JWT_SECRET" node professional-server.js &
cd - >/dev/null
sleep 1

echo "📢 Starting Notification Service on port 4005..."
cd microservices/notification-service && PORT=4005 DATABASE_URL="$DATABASE_URL" JWT_SECRET="$JWT_SECRET" node notification-server.js &
cd - >/dev/null
sleep 1

echo "📁 Starting File Management Service on port 4006..."
cd microservices/file-management-service && PORT=4006 DATABASE_URL="$DATABASE_URL" JWT_SECRET="$JWT_SECRET" node file-server.js &
cd - >/dev/null
sleep 1

echo "💳 Starting Payment & Billing Service on port 4007..."
cd microservices/payment-billing-service && PORT=4007 DATABASE_URL="$DATABASE_URL" JWT_SECRET="$JWT_SECRET" node payment-billing-server.js &
cd - >/dev/null
sleep 1

echo "🏢 Starting Professional Workplace Service on port 4008..."
cd microservices/professional-workplace-service && PORT=4008 DATABASE_URL="$DATABASE_URL" JWT_SECRET="$JWT_SECRET" node workplace-server.js &
cd - >/dev/null
sleep 1

echo "⚙️ Starting Admin Management Service on port 4009..."
cd microservices/admin-management-service && PORT=4009 DATABASE_URL="$DATABASE_URL" JWT_SECRET="$JWT_SECRET" NOTIFICATION_SERVICE_URL="$NOTIFICATION_SERVICE_URL" WORKFLOW_SERVICE_URL="$WORKFLOW_ENGINE_SERVICE_URL" node admin-server.js &
cd - >/dev/null
sleep 1

echo "🔄 Starting Workflow Engine Service on port 4010..."
cd microservices/workflow-engine-service && PORT=4010 DATABASE_URL="$DATABASE_URL" JWT_SECRET="$JWT_SECRET" REDIS_PASSWORD="$REDIS_PASSWORD" node workflow-server.js &
cd - >/dev/null

echo ""
echo "✅ Development environment started successfully!"
echo "🌐 Access your development platform at: http://localhost:4000"
echo ""
echo "🔧 Development Services:"
echo "  • Frontend:              http://localhost:4000"
echo "  • Patient Identity:      http://localhost:4001"
echo "  • Case Management:       http://localhost:4002"
echo "  • AI Analysis:           http://localhost:4003"
echo "  • Professional Service:  http://localhost:4004"
echo "  • Notifications:         http://localhost:4005"
echo "  • File Management:       http://localhost:4006"
echo "  • Payment & Billing:     http://localhost:4007"
echo "  • Professional Workplace: http://localhost:4008"
echo "  • Admin Management:      http://localhost:4009"
echo "  • Workflow Engine:       http://localhost:4010"
echo ""
echo "📊 Development Databases:"
echo "  • PostgreSQL: localhost:5433/secondopinion_dev (dev_user/dev_password)"
echo "  • Redis: localhost:6380 (password: dev_redis_password)"