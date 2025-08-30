# Multi-stage Docker build for Patient Identity Service
# Following v2.0 Architecture requirements for cloud-agnostic deployment

# ===== BASE IMAGE =====
FROM node:22-alpine AS base

# Security hardening
RUN apk add --no-cache libc6-compat dumb-init
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 --ingroup nodejs microservice

# Set working directory
WORKDIR /app

# ===== DEPENDENCIES STAGE =====
FROM base AS deps

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install production dependencies
RUN npm ci --only=production && npm cache clean --force

# ===== BUILD STAGE =====
FROM base AS builder

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install all dependencies
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build application
RUN npm run build

# ===== RUNTIME STAGE =====
FROM base AS runner

# Set environment
ENV NODE_ENV=production \
    PORT=3001 \
    LOG_LEVEL=info

# Copy dependencies and build
COPY --from=deps --chown=microservice:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=microservice:nodejs /app/dist ./dist
COPY --from=builder --chown=microservice:nodejs /app/prisma ./prisma
COPY --from=builder --chown=microservice:nodejs /app/package.json ./

# Create temp directory for logs and cache
RUN mkdir -p /tmp/microservice && chown -R microservice:nodejs /tmp/microservice

# Switch to non-root user
USER microservice

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node dist/health-check.js

# Expose port
EXPOSE 3001

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the service
CMD ["node", "dist/server.js"]