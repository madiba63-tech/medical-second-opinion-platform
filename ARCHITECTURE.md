# Medical Second Opinion Platform - Architecture Documentation

## 🏗️ System Architecture Overview

The Medical Second Opinion Platform is a secure, multi-role web application built with Next.js, featuring role-based access control, secure file handling, and integrated module communication.

## 📊 High-Level Architecture Diagram

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[Patient Portal] --> B[Multi-step Form]
        C[Customer Portal] --> D[Case Dashboard]
        E[Professional Portal] --> F[Case Review Interface]
        G[Admin Dashboard] --> H[Management Interface]
    end

    subgraph "API Layer"
        I[Next.js API Routes]
        J[Authentication]
        K[File Upload]
        L[Case Management]
    end

    subgraph "Business Logic Layer"
        M[Repository Module]
        N[Customer Lifecycle Module]
        O[Invoicing & Accounting Module]
        P[Professional Recruitment Module]
        Q[Case Review Module]
    end

    subgraph "Data Layer"
        R[(SQLite Database)]
        S[Local File Storage]
        T[External AI Analysis]
    end

    subgraph "External Services"
        U[Email Service]
        V[SMS Service]
        W[Payment Gateway]
    end

    A --> I
    C --> I
    E --> I
    G --> I
    
    I --> M
    I --> N
    I --> O
    I --> P
    I --> Q
    
    M --> R
    M --> S
    M --> T
    N --> R
    O --> R
    P --> R
    Q --> R
    
    N --> U
    N --> V
    O --> W
```

## 🔄 System Flow Diagrams

### 1. Patient Case Submission Flow

```mermaid
flowchart TD
    A[Patient Lands on Portal] --> B[Fill Personal Information]
    B --> C[Upload & Classify Documents]
    C --> D[Provide Medical Context]
    D --> E[Review All Information]
    E --> F[Process Payment]
    F --> G[Accept Terms & Consent]
    G --> H[Submit Case]
    
    H --> I[Generate Case Number]
    I --> J[Store in Repository Module]
    I --> K[Create Customer Record]
    I --> L[Process Payment Record]
    
    J --> M[Trigger AI Analysis]
    K --> N[Send Confirmation Email]
    L --> O[Send Payment Confirmation]
    
    M --> P[Case Ready for Assignment]
    N --> Q[Customer Can Track Case]
    O --> R[Payment Confirmed]
```

### 2. Professional Case Review Flow

```mermaid
flowchart TD
    A[Professional Logs In] --> B[View Assigned Cases]
    B --> C[Select Case to Review]
    C --> D[Access Patient Documents]
    D --> E[Review AI Analysis Results]
    E --> F[Create Draft Medical Opinion]
    F --> G[Submit for Peer Review]
    G --> H{Peer Review Approved?}
    
    H -->|Yes| I[Finalize Opinion]
    H -->|No| J[Request Revisions]
    J --> F
    
    I --> K[Store in Repository]
    I --> L[Notify Customer]
    I --> M[Process Professional Payment]
    
    K --> N[Customer Can Download Opinion]
    L --> O[Send Email/SMS Notification]
    M --> P[Payment Recorded]
```

### 3. Admin Management Flow

```mermaid
flowchart TD
    A[Admin Logs In] --> B[View Dashboard]
    B --> C{Management Task}
    
    C -->|Professional Management| D[Review Applications]
    C -->|Case Management| E[Assign Cases]
    C -->|System Monitoring| F[View Analytics]
    
    D --> G{Application Valid?}
    G -->|Yes| H[Approve Professional]
    G -->|No| I[Reject Application]
    
    H --> J[Professional Can Accept Cases]
    I --> K[Application Closed]
    
    E --> L[Select Available Professional]
    L --> M[Assign Case]
    M --> N[Notify Professional]
    
    F --> O[Generate Reports]
    O --> P[Export Data]
```

## 🏛️ Component Architecture

### Frontend Components Structure

```mermaid
graph TD
    subgraph "Layout Components"
        A[RootLayout]
        B[RoleNavigation]
    end
    
    subgraph "Patient Portal Components"
        C[PatientInfoForm]
        D[MedicalUploadForm]
        E[MedicalContextForm]
        F[ReviewSubmission]
        G[PaymentSection]
        H[TermsConsent]
        I[ConfirmationScreen]
    end
    
    subgraph "Role-Specific Pages"
        J[Customer Dashboard]
        K[Professional Dashboard]
        L[Admin Dashboard]
    end
    
    subgraph "Shared Components"
        M[FileUpload]
        N[StepIndicator]
        O[LoadingSpinner]
    end
    
    A --> B
    A --> C
    A --> D
    A --> E
    A --> F
    A --> G
    A --> H
    A --> I
    A --> J
    A --> K
    A --> L
    
    C --> M
    D --> M
    F --> N
    G --> O
```

### API Routes Architecture

```mermaid
graph TD
    subgraph "File Management APIs"
        A[/api/presign-upload]
        B[/api/upload/dev-put]
    end
    
    subgraph "Case Management APIs"
        C[/api/upload-request]
        D[/api/ai-analysis]
    end
    
    subgraph "Communication APIs"
        E[/api/acknowledgement]
        F[/api/payment-confirmation]
    end
    
    subgraph "Role-Specific APIs"
        G[/api/customer/dashboard]
        H[/api/professional/cases]
        I[/api/admin/management]
    end
    
    subgraph "Authentication APIs"
        J[/api/auth/register]
        K[/api/auth/login]
    end
    
    A --> B
    C --> D
    E --> F
    G --> H
    H --> I
    J --> K
```

## 🗄️ Database Schema Architecture

```mermaid
erDiagram
    Customer ||--o{ Case : "has"
    Case ||--o{ UploadedFile : "contains"
    Case ||--o{ CaseAssignment : "assigned_to"
    MedicalProfessional ||--o{ CaseAssignment : "assigned"
    Case ||--o{ AIAnalysis : "analyzed_by"
    Case ||--o{ MedicalOpinion : "has"
    MedicalProfessional ||--o{ MedicalOpinion : "creates"
    Case ||--o{ ProfessionalPayment : "triggers"
    MedicalProfessional ||--o{ ProfessionalPayment : "receives"
    Admin ||--o{ MedicalProfessional : "manages"

    Customer {
        string id PK
        string firstName
        string middleName
        string lastName
        date dateOfBirth
        string email
        string phone
        string passwordHash
        string preferredContact
        boolean emailNotifications
        boolean smsNotifications
        datetime createdAt
        datetime updatedAt
    }

    Case {
        string id PK
        string caseNumber UK
        string firstName
        string middleName
        string lastName
        date dateOfBirth
        string email
        string phone
        string ethnicity
        string gender
        string diseaseType
        boolean isFirstOccurrence
        string geneticFamilyHistory
        string paymentId
        boolean consentAccepted
        string customerId FK
        datetime createdAt
        datetime updatedAt
    }

    UploadedFile {
        string id PK
        string caseId FK
        string filename
        string s3Key
        string mimetype
        int size
        string category
        datetime createdAt
    }

    MedicalProfessional {
        string id PK
        string professionalId UK
        string firstName
        string lastName
        string email
        string specialty
        string licenseNumber
        string status
        datetime createdAt
        datetime updatedAt
    }

    CaseAssignment {
        string id PK
        string caseId FK
        string professionalId FK
        string status
        datetime assignedAt
        datetime completedAt
    }

    AIAnalysis {
        string id PK
        string caseId FK
        string analysisType
        string results
        datetime createdAt
    }

    MedicalOpinion {
        string id PK
        string caseId FK
        string professionalId FK
        string content
        string status
        datetime createdAt
        datetime updatedAt
    }

    ProfessionalPayment {
        string id PK
        string caseId FK
        string professionalId FK
        decimal amount
        string status
        datetime createdAt
    }

    Admin {
        string id PK
        string email
        string passwordHash
        string role
        datetime createdAt
    }
```

## 🔐 Security Architecture

```mermaid
graph TD
    subgraph "Authentication Layer"
        A[JWT Token Generation]
        B[Password Hashing]
        C[Session Management]
    end
    
    subgraph "Authorization Layer"
        D[Role-Based Access Control]
        E[Route Protection]
        F[Component-Level Security]
    end
    
    subgraph "Data Security"
        G[File Encryption]
        H[Database Encryption]
        I[API Rate Limiting]
    end
    
    subgraph "Communication Security"
        J[HTTPS/TLS]
        K[Secure File Upload]
        L[Email Encryption]
    end
    
    A --> D
    B --> E
    C --> F
    G --> H
    H --> I
    J --> K
    K --> L
```

## 📱 User Interface Flow

### Patient Journey

```mermaid
journey
    title Patient Case Submission Journey
    section Initial Contact
      Landing Page: 5: Patient
      Role Selection: 4: Patient
    section Information Collection
      Personal Info: 3: Patient
      Document Upload: 4: Patient
      Medical Context: 3: Patient
    section Review & Payment
      Review Information: 4: Patient
      Payment Processing: 5: Patient
      Terms Acceptance: 4: Patient
    section Confirmation
      Case Submission: 5: Patient
      Confirmation Screen: 5: Patient
      Email Notifications: 4: Patient
```

### Professional Journey

```mermaid
journey
    title Professional Case Review Journey
    section Case Assignment
      Login: 5: Professional
      View Assigned Cases: 4: Professional
      Select Case: 4: Professional
    section Review Process
      Access Documents: 5: Professional
      Review AI Analysis: 4: Professional
      Create Opinion: 3: Professional
    section Quality Control
      Submit for Review: 4: Professional
      Peer Review: 3: Professional
      Finalize Opinion: 5: Professional
    section Completion
      Store Opinion: 5: Professional
      Notify Customer: 4: Professional
      Receive Payment: 5: Professional
```

## 🔧 Technical Stack Architecture

```mermaid
graph TB
    subgraph "Frontend"
        A[Next.js 15.4.7]
        B[React 18]
        C[TypeScript]
        D[Tailwind CSS]
        E[React Hook Form]
        F[Zod Validation]
    end
    
    subgraph "Backend"
        G[Next.js API Routes]
        H[Prisma ORM]
        I[SQLite Database]
        J[JWT Authentication]
    end
    
    subgraph "File Management"
        K[Local File Storage]
        L[AWS S3 SDK]
        M[Presigned URLs]
    end
    
    subgraph "Development Tools"
        N[Jest Testing]
        O[React Testing Library]
        P[ESLint]
        Q[Prettier]
    end
    
    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    
    G --> H
    H --> I
    G --> J
    
    G --> K
    K --> L
    L --> M
    
    N --> O
    O --> P
    P --> Q
```

## 📈 Performance Architecture

```mermaid
graph TD
    subgraph "Frontend Performance"
        A[Code Splitting]
        B[Lazy Loading]
        C[Image Optimization]
        D[CSS Optimization]
    end
    
    subgraph "Backend Performance"
        E[Database Indexing]
        F[Query Optimization]
        G[Connection Pooling]
        H[Caching Strategy]
    end
    
    subgraph "File Performance"
        I[Parallel Uploads]
        J[Chunked Uploads]
        K[Progress Tracking]
        L[Retry Logic]
    end
    
    subgraph "Monitoring"
        M[Error Tracking]
        N[Performance Metrics]
        O[User Analytics]
        P[System Health]
    end
    
    A --> B
    B --> C
    C --> D
    
    E --> F
    F --> G
    G --> H
    
    I --> J
    J --> K
    K --> L
    
    M --> N
    N --> O
    O --> P
```

## 🚀 Deployment Architecture

```mermaid
graph TD
    subgraph "Development Environment"
        A[Local Development]
        B[SQLite Database]
        C[Local File Storage]
        D[Hot Reload]
    end
    
    subgraph "Production Environment"
        E[Vercel/Netlify]
        F[PostgreSQL Database]
        G[AWS S3 Storage]
        H[CDN Distribution]
    end
    
    subgraph "CI/CD Pipeline"
        I[GitHub Actions]
        J[Automated Testing]
        K[Build Process]
        L[Deployment]
    end
    
    subgraph "Monitoring & Logging"
        M[Error Tracking]
        N[Performance Monitoring]
        O[Security Scanning]
        P[Backup Strategy]
    end
    
    A --> B
    B --> C
    C --> D
    
    E --> F
    F --> G
    G --> H
    
    I --> J
    J --> K
    K --> L
    
    M --> N
    N --> O
    O --> P
```

## 📋 Key Architectural Decisions

### 1. **Monolithic Next.js Application**
- **Rationale**: Simplified deployment, shared codebase, easier state management
- **Benefits**: Single codebase, unified authentication, shared components
- **Trade-offs**: Larger bundle size, less microservice flexibility

### 2. **SQLite for Development, PostgreSQL for Production**
- **Rationale**: Easy local development with production-ready scalability
- **Benefits**: Zero-config local setup, robust production database
- **Trade-offs**: Database migration complexity

### 3. **Local File Storage with S3 Fallback**
- **Rationale**: Development simplicity with production scalability
- **Benefits**: No external dependencies for development, secure production storage
- **Trade-offs**: Different storage APIs, migration complexity

### 4. **Role-Based Access Control**
- **Rationale**: Secure multi-tenant application with distinct user types
- **Benefits**: Clear separation of concerns, secure access control
- **Trade-offs**: Complex routing logic, role management overhead

### 5. **Multi-Step Form Architecture**
- **Rationale**: Complex data collection with validation and user experience
- **Benefits**: Progressive disclosure, validation at each step, better UX
- **Trade-offs**: State management complexity, navigation logic

## 🔮 Future Architecture Considerations

### 1. **Microservices Migration**
- Separate services for each module (Repository, Customer Lifecycle, etc.)
- API Gateway for unified access
- Event-driven communication between services

### 2. **Real-time Features**
- WebSocket integration for live updates
- Real-time notifications
- Live chat between professionals and customers

### 3. **Advanced AI Integration**
- Direct AI service integration
- Machine learning for case prioritization
- Automated document analysis

### 4. **Mobile Application**
- React Native or Flutter mobile app
- Offline capability
- Push notifications

### 5. **Internationalization**
- Multi-language support
- Regional compliance (GDPR, HIPAA, etc.)
- Localized payment processing

---

*This architecture documentation provides a comprehensive overview of the Medical Second Opinion Platform's technical design, data flow, and system components.*

