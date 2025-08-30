const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('../src/generated/prisma');

const app = express();
const prisma = new PrismaClient();

// Configuration
const PORT = process.env.PORT || 3002;
const JWT_SECRET = process.env.JWT_SECRET || 'second-opinion-jwt-secret-2025';

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars setup with helpers
const hbs = engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  helpers: {
    eq: function(a, b) {
      return a === b;
    },
    ne: function(a, b) {
      return a !== b;
    }
  }
});

app.engine('handlebars', hbs);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Authentication middleware
const authenticate = async (req, res, next) => {
  const token = req.cookies.authToken;
  
  if (!token) {
    return res.redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const customer = await prisma.customer.findUnique({
      where: { id: decoded.userId }
    });

    if (!customer) {
      res.clearCookie('authToken');
      return res.redirect('/login');
    }

    req.user = customer;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.clearCookie('authToken');
    res.redirect('/login');
  }
};

// Routes
app.get('/login', (req, res) => {
  res.render('login', { title: 'Medical Portal - Login' });
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const customer = await prisma.customer.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!customer) {
      return res.render('login', { 
        error: 'Invalid email or password',
        title: 'Medical Portal - Login'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, customer.hashedPassword);
    if (!isPasswordValid) {
      return res.render('login', { 
        error: 'Invalid email or password',
        title: 'Medical Portal - Login'
      });
    }

    if (!customer.emailVerified) {
      return res.render('login', { 
        error: 'Please verify your email address before logging in.',
        title: 'Medical Portal - Login'
      });
    }

    const token = jwt.sign(
      { userId: customer.id, email: customer.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.redirect('/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    res.render('login', { 
      error: 'Login failed. Please try again.',
      title: 'Medical Portal - Login'
    });
  }
});

app.get('/dashboard', authenticate, async (req, res) => {
  try {
    // Mock dashboard data
    const dashboardData = {
      user: {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        initials: `${req.user.firstName[0]}${req.user.lastName[0]}`
      },
      stats: {
        totalCases: 2,
        activeCases: 1,
        completedCases: 1,
        avgResponseTime: '24 hours'
      },
      recentCases: [
        {
          id: '1',
          caseNumber: 'CASE-001',
          title: 'Chest Pain Evaluation',
          status: 'in_progress',
          submittedAt: '2 days ago'
        },
        {
          id: '2',
          caseNumber: 'CASE-002',
          title: 'Joint Pain Assessment',
          status: 'submitted',
          submittedAt: '3 days ago'
        }
      ],
      notifications: [
        {
          id: '1',
          title: 'Case Update',
          message: 'Your case CASE-001 has been reviewed by our specialist.',
          timestamp: '1 hour ago',
          read: false
        }
      ]
    };

    res.render('dashboard', { 
      title: 'Medical Portal - Dashboard',
      ...dashboardData
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.render('error', { 
      title: 'Error',
      error: 'Failed to load dashboard'
    });
  }
});

app.get('/cases', authenticate, (req, res) => {
  const cases = [
    {
      id: '1',
      caseNumber: 'CASE-001',
      title: 'Chest Pain Evaluation',
      description: 'Second opinion requested for persistent chest pain',
      status: 'in_progress',
      priority: 'high',
      submittedAt: '2025-08-28',
      assignedProfessional: 'Dr. Sarah Johnson'
    },
    {
      id: '2',
      caseNumber: 'CASE-002',
      title: 'Joint Pain Assessment',
      description: 'Orthopedic consultation for chronic joint pain',
      status: 'submitted',
      priority: 'medium',
      submittedAt: '2025-08-27',
      assignedProfessional: null
    }
  ];

  res.render('cases', { 
    title: 'My Cases',
    user: req.user,
    cases 
  });
});

app.get('/documents', authenticate, (req, res) => {
  const documents = [
    {
      id: '1',
      filename: 'chest_xray_2025.jpg',
      fileType: 'image/jpeg',
      category: 'Medical Imaging',
      uploadedAt: '2025-08-28',
      size: '2.1 MB'
    },
    {
      id: '2', 
      filename: 'lab_results.pdf',
      fileType: 'application/pdf',
      category: 'Lab Results',
      uploadedAt: '2025-08-27',
      size: '156 KB'
    }
  ];

  res.render('documents', { 
    title: 'My Documents',
    user: req.user,
    documents 
  });
});

app.get('/support', authenticate, (req, res) => {
  const tickets = [
    {
      id: '1',
      subject: 'Question about case status',
      status: 'open',
      createdAt: '2 days ago',
      lastReply: '1 day ago'
    }
  ];

  res.render('support', { 
    title: 'Support Center',
    user: req.user,
    tickets 
  });
});

app.get('/profile', authenticate, (req, res) => {
  res.render('profile', { 
    title: 'My Profile',
    user: req.user
  });
});

app.get('/billing', authenticate, (req, res) => {
  const invoices = [
    {
      id: '1',
      invoiceNumber: 'INV-001',
      amount: '$299.00',
      status: 'paid',
      date: '2025-08-15',
      description: 'Second Opinion - Case #CASE-001'
    }
  ];

  res.render('billing', { 
    title: 'Billing & Invoices',
    user: req.user,
    invoices 
  });
});

app.get('/cases/new', authenticate, (req, res) => {
  res.render('new-case', { 
    title: 'Submit New Case',
    user: req.user
  });
});

app.get('/logout', (req, res) => {
  res.clearCookie('authToken');
  res.redirect('/login');
});

// Default redirect
app.get('/', (req, res) => {
  res.redirect('/dashboard');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    title: 'Error',
    error: 'Something went wrong!'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Customer Portal running on http://localhost:${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}/dashboard`);
  console.log(`🔐 Login: http://localhost:${PORT}/login`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});