# Second Opinion Platform - Microservices Architecture v2.0

## Overview

This document provides an overview of the microservices architecture for the Second Opinion Platform, following the v2.0 cloud-agnostic requirements. The platform has been successfully decomposed from a Next.js monolith into domain-driven microservices.

## Architecture Summary

### From Monolith to Microservices
- **Previous**: Next.js monolith with SQLite, tightly coupled components
- **Current**: 5 core microservices with PostgreSQL 17, cloud-agnostic deployment
- **Benefits**: Independent scaling, better fault isolation, technology diversity, team autonomy

### Core Design Principles
- ✅ **Domain-Driven Design (DDD)**: Each service owns a specific business domain
- ✅ **Stateless Architecture**: Services are completely stateless with external session storage
- ✅ **Cloud-Agnostic**: Deployable on AWS, Azure, GCP, or on-premises
- ✅ **Database per Service**: Each microservice has its own PostgreSQL 17 database
- ✅ **Event-Driven Communication**: Async communication via Redis Pub/Sub and Kafka
- ✅ **API-First**: Well-defined REST APIs with comprehensive documentation

## Microservices Inventory

### 1. 🔐 Patient Identity Service
**Port**: 3001 | **Domain**: Authentication & Identity Management

**Responsibilities**:
- User registration and authentication
- JWT token management and validation
- Two-factor authentication (TOTP)
- Password reset and email verification
- Session management with Redis
- Security audit logging

**Key Technologies**:
- Node.js 22 + TypeScript + Express.js
- PostgreSQL 17 (user accounts, customer profiles)
- Redis (sessions, rate limiting)
- bcrypt + JWT for security
- Winston for structured logging

**API Endpoints**:
```
POST /api/v1/auth/register     - User registration
POST /api/v1/auth/login        - User authentication
POST /api/v1/auth/verify-email - Email verification
POST /api/v1/auth/forgot-password - Password reset request
POST /api/v1/auth/reset-password  - Password reset
GET  /api/v1/profile/me        - Get user profile
PUT  /api/v1/profile/me        - Update user profile
```

### 2. 📋 Case Management Service
**Port**: 3002 | **Domain**: Medical Case Lifecycle

**Responsibilities**:
- Medical case creation and management
- Document upload and storage (multi-cloud)
- Case status tracking and workflow
- Temporary case submissions (pre-registration)
- Case assignment to professionals
- Document processing and metadata extraction

**Key Technologies**:
- Node.js 22 + TypeScript + Express.js
- PostgreSQL 17 (cases, documents, assignments)
- Multi-cloud storage (AWS S3, Azure Blob, GCP Storage)
- Redis (caching, distributed locking)
- Sharp for image processing
- PDF parsing and OCR capabilities

**API Endpoints**:
```
POST /api/v1/cases             - Create new case
GET  /api/v1/cases             - List cases
GET  /api/v1/cases/:id         - Get case details
PUT  /api/v1/cases/:id         - Update case
PATCH /api/v1/cases/:id/status - Change case status
POST /api/v1/documents/upload  - Upload medical documents
GET  /api/v1/documents/:id     - Get document
```

### 3. 🤖 AI Analysis Service
**Port**: 3003 | **Domain**: Medical AI Analysis & Insights

**Responsibilities**:
- Medical document analysis using LLMs
- Symptom analysis and differential diagnosis
- Medical imaging interpretation
- Drug interaction checking
- Risk assessment and scoring
- Treatment recommendations
- AI model management and orchestration

**Key Technologies**:
- Node.js 22 + TypeScript + Express.js
- PostgreSQL 17 (analysis results, insights, models)
- OpenAI GPT-4, Anthropic Claude, Google Med-PaLM
- TensorFlow.js for custom models
- Bull queue for job processing
- Natural language processing libraries

**API Endpoints**:
```
POST /api/v1/analysis/document - Analyze medical document
POST /api/v1/analysis/symptoms - Analyze symptoms
POST /api/v1/analysis/imaging  - Analyze medical images
GET  /api/v1/analysis/:id      - Get analysis results
GET  /api/v1/insights/:caseId  - Get case insights
GET  /api/v1/models            - List available AI models
```

### 4. 👩‍⚕️ Professional Service
**Port**: 3004 | **Domain**: Medical Professional Management

**Responsibilities**:
- Medical professional registration and verification
- License and credential management
- Specialization and affiliation tracking
- Professional availability scheduling
- Peer reviews and ratings system
- Professional statistics and analytics

**Key Technologies**:
- Node.js 22 + TypeScript + Express.js
- PostgreSQL 17 (professionals, licenses, credentials)
- Redis (caching, sessions)
- JWT authentication for professionals
- Document verification workflows

**API Endpoints**:
```
POST /api/v1/professionals/register - Professional registration
POST /api/v1/professionals/verify   - Verify credentials
GET  /api/v1/professionals          - List professionals
GET  /api/v1/professionals/:id      - Get professional profile
PUT  /api/v1/professionals/:id      - Update profile
POST /api/v1/availability          - Set availability
GET  /api/v1/reviews/:professionalId - Get reviews
```

### 5. 📢 Notification Service
**Port**: 3005 | **Domain**: Multi-Channel Communication

**Responsibilities**:
- Multi-channel notifications (Email, SMS, Push, In-App)
- Real-time WebSocket connections
- Notification templates and personalization
- Delivery tracking and analytics
- Preference management and opt-outs
- Campaign management and scheduling

**Key Technologies**:
- Node.js 22 + TypeScript + Express.js + Socket.IO
- PostgreSQL 17 (notifications, templates, preferences)
- Redis (real-time messaging, queues)
- Nodemailer, Twilio, Firebase for delivery
- Handlebars for templating
- Bull queue for batch processing

**API Endpoints**:
```
POST /api/v1/notifications/send    - Send notification
GET  /api/v1/notifications         - List notifications
PUT  /api/v1/preferences           - Update preferences
GET  /api/v1/templates             - List templates
POST /api/v1/campaigns             - Create campaign
WS   /socket.io                    - Real-time connections
```

## Inter-Service Communication

### Synchronous Communication (REST APIs)
- **Authentication**: All services validate JWTs with Identity Service
- **Case Lookup**: AI Analysis Service queries Case Management Service
- **Professional Verification**: Case Service queries Professional Service

### Asynchronous Communication (Events)
- **Redis Pub/Sub**: Real-time notifications and status updates
- **Kafka**: Audit logs, analytics events, workflow orchestration
- **Webhooks**: External system integrations

### Data Consistency
- **Eventual Consistency**: Services sync via events
- **Denormalization**: Critical data duplicated for performance
- **Compensating Transactions**: Handle distributed transaction failures

## Database Architecture

### Database per Service Pattern
Each microservice has its own PostgreSQL 17 database:
- `secondopinion_identity` - Identity Service
- `secondopinion_cases` - Case Management Service  
- `secondopinion_ai` - AI Analysis Service
- `secondopinion_professionals` - Professional Service
- `secondopinion_notifications` - Notification Service

### Advanced PostgreSQL 17 Features
- **JSONB**: Flexible metadata and configuration storage
- **Full-text Search**: tsvector indexes for search functionality
- **UUID Generation**: Built-in `gen_random_uuid()` for primary keys
- **GIN Indexes**: Optimized indexing for JSONB and arrays
- **Connection Pooling**: Efficient connection management

## Cloud-Agnostic Deployment

### Kubernetes Manifests
Each service includes complete Kubernetes configurations:
- **Deployments**: Rolling updates, health checks, resource limits
- **Services**: Service discovery and load balancing
- **ConfigMaps**: Environment-specific configuration
- **Secrets**: Secure credential management
- **HPA**: Horizontal Pod Autoscaling

### Helm Charts
Production-ready Helm charts with:
- **Multi-cloud values**: AWS, Azure, GCP configurations
- **Service dependencies**: PostgreSQL, Redis, monitoring
- **Security policies**: Network policies, RBAC, Pod Security Standards
- **Observability**: Prometheus metrics, Jaeger tracing

### Cloud Provider Support
- **AWS**: EKS, RDS, ElastiCache, S3, SES, SNS
- **Azure**: AKS, PostgreSQL, Redis Cache, Blob Storage, Communication Services
- **Google Cloud**: GKE, Cloud SQL, Memorystore, Cloud Storage, Pub/Sub
- **On-Premises**: Standard Kubernetes with local storage

## Security Architecture

### Authentication & Authorization
- **JWT Tokens**: Stateless authentication across all services
- **2FA Support**: TOTP-based two-factor authentication
- **Session Management**: Redis-based session storage
- **Rate Limiting**: Distributed rate limiting per IP/user

### Data Protection
- **Encryption**: All data encrypted at rest and in transit
- **GDPR Compliance**: Data retention policies and deletion
- **PHI Protection**: HIPAA-compliant medical data handling
- **Audit Logging**: Comprehensive audit trails

### Network Security
- **Service Mesh Ready**: Istio/Linkerd integration
- **Network Policies**: Kubernetes network segmentation
- **TLS Everywhere**: End-to-end encryption
- **Secret Management**: Kubernetes secrets with rotation

## Monitoring & Observability

### Metrics Collection
- **Prometheus**: Service metrics and performance monitoring
- **Grafana**: Visualization dashboards
- **Custom Metrics**: Business KPIs and health indicators

### Distributed Tracing
- **Jaeger**: Request tracing across services
- **OpenTelemetry**: Standard instrumentation
- **Correlation IDs**: Request correlation across services

### Logging
- **Structured Logging**: JSON logs with Winston
- **Centralized Logging**: ELK stack or cloud-native solutions
- **Log Levels**: Environment-specific log verbosity
- **Security Logs**: Dedicated security audit trails

### Health Checks
- **Kubernetes Probes**: Liveness, readiness, startup probes
- **Deep Health Checks**: Database connectivity, external dependencies
- **Circuit Breakers**: Fault tolerance and graceful degradation

## Performance & Scalability

### Horizontal Scaling
- **Stateless Design**: Services scale horizontally without state concerns
- **Database Scaling**: Read replicas, connection pooling
- **Caching Strategy**: Redis for session and application caching
- **CDN Integration**: Static asset delivery optimization

### Performance Optimization
- **Connection Pooling**: Efficient database connections
- **Async Processing**: Background job processing with queues
- **Compression**: Response compression and asset optimization
- **Lazy Loading**: On-demand resource loading

## Development & Deployment

### Development Workflow
```bash
# Individual service development
cd microservices/patient-identity-service
npm install
npm run dev

# Full stack development
docker-compose up -d  # All services + dependencies

# Production deployment
helm install second-opinion ./charts/second-opinion
```

### CI/CD Pipeline
- **Service-Level Pipelines**: Independent deployment per service
- **Automated Testing**: Unit, integration, and e2e tests
- **Security Scanning**: Vulnerability and compliance checking
- **Gradual Rollouts**: Blue-green and canary deployments

### Migration Strategy
1. ✅ **Phase 1**: Infrastructure setup and Patient Identity Service
2. ✅ **Phase 2**: Case Management and AI Analysis Services
3. ✅ **Phase 3**: Professional and Notification Services
4. 🔄 **Phase 4**: Data migration and service cutover
5. 📋 **Phase 5**: Legacy system decommissioning

## Next Steps

### Immediate Priorities
1. **Service Integration Testing**: End-to-end workflow validation
2. **Performance Benchmarking**: Load testing and optimization
3. **Security Audit**: Penetration testing and vulnerability assessment
4. **Documentation**: API documentation and runbooks

### Future Enhancements
- **Payment Service**: Billing and payment processing
- **Analytics Service**: Business intelligence and reporting
- **Integration Service**: Third-party system connectors
- **Mobile API Gateway**: Mobile-optimized API layer

---

**Second Opinion Platform v2.0** represents a complete transformation from monolith to microservices, enabling independent scaling, improved reliability, and enhanced developer productivity while maintaining the highest standards of medical data security and compliance.