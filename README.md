# Medical Second Opinion Platform

A secure, multi-role web application for medical second opinions with professional review capabilities, AI integration, and comprehensive case management.

## 🏥 Platform Overview

The Medical Second Opinion Platform enables patients to submit medical cases for expert review by qualified medical professionals. The system features role-based access control, secure file handling, AI analysis integration, and comprehensive case management across multiple modules.

## 🎯 Key Features

### **Multi-Role System**
- **Patient Portal**: Multi-step case submission with document upload
- **Customer Portal**: Case tracking and opinion access
- **Professional Portal**: Case review and medical opinion creation
- **Professional Recruitment**: 8-step vetting and onboarding process
- **Admin Dashboard**: Professional management, case oversight, and lifecycle management
- **Case Data Repository**: Comprehensive data management and analytics

### **Core Functionality**
- ✅ Secure file upload and classification
- ✅ Multi-step form with validation
- ✅ AI analysis integration
- ✅ Professional vetting and assignment
- ✅ Peer review workflow
- ✅ Payment processing
- ✅ Email/SMS notifications
- ✅ Case tracking and management
- ✅ Professional recruitment and vetting (8-step process)
- ✅ Competency scoring and assessment
- ✅ Customer lifecycle management
- ✅ Cross-browser compatibility (Chrome, Safari, Firefox)
- ✅ Comprehensive testing suite
- ✅ Role-based navigation system

## 🏗️ Architecture Documentation

### **📊 System Architecture**
- [Complete Architecture Overview](ARCHITECTURE.md) - System design, components, and technical stack
- [Business Process Flowcharts](FLOWCHARTS.md) - Detailed process flows and decision trees
- [Professional Recruitment Specification](PROFESSIONAL_RECRUITMENT_SPECIFICATION.md) - 8-step vetting process details
- [Performance Optimization Guide](PERFORMANCE.md) - System performance and optimization strategies
- [Patient Instructions](PATIENT_INSTRUCTIONS.md) - User guide for patients and customers

### **📋 System Status & Documentation**
- [System Status Overview](SYSTEM_STATUS.md) - Current feature implementation status
- [Changelog](CHANGELOG.md) - Complete version history and release notes
- [Professional Recruitment Specification](PROFESSIONAL_RECRUITMENT_SPECIFICATION.md) - Detailed vetting process
- [Customer Lifecycle Management](CUSTOMER_LIFECYCLE_ERROR_FIX.md) - Lifecycle system documentation
- [Role Navigator Improvements](ROLE_NAVIGATOR_IMPROVEMENTS.md) - Navigation system enhancements
- [Hydration Error Fixes](HYDRATION_ERROR_FIX_3.md) - Technical fixes and improvements

### **🔧 Technical Stack**
- **Frontend**: Next.js 15.4.7, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM, SQLite/PostgreSQL
- **File Storage**: Local development + AWS S3 production
- **Authentication**: JWT tokens, bcrypt password hashing
- **Testing**: Jest, React Testing Library
- **Validation**: Zod schema validation

## 🚀 Quick Start

### **Prerequisites**
- Node.js 20+ 
- npm or yarn
- Git

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd second-opinion
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 How to Use

### **Accessing Different Roles**

The platform includes a **Role Navigation Menu** (red button in top-right corner) to switch between different user interfaces:

- **🏥 Patient Portal**: `http://localhost:3000/` - Submit new cases
- **👤 Customer Portal**: `http://localhost:3000/customer` - Track existing cases
- **👨‍⚕️ Professional Portal**: `http://localhost:3000/professional` - Review assigned cases
- **🎯 Professional Recruitment**: `http://localhost:3000/professional/apply` - 8-step vetting process
- **⚙️ Admin Dashboard**: `http://localhost:3000/admin` - Manage professionals and cases
- **📊 Case Data Repository**: `http://localhost:3000/admin/repository` - Data management and analytics
- **🔄 Customer Lifecycle**: `http://localhost:3000/admin/customer-lifecycle` - Customer journey management

### **Patient Journey**
1. **Personal Information** - Fill in basic details
2. **Document Upload** - Upload and classify medical files
3. **Medical Context** - Provide health background
4. **Review** - Review all information
5. **Payment** - Process payment
6. **Consent** - Accept terms and conditions
7. **Confirmation** - Receive case number and confirmation

## 📁 Project Structure

```
second-opinion/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── api/               # API routes
│   │   ├── customer/          # Customer portal
│   │   ├── professional/      # Professional portal
│   │   ├── admin/             # Admin dashboard
│   │   └── page.tsx           # Patient portal (main)
│   ├── components/            # React components
│   ├── lib/                   # Utilities and configurations
│   └── types/                 # TypeScript type definitions
├── prisma/                    # Database schema and migrations
├── tests/                     # Test files
├── docs/                      # Documentation
└── .uploads/                  # Local file storage (development)
```

## 🧪 Testing

Run the comprehensive test suite:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run specific test categories
npm run test:components
npm run test:api
npm run test:integration

# Run the comprehensive test runner
./run-tests.sh
```

### **Test Coverage**
- ✅ **Unit Tests**: Component and utility testing
- ✅ **Integration Tests**: API endpoint testing
- ✅ **E2E Tests**: Full user journey testing
- ✅ **Cross-Browser Testing**: Chrome, Safari, Firefox compatibility
- ✅ **Performance Testing**: Load and stress testing

## 📊 Database Schema

The platform uses a comprehensive database schema with the following main entities:

- **Customer** - Patient information and authentication
- **Case** - Medical case records with unique case numbers
- **UploadedFile** - Medical documents and files
- **MedicalProfessional** - Qualified medical professionals
- **CaseAssignment** - Professional-to-case assignments
- **AIAnalysis** - AI analysis results
- **MedicalOpinion** - Professional medical opinions
- **ProfessionalPayment** - Payment records for professionals

## 🔐 Security Features

- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Authorization**: Role-based access control (Patient, Customer, Professional, Admin)
- **File Security**: Secure file upload with presigned URLs
- **Data Protection**: Encrypted data storage and transmission
- **Input Validation**: Comprehensive form validation with Zod schemas

## 🌐 API Endpoints

### **Core APIs**
- `POST /api/presign-upload` - Generate secure upload URLs
- `POST /api/upload-request` - Submit complete case data
- `POST /api/acknowledgement` - Send confirmation emails
- `POST /api/payment-confirmation` - Process payment confirmations

### **Role-Specific APIs**
- `GET /api/customer/dashboard` - Customer case data
- `GET /api/professional/cases` - Professional assigned cases
- `GET /api/admin/management` - Admin management data

## 📈 Performance Features

- **Code Splitting**: Automatic code splitting for optimal loading
- **Image Optimization**: Next.js built-in image optimization
- **Database Indexing**: Optimized database queries
- **Caching**: Strategic caching for improved performance
- **Parallel Uploads**: Concurrent file uploads for better UX

## 🔧 Development

### **Environment Variables**
Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="file:./dev.db"

# File Storage (optional for production)
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
AWS_S3_BUCKET=your_bucket_name

# JWT Secret
JWT_SECRET=your_jwt_secret
```

### **Available Scripts**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run test suite

## 🚀 Deployment

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### **Other Platforms**
- **Netlify**: Similar to Vercel deployment
- **Railway**: Full-stack deployment platform
- **Heroku**: Traditional cloud platform

## 📋 Roadmap

### **Phase 1 (Completed)**
- ✅ Multi-step patient submission
- ✅ File upload and classification
- ✅ Basic role-based access
- ✅ Database schema implementation
- ✅ Professional recruitment and vetting
- ✅ Customer lifecycle management
- ✅ Cross-browser compatibility
- ✅ Comprehensive testing suite

### **Phase 2 (Current)**
- 🔄 Advanced AI document analysis
- 🔄 Real-time notifications
- 🔄 Mobile application development
- 🔄 Internationalization support
- 🔄 Enhanced analytics dashboard

### **Phase 3 (Future)**
- 📋 Microservices architecture
- 📋 Advanced machine learning features
- 📋 Blockchain credential verification
- 📋 Video consultation integration
- 📋 Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- 📧 Email: support@medicalsecondopinion.com
- 📖 Documentation: [ARCHITECTURE.md](ARCHITECTURE.md)
- 🐛 Issues: [GitHub Issues](https://github.com/your-repo/issues)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Prisma team for the excellent ORM
- Tailwind CSS for the utility-first styling
- All contributors and testers

---

**🏥 Medical Second Opinion Platform** - Empowering patients with expert medical insights through secure, professional review processes.