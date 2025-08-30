#!/bin/bash

echo "🛑 Stopping Second Opinion Platform - DEVELOPMENT Environment"
echo "============================================================="

# Kill all Node.js processes running on development ports
echo "🔄 Stopping development services..."

# Stop services running on ports 4000-4010
for port in 4000 4001 4002 4003 4004 4005 4006 4007 4008 4009 4010; do
    if lsof -ti:$port >/dev/null 2>&1; then
        echo "  Stopping service on port $port..."
        kill -TERM $(lsof -ti:$port) 2>/dev/null || true
        sleep 1
        # Force kill if still running
        if lsof -ti:$port >/dev/null 2>&1; then
            kill -KILL $(lsof -ti:$port) 2>/dev/null || true
        fi
    fi
done

# Stop development databases
echo "🗄️ Stopping development databases..."
docker compose -f docker-compose.dev-db.yml down

echo ""
echo "✅ Development environment stopped successfully!"
echo "🔧 All development services and databases have been shut down."
echo "💡 To restart, run: ./scripts/start-dev.sh"