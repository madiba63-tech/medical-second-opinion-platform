# Second Opinion Platform v2.0 - Deployment Guide

## 🚀 Quick Start

The Second Opinion Platform has been successfully migrated to a microservices architecture. Follow this guide to deploy and operate the platform.

## 📋 Prerequisites

- **Node.js** v22+ with npm
- **PostgreSQL** (optional for full functionality)
- **Redis** (optional for production features)
- **Basic Unix/Linux shell** for running scripts

## 🏃‍♂️ Quick Deployment

### 1. Start the Platform

```bash
# Simple test deployment (recommended for initial testing)
chmod +x start-simple-platform.sh
./start-simple-platform.sh
```

### 2. Verify Platform Health

```bash
# Check overall platform status
curl http://localhost:3000/health

# Check all service health through API Gateway
curl http://localhost:3000/health/services
```

### 3. Access Platform

- **API Gateway**: http://localhost:3000
- **Service Health Dashboard**: http://localhost:3000/health/services

## 🏗️ Architecture Overview

### Microservices

| Service | Port | Description |
|---------|------|-------------|
| API Gateway | 3000 | Central routing and load balancing |
| Identity Service | 3001 | User authentication and authorization |
| Case Management | 3002 | Medical case handling and processing |
| AI Analysis Service | 3003 | AI-powered medical analysis |
| Professional Service | 3004 | Healthcare professional management |
| Notification Service | 3005 | Communication and alerts |

### Service Communication

```
Client → API Gateway (3000) → Individual Services (3001-3005)
```

All services expose:
- `GET /health` - Health check endpoint
- `GET /` - Service information endpoint

## 🛠️ Management Scripts

### Available Scripts

| Script | Purpose |
|--------|---------|
| `start-simple-platform.sh` | Start all services (recommended) |
| `stop-microservices.sh` | Stop all services gracefully |
| `start-microservices.sh` | Advanced startup with dependency checking |

### Starting Services

```bash
# Simple startup (JavaScript-based services)
./start-simple-platform.sh

# Advanced startup (TypeScript-based services with full features)
./start-microservices.sh
```

### Stopping Services

```bash
# Stop all platform services
./stop-microservices.sh
```

### Monitoring Services

```bash
# Check running processes
ps aux | grep -E "(node|npm)" | grep second-opinion

# Check port usage
lsof -i :3000,3001,3002,3003,3004,3005

# View logs
tail -f logs/*.log

# Monitor specific service
tail -f logs/identity-service.log
```

## 📊 Health Monitoring

### Platform Health Check

```bash
# Overall platform status
curl -s http://localhost:3000/health | jq

# Individual service health aggregation
curl -s http://localhost:3000/health/services | jq
```

### Individual Service Health

```bash
# Identity Service
curl -s http://localhost:3001/health | jq

# Case Management Service  
curl -s http://localhost:3002/health | jq

# AI Analysis Service
curl -s http://localhost:3003/health | jq

# Professional Service
curl -s http://localhost:3004/health | jq

# Notification Service
curl -s http://localhost:3005/health | jq
```

## 🔧 Configuration

### Environment Variables

The platform supports environment-based configuration:

```bash
# Port configuration
export PORT=3000                    # API Gateway port
export IDENTITY_SERVICE_PORT=3001   # Identity service port
export CASE_SERVICE_PORT=3002       # Case management port
export AI_SERVICE_PORT=3003         # AI analysis port
export PROFESSIONAL_SERVICE_PORT=3004 # Professional service port
export NOTIFICATION_SERVICE_PORT=3005 # Notification service port

# Database configuration (optional)
export DATABASE_URL=postgresql://user:pass@localhost:5432/secondopinion
export REDIS_URL=redis://localhost:6379
```

### Service Configuration

Each service can be configured independently:

- **Identity Service**: Authentication, JWT configuration
- **Case Management**: Database connections, file storage
- **AI Analysis**: AI provider APIs (OpenAI, etc.)
- **Professional Service**: Professional verification systems
- **Notification Service**: Email/SMS providers

## 🐛 Troubleshooting

### Common Issues

#### Services Won't Start

```bash
# Check if ports are already in use
lsof -i :3000,3001,3002,3003,3004,3005

# Kill existing processes
pkill -f "node.*second-opinion"

# Check logs for errors
tail -20 logs/*.log
```

#### Service Health Check Failures

```bash
# Check individual service status
curl -s http://localhost:3001/health || echo "Service down"

# Restart specific service
cd microservices/patient-identity-service
node simple-server.js &
```

#### Database Connection Issues

```bash
# Check PostgreSQL status
pg_isready -h localhost -p 5432

# Start PostgreSQL (macOS with Homebrew)
brew services start postgresql@17

# Check database exists
psql -h localhost -U postgres -l | grep secondopinion
```

### Log Analysis

```bash
# View all service logs
ls -la logs/

# Check startup errors
grep -i error logs/*.log

# Monitor real-time logs
tail -f logs/*.log
```

## 📈 Production Deployment

### Docker Deployment

```bash
# Build Docker images (when available)
docker-compose build

# Start with Docker Compose
docker-compose up -d

# Check container health
docker-compose ps
```

### Kubernetes Deployment

```bash
# Apply Kubernetes manifests
kubectl apply -f k8s/

# Check pod status
kubectl get pods -l app=second-opinion

# View service endpoints
kubectl get services
```

## 🔒 Security Considerations

### Development vs Production

- **Development**: Uses simple authentication and basic security
- **Production**: Requires JWT secrets, HTTPS, database security

### Security Checklist

- [ ] Change default JWT secrets
- [ ] Enable HTTPS/TLS
- [ ] Configure proper CORS origins
- [ ] Set up database authentication
- [ ] Enable rate limiting
- [ ] Configure proper logging levels
- [ ] Set up monitoring and alerting

## 📋 Platform Status Summary

### ✅ Working Components

- **API Gateway**: Central routing and health aggregation
- **All 5 Microservices**: Basic health checks and service information
- **Service Discovery**: Automatic health monitoring through gateway
- **Graceful Shutdown**: Proper process termination
- **Logging**: Centralized log management
- **Process Management**: PID tracking and management

### 🚧 In Development

- **Database Integration**: Full PostgreSQL integration
- **Authentication**: JWT token validation
- **Business Logic**: Service-specific functionality
- **Monitoring**: Prometheus/Grafana integration
- **Message Queuing**: Redis-based communication

### 📊 Success Metrics

The platform is considered operational when:

1. **All 6 services respond to health checks** ✅
2. **API Gateway aggregates service status** ✅  
3. **Services can be started/stopped gracefully** ✅
4. **Logs are properly generated and accessible** ✅
5. **Process management works correctly** ✅

## 🎉 Platform Ready!

The Second Opinion Platform v2.0 microservices architecture is now **fully operational** for basic testing and development. All core services are running, health checks are working, and the platform is ready for further development and feature implementation.

**Next Steps:**
1. Implement business logic in individual services
2. Add database persistence layers
3. Implement proper authentication and authorization
4. Add monitoring and observability
5. Deploy to production environment

---

*Generated on: 2025-08-29 by Claude Code*
*Platform Status: ✅ Operational*