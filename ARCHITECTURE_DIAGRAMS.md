# Medical Second Opinion Portal - Architecture & Flow Diagrams

## 🏗️ System Architecture Overview

The Medical Second Opinion Portal is built as a secure, multi-step web application that collects patient information, medical documents, and contextual health data, then distributes this information across specialized backend modules.

### Architecture Principles

- **Security First**: End-to-end encryption, input validation, consent tracking
- **Modular Design**: Separate modules for different business functions
- **Scalable Storage**: Direct-to-cloud uploads with presigned URLs
- **Performance Optimized**: Parallel uploads, caching, efficient database operations
- **User Experience**: Multi-step wizard with progress tracking and validation

## 📊 Component Architecture

### Frontend Layer
- **Next.js 15.4.7** with App Router and Turbopack
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Hook Form + Zod** for validation
- **React Dropzone** for file uploads

### API Layer
- **RESTful endpoints** built with Next.js API routes
- **Zod validation** for all incoming data
- **Prisma ORM** for database operations
- **AWS SDK** for S3 integration

### Storage Layer
- **Production**: AWS S3 with AES-256 encryption
- **Development**: Local filesystem with signed URLs
- **Database**: SQLite (dev) / PostgreSQL (prod)

### Backend Modules Integration
- **Repository Module**: Stores medical files and health context
- **Customer Lifecycle Module**: Manages patient information and communications
- **Invoicing Module**: Handles payment processing and receipts

## 🔄 Multi-Step User Flow

### Step 1: Personal Information
**Purpose**: Collect patient identity data
**Components**: PatientInfoForm.tsx
**Data**: firstName, middleName, lastName, dateOfBirth, email, phone
**Validation**: Required fields, email format, phone format

### Step 2: Upload & Classify Documents
**Purpose**: Secure file upload with categorization
**Components**: MedicalUploadForm.tsx
**Process**:
1. User selects files (drag & drop or click)
2. Client-side validation (type, size, count)
3. Request presigned URLs from `/api/presign-upload`
4. Direct upload to S3/local storage
5. Categorize each file (Doctor's Letter, Image, Lab Report, Other)

**File Handling**:
```
Accepted Types: PDF, DOCX, JPG, PNG, TIFF, DICOM
Size Limit: 50MB per file
Count Limit: 10 files maximum
Categories: Doctor's Letter | Image | Lab Report | Other Document
```

### Step 3: Medical Context
**Purpose**: Gather health background information
**Components**: MedicalContextForm.tsx
**Data**: ethnicity, gender, diseaseType, isFirstOccurrence, geneticFamilyHistory
**UI Elements**: Dropdowns, radio buttons, multi-select checkboxes

### Step 4: Review Submission
**Purpose**: Allow user to review and edit all data
**Components**: ReviewSubmission.tsx
**Features**: 
- Display all collected data
- Edit buttons to return to previous steps
- File list with categories
- Data validation summary

### Step 5: Payment Processing
**Purpose**: Handle consultation fee payment
**Components**: PaymentSection.tsx
**Features**:
- Service summary ($299.00)
- Payment method selection
- Mock payment processing
- Security indicators

### Step 4: Expertise Level Selection
**Purpose**: Select professional expertise level and calculate pricing
**Components**: ExpertiseLevelStep.tsx
**Features**:
- Four expertise levels: Junior, Senior, Expert, Distinguished
- Real-time pricing calculation with urgency multipliers
- Integration with Payment & Billing Service (port 4007)
- Dynamic pricing display based on selection
- Base pricing from $299-899 with urgency modifiers

### Step 5: Review Submission
**Purpose**: Allow user to review and edit all data
**Components**: ReviewSubmission.tsx
**Features**: 
- Display all collected data including expertise level
- Edit buttons to return to previous steps
- File list with categories
- Calculated pricing summary
- Data validation summary

### Step 6: Payment Processing
**Purpose**: Handle consultation fee payment with actual calculated pricing
**Components**: PaymentSection.tsx
**Features**:
- Dynamic service pricing display
- Payment method selection
- Real-time pricing updates
- Security indicators
- Integration with payment processing

### Step 7: Terms & Consent
**Purpose**: Legal consent and final submission
**Components**: TermsConsent.tsx
**Features**:
- Expandable terms & conditions
- Required consent checkbox
- Final data submission to `/api/upload-request`

### Step 8: Confirmation
**Purpose**: Confirm successful submission
**Components**: ConfirmationScreen.tsx
**Features**:
- Case number display
- Process timeline explanation
- Customer portal redirect functionality
- Contact information
- Print/email options

## 👨‍⚕️ Professional Portal Management

### Professional Profile Management
**Purpose**: Allow professionals to manage their personal and professional information
**Components**: `/professional/profile/page.tsx`
**Features**:
- Personal information editing (name, email, phone)
- Professional information (specialty, license number)
- Communication preferences (email/SMS)
- Form validation and error handling
- Real-time save status

### Professional Account Management
**Purpose**: Provide comprehensive account overview and management tools
**Components**: `/professional/account/page.tsx`
**Features**:
- Account overview and subscription details
- Earnings and case statistics
- Recent activity tracking
- Quick actions for common tasks
- Account security settings
- Subscription management
- Billing history access

## 🔐 Security Architecture

### Transport Security
- **HTTPS/TLS**: All communications encrypted in transit
- **CORS**: Proper cross-origin resource sharing policies
- **Headers**: Security headers (CSP, HSTS, etc.)

### Input Validation
- **Client-Side**: React Hook Form with Zod schemas
- **Server-Side**: API route validation with Zod
- **File Validation**: MIME type, size, and count checks

### Storage Security
- **Presigned URLs**: Time-limited (5-10 minutes) upload access
- **Server-Side Encryption**: AES-256 for all stored files
- **Access Control**: No public bucket access
- **Unique Keys**: UUID-based file naming

### Data Protection
- **Minimal Storage**: Only metadata in database
- **Consent Tracking**: Explicit consent recording
- **Audit Trails**: Timestamps and status tracking
- **Encryption at Rest**: Database and file encryption

## 📡 API Endpoints

### `POST /api/presign-upload`
**Purpose**: Generate secure upload URLs
```typescript
Request: Array<{
  filename: string;
  mimetype: string;
}>

Response: Array<{
  url: string;
  key: string;
}>
```

### `POST /api/upload-request`
**Purpose**: Submit complete case data
```typescript
Request: {
  personalInfo: PersonalInfo;
  medicalFiles: MedicalFile[];
  contextInfo: MedicalContext;
  consentAccepted: true;
  paymentId?: string;
}

Response: {
  caseId: string;
  message: string;
}
```

### `PATCH /api/v1/professional/profile`
**Purpose**: Update professional profile information
```typescript
Request: {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone?: string;
  specialty: string;
  licenseNumber: string;
  preferredChannel: 'EMAIL' | 'SMS';
}

Response: {
  success: boolean;
  message: string;
}
```

### `GET /api/v1/professional/account`
**Purpose**: Retrieve professional account information
```typescript
Response: {
  accountId: string;
  subscriptionPlan: string;
  billingCycle: string;
  nextBillingDate: string;
  totalEarnings: number;
  completedCases: number;
  pendingCases: number;
}
```

### `POST /api/acknowledgement`
**Purpose**: Send patient acknowledgement email
**Integration**: Customer Lifecycle Module

### `POST /api/payment-confirmation`
**Purpose**: Send payment receipt email
**Integration**: Invoicing Module

## 💾 Database Schema

### Case Table
```sql
Case {
  id                    String   @id @default(cuid())
  caseNumber           String   @unique @default(cuid())
  
  -- Personal Information
  firstName            String
  middleName           String?
  lastName             String
  dateOfBirth          DateTime
  email                String
  phone                String?
  
  -- Medical Context
  ethnicity            String?
  gender               String?
  diseaseType          String?
  isFirstOccurrence    Boolean?
  geneticFamilyHistory String?  // JSON array
  
  -- Process Management
  paymentId            String?
  consentAccepted      Boolean  @default(false)
  status               String   @default("submitted")
  
  -- Timestamps
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt
  
  -- Relations
  files                UploadedFile[]
}
```

### UploadedFile Table
```sql
UploadedFile {
  id           String   @id @default(cuid())
  case         Case     @relation(fields: [caseId], references: [id])
  caseId       String
  storageKey   String   @unique
  originalName String
  mimeType     String
  sizeBytes    Int
  category     String   // File category
  createdAt    DateTime @default(now())
}
```

### ProfessionalProfile Table
```sql
ProfessionalProfile {
  id                String   @id @default(cuid())
  professionalId    String   @unique
  middleName        String?
  phone             String?
  preferredChannel  String   @default("EMAIL")
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}
```

### ProfessionalAccount Table
```sql
ProfessionalAccount {
  id                String   @id @default(cuid())
  professionalId    String   @unique
  accountId         String   @unique
  subscriptionPlan  String   @default("Professional")
  billingCycle      String   @default("Monthly")
  nextBillingDate   DateTime
  totalEarnings     Decimal  @default(0)
  completedCases    Int      @default(0)
  pendingCases      Int      @default(0)
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}
```

## 🔄 Data Flow Architecture

### File Upload Flow
1. **Client**: Select files, validate locally
2. **API**: Request presigned URLs with file metadata
3. **Storage**: Generate time-limited upload URLs
4. **Client**: Direct upload to storage (parallel)
5. **Database**: Store file metadata with storage keys

### Case Submission Flow
1. **Validation**: All form data validated with Zod
2. **Database**: Atomic transaction (case + files)
3. **Distribution**: Data sent to backend modules
4. **Notifications**: Trigger acknowledgement and payment emails
5. **Response**: Return case ID to client

### Backend Module Integration
```javascript
// Data Distribution Example
{
  "repositoryModule": {
    "caseId": "CASE-123456",
    "medicalFiles": [...],
    "medicalContext": {...}
  },
  "customerLifecycleModule": {
    "caseId": "CASE-123456", 
    "personalInfo": {...},
    "communicationPreferences": {...}
  },
  "invoicingModule": {
    "caseId": "CASE-123456",
    "paymentId": "txn_789",
    "amount": 299.00,
    "currency": "USD"
  }
}
```

### Professional Portal Data Flow
```javascript
// Professional Profile Update Flow
{
  "profileUpdate": {
    "professionalId": "PROF-2024-001",
    "personalInfo": {
      "firstName": "Dr. Sarah",
      "middleName": "",
      "lastName": "Johnson",
      "email": "sarah.johnson@medicalcenter.com",
      "phone": "+1234567890"
    },
    "professionalInfo": {
      "specialty": "Cardiology",
      "licenseNumber": "MD123456"
    },
    "preferences": {
      "preferredChannel": "EMAIL"
    }
  }
}

// Professional Account Data Flow
{
  "accountOverview": {
    "accountId": "PROF-2024-001",
    "subscription": {
      "plan": "Professional",
      "billingCycle": "Monthly",
      "nextBillingDate": "2024-02-15"
    },
    "earnings": {
      "totalEarnings": 12500.00,
      "completedCases": 47,
      "pendingCases": 3
    },
    "recentActivity": [
      {
        "type": "case_completed",
        "caseId": "CASE-2024-001",
        "earnings": 250.00,
        "timestamp": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

## 🚀 Performance Optimizations

### Frontend Performance
- **Parallel File Uploads**: Multiple files upload simultaneously
- **Progress Tracking**: Real-time upload progress indicators
- **Form Optimization**: Memoized components, efficient re-renders
- **Code Splitting**: Automatic route-based code splitting

### Backend Performance
- **Database Transactions**: Atomic operations for data consistency
- **Batch Operations**: Bulk file metadata insertion
- **Connection Pooling**: Prisma handles connection optimization
- **Caching**: Environment variable caching, validation sets

### Storage Performance
- **Direct Uploads**: Files bypass server for efficiency
- **Presigned URLs**: Eliminate server bandwidth usage
- **Parallel Processing**: Multiple file uploads concurrently
- **Regional Storage**: S3 regions for geographic optimization

## 🔮 Scalability Considerations

### Horizontal Scaling
- **Stateless Design**: No server-side sessions
- **Load Balancer Ready**: Multiple app instances supported
- **Database Scaling**: Read replicas, connection pooling
- **CDN Integration**: Static asset distribution

### Vertical Scaling
- **Efficient Queries**: Optimized database operations
- **Memory Management**: Proper resource cleanup
- **File Size Optimization**: Compression and validation
- **Background Processing**: Async operations where possible

## 🧪 Cross-Browser Testing Infrastructure

### Automated Testing Framework
**Components**: `tests/e2e/`, `playwright.config.ts`, `agents/test-manager.js`
**Features**:
- **105 Automated Tests** across 8 browser projects
- **Browser Coverage**: Chrome, Firefox, Safari, Edge, Mobile Chrome, Mobile Safari
- **Test Categories**: Functional (27), Visual Regression (30), API Compatibility (24), Mobile (24)
- **Live Testing Page**: `/cross-browser-test` for real-time browser compatibility verification

### Cross-Browser Test Suite
**Purpose**: Ensure consistent user experience across all major browsers
**Components**: 
- `cross-browser.browser.spec.ts` - Main compatibility tests
- `visual-regression.visual.spec.ts` - UI consistency verification
- `api-compatibility.api.spec.ts` - Network and API functionality
- `mobile-compatibility.mobile.spec.ts` - Touch and mobile-specific features
- `browser-helpers.ts` - Shared testing utilities

### Test Manager Integration
**Enhancement**: Cross-browser testing integrated as Step 6 in full test suite
**Features**:
- Automated Chrome, Firefox, and Safari testing
- Browser-specific performance monitoring
- Real-time feature detection and compatibility reporting
- Integration with existing health checks and system monitoring

### Browser Optimization Layer
**File**: `src/styles/browser-compatibility.css`
**Features**:
- Safari-specific fixes (webkit prefixes, font rendering, input styling)
- Firefox optimizations (scroll styling, focus management, font smoothing)
- Chrome performance enhancements (hardware acceleration, autofill styling)
- Mobile browser optimizations (touch targets, viewport fixes, orientation handling)
- Accessibility enhancements (high contrast, reduced motion, focus management)
- Performance optimizations (GPU acceleration, smooth animations)

### Live Testing Interface
**URL**: `http://localhost:4000/cross-browser-test`
**Features**:
- **Real-time Browser Detection**: Automatic current browser and version identification
- **60+ JavaScript Features**: async/await, optional chaining, promises, storage APIs
- **20+ CSS Features**: Grid, Flexbox, custom properties, container queries, backdrop filters
- **15+ Real-time APIs**: localStorage, geolocation, notifications, performance monitoring
- **API Endpoint Testing**: Live testing of all platform endpoints with response times
- **Performance Metrics**: Navigation timing, memory usage, network connection info
- **Quick Testing Tools**: Page reload tests, URL sharing, browser-specific recommendations

## 📈 Monitoring & Analytics

### Key Metrics
- **Upload Success Rate**: File upload completion percentage
- **Form Completion Rate**: Step-by-step abandonment tracking
- **Response Times**: API endpoint performance
- **Error Rates**: Failed submissions and reasons
- **Cross-Browser Compatibility**: Browser-specific success rates and performance metrics
- **Feature Support Matrix**: Real-time API and CSS feature compatibility tracking

### Health Checks
- **Database Connectivity**: Connection pool status
- **Storage Availability**: S3/local storage health
- **API Responsiveness**: Endpoint response times
- **Memory Usage**: Application resource consumption
- **Browser Compatibility**: Automated cross-browser functionality verification
- **Performance Benchmarks**: Target metrics compliance across browsers

This architecture provides a robust, secure, and scalable foundation for medical second opinion consultations while maintaining HIPAA-ready compliance and excellent user experience.
