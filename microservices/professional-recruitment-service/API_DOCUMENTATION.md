# Professional Recruitment Service API Documentation

**Version:** 1.0.0  
**Service:** Medical Second Opinion Platform - Professional Recruitment  
**Base URL:** `http://localhost:3004` (Development) | `https://api.yourdomain.com` (Production)  
**Last Updated:** 2025-08-31  

---

## Table of Contents

1. [Overview](#overview)
2. [Authentication & Security](#authentication--security)  
3. [Rate Limiting](#rate-limiting)
4. [Error Handling](#error-handling)
5. [Data Models](#data-models)
6. [API Endpoints](#api-endpoints)
7. [File Upload System](#file-upload-system)
8. [AI Document Analysis](#ai-document-analysis)
9. [Competency Scoring](#competency-scoring)
10. [Security Considerations](#security-considerations)
11. [Healthcare Compliance](#healthcare-compliance)
12. [OpenAPI Specification](#openapi-specification)

---

## Overview

The Professional Recruitment Service provides a comprehensive 8-step medical professional onboarding system with AI-powered document analysis, competency scoring, and administrative review capabilities. This service is specifically designed for healthcare professionals seeking to join a medical second opinion platform.

### Key Features

- **8-Step Application Wizard**: Identity, Education, Licensing, Experience, Research, Recognition, Compliance, Review
- **AI Document Analysis**: OCR-powered extraction from CVs, certificates, and medical documents
- **Competency Scoring**: Algorithmic assessment based on experience, publications, and credentials
- **Secure File Upload**: Healthcare-compliant document management with encryption
- **Administrative Review**: Workflow for application review and approval/rejection
- **HIPAA/Healthcare Compliance**: Security measures appropriate for medical data handling

---

## Authentication & Security

### Frontend Authentication
```typescript
// Professional authentication (JWT-based)
Authorization: Bearer <jwt_token>
```

### Admin Authentication  
```typescript
// Admin endpoints require valid admin JWT token
Authorization: Bearer <admin_jwt_token>
```

### Security Headers
- **Helmet.js**: Comprehensive security headers including CSP
- **CORS**: Strict origin validation with credentials support
- **Rate Limiting**: IP-based and user-based rate limiting
- **Input Validation**: Express-validator with healthcare-specific validations

---

## Rate Limiting

### General API Endpoints
- **Limit**: 100 requests per 15 minutes per IP
- **Headers**: `RateLimit-*` headers included in responses

### Account Creation
- **Limit**: 5 account creation requests per 15 minutes per IP
- **Endpoint**: `/api/v1/candidates/apply`

### File Upload Presigning  
- **Limit**: 10 requests per 15 minutes per IP+user
- **Endpoints**: `/api/professional/presign-upload`

---

## Error Handling

All API responses follow a consistent error format:

```json
{
  "success": false,
  "error": "Human-readable error message",
  "code": "MACHINE_READABLE_ERROR_CODE",
  "details": ["Additional error details array"],
  "timestamp": "2025-08-31T10:00:00.000Z"
}
```

### Common Error Codes
- `VALIDATION_ERROR`: Input validation failed
- `CANDIDATE_EXISTS`: Email already has an application
- `CANDIDATE_NOT_FOUND`: Invalid candidate ID
- `ADMIN_ACCESS_REQUIRED`: Admin authentication required
- `DOCUMENT_UPLOAD_ERROR`: File upload failed
- `AI_PREPOPULATE_ERROR`: AI document analysis failed
- `RATE_LIMIT_EXCEEDED`: Too many requests

---

## Data Models

### ProfessionalCandidate

```typescript
interface ProfessionalCandidate {
  id: string;                          // UUID
  
  // Step 1: Identity & Contact Info
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: Date;
  nationality: string;
  email: string;                       // Unique
  phone?: string;

  // Step 2: Education & Training  
  boardCertificationNumber?: string;

  // Step 3: Licensing
  medicalLicenseNumber: string;
  licenseCountry: string;
  licenseState?: string;
  licenseExpiry: Date;

  // Step 4: Professional Experience
  yearsIndependentPractice: number;
  currentAffiliation: string;
  subspecialties?: string[];
  annualPatientLoad?: number;
  secondOpinionsGiven?: number;

  // Step 5: Research & Academic
  peerReviewedPublications: number;
  clinicalTrialInvolvement: boolean;
  clinicalTrialDetails?: string;
  conferencePresentations: boolean;
  conferenceDetails?: string;
  teachingRoles: boolean;
  teachingDetails?: string;

  // Step 6: Professional Recognition  
  oncologySocieties?: string[];
  awardsHonors?: string;
  leadershipRoles?: string;

  // Step 7: Compliance
  professionalReferences?: Reference[];
  noActiveDisciplinary: boolean;
  dataProtectionAgreed: boolean;

  // Step 8: Assessment
  competencyScore: number;
  competencyLevel: 'JUNIOR' | 'SENIOR' | 'EXPERT' | 'DISTINGUISHED';
  scoreBreakdown: CompetencyBreakdown;

  // System fields
  applicationStatus: 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'ADDITIONAL_INFO_REQUIRED';
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  reviewNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### CompetencyBreakdown
```typescript
interface CompetencyBreakdown {
  experience: number;        // 0-20 points (years of practice)
  boardCertification: number; // 0-10 points (required for eligibility)
  subspecialty: number;      // 0-5 points
  publications: number;      // 0-15 points
  clinicalTrials: number;    // 0-10 points
  conferenceTeaching: number; // 0-10 points
  societyMembership: number; // 0-5 points
  leadership: number;        // 0-10 points
  peerReview: number;        // 0-15 points (future enhancement)
}
```

### CandidateDocument
```typescript
interface CandidateDocument {
  id: string;                    // UUID
  candidateId: string;           // FK to ProfessionalCandidate
  documentType: DocumentType;
  fileName: string;              // Sanitized filename
  originalName: string;          // Original uploaded filename
  s3Key: string;                // S3 object key
  mimetype: string;
  size: number;                  // Bytes
  checksum?: string;             // File integrity hash
  encrypted: boolean;            // Encryption status
  uploadedAt: Date;
}

enum DocumentType {
  'GOVERNMENT_ID',
  'MEDICAL_DEGREE',
  'RESIDENCY_CERTIFICATE', 
  'FELLOWSHIP_CERTIFICATE',
  'BOARD_CERTIFICATION',
  'LICENSE_CERTIFICATE',
  'GOOD_STANDING_CERTIFICATE',
  'CV',
  'PUBLICATION_1',
  'PUBLICATION_2', 
  'PUBLICATION_3',
  'MALPRACTICE_INSURANCE',
  'ADDITIONAL_DIPLOMA'
}
```

---

## API Endpoints

### Health & Service Info

#### GET /health
Health check endpoint for monitoring and load balancing.

**Response:**
```json
{
  "status": "healthy",
  "service": "professional-recruitment-service",
  "version": "1.0.0",
  "features": ["candidate-onboarding", "document-upload", "competency-scoring", "admin-review"],
  "timestamp": "2025-08-31T10:00:00.000Z",
  "uptime": 3600.5
}
```

#### GET /
Service information and available endpoints.

**Response:**
```json
{
  "service": "Professional Recruitment Service",
  "version": "1.0.0",
  "description": "Medical professional candidate onboarding, vetting, and competency assessment",
  "endpoints": {
    "health": "/health",
    "submitApplication": "POST /api/v1/candidates/apply",
    "uploadDocuments": "POST /api/v1/candidates/{id}/documents",
    "getCandidates": "GET /api/v1/admin/candidates",
    "reviewApplication": "POST /api/v1/admin/candidates/{id}/review"
  },
  "onboardingSteps": [
    "Identity & Contact Info",
    "Education & Training",
    "Licensing", 
    "Professional Experience",
    "Research & Academic Contributions",
    "Professional Recognition",
    "Good Standing & Compliance",
    "Competency Assessment"
  ],
  "competencyLevels": {
    "JUNIOR": "< 40 points",
    "SENIOR": "40-59 points",
    "EXPERT": "60-79 points", 
    "DISTINGUISHED": "80+ points"
  }
}
```

---

### Candidate Application Endpoints

#### POST /api/v1/candidates/apply
Submit a complete 8-step professional application.

**Request Body:**
```json
{
  // Step 1: Identity & Contact Info
  "firstName": "Dr. Sarah",
  "middleName": "Elizabeth", 
  "lastName": "Johnson",
  "dateOfBirth": "1985-03-15",
  "nationality": "United States",
  "email": "sarah.johnson@hospital.com",
  "phone": "+1-555-0123",

  // Step 3: Licensing
  "medicalLicenseNumber": "MD123456789",
  "licenseCountry": "United States",
  "licenseState": "California",
  "licenseExpiry": "2026-12-31",

  // Step 4: Professional Experience
  "yearsIndependentPractice": 8,
  "currentAffiliation": "Stanford Medical Center",
  "subspecialties": ["breast cancer", "immunotherapy"],
  "annualPatientLoad": 300,
  "secondOpinionsGiven": 50,

  // Step 5: Research & Academic
  "peerReviewedPublications": 25,
  "clinicalTrialInvolvement": true,
  "clinicalTrialDetails": "Principal Investigator on 3 Phase II breast cancer trials",
  "conferencePresentations": true,
  "conferenceDetails": "ASCO Annual Meeting keynote speaker 2023",
  "teachingRoles": true,
  "teachingDetails": "Associate Professor of Oncology, Stanford University",

  // Step 6: Professional Recognition
  "oncologySocieties": ["ASCO", "ESMO", "AACR"],
  "awardsHonors": "Young Investigator Award - ASCO 2020",
  "leadershipRoles": "Chair of Breast Cancer Committee, National Guidelines Panel",

  // Step 7: Compliance  
  "professionalReferences": [
    {
      "name": "Dr. Michael Chen",
      "email": "mchen@stanford.edu", 
      "phone": "+1-555-0124",
      "relationship": "Department Chief"
    },
    {
      "name": "Dr. Lisa Rodriguez",
      "email": "lrodriguez@ucsf.edu",
      "phone": "+1-555-0125", 
      "relationship": "Research Collaborator"
    }
  ],
  "noActiveDisciplinary": true,
  "dataProtectionAgreed": true,

  // Step 2: Education & Training
  "boardCertificationNumber": "BC987654321"
}
```

**Validation Rules:**
- `firstName`, `lastName`: Required, string
- `dateOfBirth`: Required, ISO8601 date
- `nationality`: Required, string
- `email`: Required, valid email, unique
- `medicalLicenseNumber`: Required, string
- `licenseCountry`: Required, string  
- `licenseExpiry`: Required, ISO8601 date, future date
- `yearsIndependentPractice`: Required, positive integer
- `currentAffiliation`: Required, string
- `peerReviewedPublications`: Optional, non-negative integer
- `noActiveDisciplinary`: Required, boolean (must be true)
- `dataProtectionAgreed`: Required, must be "true"

**Success Response (201):**
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "candidateId": "550e8400-e29b-41d4-a716-446655440000",
    "competencyAssessment": {
      "score": 75,
      "level": "EXPERT",
      "breakdown": {
        "experience": 15,
        "boardCertification": 10,
        "subspecialty": 5,
        "publications": 15,
        "clinicalTrials": 10,
        "conferenceTeaching": 10,
        "societyMembership": 5,
        "leadership": 5,
        "peerReview": 0
      }
    },
    "nextSteps": "Your application is under review. You will be contacted if additional documents are required."
  }
}
```

**Error Responses:**
- `400`: Validation failed
- `409`: Candidate with email already exists
- `500`: Application submission error

---

#### POST /api/v1/candidates/ai-prepopulate  
AI-powered document analysis for application pre-population.

**Content-Type:** `multipart/form-data`

**Form Fields:**
- `email`: Valid email address for identification
- `cv`: CV/Resume file (recommended)
- `medical_degree`: Medical degree certificate
- `license_certificate`: Medical license document
- `board_certification`: Board certification document
- `residency_certificate`: Residency completion certificate
- `fellowship_certificate`: Fellowship certificate
- Additional document types supported

**File Requirements:**
- **Max Size**: 25MB per file
- **Allowed Types**: PDF, JPEG, PNG, TIFF, DOC, DOCX, TXT
- **OCR Support**: Images processed with Tesseract.js
- **PDF Support**: Text extraction with pdf-parse

**Success Response (200):**
```json
{
  "success": true,
  "message": "AI document analysis completed",
  "data": {
    "prepopulatedApplication": {
      "firstName": "Sarah",
      "lastName": "Johnson", 
      "email": "sarah.johnson@hospital.com",
      "phone": "5550123",
      "currentAffiliation": "Stanford Medical Center",
      "yearsIndependentPractice": 8,
      "peerReviewedPublications": 25,
      "subspecialties": ["breast cancer", "immunotherapy"],
      "oncologySocieties": ["ASCO", "ESMO"],
      "clinicalTrialInvolvement": true,
      "clinicalTrialDetails": "Principal Investigator on Phase II trials",
      "teachingRoles": true,
      "teachingDetails": "Associate Professor of Oncology",
      "conferencePresentations": true,
      "leadershipRoles": "Chair of Breast Cancer Committee",
      "boardCertificationNumber": "BC987654321",
      "medicalLicenseNumber": "MD123456789"
    },
    "aiAnalysis": {
      "documentsProcessed": 3,
      "successfulExtractions": 3,
      "overallConfidence": 85,
      "extractionResults": [
        {
          "documentType": "CV",
          "fileName": "DrJohnson_CV_2025.pdf",
          "confidence": 0.90,
          "extractedFields": {
            "firstName": "Sarah",
            "lastName": "Johnson",
            "email": "sarah.johnson@hospital.com",
            "currentAffiliation": "Stanford Medical Center",
            "yearsIndependentPractice": 8,
            "peerReviewedPublications": 25,
            "subspecialties": ["breast cancer", "immunotherapy"]
          },
          "rawTextPreview": "DR. SARAH JOHNSON, MD\nStanford Medical Center\nDepartment of Oncology..."
        }
      ],
      "preliminaryAssessment": {
        "totalScore": 75,
        "level": "EXPERT",
        "breakdown": {
          "experience": 15,
          "boardCertification": 10,
          "subspecialty": 5,
          "publications": 15,
          "clinicalTrials": 10,
          "conferenceTeaching": 10,
          "societyMembership": 5,
          "leadership": 5,
          "peerReview": 0
        }
      }
    },
    "instructions": {
      "message": "Review and modify the pre-populated fields before submitting your application.",
      "nextStep": "Submit the reviewed application to POST /api/v1/candidates/apply"
    }
  }
}
```

**AI Extraction Capabilities:**
- **Name Extraction**: Multiple pattern matching for medical professionals
- **Contact Info**: Email and phone number detection
- **Affiliations**: Hospital/institution recognition with medical center patterns
- **Experience**: Years calculation from CV content and date ranges
- **Publications**: Count extraction from various formats
- **Subspecialties**: Keyword matching for oncology subspecialties
- **Society Memberships**: Recognition of major medical societies (ASCO, ESMO, etc.)
- **Clinical Trials**: PI/investigator role detection
- **Teaching**: Professor/faculty role identification
- **Leadership**: Committee, board, and leadership role extraction
- **Certifications**: Board certification and license number extraction

---

### Document Management Endpoints

#### POST /api/v1/candidates/{id}/documents
Upload supporting documents for a candidate application.

**Path Parameters:**
- `id`: Candidate UUID

**Content-Type:** `multipart/form-data`

**Form Fields (Document Types):**
- `government_id`: Government-issued ID
- `medical_degree`: Medical school diploma
- `residency_certificate`: Residency completion certificate
- `fellowship_certificate`: Fellowship completion certificate  
- `board_certification`: Board certification document
- `license_certificate`: Medical license certificate
- `good_standing`: Good standing certificate
- `cv`: Curriculum Vitae
- `publication_1`, `publication_2`, `publication_3`: Key publications
- `malpractice_insurance`: Malpractice insurance certificate
- Additional diplomas with auto-generated field names

**File Requirements:**
- **Max Size**: 25MB per file
- **Max Files**: 50 per request
- **Allowed Types**: PDF, JPEG, PNG, TIFF, DOC, DOCX, TXT
- **Security**: File type validation, content analysis, virus scanning

**Success Response (201):**
```json
{
  "success": true,
  "message": "Documents uploaded successfully", 
  "data": {
    "candidateId": "550e8400-e29b-41d4-a716-446655440000",
    "documents": [
      {
        "id": "doc-uuid-1",
        "documentType": "CV", 
        "fileName": "550e8400_CV_1693478400000.pdf",
        "originalName": "DrJohnson_CV.pdf",
        "size": 2048576,
        "uploadedAt": "2025-08-31T10:00:00.000Z",
        "aiParsingResult": {
          "confidence": 0.85,
          "extractedFields": {
            "firstName": "Sarah",
            "lastName": "Johnson",
            "currentAffiliation": "Stanford Medical Center"
          },
          "rawText": "DR. SARAH ELIZABETH JOHNSON..."
        }
      }
    ],
    "totalUploaded": 1
  }
}
```

---

#### GET /api/v1/candidates/{id}/documents
Retrieve document list for a candidate.

**Path Parameters:**
- `id`: Candidate UUID

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "candidateId": "550e8400-e29b-41d4-a716-446655440000",
    "documents": [
      {
        "id": "doc-uuid-1",
        "documentType": "CV",
        "fileName": "550e8400_CV_1693478400000.pdf", 
        "originalName": "DrJohnson_CV.pdf",
        "size": 2048576,
        "mimetype": "application/pdf",
        "uploadedAt": "2025-08-31T10:00:00.000Z"
      }
    ],
    "totalDocuments": 1,
    "documentCompletion": {
      "required": 8,
      "uploaded": 1,
      "missing": [
        "GOVERNMENT_ID",
        "MEDICAL_DEGREE", 
        "RESIDENCY_CERTIFICATE",
        "FELLOWSHIP_CERTIFICATE",
        "BOARD_CERTIFICATION",
        "LICENSE_CERTIFICATE",
        "GOOD_STANDING_CERTIFICATE"
      ],
      "completionPercentage": 12
    }
  }
}
```

---

### Administrative Endpoints

#### GET /api/v1/admin/candidates
Retrieve candidate applications for administrative review.

**Authentication:** Admin JWT token required

**Query Parameters:**
- `status`: Filter by application status
- `level`: Filter by competency level  
- `page`: Page number (default: 1)
- `limit`: Results per page (default: 20, max: 100)

**Example Request:**
```
GET /api/v1/admin/candidates?status=PENDING&level=EXPERT&page=1&limit=10
Authorization: Bearer <admin_jwt_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "candidates": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Sarah Johnson",
        "email": "sarah.johnson@hospital.com",
        "nationality": "United States",
        "yearsExperience": 8,
        "currentAffiliation": "Stanford Medical Center",
        "competencyScore": 75,
        "competencyLevel": "EXPERT", 
        "applicationStatus": "PENDING",
        "submittedAt": "2025-08-31T09:00:00.000Z",
        "documentsUploaded": 5,
        "lastReview": null,
        "createdAt": "2025-08-31T09:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1
    },
    "filters": {
      "status": "PENDING",
      "level": "EXPERT"
    }
  }
}
```

---

#### POST /api/v1/admin/candidates/{id}/review
Review and approve/reject a candidate application.

**Authentication:** Admin JWT token required

**Path Parameters:**
- `id`: Candidate UUID

**Request Body:**
```json
{
  "decision": "APPROVE",           // APPROVE | REJECT | REQUEST_MORE_INFO
  "notes": "Excellent credentials and strong clinical trial experience. Approved for oncology second opinions.",
  "scoreAdjustment": 5,           // Optional: Adjust competency score
  "recommendedLevel": "EXPERT"    // Optional: Override competency level
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Candidate approved successfully",
  "data": {
    "candidateId": "550e8400-e29b-41d4-a716-446655440000",
    "decision": "APPROVE",
    "newStatus": "APPROVED",
    "reviewId": "review-uuid-1", 
    "reviewedAt": "2025-08-31T10:30:00.000Z"
  }
}
```

---

#### GET /api/v1/candidates/{id}/documents/{documentId}/view
View/download candidate document (Admin only).

**Authentication:** Admin JWT token required

**Path Parameters:**
- `id`: Candidate UUID
- `documentId`: Document UUID

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "document": {
      "id": "doc-uuid-1",
      "documentType": "CV",
      "fileName": "550e8400_CV_1693478400000.pdf",
      "originalName": "DrJohnson_CV.pdf", 
      "size": 2048576,
      "mimetype": "application/pdf",
      "uploadedAt": "2025-08-31T10:00:00.000Z"
    },
    "downloadUrl": "/api/v1/candidates/550e8400-e29b-41d4-a716-446655440000/documents/doc-uuid-1/download",
    "previewAvailable": true
  }
}
```

---

#### POST /api/v1/admin/create
Create admin account (temporary endpoint for testing).

**Request Body:**
```json
{
  "email": "admin@hospital.com",
  "password": "SecureAdminPass123!"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Admin created successfully",
  "data": {
    "admin": {
      "id": "admin-uuid-1",
      "email": "admin@hospital.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

---

## File Upload System

### Frontend Upload Workflow

The professional recruitment system uses a secure, segregated file upload process:

1. **Authentication Check**: JWT token validation
2. **Presigned URL Generation**: Frontend requests signed upload URLs
3. **File Upload**: Direct upload using presigned URLs
4. **Verification**: Backend verifies upload completion

### Upload Security Features

- **Content-Type Validation**: File headers analyzed for security
- **Size Limits**: 25MB per file for professional documents
- **File Type Restrictions**: Only medical document types allowed
- **Directory Isolation**: Professional uploads isolated from patient data
- **Cryptographic Signatures**: HMAC-SHA256 signatures for URL validation
- **Rate Limiting**: Upload request rate limiting per IP and user

### Frontend Integration

#### Step 1: Request Presigned URLs
```typescript
// Using professional upload library
import { ProfessionalUploadService } from '@/lib/professionalUpload';

const files = [cvFile, licenseFile];
const email = "professional@hospital.com";

const uploadResponse = await ProfessionalUploadService.getUploadUrls(files, email);
```

#### Step 2: Upload Files
```typescript
await ProfessionalUploadService.uploadFiles(files, uploadResponse);
```

#### Complete Upload Process
```typescript
const professionalId = await ProfessionalUploadService.uploadProfessionalDocuments(files, email);
```

---

## AI Document Analysis

### Supported Document Types

The AI system can analyze and extract information from:

1. **CV/Resume** - Comprehensive professional information extraction
2. **Medical Degree** - Institution and graduation verification
3. **License Certificates** - License numbers and expiration dates
4. **Board Certifications** - Certification numbers and specialties
5. **Additional Documents** - General information extraction

### AI Processing Pipeline

1. **File Type Detection**: Magic number validation
2. **Content Extraction**:
   - **PDF**: Text extraction using pdf-parse
   - **Images**: OCR using Tesseract.js with image preprocessing
   - **Text Files**: Direct UTF-8 content reading
3. **Information Extraction**: Pattern matching and NLP techniques
4. **Confidence Scoring**: AI confidence levels for extracted data
5. **Field Mapping**: Automatic mapping to application fields

### CV Analysis Capabilities

**Personal Information:**
- Name extraction with medical title recognition
- Email and phone number detection
- Current institutional affiliation

**Professional Experience:**
- Years of practice calculation
- Current position and institution
- Subspecialty identification (oncology focus)

**Academic Achievements:**
- Publication count extraction
- Clinical trial involvement detection
- Teaching role identification
- Conference presentation recognition

**Professional Recognition:**
- Medical society memberships (ASCO, ESMO, AACR, etc.)
- Leadership role identification
- Awards and honors extraction

### OCR Processing

**Image Preprocessing:**
- Resize for optimal OCR (max 2000x2000)
- Grayscale conversion
- Contrast normalization
- PNG format optimization

**OCR Engine:**
- Tesseract.js for text recognition
- English language model
- Progress tracking for large documents
- Error handling and fallback processing

---

## Competency Scoring

### Scoring Algorithm

The competency scoring system evaluates medical professionals across multiple dimensions:

**Experience Points (0-20)**
- ≤ 5 years: 5 points
- 6-10 years: 10 points  
- 11-20 years: 15 points
- 20+ years: 20 points

**Board Certification (10)**
- Required for eligibility
- Must have valid certification number

**Subspecialty Focus (5)**
- Bonus for documented subspecialties
- Oncology subspecialties preferred

**Research Publications (0-15)**
- 0 publications: 0 points
- 1-5 publications: 5 points
- 6-20 publications: 10 points
- 20+ publications: 15 points

**Clinical Trials (0-10)**
- Involvement: 5 points
- Principal Investigator: 10 points

**Teaching & Conferences (0-10)**
- Conference presentations: 5 points
- Teaching roles: 5 points

**Society Membership (5)**
- Active membership in recognized oncology societies

**Leadership Roles (0-10)**
- Local/hospital leadership: 5 points
- National/board leadership: 10 points

### Competency Levels

- **JUNIOR**: < 40 points - Entry-level professionals
- **SENIOR**: 40-59 points - Experienced practitioners  
- **EXPERT**: 60-79 points - Highly qualified specialists
- **DISTINGUISHED**: 80+ points - Leading professionals

### Score Calculation Example

```typescript
const candidateData = {
  yearsIndependentPractice: 8,
  boardCertificationNumber: "BC123456",
  subspecialties: ["breast cancer", "immunotherapy"], 
  peerReviewedPublications: 25,
  clinicalTrialInvolvement: true,
  clinicalTrialDetails: "Principal Investigator on Phase II trials",
  conferencePresentations: true,
  teachingRoles: true,
  oncologySocieties: ["ASCO", "ESMO"],
  leadershipRoles: "Chair of Breast Cancer Committee"
};

// Scoring calculation:
// Experience: 10 points (6-10 years)
// Board Certification: 10 points 
// Subspecialty: 5 points
// Publications: 15 points (20+)
// Clinical Trials: 10 points (PI role)
// Teaching/Conference: 10 points (both)
// Society Membership: 5 points
// Leadership: 10 points (national level)
// Total: 75 points = EXPERT level
```

---

## Security Considerations

### Healthcare Data Protection

**HIPAA Compliance Preparation:**
- Professional data handled with medical-grade security
- Encrypted document storage
- Audit logging for all access
- Secure data transmission

**Data Encryption:**
- All documents encrypted at rest
- TLS 1.3 for data in transit
- Professional-specific encryption keys
- Regular key rotation procedures

**Access Controls:**
- Role-based access control (RBAC)
- Admin authentication for sensitive operations
- Professional data segregated from patient data
- Regular access audits

### Input Validation & Sanitization

**File Upload Security:**
- Magic number validation
- Content-type verification
- Size limit enforcement
- Directory traversal prevention
- Malware scanning (production)

**SQL Injection Prevention:**
- Prisma ORM with parameterized queries
- Input sanitization for all user data
- Regular security scanning

**XSS Prevention:**
- Content Security Policy (CSP) headers
- Input sanitization
- Output encoding

### Rate Limiting & DDoS Protection

**Application Level:**
- Express rate limiting
- IP-based and user-based limits
- Sliding window algorithms

**Infrastructure Level:**
- Load balancer rate limiting
- CDN protection
- Infrastructure monitoring

---

## Healthcare Compliance

### HIPAA Considerations

While this recruitment service handles professional credentials (not patient data), it follows healthcare-grade security practices:

**Administrative Safeguards:**
- Security officer designation
- Workforce training requirements
- Access management procedures
- Regular security assessments

**Physical Safeguards:**  
- Secure data centers
- Workstation security
- Device and media controls

**Technical Safeguards:**
- Access control systems
- Audit controls and logging
- Integrity controls
- Transmission security

### Audit Logging

All API operations are logged with:
- Timestamp and user identification
- Request details and IP address  
- Response status and error codes
- Document access tracking
- Administrative actions

### Data Retention

**Professional Applications:**
- Active applications: Retained indefinitely
- Rejected applications: 7 years
- Document storage: Encrypted, versioned
- Audit logs: 7 years minimum

---

## OpenAPI Specification

```yaml
openapi: 3.0.3
info:
  title: Professional Recruitment Service API
  description: Medical professional onboarding and competency assessment system
  version: 1.0.0
  contact:
    name: Medical Second Opinion Platform
    email: api-support@yourdomain.com
  license:
    name: Proprietary
    
servers:
  - url: http://localhost:3004
    description: Development server
  - url: https://api.yourdomain.com
    description: Production server

security:
  - bearerAuth: []

paths:
  /health:
    get:
      summary: Health check endpoint
      tags: [Monitoring]
      security: []
      responses:
        200:
          description: Service health status
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    example: "healthy"
                  service:
                    type: string
                    example: "professional-recruitment-service"
                  version:
                    type: string
                    example: "1.0.0"
                  uptime:
                    type: number
                    example: 3600.5

  /api/v1/candidates/apply:
    post:
      summary: Submit professional application
      tags: [Candidates]
      security: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CandidateApplication'
      responses:
        201:
          description: Application submitted successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  message:
                    type: string
                    example: "Application submitted successfully"
                  data:
                    type: object
                    properties:
                      candidateId:
                        type: string
                        format: uuid
                      competencyAssessment:
                        $ref: '#/components/schemas/CompetencyAssessment'
        400:
          $ref: '#/components/responses/ValidationError'
        409:
          $ref: '#/components/responses/ConflictError'
        500:
          $ref: '#/components/responses/InternalError'

  /api/v1/candidates/ai-prepopulate:
    post:
      summary: AI document analysis for application pre-population
      tags: [AI Analysis]
      security: []
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              type: object
              properties:
                email:
                  type: string
                  format: email
                  description: Professional email address
                cv:
                  type: string
                  format: binary
                  description: CV/Resume file
                medical_degree:
                  type: string
                  format: binary
                  description: Medical degree certificate
                license_certificate:
                  type: string
                  format: binary
                  description: Medical license certificate
              required:
                - email
      responses:
        200:
          description: AI analysis completed
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AIAnalysisResponse'
        400:
          $ref: '#/components/responses/ValidationError'
        500:
          $ref: '#/components/responses/InternalError'

  /api/v1/candidates/{id}/documents:
    post:
      summary: Upload candidate documents
      tags: [Documents]
      security: []
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              type: object
              properties:
                government_id:
                  type: string
                  format: binary
                medical_degree:
                  type: string
                  format: binary
                cv:
                  type: string
                  format: binary
      responses:
        201:
          description: Documents uploaded successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/DocumentUploadResponse'
        400:
          $ref: '#/components/responses/ValidationError'
        404:
          $ref: '#/components/responses/NotFoundError'
        500:
          $ref: '#/components/responses/InternalError'
          
    get:
      summary: Get candidate documents
      tags: [Documents]
      security: []
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        200:
          description: Document list retrieved
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/DocumentListResponse'
        404:
          $ref: '#/components/responses/NotFoundError'
        500:
          $ref: '#/components/responses/InternalError'

  /api/v1/admin/candidates:
    get:
      summary: Get candidates for admin review
      tags: [Admin]
      security:
        - bearerAuth: []
      parameters:
        - name: status
          in: query
          schema:
            type: string
            enum: [PENDING, UNDER_REVIEW, APPROVED, REJECTED]
        - name: level
          in: query
          schema:
            type: string
            enum: [JUNIOR, SENIOR, EXPERT, DISTINGUISHED]
        - name: page
          in: query
          schema:
            type: integer
            minimum: 1
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 20
      responses:
        200:
          description: Candidate list retrieved
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AdminCandidateList'
        401:
          $ref: '#/components/responses/UnauthorizedError'
        403:
          $ref: '#/components/responses/ForbiddenError'
        500:
          $ref: '#/components/responses/InternalError'

  /api/v1/admin/candidates/{id}/review:
    post:
      summary: Review candidate application
      tags: [Admin]
      security:
        - bearerAuth: []
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ReviewRequest'
      responses:
        200:
          description: Review submitted successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ReviewResponse'
        400:
          $ref: '#/components/responses/ValidationError'
        401:
          $ref: '#/components/responses/UnauthorizedError'
        403:
          $ref: '#/components/responses/ForbiddenError'
        404:
          $ref: '#/components/responses/NotFoundError'
        500:
          $ref: '#/components/responses/InternalError'

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  schemas:
    CandidateApplication:
      type: object
      required:
        - firstName
        - lastName
        - dateOfBirth
        - nationality
        - email
        - medicalLicenseNumber
        - licenseCountry
        - licenseExpiry
        - yearsIndependentPractice
        - currentAffiliation
        - noActiveDisciplinary
        - dataProtectionAgreed
      properties:
        firstName:
          type: string
          minLength: 1
          example: "Sarah"
        middleName:
          type: string
          example: "Elizabeth"
        lastName:
          type: string
          minLength: 1
          example: "Johnson"
        dateOfBirth:
          type: string
          format: date
          example: "1985-03-15"
        nationality:
          type: string
          minLength: 1
          example: "United States"
        email:
          type: string
          format: email
          example: "sarah.johnson@hospital.com"
        phone:
          type: string
          example: "+1-555-0123"
        medicalLicenseNumber:
          type: string
          minLength: 1
          example: "MD123456789"
        licenseCountry:
          type: string
          minLength: 1
          example: "United States"
        licenseState:
          type: string
          example: "California"
        licenseExpiry:
          type: string
          format: date
          example: "2026-12-31"
        yearsIndependentPractice:
          type: integer
          minimum: 0
          example: 8
        currentAffiliation:
          type: string
          minLength: 1
          example: "Stanford Medical Center"
        subspecialties:
          type: array
          items:
            type: string
          example: ["breast cancer", "immunotherapy"]
        peerReviewedPublications:
          type: integer
          minimum: 0
          example: 25
        clinicalTrialInvolvement:
          type: boolean
          example: true
        oncologySocieties:
          type: array
          items:
            type: string
          example: ["ASCO", "ESMO"]
        noActiveDisciplinary:
          type: boolean
          example: true
        dataProtectionAgreed:
          type: boolean
          example: true

    CompetencyAssessment:
      type: object
      properties:
        score:
          type: integer
          example: 75
        level:
          type: string
          enum: [JUNIOR, SENIOR, EXPERT, DISTINGUISHED]
          example: "EXPERT"
        breakdown:
          type: object
          properties:
            experience:
              type: integer
              example: 15
            boardCertification:
              type: integer
              example: 10
            subspecialty:
              type: integer
              example: 5
            publications:
              type: integer
              example: 15
            clinicalTrials:
              type: integer
              example: 10
            conferenceTeaching:
              type: integer
              example: 10
            societyMembership:
              type: integer
              example: 5
            leadership:
              type: integer
              example: 5
            peerReview:
              type: integer
              example: 0

    AIAnalysisResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        message:
          type: string
          example: "AI document analysis completed"
        data:
          type: object
          properties:
            prepopulatedApplication:
              $ref: '#/components/schemas/CandidateApplication'
            aiAnalysis:
              type: object
              properties:
                documentsProcessed:
                  type: integer
                  example: 3
                successfulExtractions:
                  type: integer
                  example: 3
                overallConfidence:
                  type: integer
                  example: 85
                extractionResults:
                  type: array
                  items:
                    type: object
                    properties:
                      documentType:
                        type: string
                        example: "CV"
                      fileName:
                        type: string
                        example: "DrJohnson_CV.pdf"
                      confidence:
                        type: number
                        example: 0.90
                      extractedFields:
                        type: object
                preliminaryAssessment:
                  $ref: '#/components/schemas/CompetencyAssessment'

    DocumentUploadResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        message:
          type: string
          example: "Documents uploaded successfully"
        data:
          type: object
          properties:
            candidateId:
              type: string
              format: uuid
            documents:
              type: array
              items:
                type: object
                properties:
                  id:
                    type: string
                    format: uuid
                  documentType:
                    type: string
                    example: "CV"
                  fileName:
                    type: string
                    example: "candidate_CV_12345.pdf"
                  originalName:
                    type: string
                    example: "DrJohnson_CV.pdf"
                  size:
                    type: integer
                    example: 2048576
                  uploadedAt:
                    type: string
                    format: date-time

    DocumentListResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        data:
          type: object
          properties:
            candidateId:
              type: string
              format: uuid
            documents:
              type: array
              items:
                type: object
                properties:
                  id:
                    type: string
                    format: uuid
                  documentType:
                    type: string
                  fileName:
                    type: string
                  originalName:
                    type: string
                  size:
                    type: integer
                  mimetype:
                    type: string
                  uploadedAt:
                    type: string
                    format: date-time
            documentCompletion:
              type: object
              properties:
                required:
                  type: integer
                  example: 8
                uploaded:
                  type: integer
                  example: 5
                missing:
                  type: array
                  items:
                    type: string
                  example: ["GOVERNMENT_ID", "MEDICAL_DEGREE"]
                completionPercentage:
                  type: integer
                  example: 62

    AdminCandidateList:
      type: object
      properties:
        success:
          type: boolean
          example: true
        data:
          type: object
          properties:
            candidates:
              type: array
              items:
                type: object
                properties:
                  id:
                    type: string
                    format: uuid
                  name:
                    type: string
                    example: "Sarah Johnson"
                  email:
                    type: string
                    example: "sarah.johnson@hospital.com"
                  competencyScore:
                    type: integer
                    example: 75
                  competencyLevel:
                    type: string
                    example: "EXPERT"
                  applicationStatus:
                    type: string
                    example: "PENDING"
                  submittedAt:
                    type: string
                    format: date-time
            pagination:
              type: object
              properties:
                page:
                  type: integer
                limit:
                  type: integer
                total:
                  type: integer
                totalPages:
                  type: integer

    ReviewRequest:
      type: object
      required:
        - decision
      properties:
        decision:
          type: string
          enum: [APPROVE, REJECT, REQUEST_MORE_INFO]
          example: "APPROVE"
        notes:
          type: string
          example: "Excellent credentials and experience"
        scoreAdjustment:
          type: integer
          example: 5
        recommendedLevel:
          type: string
          enum: [JUNIOR, SENIOR, EXPERT, DISTINGUISHED]
          example: "EXPERT"

    ReviewResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        message:
          type: string
          example: "Candidate approved successfully"
        data:
          type: object
          properties:
            candidateId:
              type: string
              format: uuid
            decision:
              type: string
              example: "APPROVE"
            newStatus:
              type: string
              example: "APPROVED"
            reviewId:
              type: string
              format: uuid
            reviewedAt:
              type: string
              format: date-time

    ErrorResponse:
      type: object
      properties:
        success:
          type: boolean
          example: false
        error:
          type: string
          example: "Validation failed"
        code:
          type: string
          example: "VALIDATION_ERROR"
        details:
          type: array
          items:
            type: string
        timestamp:
          type: string
          format: date-time

  responses:
    ValidationError:
      description: Request validation failed
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          example:
            success: false
            error: "Validation failed"
            code: "VALIDATION_ERROR"
            details: ["First name is required", "Valid email is required"]

    ConflictError:
      description: Resource conflict (e.g., email already exists)
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          example:
            success: false
            error: "Application with this email already exists"
            code: "CANDIDATE_EXISTS"

    UnauthorizedError:
      description: Authentication required
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          example:
            success: false
            error: "Admin access token required"
            code: "ADMIN_TOKEN_REQUIRED"

    ForbiddenError:
      description: Insufficient permissions
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          example:
            success: false
            error: "Admin access required"
            code: "ADMIN_ACCESS_REQUIRED"

    NotFoundError:
      description: Resource not found
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          example:
            success: false
            error: "Candidate not found"
            code: "CANDIDATE_NOT_FOUND"

    InternalError:
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          example:
            success: false
            error: "Internal server error"
            code: "INTERNAL_ERROR"
```

---

## Testing & Development

### Environment Setup

**Required Environment Variables:**
```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/recruitment_db"

# JWT Authentication
JWT_SECRET="your-secure-jwt-secret-key-32-characters-minimum"

# Professional Document Encryption
PROFESSIONAL_ENCRYPTION_KEY="professional-encryption-key-32-chars"

# File Upload Security  
PROFESSIONAL_SIGNATURE_SECRET="professional-signature-secret-2025"

# Service Configuration
PORT=3004
NODE_ENV=development
```

### Development Server

```bash
# Start the recruitment service
cd microservices/professional-recruitment-service
npm install
npm run dev

# Service will be available at:
# http://localhost:3004
```

### Testing Endpoints

**Health Check:**
```bash
curl http://localhost:3004/health
```

**Submit Application:**
```bash
curl -X POST http://localhost:3004/api/v1/candidates/apply \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "Doctor",
    "dateOfBirth": "1980-01-01",
    "nationality": "United States",
    "email": "test.doctor@hospital.com",
    "medicalLicenseNumber": "TEST123456",
    "licenseCountry": "United States",
    "licenseExpiry": "2026-12-31",
    "yearsIndependentPractice": 10,
    "currentAffiliation": "Test Hospital",
    "noActiveDisciplinary": true,
    "dataProtectionAgreed": true
  }'
```

---

## Support & Maintenance

### Monitoring

**Health Checks:**
- Endpoint: `GET /health`
- Database connectivity
- Service uptime tracking
- Feature availability status

**Logging:**
- Structured JSON logging
- Request/response logging  
- Error tracking with stack traces
- Performance metrics

**Metrics:**
- Application submission rates
- Document upload success rates
- AI analysis performance
- Competency score distributions

### Database Maintenance

**Regular Tasks:**
- Database backup verification
- Index optimization
- Document storage cleanup
- Audit log rotation

### Security Updates

**Regular Security Reviews:**
- Dependency updates
- Vulnerability scanning
- Penetration testing
- Compliance audits

---

This comprehensive API documentation provides complete coverage of the Professional Recruitment Service, including detailed endpoint specifications, security considerations, healthcare compliance requirements, and operational guidance for developers and administrators working with medical professional onboarding systems.