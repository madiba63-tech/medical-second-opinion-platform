#!/bin/bash

echo "🗄️ Setting up Development Database Environment"
echo "=============================================="

# Check if development PostgreSQL is running on port 5433
if pg_isready -h localhost -p 5433 -U dev_user >/dev/null 2>&1; then
    echo "✅ Development PostgreSQL already running on port 5433"
else
    echo "🔧 Starting Development PostgreSQL on port 5433..."
    
    # Create development database cluster if it doesn't exist
    if [ ! -d "/usr/local/var/postgres_dev" ]; then
        echo "📦 Creating development PostgreSQL cluster..."
        initdb -D /usr/local/var/postgres_dev
    fi
    
    # Start development PostgreSQL on port 5433
    pg_ctl -D /usr/local/var/postgres_dev -l /usr/local/var/log/postgres_dev.log -o "-p 5433" start
    
    # Wait for startup
    sleep 3
    
    # Create development database and user
    createdb -h localhost -p 5433 -U $USER secondopinion_dev
    psql -h localhost -p 5433 -d secondopinion_dev -c "
        CREATE USER dev_user WITH PASSWORD 'dev_password';
        GRANT ALL PRIVILEGES ON DATABASE secondopinion_dev TO dev_user;
        GRANT ALL ON SCHEMA public TO dev_user;
        GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO dev_user;
        GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO dev_user;
    "
fi

# Check if development Redis is running on port 6380
if redis-cli -p 6380 -a "dev_redis_password" ping >/dev/null 2>&1; then
    echo "✅ Development Redis already running on port 6380"
else
    echo "🔧 Starting Development Redis on port 6380..."
    redis-server --port 6380 --requirepass dev_redis_password --daemonize yes --logfile /usr/local/var/log/redis_dev.log
fi

echo ""
echo "✅ Development Database Environment Ready!"
echo "   📊 PostgreSQL: localhost:5433/secondopinion_dev (dev_user/dev_password)"
echo "   🔴 Redis: localhost:6380 (password: dev_redis_password)"