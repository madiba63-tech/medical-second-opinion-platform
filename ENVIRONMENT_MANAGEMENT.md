# Environment Management Guide

This document explains the environment separation strategy implemented for the Second Opinion Platform.

## Environment Overview

The platform now supports three distinct environments to prevent conflicts and ensure safe development:

### 🔧 Development Environment (DEV)
- **Ports**: 4000-4010
- **Database**: PostgreSQL on localhost:5433 (secondopinion_dev)
- **Redis**: localhost:6380 with dev authentication
- **Purpose**: Active development and testing new features
- **Safety**: Completely isolated from other environments

### 🚀 Staging Environment (STAGING) 
- **Ports**: 3000-3010 (current setup)
- **Database**: PostgreSQL on localhost:5432 (secondopinion)
- **Redis**: localhost:6379 with staging authentication
- **Purpose**: Pre-production testing and integration
- **Current**: This is your existing setup

### 🏭 Production Environment (PROD)
- **Ports**: External domains with load balancers
- **Database**: Remote PostgreSQL cluster
- **Redis**: Remote Redis cluster
- **Purpose**: Live system serving real users
- **Future**: Template ready for deployment

## Quick Commands

### Development Environment
```bash
# Start complete development environment (robust version)
./scripts/start-dev-robust.sh

# Start complete development environment (basic version)
./scripts/start-dev.sh

# Check development environment status
./scripts/status-dev.sh

# Stop development environment  
./scripts/stop-dev.sh

# Start only development databases
docker compose -f docker-compose.dev-db.yml up -d

# Stop development databases
docker compose -f docker-compose.dev-db.yml down
```

### Staging Environment (Current)
```bash
# Start staging (your current setup)
./start-full-platform.sh

# Individual services still use ports 3000-3010
```

## Environment Configuration Files

- `.env.development` - Development environment variables
- `.env.staging` - Staging environment variables (current setup)
- `.env.production` - Production environment template

## Database Separation

### Development Database
- **Host**: localhost:5433
- **Database**: secondopinion_dev
- **User**: dev_user
- **Password**: dev_password
- **Isolation**: Completely separate from staging

### Staging Database (Current)
- **Host**: localhost:5432
- **Database**: secondopinion
- **User**: postgres
- **Password**: postgres
- **Current**: Your existing database

## Port Allocation

### Development (4000-4010)
- 4000: Frontend (Next.js)
- 4001: Patient Identity Service
- 4002: Case Management Service
- 4003: AI Analysis Service
- 4004: Professional Service
- 4005: Notification Service
- 4006: File Management Service
- 4007: Payment & Billing Service
- 4008: Professional Workplace Service
- 4009: Admin Management Service
- 4010: Workflow Engine Service

### Staging (3000-3010) - Current Setup
- 3000: Frontend (Next.js)
- 3001: Patient Identity Service
- 3002: Case Management Service
- 3003: AI Analysis Service
- 3004: Professional Service
- 3005: Notification Service
- 3006: File Management Service
- 3007: Payment & Billing Service
- 3008: Professional Workplace Service
- 3009: Admin Management Service
- 3010: Workflow Engine Service

## Benefits

1. **No Port Conflicts**: Development and staging run on different ports
2. **Data Safety**: Separate databases prevent accidental data corruption
3. **Parallel Development**: Multiple developers can work simultaneously
4. **Environment Parity**: Consistent configuration across environments
5. **Safe Testing**: Development environment for risky changes

## Migration Strategy

1. **Current Work**: Continue using staging environment (ports 3000-3010)
2. **New Features**: Use development environment (ports 4000-4010)
3. **Testing**: Validate in development before promoting to staging
4. **Production**: Deploy from staging to production when ready

## Security Considerations

- Development uses mock authentication and relaxed security
- Staging uses production-like security with test data
- Production requires full security hardening
- JWT secrets are environment-specific for security

## Docker Integration

Development environment uses Docker for database isolation:
- `docker-compose.dev-db.yml` - Development PostgreSQL and Redis
- Separate volumes prevent data mixing
- Health checks ensure services are ready

This separation strategy ensures safe, conflict-free development while maintaining the stability of your current staging environment.