# Medical Second Opinion Platform - Case Submission API

## Overview

The Case Submission API provides comprehensive endpoints for managing medical case submissions with integrated customer lifecycle management. This API enables secure case submission, real-time analytics, document management, and webhook-based event processing.

## 🚀 Features

- **Secure Case Submission**: End-to-end encrypted case submission with comprehensive validation
- **Customer Lifecycle Integration**: Automatic stage updates, persona analysis, and segmentation
- **Real-time Analytics**: Detailed submission metrics and customer behavior insights
- **Document Management**: Secure medical document upload and processing
- **Webhook Events**: Real-time event notifications for lifecycle management
- **Rate Limiting**: Built-in protection against abuse with configurable limits
- **Comprehensive Validation**: Multi-layer validation with business rule enforcement

## 📋 API Endpoints

### Base URL
```
Production: https://api.medical-second-opinion.com
Staging: https://staging-api.medical-second-opinion.com  
Development: http://localhost:3000
```

### Authentication
All endpoints (except health checks and webhooks) require JWT authentication:
```
Authorization: Bearer <your-jwt-token>
```

## 🔗 Endpoints

### 1. Case Submission

#### POST `/api/v1/customer/case-submission/submit`
Submit a new medical case for second opinion analysis.

**Rate Limit:** 5 requests per minute

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Smith", 
  "dateOfBirth": "1980-05-15",
  "email": "john.smith@email.com",
  "phone": "+1234567890",
  "customerId": "123e4567-e89b-12d3-a456-426614174000",
  "diseaseType": "Breast Cancer",
  "gender": "male",
  "ethnicity": "white",
  "isFirstOccurrence": true,
  "geneticFamilyHistory": "{\"mother\": \"breast_cancer\"}",
  "paymentId": "pay_1234567890",
  "consentAccepted": true,
  "uploadedFiles": ["documents/case-123/report.pdf"],
  "submissionSource": "web",
  "timezone": "America/New_York"
}
```

**Response:**
```json
{
  "success": true,
  "caseId": "456e7890-e12b-34d5-a678-901234567890",
  "caseNumber": "CASE-1234567890-ABC123",
  "metrics": {
    "submissionId": "sub_1705312800_abc123def",
    "isFirstSubmission": true,
    "personaAnalyzed": true,
    "lifecycleStageUpdated": true,
    "communicationsSent": ["welcome_email"],
    "automationTriggered": ["onboarding_sequence"],
    "healthScoreImpact": 25,
    "segmentationUpdated": true
  },
  "lifecycleEvents": [
    "lifecycle_stage_updated_to_onboarding",
    "persona_analysis_completed",
    "onboarding_automation_triggered"
  ],
  "message": "Case CASE-1234567890-ABC123 submitted successfully...",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 2. Pre-submission Validation

#### GET `/api/v1/customer/case-submission/validate`
Validate case submission data before actual submission.

**Rate Limit:** 20 requests per minute

**Query Parameters:**
- `customerId` (required): Customer ID to validate
- `email` (optional): Email to validate against customer record
- `diseaseType` (optional): Disease type for duplicate checking
- `checkDuplicates` (optional): Whether to check for duplicates (default: true)
- `duplicateCheckDays` (optional): Days to look back for duplicates (default: 7)

**Response:**
```json
{
  "success": true,
  "isValid": true,
  "errors": [],
  "warnings": ["Phone number recommended for urgent communications"],
  "recommendations": ["Disease type helps with professional matching"],
  "duplicateCheck": {
    "hasDuplicates": false,
    "duplicateCount": 0
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 3. Submission Analytics

#### GET `/api/v1/customer/case-submission/analytics`
Get comprehensive submission analytics and insights.

**Rate Limit:** 50 requests per minute

**Query Parameters:**
- `customerId` (optional): Specific customer ID for analytics
- `dateFrom` (optional): Start date for analytics range
- `dateTo` (optional): End date for analytics range
- `groupBy` (optional): How to group data (day, week, month, disease_type, persona)
- `metrics` (optional): Comma-separated list of specific metrics
- `page`, `limit`, `sortBy`, `sortOrder`: Pagination parameters

**Response:**
```json
{
  "success": true,
  "data": {
    "totalSubmissions": 1250,
    "uniqueCustomers": 987,
    "firstTimeSubmissions": 654,
    "returningSubmissions": 596,
    "diseaseTypeDistribution": {
      "Breast Cancer": 312,
      "Lung Cancer": 198,
      "Colon Cancer": 156
    },
    "averageSubmissionsPerCustomer": 1.27,
    "conversionRate": 0.85,
    "retentionRate": 0.48,
    "growthRate": 0.15,
    "timeframe": {
      "from": "2024-01-01",
      "to": "2024-01-31"
    },
    "timeSeries": [
      {
        "date": "2024-01-01",
        "count": 45,
        "uniqueCustomers": 42
      }
    ]
  },
  "pagination": {
    "page": 1,
    "limit": 25,
    "total": 1250,
    "totalPages": 50,
    "hasNext": true,
    "hasPrev": false
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 4. Document Upload

#### POST `/api/v1/customer/case-submission/upload-documents`
Upload and associate medical documents with cases.

**Rate Limit:** 10 requests per 5 minutes

**Request Body:**
```json
{
  "customerId": "123e4567-e89b-12d3-a456-426614174000",
  "caseId": "456e7890-e12b-34d5-a678-901234567890",
  "associateWithCase": true,
  "files": [
    {
      "s3Key": "documents/case-456/pathology_report.pdf",
      "filename": "pathology_report.pdf", 
      "mimetype": "application/pdf",
      "size": 2048576,
      "category": "pathology"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "uploadedFiles": [
    {
      "id": "789e0123-e45f-67g8-h901-234567890123",
      "s3Key": "documents/case-456/pathology_report.pdf",
      "filename": "pathology_report.pdf",
      "size": 2048576,
      "category": "pathology",
      "uploadedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "caseAssociation": {
    "caseId": "456e7890-e12b-34d5-a678-901234567890"
  },
  "message": "1 document(s) uploaded successfully and associated with case CASE-1234567890-ABC123",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 5. Lifecycle Webhooks

#### POST `/api/v1/customer/case-submission/webhooks/lifecycle`
Receive and process customer lifecycle events.

**Rate Limit:** 100 requests per minute

**Headers:**
- `x-webhook-signature`: HMAC-SHA256 signature (required)
- `x-webhook-timestamp`: Unix timestamp (required)
- `x-webhook-id`: Unique delivery ID (optional)

**Request Body:**
```json
{
  "eventType": "case.submitted",
  "customerId": "123e4567-e89b-12d3-a456-426614174000",
  "caseId": "456e7890-e12b-34d5-a678-901234567890",
  "data": {
    "caseNumber": "CASE-1234567890-ABC123",
    "diseaseType": "Breast Cancer",
    "isFirstSubmission": true,
    "personaType": "informed_advocator"
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "retryCount": 0
}
```

**Response:**
```json
{
  "success": true,
  "eventId": "evt_1234567890abcdef",
  "processed": true,
  "actions": [
    "lifecycle_updated",
    "communication_sent",
    "automation_triggered"
  ],
  "processingTime": 150,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 6. Health Check

#### GET `/api/v1/customer/case-submission/health`
Check API health status and dependencies.

**Rate Limit:** None

**Response:**
```json
{
  "success": true,
  "status": "healthy",
  "services": {
    "database": true,
    "redis": true,
    "s3": true,
    "customerLifecycle": true
  },
  "uptime": 86400,
  "memory": {
    "rss": 52428800,
    "heapTotal": 41943040,
    "heapUsed": 30457856,
    "external": 2097152
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 🔧 Implementation Details

### Rate Limiting

Different endpoints have specific rate limits:

| Endpoint Type | Limit | Window |
|---------------|-------|--------|
| Submission | 5 requests | 1 minute |
| Validation | 20 requests | 1 minute |
| Analytics | 50 requests | 1 minute |
| Upload | 10 requests | 5 minutes |
| Webhooks | 100 requests | 1 minute |

### Authentication & Authorization

- **JWT Authentication**: All user-facing endpoints require JWT tokens
- **API Key Authentication**: Internal services use API key authentication
- **Webhook Signatures**: Webhooks use HMAC-SHA256 signature verification
- **Customer Authorization**: Users can only access their own data

### Error Handling

All errors follow a consistent format:

```json
{
  "success": false,
  "error": "Human-readable error message",
  "details": {
    "validationErrors": ["Field-specific errors"],
    "additionalContext": "..."
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "path": "/api/v1/...",
  "statusCode": 400
}
```

### Validation

The API uses Zod schemas for comprehensive validation:

- **Type Safety**: Runtime type checking and validation
- **Business Rules**: Medical data-specific validation rules
- **Security**: Input sanitization and constraint validation
- **User Experience**: Clear error messages with specific field guidance

### Customer Lifecycle Integration

Case submissions trigger comprehensive lifecycle events:

1. **Customer Onboarding**: First-time submissions trigger onboarding flows
2. **Persona Analysis**: Automatic customer persona detection and segmentation
3. **Communication Automation**: Personalized email and SMS sequences
4. **Health Score Updates**: Customer engagement scoring and tracking
5. **Segmentation Updates**: Dynamic customer segment assignment

### File Management

Document uploads are handled securely:

- **S3 Integration**: Files stored in encrypted S3 buckets
- **File Validation**: MIME type and size validation
- **Category Classification**: Medical document categorization
- **Processing Queue**: Automatic AI analysis queue integration
- **Access Control**: Customer-scoped file access

## 🔒 Security Features

### Authentication Security
- JWT token expiration and refresh
- Rate limiting per user and IP
- API key rotation capabilities
- Session management and logout

### Data Security
- AES-256 encryption at rest
- TLS 1.3 in transit
- HIPAA-compliant data handling
- PII data anonymization options

### Webhook Security  
- HMAC-SHA256 signature verification
- Timestamp validation (5-minute window)
- Event deduplication
- Retry mechanism with exponential backoff

## 📊 Monitoring & Analytics

### Metrics Collection
- Request/response times
- Error rates and types
- Customer behavior patterns
- System resource utilization

### Observability
- Structured logging with correlation IDs
- Health check endpoints
- Performance monitoring
- Alert thresholds

## 🚦 Testing

### Test Coverage
- Unit tests for all validation logic
- Integration tests for API endpoints
- Contract tests for webhook consumers
- Load tests for rate limiting

### Test Data
- Comprehensive test scenarios
- Mock data generation
- Sanitized production data samples
- Edge case coverage

## 📝 Development Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 6+ (optional)
- AWS S3 access

### Environment Variables
```bash
DATABASE_URL="postgresql://..."
JWT_SECRET="your-jwt-secret"
WEBHOOK_SECRET="your-webhook-secret"
INTERNAL_API_KEY="your-internal-api-key"
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_REGION="us-east-1"
```

### Installation
```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

## 📚 Additional Resources

- [OpenAPI/Swagger Documentation](./swagger.json)
- [Postman Collection](./postman-collection.json)
- [SDK Documentation](./sdk-docs/)
- [Webhook Integration Guide](./webhook-guide.md)

## 🐛 Support

For API support or questions:
- Email: support@medical-second-opinion.com
- Documentation: https://docs.medical-second-opinion.com
- Status Page: https://status.medical-second-opinion.com

---

**Version:** 1.0.0  
**Last Updated:** August 28, 2024  
**API Specification:** OpenAPI 3.0