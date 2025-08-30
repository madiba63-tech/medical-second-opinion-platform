const { PrismaClient } = require('./src/generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    console.log('Creating test user...');
    
    // Hash password
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    // Create test user
    const testUser = await prisma.customer.create({
      data: {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        hashedPassword: hashedPassword,
        phone: '+1234567890',
        dateOfBirth: new Date('1990-01-01'),
        gender: 'PREFER_NOT_TO_SAY',
        preferredLanguage: 'ENGLISH',
        preferredChannel: 'EMAIL',
        emailNotifications: true,
        smsNotifications: false,
        whatsappNotifications: false,
        termsAccepted: true,
        privacyAccepted: true,
        emailVerified: true
      }
    });

    console.log('Test user created successfully!');
    console.log('Login credentials:');
    console.log('Email: test@example.com');
    console.log('Password: password123');
    console.log('User ID:', testUser.id);

  } catch (error) {
    if (error.code === 'P2002') {
      console.log('Test user already exists!');
      console.log('Login credentials:');
      console.log('Email: test@example.com'); 
      console.log('Password: password123');
    } else {
      console.error('Error creating test user:', error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser();