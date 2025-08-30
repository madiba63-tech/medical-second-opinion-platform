# Second Opinion Platform - Monitoring & Observability Stack

This directory contains the complete monitoring and observability stack for the Second Opinion Platform microservices architecture.

## Overview

The monitoring stack provides comprehensive visibility into:

- **Infrastructure Metrics**: CPU, memory, disk, network usage
- **Application Metrics**: Request rates, response times, error rates
- **Business Metrics**: User registrations, case submissions, professional consultations
- **Distributed Tracing**: Request flow across microservices
- **Log Aggregation**: Centralized logging from all services
- **Alerting**: Proactive notifications for issues and anomalies
- **Uptime Monitoring**: Service availability tracking

## Architecture

```
┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│   Applications  │───▶│   Metrics    │───▶│   Prometheus    │
│   (Services)    │    │  Collection  │    │                 │
└─────────────────┘    └──────────────┘    └─────────────────┘
                                                     │
┌─────────────────┐    ┌──────────────┐             ▼
│      Logs       │───▶│   Filebeat   │    ┌─────────────────┐
│   (Services)    │    │              │    │    Grafana      │
└─────────────────┘    └──────────────┘    │  (Dashboards)   │
                                ▼          └─────────────────┘
                       ┌──────────────┐
                       │Elasticsearch │
                       │    (ELK)     │
                       └──────────────┘
                                ▲
                       ┌──────────────┐
                       │    Kibana    │
                       │ (Log Search) │
                       └──────────────┘

┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│    Traces       │───▶│   Jaeger     │───▶│   Grafana       │
│  (Requests)     │    │ (Tracing)    │    │ (Visualization) │
└─────────────────┘    └──────────────┘    └─────────────────┘

┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│    Alerts       │───▶│ Alertmanager │───▶│  Notifications  │
│ (Prometheus)    │    │              │    │ (Email/Slack)   │
└─────────────────┘    └──────────────┘    └─────────────────┘
```

## Services

### Core Monitoring Services

| Service | Port | Purpose | URL |
|---------|------|---------|-----|
| **Prometheus** | 9090 | Metrics collection and storage | http://localhost:9090 |
| **Grafana** | 3001 | Metrics visualization and dashboards | http://localhost:3001 |
| **Alertmanager** | 9093 | Alert routing and notifications | http://localhost:9093 |
| **Jaeger** | 16686 | Distributed tracing | http://localhost:16686 |

### Logging Stack (ELK)

| Service | Port | Purpose | URL |
|---------|------|---------|-----|
| **Elasticsearch** | 9200 | Log storage and search | http://localhost:9200 |
| **Kibana** | 5601 | Log visualization and analysis | http://localhost:5601 |
| **Logstash** | 5044 | Log processing and transformation | - |
| **Filebeat** | - | Log collection from containers | - |

### Infrastructure Monitoring

| Service | Port | Purpose |
|---------|------|---------|
| **Node Exporter** | 9100 | System metrics collection |
| **cAdvisor** | 8080 | Container metrics collection |
| **Redis Exporter** | 9121 | Redis metrics collection |
| **Postgres Exporter** | 9187 | PostgreSQL metrics collection |

### Additional Services

| Service | Port | Purpose | URL |
|---------|------|---------|-----|
| **Traefik** | 80/8081 | Reverse proxy and load balancer | http://localhost:8081 |
| **Uptime Kuma** | 3002 | Uptime monitoring | http://localhost:3002 |

## Quick Start

### Prerequisites

- Docker and Docker Compose
- At least 8GB RAM available for containers
- 20GB free disk space

### 1. Start the Monitoring Stack

```bash
# Navigate to monitoring directory
cd monitoring

# Start all monitoring services
docker-compose -f docker-compose.monitoring.yml up -d

# Check service status
docker-compose -f docker-compose.monitoring.yml ps
```

### 2. Access Dashboards

- **Grafana**: http://localhost:3001 (admin/admin123)
- **Prometheus**: http://localhost:9090
- **Jaeger**: http://localhost:16686
- **Kibana**: http://localhost:5601
- **Alertmanager**: http://localhost:9093
- **Uptime Kuma**: http://localhost:3002

### 3. Configure Application Monitoring

Add the following to your microservices:

#### Prometheus Metrics Endpoint

```typescript
// Add to your Express.js services
import promClient from 'prom-client';

// Enable default metrics collection
promClient.collectDefaultMetrics();

// Custom metrics
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
});

// Expose metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});
```

#### Distributed Tracing

```typescript
// Add to your services for Jaeger tracing
import { trace } from '@opentelemetry/api';
import { NodeTracerProvider } from '@opentelemetry/sdk-node';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';

// Initialize tracing
const provider = new NodeTracerProvider();
const exporter = new JaegerExporter({
  endpoint: 'http://jaeger:14268/api/traces',
});
provider.addSpanProcessor(new BatchSpanProcessor(exporter));
```

#### Structured Logging

```typescript
// Configure Winston for structured logging
import winston from 'winston';

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' })
  ]
});
```

## Configuration

### Prometheus Configuration

- **Configuration**: `prometheus/prometheus.yml`
- **Alerts**: `prometheus/alerts/`
- **Scrape Targets**: All microservices on `/metrics` endpoint

### Grafana Dashboards

Pre-configured dashboards include:

1. **Platform Overview** - High-level system metrics
2. **API Gateway** - Request routing and performance
3. **Microservices** - Individual service metrics
4. **Infrastructure** - System resource usage
5. **Business Metrics** - User activity and engagement
6. **Security** - Authentication and access patterns

### Alerting Rules

Configured alerts include:

- **Service Down** - Critical service outages
- **High Error Rate** - Application errors above threshold
- **High Latency** - Response time degradation
- **Resource Usage** - CPU, memory, disk alerts
- **Database Issues** - Connection failures and performance
- **Security Events** - Authentication failures and anomalies

## Monitoring Best Practices

### 1. The Four Golden Signals

Monitor these key metrics for each service:

- **Latency**: Response time distribution
- **Traffic**: Request rate and volume
- **Errors**: Error rate and types
- **Saturation**: Resource utilization

### 2. Service Level Objectives (SLOs)

Define and monitor SLOs for:

- **Availability**: 99.9% uptime target
- **Latency**: 95th percentile < 500ms
- **Error Rate**: < 0.1% error rate
- **Throughput**: Handle 1000 req/sec

### 3. Alerting Strategy

- **Page for symptoms, not causes**
- **Alert on user-visible problems**
- **Have clear escalation paths**
- **Include runbook links in alerts**

## Maintenance

### Log Rotation

Logs are automatically rotated based on:
- Size: 1GB per index
- Age: 7 days in hot tier
- Retention: 90 days total

### Metric Retention

- **High resolution**: 15 days
- **Medium resolution**: 90 days  
- **Low resolution**: 1 year

### Backup Strategy

Critical data backup:
- Grafana dashboards and configurations
- Prometheus rules and configurations
- Alertmanager notification settings

## Troubleshooting

### Common Issues

1. **High Memory Usage**
   ```bash
   # Reduce Elasticsearch heap size
   ES_JAVA_OPTS="-Xms512m -Xmx512m"
   ```

2. **Prometheus Storage Issues**
   ```bash
   # Clean up old metrics
   docker exec prometheus promtool tsdb analyze /prometheus
   ```

3. **Log Ingestion Problems**
   ```bash
   # Check Filebeat status
   docker logs filebeat
   ```

### Health Checks

```bash
# Check all services
curl -f http://localhost:9090/-/healthy  # Prometheus
curl -f http://localhost:3001/api/health # Grafana
curl -f http://localhost:9200/_cluster/health # Elasticsearch
```

## Security

### Default Credentials

- **Grafana**: admin/admin123
- **Elasticsearch**: No authentication (development)
- **Kibana**: No authentication (development)

### Production Security

For production deployment:

1. Enable authentication on all services
2. Use TLS encryption for all communications
3. Implement network segmentation
4. Regular security updates
5. Monitor access logs

## Scaling

### Horizontal Scaling

- **Prometheus**: Use federation for multiple instances
- **Elasticsearch**: Add more nodes to the cluster
- **Grafana**: Run multiple instances behind load balancer

### Vertical Scaling

Adjust resource limits in docker-compose.yml:

```yaml
services:
  prometheus:
    deploy:
      resources:
        limits:
          memory: 4G
          cpus: '2.0'
```

## Integration

### Cloud Providers

The stack supports deployment on:

- **AWS**: EKS, CloudWatch integration
- **Azure**: AKS, Azure Monitor integration  
- **GCP**: GKE, Stackdriver integration

### External Services

Integrate with:

- **PagerDuty**: For on-call management
- **Slack**: For team notifications
- **JIRA**: For incident management
- **Datadog**: For additional monitoring

## Contributing

To add new monitoring capabilities:

1. Add new Prometheus exporters
2. Create custom Grafana dashboards
3. Define service-specific alerts
4. Update documentation

## Support

For monitoring-related issues:

- Check service logs: `docker-compose logs [service]`
- Review Grafana dashboards for anomalies
- Consult Prometheus targets page: http://localhost:9090/targets
- Examine alert status: http://localhost:9093