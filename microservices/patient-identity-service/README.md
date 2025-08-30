# Patient Identity Service

The Patient Identity Service is a core microservice in the Second Opinion Platform v2.0 architecture, responsible for user authentication, authorization, and patient profile management.

## Overview

This service follows the Domain-Driven Design (DDD) principles and implements stateless, cloud-agnostic architecture patterns. It handles:

- **User Authentication**: Registration, login, password management
- **Session Management**: JWT-based stateless authentication with Redis session storage
- **Profile Management**: Patient profile creation and maintenance
- **Security Features**: Two-factor authentication, rate limiting, audit logging
- **Identity Verification**: Email verification and password reset workflows

## Features

### Authentication & Authorization
- ✅ User registration with email verification
- ✅ Secure login with bcrypt password hashing
- ✅ JWT-based stateless authentication
- ✅ Two-factor authentication (TOTP)
- ✅ Password reset functionality
- ✅ Account lockout after failed attempts
- ✅ Session management with Redis

### Security Features
- ✅ Rate limiting by IP and user
- ✅ CORS protection
- ✅ Helmet.js security headers
- ✅ Input validation and sanitization
- ✅ Audit logging for security events
- ✅ Distributed locking for critical operations

### Monitoring & Observability
- ✅ Comprehensive health checks
- ✅ Structured logging with Winston
- ✅ Performance metrics collection
- ✅ Security audit trails
- ✅ Request correlation IDs

### Database
- ✅ PostgreSQL 17 with advanced features
- ✅ Full-text search with tsvector
- ✅ JSONB for flexible metadata storage
- ✅ Connection pooling and retry logic
- ✅ Automated cleanup of expired records

## Architecture

### Technology Stack
- **Runtime**: Node.js 22+ with TypeScript
- **Framework**: Express.js with security middleware
- **Database**: PostgreSQL 17 with Prisma ORM
- **Cache/Sessions**: Redis 7.4
- **Authentication**: JWT with bcrypt
- **Validation**: Zod schemas
- **Logging**: Winston with structured output
- **Containerization**: Docker with multi-stage builds

### Service Dependencies
- **PostgreSQL 17**: Primary database for user and customer data
- **Redis**: Session storage, caching, and distributed locking
- **SMTP Server**: Email verification and password reset emails

## Getting Started

### Prerequisites
- Node.js 22+
- PostgreSQL 17
- Redis 7.4+
- Docker (optional)

### Development Setup

1. **Clone and Install Dependencies**
   ```bash
   cd microservices/patient-identity-service
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Database Setup**
   ```bash
   # Generate Prisma client
   npm run prisma:generate
   
   # Run database migrations
   npm run prisma:migrate
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

The service will start on port 3001 by default.

### Docker Deployment

1. **Build Docker Image**
   ```bash
   docker build -t patient-identity-service .
   ```

2. **Run with Docker Compose**
   ```bash
   # From the root project directory
   docker-compose up patient-identity-service
   ```

### Kubernetes Deployment

The service includes Kubernetes manifests and Helm charts for cloud-agnostic deployment:

```bash
# Deploy with Helm
helm install identity-service ./charts/patient-identity-service
```

## API Documentation

### Authentication Endpoints

#### POST /api/v1/auth/register
Register a new patient account.

**Request Body:**
```json
{
  "email": "patient@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1985-06-15",
  "phone": "+1234567890",
  "preferredChannel": "EMAIL"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful. Please check your email to verify your account.",
  "userId": "uuid",
  "customerId": "uuid"
}
```

#### POST /api/v1/auth/login
Authenticate user and return JWT tokens.

**Request Body:**
```json
{
  "email": "patient@example.com",
  "password": "SecurePassword123!",
  "totpCode": "123456"  // Optional, required if 2FA enabled
}
```

**Response:**
```json
{
  "success": true,
  "accessToken": "jwt-access-token",
  "refreshToken": "jwt-refresh-token",
  "user": {
    "id": "uuid",
    "email": "patient@example.com",
    "emailVerified": true,
    "twoFactorEnabled": false
  },
  "customer": {
    "id": "uuid",
    "firstName": "John",
    "lastName": "Doe",
    "preferredChannel": "EMAIL"
  }
}
```

#### POST /api/v1/auth/verify-email
Verify user email address.

**Request Body:**
```json
{
  "token": "verification-token-uuid"
}
```

#### POST /api/v1/auth/forgot-password
Request password reset.

**Request Body:**
```json
{
  "email": "patient@example.com"
}
```

#### POST /api/v1/auth/reset-password
Reset password with token.

**Request Body:**
```json
{
  "token": "reset-token-uuid",
  "password": "NewSecurePassword123!"
}
```

### Health Check Endpoints

#### GET /health
Basic health check for load balancers.

#### GET /health/ready
Kubernetes readiness probe endpoint.

#### GET /health/live
Kubernetes liveness probe endpoint.

#### GET /health/detailed
Comprehensive health information with metrics.

## Configuration

The service is configured through environment variables. See `.env.example` for all available options.

### Key Configuration Areas

- **Security**: Password requirements, lockout settings, 2FA configuration
- **Rate Limiting**: Request limits per IP/user, time windows
- **Database**: Connection pooling, timeouts, cleanup intervals
- **Logging**: Log levels, formats, output destinations
- **Cloud**: Provider-specific settings for AWS/Azure/GCP

## Security Considerations

### Authentication Security
- Passwords hashed with bcrypt (configurable rounds)
- Account lockout after failed login attempts
- JWT tokens with expiration and refresh capability
- Two-factor authentication support (TOTP)

### API Security
- Rate limiting to prevent abuse
- Input validation and sanitization
- CORS protection with configurable origins
- Security headers with Helmet.js
- Request/response logging for audit trails

### Data Protection
- Sensitive data redaction in logs
- Secure session storage with Redis
- Password reset tokens with expiration
- Email verification with secure tokens

## Monitoring & Observability

### Logging
- Structured JSON logging in production
- Separate log files for different concern levels
- Request correlation IDs for tracing
- Security events logged to dedicated audit trail

### Health Checks
- Multiple health check endpoints for different purposes
- Database and Redis connectivity monitoring
- Performance metrics collection
- System resource monitoring

### Metrics Collection
- Request/response times
- Authentication success/failure rates
- Database connection pool status
- Memory and CPU usage

## Error Handling

The service implements comprehensive error handling:

- **Validation Errors**: 400 Bad Request with detailed field errors
- **Authentication Errors**: 401 Unauthorized with appropriate error codes
- **Authorization Errors**: 403 Forbidden for insufficient permissions
- **Rate Limit Errors**: 429 Too Many Requests with retry information
- **Server Errors**: 500 Internal Server Error with correlation IDs

## Development

### Code Structure
```
src/
├── config/          # Configuration and environment setup
├── routes/          # Express route handlers
├── services/        # Business logic services
├── middleware/      # Express middleware
├── utils/           # Utility functions and helpers
├── generated/       # Prisma generated client
└── server.ts        # Main application entry point
```

### Testing
```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Linting and Formatting
```bash
# Check code style
npm run lint

# Fix code style issues
npm run lint:fix
```

## Deployment

### Cloud-Agnostic Deployment
The service supports deployment across multiple cloud providers:

- **AWS**: EKS with Application Load Balancer
- **Azure**: AKS with Application Gateway
- **Google Cloud**: GKE with Ingress
- **On-Premises**: Standard Kubernetes clusters

### High Availability
- Horizontal pod autoscaling based on CPU/memory
- Pod disruption budgets for graceful updates
- Multi-zone deployment for fault tolerance
- Health checks for automatic failover

### Scaling
- Stateless design enables horizontal scaling
- Redis for shared session storage
- Database connection pooling for efficiency
- Resource limits and requests configured

## Contributing

Please follow the established code patterns:

1. **TypeScript**: Strict type checking enabled
2. **Error Handling**: Comprehensive error handling with logging
3. **Security**: Security-first approach with input validation
4. **Testing**: Unit tests for all business logic
5. **Documentation**: JSDoc comments for public APIs

## License

MIT License - See LICENSE file for details.

---

**Patient Identity Service** is part of the Second Opinion Platform v2.0 - AI-Powered Medical Second Opinion Platform with cloud-agnostic microservices architecture.