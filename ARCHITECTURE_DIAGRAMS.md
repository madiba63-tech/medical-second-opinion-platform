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

### Step 6: Terms & Consent
**Purpose**: Legal consent and final submission
**Components**: TermsConsent.tsx
**Features**:
- Expandable terms & conditions
- Required consent checkbox
- Final data submission to `/api/upload-request`

### Step 7: Confirmation
**Purpose**: Confirm successful submission
**Components**: ConfirmationScreen.tsx
**Features**:
- Case number display
- Process timeline explanation
- Contact information
- Print/email options

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

## 📈 Monitoring & Analytics

### Key Metrics
- **Upload Success Rate**: File upload completion percentage
- **Form Completion Rate**: Step-by-step abandonment tracking
- **Response Times**: API endpoint performance
- **Error Rates**: Failed submissions and reasons

### Health Checks
- **Database Connectivity**: Connection pool status
- **Storage Availability**: S3/local storage health
- **API Responsiveness**: Endpoint response times
- **Memory Usage**: Application resource consumption

This architecture provides a robust, secure, and scalable foundation for medical second opinion consultations while maintaining HIPAA-ready compliance and excellent user experience.
