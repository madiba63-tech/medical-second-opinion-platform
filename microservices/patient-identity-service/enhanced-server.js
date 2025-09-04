const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const winston = require('winston');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { PrismaClient } = require('../../src/generated/prisma');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || (() => {
  console.error('⚠️  CRITICAL: JWT_SECRET not set in environment variables');
  process.exit(1);
})();
const JWT_EXPIRES_IN = '24h';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ],
});

// Configure rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: {
    success: false,
    error: 'Too many authentication attempts, please try again later.',
    code: 'RATE_LIMIT_EXCEEDED'
  }
});

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false // Allow Next.js to handle CSP
}));

// Configure CORS more securely
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000', 'http://localhost:3006'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing with size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  next();
});

// Database connection established above with Prisma Client
// Create demo user if it doesn't exist
async function initializeDemoData() {
  try {
    const existingUser = await prisma.customer.findUnique({
      where: { email: 'demo@example.com' }
    });
    
    if (!existingUser) {
      await prisma.customer.create({
        data: {
          id: '1',
          email: 'demo@example.com',
          hashedPassword: '$2a$12$Hw1QZmK9LTwGAXsZZ3QVKOZaUpHZJjCr4eSWO4d5qGa.k4bRuXK22', // 'demo123' with stronger hash
          firstName: 'Demo',
          lastName: 'User',
          emailVerified: true,
          phone: '+1-555-0123',
          preferredChannel: 'EMAIL'
        }
      });
      logger.info('Demo user created in database');
    }
  } catch (error) {
    console.log('Demo user initialization:', error.message);
  }
}

// initializeDemoData(); // Temporarily disabled to avoid schema issues

// Utility functions
const generateAccessToken = (user) => {
  return jwt.sign(
    { 
      userId: user.id, 
      email: user.email,
      type: 'access'
    }, 
    JWT_SECRET, 
    { expiresIn: JWT_EXPIRES_IN }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { 
      userId: user.id, 
      type: 'refresh'
    }, 
    JWT_SECRET, 
    { expiresIn: '7d' }
  );
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: 'Access token required',
      code: 'TOKEN_REQUIRED'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ 
        success: false, 
        error: 'Invalid or expired token',
        code: 'TOKEN_INVALID'
      });
    }
    
    req.user = decoded;
    next();
  });
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'patient-identity-service',
    version: '2.0.0',
    features: ['authentication', 'jwt', 'user-management'],
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Service info endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'Patient Identity Service',
    version: '2.0.0',
    description: 'Authentication, authorization, and user profile management',
    endpoints: {
      health: '/health',
      register: 'POST /api/v1/auth/register',
      login: 'POST /api/v1/auth/login',
      profile: 'GET /api/v1/auth/me',
      refresh: 'POST /api/v1/auth/refresh'
    },
    status: 'operational',
    timestamp: new Date().toISOString()
  });
});

// User Registration
app.post('/api/v1/auth/register', authLimiter, [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 12 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/).withMessage('Password must be at least 12 characters with uppercase, lowercase, digit and special character'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array(),
        code: 'VALIDATION_ERROR'
      });
    }

    const { email, password, firstName, lastName } = req.body;

    // Check if user already exists
    const existingUser = await prisma.customer.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'User with this email already exists',
        code: 'USER_EXISTS'
      });
    }

    // Hash password with stronger salt rounds
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user in database
    const newUser = await prisma.customer.create({
      data: {
        email,
        hashedPassword,
        firstName,
        lastName,
        emailVerified: false, // In production, send verification email
        phone: '', // Optional field
        preferredChannel: 'EMAIL' // Default value
      }
    });

    // Generate tokens
    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    // Log registration event without sensitive data
    logger.info(`[AUTH] User registered: ${email.replace(/(?<=.{2}).(?=.*@)/g, '*')} (ID: ${newUser.id})`);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          emailVerified: newUser.emailVerified
        },
        tokens: {
          accessToken,
          refreshToken,
          expiresIn: JWT_EXPIRES_IN
        }
      }
    });

  } catch (error) {
    logger.error('[AUTH] Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during registration',
      code: 'REGISTRATION_ERROR'
    });
  }
});

// User Login
app.post('/api/v1/auth/login', authLimiter, [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array(),
        code: 'VALIDATION_ERROR'
      });
    }

    const { email, password } = req.body;

    // Find user in database
    const user = await prisma.customer.findUnique({
      where: { email }
    });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.hashedPassword);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Log login event without sensitive data
    logger.info(`[AUTH] User logged in: ${email.replace(/(?<=.{2}).(?=.*@)/g, '*')} (ID: ${user.id})`);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          emailVerified: user.emailVerified
        },
        tokens: {
          accessToken,
          refreshToken,
          expiresIn: JWT_EXPIRES_IN
        }
      }
    });

  } catch (error) {
    logger.error('[AUTH] Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during login',
      code: 'LOGIN_ERROR'
    });
  }
});

// Get Current User Profile
app.get('/api/v1/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.customer.findUnique({
      where: { id: req.user.userId }
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          emailVerified: user.emailVerified,
          createdAt: user.createdAt
        }
      }
    });

  } catch (error) {
    logger.error('[AUTH] Profile fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'PROFILE_FETCH_ERROR'
    });
  }
});

// Token Refresh
app.post('/api/v1/auth/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        error: 'Refresh token required',
        code: 'REFRESH_TOKEN_REQUIRED'
      });
    }

    jwt.verify(refreshToken, JWT_SECRET, (err, decoded) => {
      if (err || decoded.type !== 'refresh') {
        return res.status(403).json({
          success: false,
          error: 'Invalid refresh token',
          code: 'INVALID_REFRESH_TOKEN'
        });
      }

      // Fetch user from database instead of in-memory array
      const user = await prisma.customer.findUnique({
        where: { id: decoded.userId }
      });
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
          code: 'USER_NOT_FOUND'
        });
      }

      // Generate new access token
      const newAccessToken = generateAccessToken(user);

      res.json({
        success: true,
        message: 'Token refreshed successfully',
        data: {
          accessToken: newAccessToken,
          expiresIn: JWT_EXPIRES_IN
        }
      });
    });

  } catch (error) {
    logger.error('[AUTH] Token refresh error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during token refresh',
      code: 'TOKEN_REFRESH_ERROR'
    });
  }
});

// Logout (token revocation would happen here in production)
app.post('/api/v1/auth/logout', authenticateToken, (req, res) => {
  logger.info(`[AUTH] User logged out: ${req.user.email?.replace(/(?<=.{2}).(?=.*@)/g, '*')} (ID: ${req.user.userId})`);
  
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

// List all users (for testing/demo purposes)
app.get('/api/v1/users', authenticateToken, async (req, res) => {
  try {
    const users = await prisma.customer.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        emailVerified: true,
        createdAt: true
      }
    });

    res.json({
      success: true,
      data: {
        users: users,
        total: users.length
      }
    });
  } catch (error) {
    logger.error('[AUTH] Users list error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'USERS_LIST_ERROR'
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  logger.error('[AUTH] Unhandled error:', error);
  
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    code: 'INTERNAL_ERROR',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    message: `${req.method} ${req.originalUrl} not found`,
    code: 'ENDPOINT_NOT_FOUND'
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🔐 Identity Service v2.0 running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔑 Authentication endpoints available at /api/v1/auth/*`);
  console.log(`👤 Demo user: demo@example.com / demo123`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 Identity Service shutting down gracefully');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 Identity Service shutting down gracefully');
  await prisma.$disconnect();
  process.exit(0);
});