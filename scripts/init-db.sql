-- PostgreSQL 17 initialization script
-- Following v2.0 Architecture requirements for PostgreSQL 17 setup

-- Enable required extensions for advanced PostgreSQL 17 features
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";           -- UUID generation
CREATE EXTENSION IF NOT EXISTS "pg_trgm";             -- Trigram matching for full-text search
CREATE EXTENSION IF NOT EXISTS "btree_gin";           -- GIN indexes for better performance
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";  -- Query performance monitoring
CREATE EXTENSION IF NOT EXISTS "pgcrypto";            -- Cryptographic functions

-- Create custom types for better data integrity
DO $$ BEGIN
    CREATE TYPE communication_channel AS ENUM ('EMAIL', 'SMS');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE pro_level AS ENUM ('JUNIOR', 'SENIOR', 'EXPERT', 'DISTINGUISHED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE two_factor_method AS ENUM ('EMAIL', 'SMS');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create performance-optimized indexes
-- These will be created after Prisma migration

-- Enable row-level security for multi-tenancy (if needed)
-- ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Create roles for service-specific access
DO $$ BEGIN
    CREATE ROLE patient_service_role;
    CREATE ROLE professional_service_role;
    CREATE ROLE case_service_role;
    CREATE ROLE ai_service_role;
    CREATE ROLE financial_service_role;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Grant appropriate permissions (to be refined per service)
GRANT CONNECT ON DATABASE secondopinion TO patient_service_role;
GRANT CONNECT ON DATABASE secondopinion TO professional_service_role;
GRANT CONNECT ON DATABASE secondopinion TO case_service_role;
GRANT CONNECT ON DATABASE secondopinion TO ai_service_role;
GRANT CONNECT ON DATABASE secondopinion TO financial_service_role;

-- Create dedicated schemas for microservices (future use)
CREATE SCHEMA IF NOT EXISTS patient_domain;
CREATE SCHEMA IF NOT EXISTS professional_domain;
CREATE SCHEMA IF NOT EXISTS ai_domain;
CREATE SCHEMA IF NOT EXISTS financial_domain;
CREATE SCHEMA IF NOT EXISTS platform_domain;

-- Set up connection pooling parameters
ALTER SYSTEM SET max_connections = '200';
ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_statements';

-- Optimize for JSON operations (replacing MongoDB functionality)
ALTER SYSTEM SET gin_fuzzy_search_limit = '0';
ALTER SYSTEM SET gin_pending_list_limit = '4MB';

-- Performance tuning for larger datasets
ALTER SYSTEM SET effective_cache_size = '1GB';
ALTER SYSTEM SET shared_buffers = '256MB';
ALTER SYSTEM SET wal_buffers = '16MB';
ALTER SYSTEM SET checkpoint_completion_target = '0.9';

-- Enable logging for monitoring
ALTER SYSTEM SET log_statement = 'mod';
ALTER SYSTEM SET log_min_duration_statement = '1000';
ALTER SYSTEM SET log_line_prefix = '%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h ';

-- Reload configuration
SELECT pg_reload_conf();

-- Create audit function for compliance tracking
CREATE OR REPLACE FUNCTION audit_trigger() RETURNS TRIGGER AS $audit$
BEGIN
    IF TG_OP = 'INSERT' THEN
        NEW.created_at = COALESCE(NEW.created_at, NOW());
        NEW.updated_at = NOW();
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        NEW.updated_at = NOW();
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$audit$ LANGUAGE plpgsql;

COMMENT ON DATABASE secondopinion IS 'AI-Powered Medical Second Opinion Platform - PostgreSQL 17 Database';
COMMENT ON SCHEMA public IS 'Default schema for shared resources';
COMMENT ON SCHEMA patient_domain IS 'Patient domain microservices data';
COMMENT ON SCHEMA professional_domain IS 'Professional domain microservices data';
COMMENT ON SCHEMA ai_domain IS 'AI processing microservices data';
COMMENT ON SCHEMA financial_domain IS 'Financial microservices data';
COMMENT ON SCHEMA platform_domain IS 'Platform microservices data';