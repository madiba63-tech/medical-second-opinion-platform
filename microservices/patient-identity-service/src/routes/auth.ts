// Authentication Routes
// Following v2.0 Architecture requirements for stateless authentication

import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authenticator } from 'otplib';
import QRCode from 'qrcode';
import { prisma } from '../utils/database';
import { redisClient } from '../utils/redis';
import { logger } from '../utils/logger';
import { config } from '../config/environment';
import { rateLimit } from '../middleware/rate-limit';
import { validateRequest } from '../middleware/validation';
import { 
  generateEmailVerificationToken, 
  generatePasswordResetToken,
  sendVerificationEmail,
  sendPasswordResetEmail
} from '../services/email-service';
import { AuditLogService } from '../services/audit-service';

const router = Router();
const auditService = new AuditLogService();

// ===== VALIDATION SCHEMAS =====
const registerValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: config.security.passwordMinLength }),
  body('firstName').trim().isLength({ min: 1, max: 50 }),
  body('lastName').trim().isLength({ min: 1, max: 50 }),
  body('dateOfBirth').isISO8601(),
  body('phone').optional().isMobilePhone('any'),
  body('preferredChannel').optional().isIn(['EMAIL', 'SMS']),
];

const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 1 }),
  body('totpCode').optional().isLength({ min: 6, max: 6 }).isNumeric(),
];

const forgotPasswordValidation = [
  body('email').isEmail().normalizeEmail(),
];

const resetPasswordValidation = [
  body('token').isUUID(),
  body('password').isLength({ min: config.security.passwordMinLength }),
];

// ===== REGISTER ENDPOINT =====
router.post('/register', 
  rateLimit({ maxRequests: 5, windowMs: 900000 }), // 5 requests per 15 minutes
  registerValidation,
  validateRequest,
  async (req, res) => {
    const { email, password, firstName, middleName, lastName, dateOfBirth, phone, preferredChannel } = req.body;
    
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(409).json({
          error: 'User with this email already exists',
          code: 'EMAIL_EXISTS'
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, config.security.bcryptRounds);

      // Start database transaction
      const result = await prisma.$transaction(async (tx) => {
        // Create user
        const user = await tx.user.create({
          data: {
            email,
            hashedPassword,
            emailVerified: false,
          },
        });

        // Create customer profile
        const customer = await tx.customer.create({
          data: {
            firstName,
            middleName,
            lastName,
            dateOfBirth: new Date(dateOfBirth),
            email,
            phone,
            preferredChannel: preferredChannel || 'EMAIL',
            userId: user.id,
          },
        });

        return { user, customer };
      });

      // Generate email verification token
      const verificationToken = await generateEmailVerificationToken(email);
      
      // Send verification email (async)
      sendVerificationEmail(email, verificationToken).catch(error => {
        logger.error('Failed to send verification email:', error);
      });

      // Log audit event
      await auditService.log(result.user.id, 'user_register', {
        email,
        customerId: result.customer.id,
      }, req.ip, req.get('User-Agent'), true);

      logger.info(`User registered successfully: ${email}`);

      res.status(201).json({
        success: true,
        message: 'Registration successful. Please check your email to verify your account.',
        userId: result.user.id,
        customerId: result.customer.id,
      });

    } catch (error) {
      logger.error('Registration error:', error);
      
      await auditService.log('anonymous', 'user_register', {
        email,
        error: (error as Error).message,
      }, req.ip, req.get('User-Agent'), false);

      res.status(500).json({
        error: 'Registration failed. Please try again.',
        code: 'REGISTRATION_FAILED'
      });
    }
  }
);

// ===== LOGIN ENDPOINT =====
router.post('/login',
  rateLimit({ maxRequests: 10, windowMs: 900000 }), // 10 requests per 15 minutes
  loginValidation,
  validateRequest,
  async (req, res) => {
    const { email, password, totpCode } = req.body;
    
    try {
      // Find user with customer profile
      const user = await prisma.user.findUnique({
        where: { email },
        include: { customer: true },
      });

      if (!user) {
        await auditService.log('anonymous', 'user_login', {
          email,
          error: 'User not found',
        }, req.ip, req.get('User-Agent'), false);

        return res.status(401).json({
          error: 'Invalid email or password',
          code: 'INVALID_CREDENTIALS'
        });
      }

      // Check if account is locked
      if (user.lockedUntil && user.lockedUntil > new Date()) {
        await auditService.log(user.id, 'user_login', {
          email,
          error: 'Account locked',
        }, req.ip, req.get('User-Agent'), false);

        return res.status(423).json({
          error: 'Account is temporarily locked. Please try again later.',
          code: 'ACCOUNT_LOCKED'
        });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
      if (!isPasswordValid) {
        // Increment failed login attempts
        await prisma.user.update({
          where: { id: user.id },
          data: {
            failedLoginAttempts: { increment: 1 },
            lockedUntil: user.failedLoginAttempts >= config.security.maxLoginAttempts - 1
              ? new Date(Date.now() + config.security.lockoutDuration)
              : null,
          },
        });

        await auditService.log(user.id, 'user_login', {
          email,
          error: 'Invalid password',
        }, req.ip, req.get('User-Agent'), false);

        return res.status(401).json({
          error: 'Invalid email or password',
          code: 'INVALID_CREDENTIALS'
        });
      }

      // Check 2FA if enabled
      if (user.twoFactorEnabled) {
        if (!totpCode) {
          return res.status(200).json({
            requiresTwoFactor: true,
            message: 'Please provide your two-factor authentication code'
          });
        }

        // Verify TOTP code
        const isValidTOTP = authenticator.verify({
          token: totpCode,
          secret: user.twoFactorSecret!,
        });

        if (!isValidTOTP) {
          await auditService.log(user.id, 'user_login', {
            email,
            error: 'Invalid 2FA code',
          }, req.ip, req.get('User-Agent'), false);

          return res.status(401).json({
            error: 'Invalid two-factor authentication code',
            code: 'INVALID_2FA'
          });
        }
      }

      // Generate JWT tokens
      const accessToken = jwt.sign(
        { 
          userId: user.id,
          customerId: user.customer?.id,
          email: user.email,
          role: 'customer'
        },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      const refreshToken = jwt.sign(
        { userId: user.id, type: 'refresh' },
        config.jwt.secret,
        { expiresIn: config.jwt.refreshExpiresIn }
      );

      // Store session in Redis and database
      const sessionId = `session:${user.id}:${Date.now()}`;
      const tokenHash = Buffer.from(accessToken).toString('base64');
      
      await redisClient.setex(sessionId, 86400, JSON.stringify({
        userId: user.id,
        tokenHash,
        lastActivity: new Date(),
      }));

      await prisma.userSession.create({
        data: {
          userId: user.id,
          tokenHash,
          deviceInfo: { userAgent: req.get('User-Agent') },
          ipAddress: req.ip,
          userAgent: req.get('User-Agent'),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        },
      });

      // Update user login info and reset failed attempts
      await prisma.user.update({
        where: { id: user.id },
        data: {
          lastLoginAt: new Date(),
          lastLoginIP: req.ip,
          failedLoginAttempts: 0,
          lockedUntil: null,
        },
      });

      await auditService.log(user.id, 'user_login', {
        email,
        sessionId,
      }, req.ip, req.get('User-Agent'), true);

      logger.info(`User logged in successfully: ${email}`);

      res.json({
        success: true,
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          emailVerified: user.emailVerified,
          twoFactorEnabled: user.twoFactorEnabled,
        },
        customer: user.customer ? {
          id: user.customer.id,
          firstName: user.customer.firstName,
          lastName: user.customer.lastName,
          preferredChannel: user.customer.preferredChannel,
        } : null,
      });

    } catch (error) {
      logger.error('Login error:', error);
      
      await auditService.log('anonymous', 'user_login', {
        email,
        error: (error as Error).message,
      }, req.ip, req.get('User-Agent'), false);

      res.status(500).json({
        error: 'Login failed. Please try again.',
        code: 'LOGIN_FAILED'
      });
    }
  }
);

// ===== EMAIL VERIFICATION =====
router.post('/verify-email',
  body('token').isUUID(),
  validateRequest,
  async (req, res) => {
    const { token } = req.body;
    
    try {
      // Find verification token
      const verificationToken = await prisma.emailVerificationToken.findUnique({
        where: { token },
      });

      if (!verificationToken || verificationToken.expiresAt < new Date() || verificationToken.usedAt) {
        return res.status(400).json({
          error: 'Invalid or expired verification token',
          code: 'INVALID_TOKEN'
        });
      }

      // Update user as verified
      await prisma.$transaction(async (tx) => {
        await tx.user.update({
          where: { email: verificationToken.email },
          data: {
            emailVerified: true,
            emailVerifiedAt: new Date(),
          },
        });

        await tx.emailVerificationToken.update({
          where: { id: verificationToken.id },
          data: { usedAt: new Date() },
        });
      });

      logger.info(`Email verified successfully: ${verificationToken.email}`);

      res.json({
        success: true,
        message: 'Email verified successfully',
      });

    } catch (error) {
      logger.error('Email verification error:', error);
      res.status(500).json({
        error: 'Email verification failed. Please try again.',
        code: 'VERIFICATION_FAILED'
      });
    }
  }
);

// ===== FORGOT PASSWORD =====
router.post('/forgot-password',
  rateLimit({ maxRequests: 3, windowMs: 900000 }), // 3 requests per 15 minutes
  forgotPasswordValidation,
  validateRequest,
  async (req, res) => {
    const { email } = req.body;
    
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      // Always return success to prevent email enumeration
      if (!user) {
        return res.json({
          success: true,
          message: 'If an account with that email exists, a password reset link has been sent.',
        });
      }

      // Generate password reset token
      const resetToken = await generatePasswordResetToken(email);
      
      // Send password reset email (async)
      sendPasswordResetEmail(email, resetToken).catch(error => {
        logger.error('Failed to send password reset email:', error);
      });

      await auditService.log(user.id, 'password_reset_request', {
        email,
      }, req.ip, req.get('User-Agent'), true);

      logger.info(`Password reset requested: ${email}`);

      res.json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent.',
      });

    } catch (error) {
      logger.error('Forgot password error:', error);
      res.status(500).json({
        error: 'Password reset request failed. Please try again.',
        code: 'RESET_REQUEST_FAILED'
      });
    }
  }
);

// ===== RESET PASSWORD =====
router.post('/reset-password',
  rateLimit({ maxRequests: 5, windowMs: 900000 }), // 5 requests per 15 minutes
  resetPasswordValidation,
  validateRequest,
  async (req, res) => {
    const { token, password } = req.body;
    
    try {
      // Find password reset token
      const resetToken = await prisma.passwordResetToken.findUnique({
        where: { token },
      });

      if (!resetToken || resetToken.expiresAt < new Date() || resetToken.usedAt) {
        return res.status(400).json({
          error: 'Invalid or expired reset token',
          code: 'INVALID_TOKEN'
        });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(password, config.security.bcryptRounds);

      // Update user password and mark token as used
      await prisma.$transaction(async (tx) => {
        const user = await tx.user.update({
          where: { email: resetToken.email },
          data: {
            hashedPassword,
            passwordChangedAt: new Date(),
            failedLoginAttempts: 0,
            lockedUntil: null,
          },
        });

        await tx.passwordResetToken.update({
          where: { id: resetToken.id },
          data: { usedAt: new Date() },
        });

        // Revoke all existing sessions for security
        await tx.userSession.updateMany({
          where: { userId: user.id },
          data: { revokedAt: new Date() },
        });

        await auditService.log(user.id, 'password_reset', {
          email: resetToken.email,
        }, req.ip, req.get('User-Agent'), true);
      });

      // Clear Redis sessions
      const keys = await redisClient.keys(`session:${resetToken.email}:*`);
      if (keys.length > 0) {
        await redisClient.del(...keys);
      }

      logger.info(`Password reset successfully: ${resetToken.email}`);

      res.json({
        success: true,
        message: 'Password reset successfully. Please log in with your new password.',
      });

    } catch (error) {
      logger.error('Reset password error:', error);
      res.status(500).json({
        error: 'Password reset failed. Please try again.',
        code: 'RESET_FAILED'
      });
    }
  }
);

export { router as authRoutes };