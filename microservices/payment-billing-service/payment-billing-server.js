const express = require('express');
const cors = require('cors');
const { body, param, query, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const Decimal = require('decimal.js');
const cron = require('node-cron');
const winston = require('winston');
const { PrismaClient } = require('../../src/generated/prisma');

// Initialize services
const app = express();
const PORT = process.env.PORT || 3008;
const JWT_SECRET = process.env.JWT_SECRET || 'payment-billing-jwt-secret-2025';
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/secondopinion?schema=public';
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3005';

// Initialize Prisma client
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
});

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

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    body: req.method === 'POST' || req.method === 'PUT' ? req.body : undefined
  });
  next();
});

// Pricing Configuration (EUR base prices)
const PROFESSIONAL_PRICING = {
  'JUNIOR': {
    basePrice: 150.00,
    currency: 'EUR',
    professionalPercentage: 0.65 // 65% goes to professional
  },
  'SENIOR': {
    basePrice: 250.00,
    currency: 'EUR', 
    professionalPercentage: 0.70 // 70% goes to professional
  },
  'EXPERT': {
    basePrice: 400.00,
    currency: 'EUR',
    professionalPercentage: 0.75 // 75% goes to professional
  },
  'DISTINGUISHED': {
    basePrice: 650.00,
    currency: 'EUR',
    professionalPercentage: 0.80 // 80% goes to professional
  }
};

// Currency exchange rates (mock implementation - in production use external API)
const EXCHANGE_RATES = {
  'EUR': 1.0,
  'USD': 1.08,
  'GBP': 0.84,
  'CAD': 1.47,
  'CHF': 0.93
};

// Supported tax jurisdictions
const TAX_JURISDICTIONS = {
  'EU': ['DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'PT', 'IE', 'FI', 'SE', 'DK'],
  'US': ['US'],
  'CA': ['CA'], 
  'CH': ['CH']
};

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Access token required',
      code: 'TOKEN_MISSING'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Token verification failed:', error);
    return res.status(403).json({
      success: false,
      error: 'Invalid or expired token',
      code: 'TOKEN_INVALID'
    });
  }
};

// Utility Functions

// Convert currency using exchange rates
const convertCurrency = (amount, fromCurrency, toCurrency) => {
  if (fromCurrency === toCurrency) return amount;
  
  const eurAmount = new Decimal(amount).div(EXCHANGE_RATES[fromCurrency]);
  return eurAmount.mul(EXCHANGE_RATES[toCurrency]).toNumber();
};

// Determine tax jurisdiction based on country
const getTaxJurisdiction = (countryCode) => {
  for (const [jurisdiction, countries] of Object.entries(TAX_JURISDICTIONS)) {
    if (countries.includes(countryCode.toUpperCase())) {
      return jurisdiction;
    }
  }
  return 'OTHER';
};

// External System Integration Adapters

class InvoicingAdapter {
  constructor(providerType) {
    this.providerType = providerType;
    this.baseURL = process.env[`${providerType.toUpperCase()}_API_URL`];
    this.apiKey = process.env[`${providerType.toUpperCase()}_API_KEY`];
  }

  async generateInvoice(invoiceData) {
    logger.info(`Generating invoice via ${this.providerType}`, { invoiceData });
    
    // Mock implementation - replace with actual provider integration
    return {
      invoice_id: `inv_${uuidv4()}`,
      invoice_number: `INV-${Date.now()}`,
      invoice_url: `https://mock-provider.com/invoices/${uuidv4()}`,
      pdf_url: `https://mock-provider.com/invoices/${uuidv4()}.pdf`,
      status: 'draft',
      created_at: new Date().toISOString()
    };
  }

  async calculateTax(amount, jurisdiction, customerType = 'B2C') {
    logger.info(`Calculating tax for ${jurisdiction}`, { amount, customerType });
    
    // Mock tax calculation - replace with actual provider integration
    const taxRates = {
      'EU': { rate: 0.19, type: 'VAT' }, // Germany VAT example
      'US': { rate: 0.08, type: 'Sales Tax' },
      'CA': { rate: 0.13, type: 'HST' },
      'CH': { rate: 0.077, type: 'VAT' }
    };

    const taxInfo = taxRates[jurisdiction] || { rate: 0, type: 'No Tax' };
    const taxAmount = new Decimal(amount).mul(taxInfo.rate).toDecimalPlaces(2);

    return {
      tax_amount: taxAmount.toNumber(),
      tax_rate: taxInfo.rate,
      tax_type: taxInfo.type,
      net_amount: amount,
      gross_amount: new Decimal(amount).plus(taxAmount).toNumber()
    };
  }

  async sendInvoice(invoiceId, recipientData) {
    logger.info(`Sending invoice ${invoiceId}`, { recipientData });
    
    // Mock implementation
    return {
      sent: true,
      sent_at: new Date().toISOString(),
      delivery_status: 'pending'
    };
  }
}

// Initialize default adapter
const invoicingAdapter = new InvoicingAdapter('stripe');

// API Routes

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'operational',
    service: 'payment-billing-service',
    version: '1.0.0',
    features: [
      'price-determination',
      'professional-payments',
      'external-invoicing-integration',
      'tax-calculation',
      'billing-communications',
      'multi-currency-support',
      'audit-trail'
    ],
    endpoints: {
      health: '/health',
      pricing: 'GET /api/v1/pricing',
      quote: 'POST /api/v1/cases/:id/quote',
      invoice: 'POST /api/v1/cases/:id/invoice',
      professionalPayment: 'POST /api/v1/professional-payments',
      paymentStatus: 'GET /api/v1/payments/:id/status'
    },
    supportedCurrencies: Object.keys(EXCHANGE_RATES),
    supportedJurisdictions: Object.keys(TAX_JURISDICTIONS),
    timestamp: new Date().toISOString()
  });
});

// Get Pricing Information
app.get('/api/v1/pricing', (req, res) => {
  try {
    const { currency = 'EUR', jurisdiction = 'EU' } = req.query;
    
    const pricing = {};
    for (const [level, config] of Object.entries(PROFESSIONAL_PRICING)) {
      const convertedPrice = convertCurrency(config.basePrice, config.currency, currency);
      pricing[level] = {
        basePrice: convertedPrice,
        currency: currency,
        professionalPercentage: config.professionalPercentage,
        platformPercentage: (1 - config.professionalPercentage)
      };
    }

    res.status(200).json({
      success: true,
      data: {
        pricing,
        currency,
        jurisdiction,
        lastUpdated: new Date().toISOString()
      }
    });

  } catch (error) {
    logger.error('Pricing fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch pricing',
      code: 'PRICING_ERROR'
    });
  }
});

// Generate Case Quote
app.post('/api/v1/cases/:caseId/quote', [
  param('caseId').isUUID(),
  body('professionalLevel').isIn(['JUNIOR', 'SENIOR', 'EXPERT', 'DISTINGUISHED']),
  body('customerCountry').isLength({ min: 2, max: 2 }),
  body('currency').optional().isIn(Object.keys(EXCHANGE_RATES)),
  body('urgency').optional().isIn(['STANDARD', 'URGENT', 'EMERGENCY'])
], authenticateToken, async (req, res) => {
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

    const { caseId } = req.params;
    const { professionalLevel, customerCountry, currency = 'EUR', urgency = 'STANDARD' } = req.body;

    // Get case details
    const medicalCase = await prisma.medicalCase.findUnique({
      where: { id: caseId },
      include: {
        customer: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            country: true
          }
        }
      }
    });

    if (!medicalCase) {
      return res.status(404).json({
        success: false,
        error: 'Case not found',
        code: 'CASE_NOT_FOUND'
      });
    }

    // Calculate base price
    const priceConfig = PROFESSIONAL_PRICING[professionalLevel];
    let basePrice = convertCurrency(priceConfig.basePrice, priceConfig.currency, currency);

    // Apply urgency multiplier
    const urgencyMultipliers = {
      'STANDARD': 1.0,
      'URGENT': 1.5,
      'EMERGENCY': 2.0
    };
    basePrice = new Decimal(basePrice).mul(urgencyMultipliers[urgency]).toNumber();

    // Determine tax jurisdiction
    const taxJurisdiction = getTaxJurisdiction(customerCountry);
    
    // Calculate tax
    const taxCalculation = await invoicingAdapter.calculateTax(basePrice, taxJurisdiction);

    // Calculate professional payment
    const professionalPayment = new Decimal(basePrice).mul(priceConfig.professionalPercentage).toNumber();
    const platformFee = new Decimal(basePrice).minus(professionalPayment).toNumber();

    // Create quote record
    const quote = await prisma.caseQuote.create({
      data: {
        id: uuidv4(),
        caseId: caseId,
        customerId: medicalCase.customer.id,
        professionalLevel,
        currency,
        baseAmount: basePrice,
        taxAmount: taxCalculation.tax_amount,
        totalAmount: taxCalculation.gross_amount,
        professionalAmount: professionalPayment,
        platformAmount: platformFee,
        urgencyLevel: urgency,
        taxJurisdiction,
        exchangeRate: EXCHANGE_RATES[currency] / EXCHANGE_RATES['EUR'],
        status: 'draft',
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        createdAt: new Date(),
        metadata: JSON.stringify({
          taxCalculation,
          priceBreakdown: {
            basePrice,
            urgencyMultiplier: urgencyMultipliers[urgency],
            professionalPercentage: priceConfig.professionalPercentage
          }
        })
      }
    });

    res.status(200).json({
      success: true,
      data: {
        quoteId: quote.id,
        caseId,
        pricing: {
          baseAmount: basePrice,
          taxAmount: taxCalculation.tax_amount,
          totalAmount: taxCalculation.gross_amount,
          currency,
          taxJurisdiction,
          taxType: taxCalculation.tax_type
        },
        professionalPayment: {
          amount: professionalPayment,
          percentage: priceConfig.professionalPercentage
        },
        platformFee: platformFee,
        urgencyLevel: urgency,
        validUntil: quote.validUntil,
        breakdown: {
          baseServiceFee: priceConfig.basePrice,
          urgencyMultiplier: urgencyMultipliers[urgency],
          exchangeRate: EXCHANGE_RATES[currency],
          taxRate: taxCalculation.tax_rate
        }
      }
    });

  } catch (error) {
    logger.error('Quote generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate quote',
      code: 'QUOTE_ERROR'
    });
  }
});

// Generate Invoice
app.post('/api/v1/cases/:caseId/invoice', [
  param('caseId').isUUID(),
  body('quoteId').isUUID(),
  body('customerData').isObject()
], authenticateToken, async (req, res) => {
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

    const { caseId } = req.params;
    const { quoteId, customerData } = req.body;

    // Get quote
    const quote = await prisma.caseQuote.findFirst({
      where: {
        id: quoteId,
        caseId: caseId,
        status: 'draft',
        validUntil: { gte: new Date() }
      }
    });

    if (!quote) {
      return res.status(404).json({
        success: false,
        error: 'Valid quote not found',
        code: 'QUOTE_NOT_FOUND'
      });
    }

    // Prepare invoice data for external system
    const invoiceData = {
      case_id: caseId,
      case_number: `CASE-${caseId.slice(-8).toUpperCase()}`,
      customer_data: {
        id: quote.customerId,
        email: customerData.email,
        name: `${customerData.firstName} ${customerData.lastName}`,
        billing_address: customerData.billingAddress,
        country: customerData.country,
        vat_number: customerData.vatNumber
      },
      line_items: [{
        description: `Medical Second Opinion Review - ${quote.professionalLevel} Level`,
        quantity: 1,
        unit_price: quote.baseAmount,
        tax_amount: quote.taxAmount,
        total_amount: quote.totalAmount,
        currency: quote.currency
      }],
      tax_jurisdiction: quote.taxJurisdiction,
      due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    };

    // Generate invoice via external system
    const externalInvoice = await invoicingAdapter.generateInvoice(invoiceData);

    // Create invoice record
    const invoice = await prisma.caseInvoice.create({
      data: {
        id: uuidv4(),
        caseId: caseId,
        customerId: quote.customerId,
        quoteId: quoteId,
        externalInvoiceId: externalInvoice.invoice_id,
        invoiceNumber: externalInvoice.invoice_number,
        currency: quote.currency,
        baseAmount: quote.baseAmount,
        taxAmount: quote.taxAmount,
        totalAmount: quote.totalAmount,
        status: 'generated',
        invoiceUrl: externalInvoice.invoice_url,
        pdfUrl: externalInvoice.pdf_url,
        dueDate: invoiceData.due_date,
        createdAt: new Date(),
        metadata: JSON.stringify({
          externalInvoice,
          customerData,
          quoteData: quote
        })
      }
    });

    // Update quote status
    await prisma.caseQuote.update({
      where: { id: quoteId },
      data: { status: 'invoiced' }
    });

    // Send invoice notification
    try {
      await axios.post(`${NOTIFICATION_SERVICE_URL}/api/v1/notifications/send`, {
        recipient: customerData.email,
        type: 'invoice_generated',
        template: 'invoice_email',
        data: {
          invoiceNumber: invoice.invoiceNumber,
          amount: invoice.totalAmount,
          currency: invoice.currency,
          dueDate: invoice.dueDate,
          invoiceUrl: invoice.invoiceUrl,
          caseNumber: invoiceData.case_number
        }
      }, {
        headers: {
          'Authorization': req.headers.authorization,
          'Content-Type': 'application/json'
        }
      });
    } catch (notificationError) {
      logger.error('Failed to send invoice notification:', notificationError);
    }

    res.status(200).json({
      success: true,
      data: {
        invoiceId: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        externalInvoiceId: invoice.externalInvoiceId,
        totalAmount: invoice.totalAmount,
        currency: invoice.currency,
        dueDate: invoice.dueDate,
        invoiceUrl: invoice.invoiceUrl,
        pdfUrl: invoice.pdfUrl,
        status: invoice.status
      }
    });

  } catch (error) {
    logger.error('Invoice generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate invoice',
      code: 'INVOICE_ERROR'
    });
  }
});

// Process Professional Payment
app.post('/api/v1/professional-payments', [
  body('caseId').isUUID(),
  body('professionalId').isUUID(),
  body('invoiceId').isUUID()
], authenticateToken, async (req, res) => {
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

    const { caseId, professionalId, invoiceId } = req.body;

    // Verify case is completed and paid
    const medicalCase = await prisma.medicalCase.findFirst({
      where: {
        id: caseId,
        assignedProfessionalId: professionalId,
        status: { in: ['OPINION_DELIVERED', 'COMPLETED'] }
      }
    });

    if (!medicalCase) {
      return res.status(404).json({
        success: false,
        error: 'Case not found or not eligible for payment',
        code: 'CASE_NOT_ELIGIBLE'
      });
    }

    // Get invoice to verify payment
    const invoice = await prisma.caseInvoice.findFirst({
      where: {
        id: invoiceId,
        caseId: caseId,
        status: 'paid'
      }
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        error: 'Paid invoice not found',
        code: 'INVOICE_NOT_PAID'
      });
    }

    // Check if professional payment already processed
    const existingPayment = await prisma.professionalPayment.findFirst({
      where: {
        caseId: caseId,
        professionalId: professionalId
      }
    });

    if (existingPayment) {
      return res.status(409).json({
        success: false,
        error: 'Professional payment already processed',
        code: 'PAYMENT_ALREADY_EXISTS'
      });
    }

    // Get professional details
    const professional = await prisma.medicalProfessional.findUnique({
      where: { id: professionalId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        level: true,
        country: true,
        bankDetails: true
      }
    });

    // Calculate professional payment amount
    const priceConfig = PROFESSIONAL_PRICING[professional.level];
    const professionalAmount = new Decimal(invoice.baseAmount)
      .mul(priceConfig.professionalPercentage)
      .toDecimalPlaces(2)
      .toNumber();

    // Calculate tax jurisdiction for professional
    const professionalTaxJurisdiction = getTaxJurisdiction(professional.country);

    // Create professional payment record
    const professionalPayment = await prisma.professionalPayment.create({
      data: {
        id: uuidv4(),
        caseId: caseId,
        professionalId: professionalId,
        invoiceId: invoiceId,
        amount: professionalAmount,
        currency: invoice.currency,
        taxJurisdiction: professionalTaxJurisdiction,
        paymentPercentage: priceConfig.professionalPercentage,
        status: 'pending',
        scheduledPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Net 30
        createdAt: new Date(),
        metadata: JSON.stringify({
          baseInvoiceAmount: invoice.baseAmount,
          professionalLevel: professional.level,
          paymentSchedule: 'net_30'
        })
      }
    });

    // Send professional payment notification
    try {
      await axios.post(`${NOTIFICATION_SERVICE_URL}/api/v1/notifications/send`, {
        recipient: professional.email,
        type: 'professional_payment_scheduled',
        template: 'professional_payment_email',
        data: {
          professionalName: `Dr. ${professional.firstName} ${professional.lastName}`,
          caseNumber: `CASE-${caseId.slice(-8).toUpperCase()}`,
          amount: professionalAmount,
          currency: invoice.currency,
          paymentDate: professionalPayment.scheduledPaymentDate,
          paymentId: professionalPayment.id
        }
      }, {
        headers: {
          'Authorization': req.headers.authorization,
          'Content-Type': 'application/json'
        }
      });
    } catch (notificationError) {
      logger.error('Failed to send professional payment notification:', notificationError);
    }

    res.status(200).json({
      success: true,
      message: 'Professional payment scheduled successfully',
      data: {
        paymentId: professionalPayment.id,
        professionalId: professionalId,
        caseId: caseId,
        amount: professionalAmount,
        currency: invoice.currency,
        scheduledPaymentDate: professionalPayment.scheduledPaymentDate,
        status: professionalPayment.status,
        taxJurisdiction: professionalTaxJurisdiction
      }
    });

  } catch (error) {
    logger.error('Professional payment processing error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process professional payment',
      code: 'PROFESSIONAL_PAYMENT_ERROR'
    });
  }
});

// Get Payment Status
app.get('/api/v1/payments/:paymentId/status', [
  param('paymentId').isUUID()
], authenticateToken, async (req, res) => {
  try {
    const { paymentId } = req.params;

    // Try to find as invoice payment
    let payment = await prisma.caseInvoice.findUnique({
      where: { id: paymentId },
      include: {
        case: {
          select: {
            caseNumber: true,
            category: true
          }
        },
        customer: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    if (payment) {
      return res.status(200).json({
        success: true,
        data: {
          paymentId: payment.id,
          type: 'customer_payment',
          invoiceNumber: payment.invoiceNumber,
          amount: payment.totalAmount,
          currency: payment.currency,
          status: payment.status,
          createdAt: payment.createdAt,
          dueDate: payment.dueDate,
          paidAt: payment.paidAt,
          case: payment.case,
          customer: payment.customer
        }
      });
    }

    // Try to find as professional payment
    payment = await prisma.professionalPayment.findUnique({
      where: { id: paymentId },
      include: {
        case: {
          select: {
            caseNumber: true,
            category: true
          }
        },
        professional: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            level: true
          }
        }
      }
    });

    if (payment) {
      return res.status(200).json({
        success: true,
        data: {
          paymentId: payment.id,
          type: 'professional_payment',
          amount: payment.amount,
          currency: payment.currency,
          status: payment.status,
          createdAt: payment.createdAt,
          scheduledPaymentDate: payment.scheduledPaymentDate,
          paidAt: payment.paidAt,
          case: payment.case,
          professional: payment.professional
        }
      });
    }

    return res.status(404).json({
      success: false,
      error: 'Payment not found',
      code: 'PAYMENT_NOT_FOUND'
    });

  } catch (error) {
    logger.error('Payment status fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch payment status',
      code: 'PAYMENT_STATUS_ERROR'
    });
  }
});

// Update Payment Status (Webhook endpoint for external systems)
app.post('/api/v1/webhooks/payment-status', [
  body('paymentId').isString(),
  body('status').isIn(['pending', 'processing', 'paid', 'failed', 'disputed', 'refunded']),
  body('externalTransactionId').optional().isString(),
  body('paidAt').optional().isISO8601()
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

    const { paymentId, status, externalTransactionId, paidAt } = req.body;

    // Update invoice payment status
    const invoice = await prisma.caseInvoice.findFirst({
      where: {
        OR: [
          { id: paymentId },
          { externalInvoiceId: paymentId }
        ]
      }
    });

    if (invoice) {
      await prisma.caseInvoice.update({
        where: { id: invoice.id },
        data: {
          status: status,
          paidAt: paidAt ? new Date(paidAt) : (status === 'paid' ? new Date() : null),
          externalTransactionId: externalTransactionId,
          lastModified: new Date()
        }
      });

      // If payment successful, trigger professional payment processing
      if (status === 'paid' && invoice.caseId) {
        const medicalCase = await prisma.medicalCase.findUnique({
          where: { id: invoice.caseId },
          select: { assignedProfessionalId: true }
        });

        if (medicalCase?.assignedProfessionalId) {
          // Trigger professional payment (you could use a queue here)
          try {
            await axios.post(`http://localhost:${PORT}/api/v1/professional-payments`, {
              caseId: invoice.caseId,
              professionalId: medicalCase.assignedProfessionalId,
              invoiceId: invoice.id
            }, {
              headers: {
                'Authorization': `Bearer ${jwt.sign({ system: true }, JWT_SECRET)}`,
                'Content-Type': 'application/json'
              }
            });
          } catch (paymentError) {
            logger.error('Failed to auto-trigger professional payment:', paymentError);
          }
        }
      }
    }

    res.status(200).json({
      success: true,
      message: 'Payment status updated successfully'
    });

  } catch (error) {
    logger.error('Payment status update error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update payment status',
      code: 'PAYMENT_STATUS_UPDATE_ERROR'
    });
  }
});

// Get Professional Payment Summary
app.get('/api/v1/professionals/:professionalId/payments', [
  param('professionalId').isUUID(),
  query('year').optional().isInt({ min: 2020, max: 2030 }),
  query('status').optional().isIn(['pending', 'paid', 'cancelled'])
], authenticateToken, async (req, res) => {
  try {
    const { professionalId } = req.params;
    const { year = new Date().getFullYear(), status } = req.query;

    const whereClause = {
      professionalId: professionalId,
      createdAt: {
        gte: new Date(`${year}-01-01`),
        lte: new Date(`${year}-12-31`)
      }
    };

    if (status) {
      whereClause.status = status;
    }

    const payments = await prisma.professionalPayment.findMany({
      where: whereClause,
      include: {
        case: {
          select: {
            caseNumber: true,
            category: true,
            completedAt: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Calculate summary statistics
    const summary = payments.reduce((acc, payment) => {
      acc.totalAmount += payment.amount;
      acc.count += 1;
      acc.byStatus[payment.status] = (acc.byStatus[payment.status] || 0) + 1;
      acc.byCurrency[payment.currency] = (acc.byCurrency[payment.currency] || 0) + payment.amount;
      return acc;
    }, {
      totalAmount: 0,
      count: 0,
      byStatus: {},
      byCurrency: {}
    });

    res.status(200).json({
      success: true,
      data: {
        professionalId,
        year: parseInt(year),
        summary,
        payments: payments.map(payment => ({
          id: payment.id,
          caseId: payment.caseId,
          caseNumber: payment.case.caseNumber,
          category: payment.case.category,
          amount: payment.amount,
          currency: payment.currency,
          status: payment.status,
          scheduledPaymentDate: payment.scheduledPaymentDate,
          paidAt: payment.paidAt,
          createdAt: payment.createdAt
        }))
      }
    });

  } catch (error) {
    logger.error('Professional payment summary error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch professional payments',
      code: 'PROFESSIONAL_PAYMENTS_ERROR'
    });
  }
});

// Scheduled Tasks

// Daily payment reconciliation
cron.schedule('0 2 * * *', async () => {
  logger.info('Running daily payment reconciliation');
  
  try {
    // Process scheduled professional payments
    const scheduledPayments = await prisma.professionalPayment.findMany({
      where: {
        status: 'pending',
        scheduledPaymentDate: {
          lte: new Date()
        }
      },
      include: {
        professional: {
          select: {
            email: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    for (const payment of scheduledPayments) {
      // In production, this would integrate with actual payment processing
      await prisma.professionalPayment.update({
        where: { id: payment.id },
        data: {
          status: 'paid',
          paidAt: new Date()
        }
      });

      // Send payment confirmation
      try {
        await axios.post(`${NOTIFICATION_SERVICE_URL}/api/v1/notifications/send`, {
          recipient: payment.professional.email,
          type: 'professional_payment_confirmed',
          template: 'professional_payment_confirmation',
          data: {
            professionalName: `Dr. ${payment.professional.firstName} ${payment.professional.lastName}`,
            amount: payment.amount,
            currency: payment.currency,
            paymentDate: new Date().toISOString(),
            paymentId: payment.id
          }
        });
      } catch (notificationError) {
        logger.error('Failed to send payment confirmation:', notificationError);
      }
    }

    logger.info(`Processed ${scheduledPayments.length} professional payments`);

  } catch (error) {
    logger.error('Payment reconciliation error:', error);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`💳 Payment & Billing Integration Service v1.0 running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`💰 Get pricing: GET /api/v1/pricing`);
  console.log(`📝 Generate quote: POST /api/v1/cases/{id}/quote`);
  console.log(`🧾 Generate invoice: POST /api/v1/cases/{id}/invoice`);
  console.log(`👩‍⚕️ Professional payments: POST /api/v1/professional-payments`);
  console.log(`📈 Payment status: GET /api/v1/payments/{id}/status`);
  console.log(`🌍 Supported currencies: ${Object.keys(EXCHANGE_RATES).join(', ')}`);
  console.log(`⚖️ Tax jurisdictions: ${Object.keys(TAX_JURISDICTIONS).join(', ')}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  await prisma.$disconnect();
  process.exit(0);
});