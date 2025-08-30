# Redis Configuration & Authentication

This document provides comprehensive guidance for Redis configuration, authentication, and integration with the Second Opinion Platform.

## Overview

The Second Opinion Platform uses Redis for:
- Session management and caching
- Workflow state management
- Notification queuing
- Performance optimization

## Authentication Configuration

### Current Setup
- **Password**: `redis_password`
- **Port**: `6379` (default)
- **Host**: `localhost`
- **Database**: `0` (default)

### Environment Variables
All services use the following Redis authentication:
```bash
REDIS_PASSWORD="redis_password"
```

## Redis Server Configuration

### 1. Install Redis (if not already installed)
```bash
# macOS
brew install redis

# Ubuntu/Debian
sudo apt-get install redis-server

# CentOS/RHEL
sudo yum install redis
```

### 2. Configure Redis Authentication

Edit your Redis configuration file (typically `/usr/local/etc/redis.conf` on macOS):

```conf
# Enable password authentication
requirepass redis_password

# Bind to localhost only (security)
bind 127.0.0.1

# Set port
port 6379

# Enable logging
loglevel notice
logfile /usr/local/var/log/redis.log

# Set memory policy
maxmemory-policy allkeys-lru

# Enable persistence
save 900 1
save 300 10
save 60 10000
```

### 3. Start Redis Server
```bash
# macOS (with Homebrew)
brew services start redis

# Linux (systemd)
sudo systemctl start redis-server
sudo systemctl enable redis-server

# Manual start
redis-server /usr/local/etc/redis.conf
```

## Connection Testing

### 1. Test Redis Connection
```bash
# Test without authentication (will fail if auth is enabled)
redis-cli ping

# Test with authentication
redis-cli -a redis_password ping
# Expected output: PONG
```

### 2. Test Redis Operations
```bash
# Connect with authentication
redis-cli -a redis_password

# Test basic operations
127.0.0.1:6379> SET test_key "hello"
127.0.0.1:6379> GET test_key
127.0.0.1:6379> DEL test_key
127.0.0.1:6379> QUIT
```

## Service Integration

### 1. Node.js Redis Clients

All microservices use Redis with the following pattern:

```javascript
const redis = require('redis');

const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379,
    password: process.env.REDIS_PASSWORD || 'redis_password',
    db: 0
});

// Connection handling
redisClient.on('connect', () => {
    console.log('✅ Redis connected successfully');
});

redisClient.on('error', (err) => {
    console.error('❌ Redis connection error:', err);
});
```

### 2. Services Using Redis

#### Workflow Engine Service (Port 3010)
- **Usage**: Workflow state management, task queuing
- **Keys**: `workflow:*`, `task:*`, `state:*`

#### Admin Management Service (Port 3009)
- **Usage**: Session caching, admin operations
- **Keys**: `admin:*`, `session:*`, `cache:*`

#### Notification Service (Port 3005)
- **Usage**: Message queuing, delivery tracking
- **Keys**: `notification:*`, `queue:*`, `delivery:*`

#### Professional Workplace Service (Port 3008)
- **Usage**: Professional session management
- **Keys**: `professional:*`, `workspace:*`

## Environment Configuration

### 1. Service Startup Scripts

The `start-full-platform.sh` script automatically sets:
```bash
export REDIS_PASSWORD="redis_password"
```

### 2. Individual Service Configuration

Each service receives Redis configuration via environment variables:
```bash
REDIS_PASSWORD="redis_password" node service-name.js
```

## Security Best Practices

### 1. Production Security
```conf
# Use strong passwords in production
requirepass your-very-strong-redis-password-here

# Disable dangerous commands
rename-command FLUSHDB ""
rename-command FLUSHALL ""
rename-command KEYS ""
rename-command CONFIG "CONFIG_9f2a8b4c5d"

# Bind to specific interfaces only
bind 127.0.0.1 10.0.0.1
```

### 2. Network Security
- Use Redis only on private networks
- Implement firewall rules to restrict access
- Consider Redis over SSL/TLS for production
- Use Redis ACLs (Access Control Lists) for fine-grained permissions

### 3. Monitoring
```bash
# Monitor Redis performance
redis-cli -a redis_password info stats
redis-cli -a redis_password monitor
redis-cli -a redis_password latency-monitor
```

## Troubleshooting

### 1. Connection Issues
```bash
# Check if Redis is running
redis-cli -a redis_password ping

# Check Redis logs
tail -f /usr/local/var/log/redis.log

# Check process
ps aux | grep redis
```

### 2. Authentication Errors
- Verify password in configuration: `requirepass redis_password`
- Ensure services use correct `REDIS_PASSWORD` environment variable
- Check Redis configuration file location and syntax

### 3. Memory Issues
```bash
# Check Redis memory usage
redis-cli -a redis_password info memory

# Monitor memory in real-time
redis-cli -a redis_password --latency-history -i 1
```

### 4. Performance Monitoring
```bash
# Check connected clients
redis-cli -a redis_password info clients

# Monitor slow queries
redis-cli -a redis_password slowlog get 10

# Check keyspace
redis-cli -a redis_password info keyspace
```

## Development vs Production

### Development (Current)
- Password: `redis_password`
- No SSL/TLS
- Single instance
- Default configuration

### Production Recommendations
- Strong, unique password (32+ characters)
- SSL/TLS encryption
- Redis Sentinel or Cluster for high availability
- Monitoring and alerting
- Regular backups
- Performance tuning based on workload

## Backup & Recovery

### 1. Manual Backup
```bash
# Create snapshot
redis-cli -a redis_password BGSAVE

# Copy RDB file
cp /usr/local/var/db/redis/dump.rdb /backup/location/
```

### 2. Automated Backup
```bash
#!/bin/bash
# Redis backup script
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backup/redis"
redis-cli -a redis_password BGSAVE
cp /usr/local/var/db/redis/dump.rdb "$BACKUP_DIR/dump_$DATE.rdb"
```

## Integration Status

✅ **Configured Services:**
- Workflow Engine Service (Port 3010)
- Admin Management Service (Port 3009)
- Professional Workplace Service (Port 3008)
- Notification Service (Port 3005)

✅ **Authentication:** All services use `redis_password`
✅ **Environment Variables:** Properly configured in startup script
✅ **Connection Testing:** Verified working with all services

---

**Last Updated**: Generated as part of platform housekeeping
**Configuration Version**: 1.0
**Redis Version**: Compatible with Redis 6.0+