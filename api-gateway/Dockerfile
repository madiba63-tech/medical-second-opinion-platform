# API Gateway Service Dockerfile
# Multi-stage build for production optimization

# Stage 1: Build stage
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    && ln -sf python3 /usr/bin/python

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY src/ ./src/

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM node:22-alpine AS production

# Create non-root user
RUN addgroup -g 1001 -S gateway && \
    adduser -S gateway -u 1001

# Set working directory
WORKDIR /app

# Copy built application from builder stage
COPY --from=builder --chown=gateway:gateway /app/dist ./dist
COPY --from=builder --chown=gateway:gateway /app/node_modules ./node_modules
COPY --from=builder --chown=gateway:gateway /app/package.json ./package.json

# Create logs directory
RUN mkdir -p logs && chown -R gateway:gateway logs

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "const http = require('http'); \
    const options = { hostname: 'localhost', port: process.env.PORT || 3000, path: '/health', timeout: 2000 }; \
    const req = http.request(options, (res) => process.exit(res.statusCode === 200 ? 0 : 1)); \
    req.on('error', () => process.exit(1)); \
    req.end();"

# Switch to non-root user
USER gateway

# Expose port
EXPOSE 3000

# Set NODE_ENV
ENV NODE_ENV=production

# Start the application
CMD ["node", "dist/server.js"]

# Labels for metadata
LABEL maintainer="Second Opinion Platform Team"
LABEL service="api-gateway"
LABEL version="1.0.0"
LABEL description="API Gateway for Second Opinion Platform microservices"