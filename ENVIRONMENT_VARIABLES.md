# Environment Variables Documentation

This document provides comprehensive documentation for all environment variables used across the Second Opinion Platform.

## Overview

The Second Opinion Platform uses environment variables for configuration management across all services. This ensures secure, flexible, and environment-specific configuration.

## Core Environment Variables

### 1. Database Configuration
```bash
# PostgreSQL Database Connection
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/secondopinion?schema=public"
```
- **Purpose**: Primary database connection for all services
- **Format**: PostgreSQL connection string
- **Used by**: All microservices requiring database access
- **Production**: Update with secure credentials and SSL parameters

### 2. Authentication & Security
```bash
# JWT Secret for token signing
JWT_SECRET="second-opinion-jwt-secret-2025"

# NextAuth configuration (if using NextAuth)
NEXTAUTH_SECRET="your-super-secret-nextauth-key-change-in-production"
NEXTAUTH_URL="http://localhost:3000"

# Encryption key for sensitive data
ENCRYPTION_KEY="your-32-character-encryption-key"
```
- **Purpose**: Authentication, authorization, and data encryption
- **Security**: Must be unique, strong, and kept secret
- **Length**: JWT_SECRET should be 32+ characters
- **Production**: Use cryptographically secure random values

### 3. Redis Configuration
```bash
# Redis Authentication
REDIS_PASSWORD="redis_password"
REDIS_URL="redis://localhost:6379"
```
- **Purpose**: Session management, caching, and workflow state
- **Used by**: Workflow Engine, Admin Service, Professional Workplace, Notification Service
- **Production**: Use strong password and consider SSL/TLS

### 4. Service URLs
```bash
# Inter-service communication
NOTIFICATION_SERVICE_URL="http://localhost:3005"
WORKFLOW_SERVICE_URL="http://localhost:3010"
```
- **Purpose**: Service-to-service communication
- **Format**: Full HTTP/HTTPS URLs
- **Production**: Use HTTPS and proper service discovery

### 5. Application Environment
```bash
# Environment specification
NODE_ENV="development"
LOG_LEVEL="debug"
```
- **Purpose**: Environment-specific behavior and logging
- **Values**: `development`, `staging`, `production`
- **Production**: Set to `production` and adjust LOG_LEVEL to `info` or `warn`

## Service-Specific Configuration

### Frontend (Next.js) - Port 3000
```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/secondopinion?schema=public"
JWT_SECRET="second-opinion-jwt-secret-2025"
NEXTAUTH_SECRET="your-super-secret-nextauth-key-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

### Patient Identity Service - Port 3001
```bash
JWT_SECRET="second-opinion-jwt-secret-2025"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/secondopinion?schema=public"
```

### Case Management Service - Port 3002
```bash
JWT_SECRET="second-opinion-jwt-secret-2025"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/secondopinion?schema=public"
```

### AI Analysis Service - Port 3003
```bash
JWT_SECRET="second-opinion-jwt-secret-2025"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/secondopinion?schema=public"
```

### Professional Service - Port 3004
```bash
JWT_SECRET="second-opinion-jwt-secret-2025"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/secondopinion?schema=public"
```

### Notification Service - Port 3005
```bash
JWT_SECRET="second-opinion-jwt-secret-2025"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/secondopinion?schema=public"
REDIS_PASSWORD="redis_password"
```

### File Management Service - Port 3006
```bash
JWT_SECRET="second-opinion-jwt-secret-2025"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/secondopinion?schema=public"
```

### Payment & Billing Service - Port 3007
```bash
JWT_SECRET="second-opinion-jwt-secret-2025"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/secondopinion?schema=public"
```

### Professional Workplace Service - Port 3008
```bash
JWT_SECRET="second-opinion-jwt-secret-2025"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/secondopinion?schema=public"
REDIS_PASSWORD="redis_password"
```

### Admin Management Service - Port 3009
```bash
JWT_SECRET="second-opinion-jwt-secret-2025"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/secondopinion?schema=public"
REDIS_PASSWORD="redis_password"
NOTIFICATION_SERVICE_URL="http://localhost:3005"
WORKFLOW_SERVICE_URL="http://localhost:3010"
```

### Workflow Engine Service - Port 3010
```bash
JWT_SECRET="second-opinion-jwt-secret-2025"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/secondopinion?schema=public"
REDIS_PASSWORD="redis_password"
```

## Environment Files

### Development (.env)
```bash
# Current development configuration
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/secondopinion?schema=public"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
NEXTAUTH_SECRET="your-super-secret-nextauth-key-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
ENCRYPTION_KEY="your-32-character-encryption-key"
NODE_ENV="development"
LOG_LEVEL="debug"
```

### Production (.env.production)
```bash
# Example production configuration
DATABASE_URL="postgresql://prod_user:secure_password@prod-db:5432/secondopinion?schema=public&sslmode=require"
REDIS_URL="rediss://prod-redis:6380"
REDIS_PASSWORD="ultra-secure-redis-password"
JWT_SECRET="cryptographically-secure-jwt-secret-64-chars-minimum"
NEXTAUTH_SECRET="cryptographically-secure-nextauth-secret-64-chars-minimum"
NEXTAUTH_URL="https://yourdomain.com"
ENCRYPTION_KEY="32-character-secure-encryption-key"
NODE_ENV="production"
LOG_LEVEL="info"
NOTIFICATION_SERVICE_URL="https://notification-service.internal"
WORKFLOW_SERVICE_URL="https://workflow-service.internal"
```

### Staging (.env.staging)
```bash
# Example staging configuration
DATABASE_URL="postgresql://staging_user:staging_password@staging-db:5432/secondopinion_staging?schema=public&sslmode=require"
REDIS_URL="redis://staging-redis:6379"
REDIS_PASSWORD="staging-redis-password"
JWT_SECRET="staging-jwt-secret-for-testing"
NEXTAUTH_SECRET="staging-nextauth-secret-for-testing"
NEXTAUTH_URL="https://staging.yourdomain.com"
NODE_ENV="staging"
LOG_LEVEL="debug"
```

## Startup Script Integration

The `start-full-platform.sh` script automatically exports all necessary environment variables:

```bash
export JWT_SECRET="second-opinion-jwt-secret-2025"
export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/secondopinion?schema=public"
export REDIS_PASSWORD="redis_password"
export NOTIFICATION_SERVICE_URL="http://localhost:3005"
export WORKFLOW_SERVICE_URL="http://localhost:3010"
```

## Security Best Practices

### 1. Secret Management
- **Never commit secrets to version control**
- Use environment-specific `.env` files
- Consider using secret management services (AWS Secrets Manager, Azure Key Vault, etc.)
- Rotate secrets regularly

### 2. Development vs Production
- Use weak secrets in development for convenience
- Use cryptographically secure secrets in production
- Implement proper secret rotation in production
- Use SSL/TLS in production

### 3. Access Control
- Limit access to environment variables
- Use principle of least privilege
- Implement proper logging and auditing
- Monitor for unauthorized access

## Validation & Testing

### Environment Variable Validation
Each service should validate required environment variables on startup:

```javascript
// Example validation
const requiredEnvVars = [
    'JWT_SECRET',
    'DATABASE_URL'
];

requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
        console.error(`❌ Missing required environment variable: ${envVar}`);
        process.exit(1);
    }
});
```

### Testing Configuration
```bash
# Test database connection
node -e "console.log('DATABASE_URL:', process.env.DATABASE_URL)"

# Test JWT secret
node -e "console.log('JWT_SECRET length:', process.env.JWT_SECRET?.length)"

# Test Redis connection
redis-cli -a "$REDIS_PASSWORD" ping
```

## Troubleshooting

### Common Issues

#### 1. Database Connection Failures
```bash
# Check DATABASE_URL format
echo $DATABASE_URL

# Test PostgreSQL connection
pg_isready -h localhost -p 5432 -U postgres
```

#### 2. JWT Token Issues
```bash
# Ensure JWT_SECRET is set and has sufficient length
echo "JWT_SECRET length: ${#JWT_SECRET}"
```

#### 3. Redis Authentication Failures
```bash
# Test Redis connection with password
redis-cli -a "$REDIS_PASSWORD" ping
```

#### 4. Service Communication Issues
```bash
# Test service URLs
curl -f "$NOTIFICATION_SERVICE_URL/health"
curl -f "$WORKFLOW_SERVICE_URL/health"
```

## Migration Guide

### From Development to Production
1. Generate strong, unique secrets for all sensitive variables
2. Update database connections to use SSL
3. Configure service URLs with HTTPS
4. Set appropriate LOG_LEVEL
5. Verify all services start successfully
6. Test inter-service communication

### Environment Variable Checklist
- [ ] JWT_SECRET (32+ characters, cryptographically secure)
- [ ] DATABASE_URL (with SSL in production)
- [ ] REDIS_PASSWORD (strong password)
- [ ] NEXTAUTH_SECRET (if using NextAuth)
- [ ] ENCRYPTION_KEY (exactly 32 characters)
- [ ] Service URLs (HTTPS in production)
- [ ] NODE_ENV (set to appropriate environment)
- [ ] LOG_LEVEL (appropriate for environment)

---

**Last Updated**: Generated as part of platform housekeeping
**Configuration Version**: 1.0
**Supported Environments**: Development, Staging, Production