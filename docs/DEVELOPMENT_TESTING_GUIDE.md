# Development Environment Testing Guide

## Overview

This guide provides comprehensive testing procedures for the Second Opinion Platform development environment. Use these tests to verify all major functionality before deploying to staging or production.

## Prerequisites

1. **Development environment running**:
   ```bash
   ./scripts/start-dev.sh
   ```

2. **All services healthy** on ports 4000-4010:
   - Frontend: http://localhost:4000
   - Patient Identity: http://localhost:4001  
   - Case Management: http://localhost:4002
   - AI Analysis: http://localhost:4003
   - Professional Service: http://localhost:4004
   - Notifications: http://localhost:4005
   - Professional Recruitment: http://localhost:4006
   - Payment & Billing: http://localhost:4007
   - Professional Workplace: http://localhost:4008
   - Admin Management: http://localhost:4009
   - Workflow Engine: http://localhost:4010

## Testing Methods

### 🤖 Automated Testing

Run comprehensive automated tests covering all major scenarios:

```bash
# Run full automated test suite
node test-development-environment.js

# View test results
cat development-test-report.json
```

**What it tests:**
- ✅ Service health checks (all 10 microservices)
- ✅ User registration and authentication
- ✅ Medical case submission
- ✅ Professional registration and login
- ✅ Notification system
- ✅ Workflow engine integration
- ✅ Payment system (mock mode)

### 🧪 Manual Testing

Interactive testing guide for detailed verification:

```bash
# Interactive testing menu
./test-manual-scenarios.sh

# Run all manual scenarios
./test-manual-scenarios.sh --all

# Run specific scenario
./test-manual-scenarios.sh 3  # Case submission testing
```

## Major Test Scenarios

### 1. 🏥 Service Health & Infrastructure

**Automated**: `node test-development-environment.js`

**Manual verification**:
```bash
# Check all service health endpoints
for port in {4000..4010}; do
  curl -s http://localhost:$port/health | jq '.'
done

# Check database connectivity
docker exec second-opinion-dev-postgres pg_isready -U dev_user

# Check Redis connectivity  
docker exec second-opinion-dev-redis redis-cli -a dev_redis_password ping
```

### 2. 👤 User Management & Authentication

**Test user registration**:
```bash
curl -X POST http://localhost:4001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@dev.com",
    "password": "TestPass123!",
    "name": "Test User",
    "confirmPassword": "TestPass123!"
  }'
```

**Test user login**:
```bash
curl -X POST http://localhost:4001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@dev.com", 
    "password": "TestPass123!"
  }'
```

**Frontend testing**:
- Navigate to http://localhost:4000/register
- Complete registration form
- Login at http://localhost:4000/login
- Verify user dashboard access

### 3. 📋 Medical Case Management

**API testing**:
```bash
# Submit a test case (requires auth token)
curl -X POST http://localhost:4002/api/v1/cases \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Test Medical Case",
    "description": "Patient experiencing chest pain",
    "urgency": "MEDIUM",
    "symptoms": ["chest pain", "shortness of breath"],
    "medicalHistory": "Hypertension"
  }'
```

**Frontend testing**:
- Login as patient user
- Navigate to http://localhost:4000/submit-case
- Fill out case submission form
- Upload medical documents
- Verify case confirmation

### 4. 👨‍⚕️ Professional Registration

**Dual-Path Testing**:

**AI-Assisted Path**:
- Navigate to http://localhost:4000/professional/apply
- Upload CV document (PDF)
- Review AI-extracted data
- Complete remaining fields
- Submit application

**Manual Path**:
- Choose manual entry option
- Fill out all professional details step-by-step
- Complete specialization forms
- Submit application

**API testing**:
```bash
curl -X POST http://localhost:4006/api/v1/professionals/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "doctor@dev.com",
    "password": "DocPass123!",
    "name": "Dr. Test Professional",
    "licenseNumber": "MD123456",
    "specialization": "Cardiology",
    "yearsOfExperience": 10
  }'
```

### 5. 🔄 Workflow Engine Testing

**Test workflow initiation**:
```bash
curl -X POST http://localhost:4010/api/v1/workflows/start \
  -H "Content-Type: application/json" \
  -d '{
    "caseId": "test-case-id",
    "workflowType": "CASE_REVIEW", 
    "priority": "MEDIUM"
  }'
```

**Workflow scenarios**:
- Case submission triggers professional assignment
- Professional review workflow
- Admin approval processes
- Notification delivery

### 6. 💳 Payment System (Mock Mode)

Development environment uses **mock payments** (`ENABLE_MOCK_PAYMENTS=true`):

```bash
curl -X POST http://localhost:4007/api/v1/payments/create-intent \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "amount": 25000,
    "currency": "USD", 
    "description": "Second Opinion Consultation",
    "paymentMethod": "test_card"
  }'
```

**Frontend testing**:
- Navigate to payment section
- Use test card numbers
- Verify mock payment success
- Check payment history

### 7. 📢 Notification System

**Test email notifications**:
```bash
curl -X POST http://localhost:4005/api/v1/notifications/send \
  -H "Content-Type: application/json" \
  -d '{
    "recipient": "test@dev.com",
    "type": "EMAIL",
    "template": "welcome",
    "data": {"name": "Test User"}
  }'
```

**Notification triggers**:
- User registration confirmation
- Case submission acknowledgment  
- Professional application updates
- Case assignment notifications

### 8. 🔐 Admin Dashboard

**Access admin interface**:
- Navigate to http://localhost:4000/admin
- Login with admin credentials
- Test admin functionalities:
  - Case review and management
  - Professional application approvals
  - System analytics and reporting
  - User management

### 9. 🧪 Integration Testing

**Complete patient journey**:
1. Register as patient → Login
2. Submit medical case → Upload documents
3. Receive case confirmation → Track status
4. Get professional assignment → Receive review

**Complete professional journey**:
1. Register as professional → Verify credentials
2. Login to workplace portal → View assigned cases  
3. Review cases → Provide medical opinions
4. Submit reviews → Track completion

**Admin workflow**:
1. Login to admin dashboard → Monitor activity
2. Review professional applications → Approve/reject
3. Manage case assignments → Quality control
4. Generate reports → System analytics

## Expected Results

### ✅ Healthy System Indicators

- **All services return 200 OK** on health checks
- **Database connections successful**
- **User registration and login work** 
- **Case submission and retrieval functional**
- **Professional workflows operational**
- **Notifications being sent** (check logs)
- **Mock payments processing**
- **Admin dashboard accessible**

### 📊 Test Report Analysis

The automated test generates `development-test-report.json`:

```json
{
  "timestamp": "2025-01-15T10:30:00Z",
  "environment": "development", 
  "summary": {
    "total": 12,
    "passed": 12,
    "failed": 0,
    "successRate": "100.0%"
  }
}
```

**Target success rate**: 90%+

## Troubleshooting

### Common Issues

**Services not responding**:
```bash
# Restart development environment
./scripts/stop-dev.sh
./scripts/start-dev.sh

# Check service logs
tail -f logs/*.log
```

**Database connection errors**:
```bash
# Restart development databases
docker-compose -f docker-compose.dev-db.yml restart
```

**Port conflicts**:
```bash
# Check what's using development ports
netstat -tulpn | grep :400[0-9]
```

### Log Analysis

**Check service logs**:
```bash
# Application logs
tail -f logs/nextjs-frontend.log

# Service-specific logs  
tail -f logs/patient-identity-service.log
tail -f logs/case-management-service.log
```

**Database logs**:
```bash
docker logs second-opinion-dev-postgres
docker logs second-opinion-dev-redis
```

## Continuous Testing

### Development Workflow

1. **Before coding**: Run health checks
2. **After changes**: Run relevant test scenarios
3. **Before commits**: Run full automated test suite
4. **Weekly**: Complete manual testing scenarios

### Automation Integration

Add to your development workflow:

```bash
# Pre-commit hook
echo "node test-development-environment.js" >> .git/hooks/pre-commit

# Daily health check
echo "0 9 * * * cd /path/to/project && node test-development-environment.js" >> crontab
```

## Next Steps

After successful development testing:

1. **Staging deployment**: Use staging environment (ports 3000-3010)
2. **Production testing**: Comprehensive testing with real services  
3. **Performance testing**: Load testing and optimization
4. **Security testing**: Penetration testing and vulnerability assessment

---

**📋 Testing Checklist**:
- [ ] All services healthy
- [ ] User flows functional
- [ ] Professional workflows working
- [ ] Admin features operational  
- [ ] Integrations tested
- [ ] Error handling verified
- [ ] Performance acceptable
- [ ] Security measures active