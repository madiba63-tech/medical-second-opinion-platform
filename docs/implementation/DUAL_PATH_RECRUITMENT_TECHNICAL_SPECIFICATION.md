# Dual-Path Professional Recruitment System - Technical Specification

## Executive Summary

This document provides a comprehensive technical specification for redesigning the Medical Second Opinion Platform's professional recruitment system into a dual-path approach with advanced AI integration and enhanced admin workflows. The new system will support both AI-assisted and manual application paths while maintaining strict GDPR compliance and healthcare regulatory standards.

## 1. System Overview

### 1.1 Current System Analysis
The existing system already includes:
- **Professional Recruitment Service**: Node.js microservice with 8-step application wizard
- **Database Schema**: Comprehensive models for candidates, documents, and reviews
- **AI Integration**: Basic document parsing with OCR capabilities
- **Admin Interface**: Basic candidate review functionality

### 1.2 New Dual-Path Architecture
The enhanced system will provide:
- **AI-Assisted Path**: Advanced GPT-4 integration for intelligent form pre-population
- **Manual Path**: Traditional step-by-step form completion
- **Enhanced Admin Dashboard**: Comprehensive application management and approval workflows
- **Self-Assessment Integration**: Competency self-evaluation with manual override capabilities
- **International Document Flexibility**: Configurable document requirements with "not applicable" options

## 2. Database Schema Updates

### 2.1 New Tables

#### 2.1.1 Application Paths Tracking
```sql
CREATE TABLE application_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID NOT NULL REFERENCES professional_candidates(id) ON DELETE CASCADE,
  path_type VARCHAR(20) NOT NULL CHECK (path_type IN ('AI_ASSISTED', 'MANUAL')),
  started_at TIMESTAMP NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMP,
  ai_confidence_score FLOAT,
  ai_processing_time INTEGER, -- milliseconds
  user_corrections_count INTEGER DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  
  INDEX idx_candidate_path (candidate_id),
  INDEX idx_path_type (path_type),
  INDEX idx_started_at (started_at)
);
```

#### 2.1.2 Self-Assessment Responses
```sql
CREATE TABLE self_assessment_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID NOT NULL REFERENCES professional_candidates(id) ON DELETE CASCADE,
  question_id VARCHAR(50) NOT NULL,
  question_text TEXT NOT NULL,
  self_declared_level VARCHAR(20), -- JUNIOR, SENIOR, EXPERT, DISTINGUISHED
  confidence_level INTEGER CHECK (confidence_level BETWEEN 1 AND 5),
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  
  INDEX idx_candidate_assessment (candidate_id),
  INDEX idx_question_id (question_id),
  UNIQUE KEY unique_candidate_question (candidate_id, question_id)
);
```

#### 2.1.3 Employee/Case Numbering System
```sql
CREATE TABLE numbering_sequences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sequence_type VARCHAR(50) NOT NULL UNIQUE, -- 'PROFESSIONAL', 'CASE', 'APPLICATION'
  prefix VARCHAR(10) NOT NULL,
  current_number INTEGER NOT NULL DEFAULT 0,
  format_pattern VARCHAR(100) NOT NULL, -- e.g., '{prefix}-{year}-{number:06d}'
  reset_annually BOOLEAN DEFAULT FALSE,
  last_reset_year INTEGER,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Initialize sequences
INSERT INTO numbering_sequences (sequence_type, prefix, current_number, format_pattern, reset_annually) VALUES
('APPLICATION', 'APP', 0, '{prefix}-{year}-{number:06d}', true),
('PROFESSIONAL', 'PRO', 0, '{prefix}-{year}-{number:06d}', true),
('CASE', 'CASE', 0, '{prefix}-{year}-{number:06d}', true);
```

#### 2.1.4 AI Processing Results
```sql
CREATE TABLE ai_processing_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID NOT NULL REFERENCES professional_candidates(id) ON DELETE CASCADE,
  document_id UUID REFERENCES candidate_documents(id) ON DELETE CASCADE,
  ai_provider VARCHAR(50) NOT NULL, -- 'OPENAI_GPT4', 'OPENAI_GPT35_TURBO'
  model_version VARCHAR(50) NOT NULL,
  processing_type VARCHAR(50) NOT NULL, -- 'CV_EXTRACTION', 'DOCUMENT_VERIFICATION'
  raw_response JSONB NOT NULL,
  extracted_fields JSONB NOT NULL,
  confidence_score FLOAT NOT NULL,
  processing_time INTEGER NOT NULL, -- milliseconds
  cost_usd DECIMAL(10,4),
  error_message TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  
  INDEX idx_candidate_ai_results (candidate_id),
  INDEX idx_processing_type (processing_type),
  INDEX idx_confidence_score (confidence_score),
  INDEX idx_created_at (created_at),
  INDEX gin_extracted_fields (extracted_fields)
);
```

### 2.2 Schema Modifications

#### 2.2.1 Enhanced Professional Candidates Table
```sql
-- Add new columns to existing professional_candidates table
ALTER TABLE professional_candidates 
  ADD COLUMN application_number VARCHAR(50) UNIQUE,
  ADD COLUMN application_path VARCHAR(20) CHECK (application_path IN ('AI_ASSISTED', 'MANUAL')),
  ADD COLUMN ai_confidence_overall FLOAT,
  ADD COLUMN user_corrections_count INTEGER DEFAULT 0,
  ADD COLUMN self_assessment_completed BOOLEAN DEFAULT FALSE,
  ADD COLUMN self_declared_competency_level VARCHAR(20),
  ADD COLUMN competency_level_override VARCHAR(20),
  ADD COLUMN override_reason TEXT,
  ADD COLUMN override_by_admin_id UUID,
  ADD COLUMN documents_flexible_config JSONB, -- Store which docs are "not applicable"
  ADD COLUMN processing_stage VARCHAR(50) DEFAULT 'APPLICATION_SUBMITTED',
  ADD COLUMN last_activity_at TIMESTAMP DEFAULT NOW();

-- Add indexes
CREATE INDEX idx_application_number ON professional_candidates(application_number);
CREATE INDEX idx_application_path ON professional_candidates(application_path);
CREATE INDEX idx_processing_stage ON professional_candidates(processing_stage);
CREATE INDEX idx_last_activity_at ON professional_candidates(last_activity_at);
```

#### 2.2.2 Enhanced Document Requirements
```sql
-- Add flexibility to document requirements
ALTER TABLE candidate_documents 
  ADD COLUMN is_required BOOLEAN DEFAULT TRUE,
  ADD COLUMN not_applicable_reason VARCHAR(200),
  ADD COLUMN ai_extraction_attempted BOOLEAN DEFAULT FALSE,
  ADD COLUMN ai_extraction_success BOOLEAN DEFAULT FALSE,
  ADD COLUMN ai_extraction_confidence FLOAT;

-- Update DocumentType enum to include new options
ALTER TYPE DocumentType ADD VALUE 'ALTERNATIVE_CREDENTIAL_1';
ALTER TYPE DocumentType ADD VALUE 'ALTERNATIVE_CREDENTIAL_2';
ALTER TYPE DocumentType ADD VALUE 'INTERNATIONAL_EQUIVALENT';
```

#### 2.2.3 Enhanced Application Reviews
```sql
-- Add new fields to application_reviews table
ALTER TABLE application_reviews 
  ADD COLUMN self_assessment_review JSONB, -- Admin review of self-assessment
  ADD COLUMN competency_score_override FLOAT,
  ADD COLUMN document_verification_status JSONB,
  ADD COLUMN workflow_triggered VARCHAR(50), -- 'ACCEPTANCE_WORKFLOW', 'REJECTION_WORKFLOW'
  ADD COLUMN priority_level VARCHAR(20) DEFAULT 'NORMAL' CHECK (priority_level IN ('LOW', 'NORMAL', 'HIGH', 'URGENT'));
```

## 3. Microservice Architecture

### 3.1 Enhanced Professional Recruitment Service

#### 3.1.1 New API Endpoints

```typescript
// AI-Assisted Application Path
POST /api/v1/recruitment/ai-path/initiate
POST /api/v1/recruitment/ai-path/upload-cv
POST /api/v1/recruitment/ai-path/review-extraction
POST /api/v1/recruitment/ai-path/complete-application

// Manual Application Path
POST /api/v1/recruitment/manual-path/initiate
POST /api/v1/recruitment/manual-path/step/{stepNumber}
POST /api/v1/recruitment/manual-path/complete-application

// Self-Assessment Integration
GET /api/v1/recruitment/self-assessment/questions
POST /api/v1/recruitment/self-assessment/submit
PUT /api/v1/recruitment/self-assessment/update/{questionId}

// Document Management with Flexibility
POST /api/v1/recruitment/documents/upload
GET /api/v1/recruitment/documents/requirements/{candidateId}
PUT /api/v1/recruitment/documents/mark-not-applicable
DELETE /api/v1/recruitment/documents/{documentId}

// Application Number Generation
GET /api/v1/recruitment/generate-application-number
```

#### 3.1.2 Enhanced Admin Endpoints

```typescript
// Application Management Dashboard
GET /api/v1/admin/recruitment/applications/pending
GET /api/v1/admin/recruitment/applications/search
GET /api/v1/admin/recruitment/applications/{id}/details
PUT /api/v1/admin/recruitment/applications/{id}/assign-reviewer

// Approval Workflow
POST /api/v1/admin/recruitment/applications/{id}/approve
POST /api/v1/admin/recruitment/applications/{id}/reject
POST /api/v1/admin/recruitment/applications/{id}/request-info
POST /api/v1/admin/recruitment/applications/bulk-action

// Competency Score Management
PUT /api/v1/admin/recruitment/applications/{id}/override-score
POST /api/v1/admin/recruitment/applications/{id}/review-self-assessment
GET /api/v1/admin/recruitment/competency-analytics

// Workflow Automation
GET /api/v1/admin/recruitment/workflows/templates
POST /api/v1/admin/recruitment/workflows/trigger
GET /api/v1/admin/recruitment/workflows/status/{workflowId}
```

### 3.2 New AI Integration Service

#### 3.2.1 Service Architecture
```typescript
// microservices/ai-integration-service/ai-service.js
class AIIntegrationService {
  constructor() {
    this.openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      organization: process.env.OPENAI_ORGANIZATION
    });
  }

  async extractCVData(pdfBuffer: Buffer, candidateEmail: string): Promise<CVExtractionResult>
  async validateDocumentAuthenticity(documentBuffer: Buffer): Promise<ValidationResult>
  async generateApplicationSummary(applicationData: ApplicationData): Promise<string>
  async assessCompetencyAlignment(selfAssessment: any, extractedData: any): Promise<AlignmentResult>
}
```

#### 3.2.2 API Endpoints
```typescript
POST /api/v1/ai/extract-cv                    // Main CV extraction
POST /api/v1/ai/validate-document            // Document authenticity check
POST /api/v1/ai/generate-summary             // Application summary
POST /api/v1/ai/assess-alignment             // Self-assessment alignment
GET /api/v1/ai/processing-status/{jobId}     // Async processing status
```

### 3.3 Enhanced Workflow Engine Service

#### 3.3.1 New Workflow Definitions
```typescript
// Acceptance Workflow
const AcceptanceWorkflow = {
  id: 'professional_acceptance',
  steps: [
    { id: 'create_professional_account', service: 'professional-service' },
    { id: 'assign_professional_number', service: 'professional-recruitment' },
    { id: 'send_welcome_package', service: 'notification-service' },
    { id: 'setup_platform_access', service: 'admin-management' },
    { id: 'schedule_onboarding', service: 'professional-workplace' }
  ]
};

// Rejection Workflow
const RejectionWorkflow = {
  id: 'professional_rejection',
  steps: [
    { id: 'update_application_status', service: 'professional-recruitment' },
    { id: 'send_rejection_notification', service: 'notification-service' },
    { id: 'archive_documents', service: 'professional-recruitment' },
    { id: 'cleanup_temp_data', service: 'professional-recruitment' }
  ]
};
```

## 4. AI Integration Architecture

### 4.1 OpenAI GPT-4 Integration

#### 4.1.1 CV Extraction System
```typescript
interface CVExtractionConfig {
  model: 'gpt-4-turbo-preview' | 'gpt-4';
  temperature: 0.1; // Low for consistency
  maxTokens: 4000;
  responseFormat: 'json_object';
}

class CVExtractor {
  async extractData(pdfText: string, candidateEmail: string): Promise<ExtractionResult> {
    const prompt = this.buildExtractionPrompt(pdfText, candidateEmail);
    
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: this.getSystemPrompt() },
        { role: 'user', content: prompt }
      ],
      temperature: 0.1,
      max_tokens: 4000,
      response_format: { type: 'json_object' }
    });

    return this.validateAndProcessResponse(response.choices[0].message.content);
  }

  private getSystemPrompt(): string {
    return `You are a medical recruitment AI assistant. Extract professional information from CVs with high accuracy.
    
    CRITICAL RULES:
    1. Only extract information you are confident about (>85% confidence)
    2. Do not infer or guess missing information
    3. Mark uncertain extractions with low confidence scores
    4. Provide structured JSON output with confidence scores for each field
    5. Focus on: personal details, education, experience, publications, affiliations
    
    OUTPUT FORMAT: Structured JSON with confidence scores and reasoning`;
  }
}
```

#### 4.1.2 Data Validation and Quality Checks
```typescript
interface ValidationRules {
  nameFields: {
    minConfidence: 0.9;
    crossReferenceEmail: true;
    validateAgainstCommonPatterns: true;
  };
  experienceData: {
    minConfidence: 0.8;
    validateTimelineConsistency: true;
    checkReasonableBounds: true;
  };
  educationData: {
    minConfidence: 0.85;
    validateInstitutionNames: true;
    checkDegreeTypes: true;
  };
}

class DataValidator {
  async validateExtractedData(data: ExtractedData): Promise<ValidationResult> {
    const validationResults = {
      overallValid: true,
      fieldValidations: {},
      warnings: [],
      errors: []
    };

    // Validate each field according to rules
    for (const [field, value] of Object.entries(data.extractedFields)) {
      const validation = await this.validateField(field, value, data.confidence[field]);
      validationResults.fieldValidations[field] = validation;
      
      if (!validation.valid) {
        validationResults.overallValid = false;
        validationResults.errors.push(validation.error);
      }
    }

    return validationResults;
  }
}
```

### 4.2 Fallback and Error Handling

#### 4.2.1 Progressive Degradation
```typescript
class AIProcessingPipeline {
  async processCV(pdfBuffer: Buffer): Promise<ProcessingResult> {
    try {
      // Primary: GPT-4 Turbo
      return await this.processWithGPT4Turbo(pdfBuffer);
    } catch (error) {
      console.warn('GPT-4 Turbo failed, falling back to GPT-4', error);
      
      try {
        // Fallback: Standard GPT-4
        return await this.processWithGPT4(pdfBuffer);
      } catch (error) {
        console.warn('GPT-4 failed, falling back to structured extraction', error);
        
        // Ultimate fallback: Rule-based extraction
        return await this.processWithRuleBasedExtraction(pdfBuffer);
      }
    }
  }
}
```

## 5. Frontend Component Structure

### 5.1 Application Path Selection

#### 5.1.1 Path Selection Component
```typescript
// src/components/professional/recruitment/ApplicationPathSelector.tsx
interface PathSelectorProps {
  onPathSelected: (path: 'AI_ASSISTED' | 'MANUAL') => void;
  candidateEmail: string;
}

const ApplicationPathSelector: React.FC<PathSelectorProps> = ({ onPathSelected, candidateEmail }) => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Choose Your Application Path</h1>
        <p className="text-gray-600">Select the method that works best for you</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* AI-Assisted Path */}
        <PathOption
          title="AI-Assisted Application"
          subtitle="Fast & Smart"
          description="Upload your CV and let our AI pre-fill your application"
          benefits={[
            "AI extracts information from your CV",
            "Pre-populated forms save time",
            "Review and edit before submission",
            "PDF CV upload only"
          ]}
          requirements={["Current CV in PDF format", "5-10 minutes to review"]}
          icon={<AIIcon />}
          onSelect={() => onPathSelected('AI_ASSISTED')}
          recommended={true}
        />

        {/* Manual Path */}
        <PathOption
          title="Manual Application"
          subtitle="Step by Step"
          description="Complete the application manually with detailed guidance"
          benefits={[
            "Full control over information entry",
            "Detailed guidance for each step",
            "No document processing required",
            "Comprehensive help system"
          ]}
          requirements={["30-45 minutes", "All professional information ready"]}
          icon={<FormIcon />}
          onSelect={() => onPathSelected('MANUAL')}
        />
      </div>
    </div>
  );
};
```

### 5.2 AI-Assisted Flow Components

#### 5.2.1 CV Upload and Processing
```typescript
// src/components/professional/recruitment/AIAssistedFlow.tsx
const AIAssistedFlow: React.FC = () => {
  const [stage, setStage] = useState<'upload' | 'processing' | 'review' | 'complete'>('upload');
  const [extractedData, setExtractedData] = useState<ExtractedApplicationData | null>(null);
  const [processingProgress, setProcessingProgress] = useState(0);

  return (
    <div className="max-w-6xl mx-auto">
      <ProgressIndicator currentStage={stage} />
      
      {stage === 'upload' && (
        <CVUploadStep
          onUploadComplete={(file) => handleCVUpload(file)}
          acceptedFormats={['.pdf']}
          maxSize="25MB"
        />
      )}

      {stage === 'processing' && (
        <ProcessingStep
          progress={processingProgress}
          currentTask="Extracting professional information..."
        />
      )}

      {stage === 'review' && extractedData && (
        <ReviewExtractionStep
          extractedData={extractedData}
          onDataValidated={(data) => handleDataValidation(data)}
          onBackToUpload={() => setStage('upload')}
        />
      )}

      {stage === 'complete' && (
        <ApplicationCompleteStep
          applicationNumber={extractedData?.applicationNumber}
          nextSteps="Your application is under review. You will be contacted within 5-7 business days."
        />
      )}
    </div>
  );
};
```

#### 5.2.2 Review and Edit Interface
```typescript
// src/components/professional/recruitment/ReviewExtractionStep.tsx
const ReviewExtractionStep: React.FC<ReviewExtractionProps> = ({ 
  extractedData, 
  onDataValidated, 
  onBackToUpload 
}) => {
  const [formData, setFormData] = useState(extractedData.prepopulatedApplication);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <InfoIcon className="h-5 w-5 text-blue-400" />
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Review Required:</strong> Please review and correct the AI-extracted information before submitting.
            </p>
          </div>
        </div>
      </div>

      {/* AI Confidence Summary */}
      <ConfidenceSummary 
        overallConfidence={extractedData.aiAnalysis.overallConfidence}
        extractionResults={extractedData.aiAnalysis.extractionResults}
      />

      {/* Editable Form Sections */}
      <EditableFormSection
        title="Personal Information"
        fields={['firstName', 'middleName', 'lastName', 'email', 'phone']}
        data={formData}
        onUpdate={setFormData}
        aiConfidence={getFieldConfidence(extractedData, 'personal')}
      />

      <EditableFormSection
        title="Professional Experience"
        fields={['yearsIndependentPractice', 'currentAffiliation', 'subspecialties']}
        data={formData}
        onUpdate={setFormData}
        aiConfidence={getFieldConfidence(extractedData, 'experience')}
      />

      {/* Continue with other sections */}
      
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBackToUpload}>
          Upload Different CV
        </Button>
        <Button onClick={() => handleSubmission(formData)}>
          Submit Application
        </Button>
      </div>
    </div>
  );
};
```

### 5.3 Manual Entry Flow Components

#### 5.3.1 Step-by-Step Wizard
```typescript
// src/components/professional/recruitment/ManualApplicationWizard.tsx
const ManualApplicationWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationData, setApplicationData] = useState<Partial<ApplicationData>>({});
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    { number: 1, title: 'Identity & Contact', component: IdentityStep },
    { number: 2, title: 'Education & Training', component: EducationStep },
    { number: 3, title: 'Licensing & Credentials', component: LicensingStep },
    { number: 4, title: 'Professional Experience', component: ExperienceStep },
    { number: 5, title: 'Research & Academic', component: ResearchStep },
    { number: 6, title: 'Professional Recognition', component: RecognitionStep },
    { number: 7, title: 'Compliance & References', component: ComplianceStep },
    { number: 8, title: 'Self-Assessment', component: SelfAssessmentStep },
    { number: 9, title: 'Review & Submit', component: ReviewStep }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <WizardProgress 
        steps={steps}
        currentStep={currentStep}
        completedSteps={completedSteps}
      />

      <div className="mt-8">
        {steps.map((step) => (
          <div key={step.number} className={currentStep === step.number ? 'block' : 'hidden'}>
            <step.component
              data={applicationData}
              onUpdate={setApplicationData}
              onNext={() => handleNext(step.number)}
              onBack={() => handleBack(step.number)}
              onSave={() => handleSave(applicationData)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
```

### 5.4 Self-Assessment Integration

#### 5.4.1 Self-Assessment Questionnaire
```typescript
// src/components/professional/recruitment/SelfAssessmentStep.tsx
const SelfAssessmentStep: React.FC<StepProps> = ({ data, onUpdate, onNext, onBack }) => {
  const [assessmentResponses, setAssessmentResponses] = useState<SelfAssessmentResponse[]>([]);
  
  const assessmentQuestions = [
    {
      id: 'clinical_experience',
      question: 'How would you rate your clinical experience in oncology?',
      type: 'level_selection',
      options: ['JUNIOR', 'SENIOR', 'EXPERT', 'DISTINGUISHED'],
      helpText: 'Consider your years of practice, case complexity, and patient outcomes.'
    },
    {
      id: 'research_involvement',
      question: 'What is your level of involvement in clinical research?',
      type: 'level_selection',
      options: ['MINIMAL', 'MODERATE', 'SIGNIFICANT', 'EXTENSIVE'],
      helpText: 'Include publications, trials, grants, and collaborative research.'
    },
    {
      id: 'teaching_leadership',
      question: 'How extensive is your teaching and leadership experience?',
      type: 'level_selection',
      options: ['LIMITED', 'MODERATE', 'SUBSTANTIAL', 'EXTENSIVE'],
      helpText: 'Consider mentoring, formal teaching roles, and leadership positions.'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Professional Self-Assessment</h2>
        <p className="text-gray-600">
          Please provide your honest self-evaluation. This helps us understand your professional perspective.
        </p>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
          <p className="text-sm text-yellow-700">
            <strong>Note:</strong> Your self-assessment will be reviewed alongside your credentials and does not affect the algorithmic competency scoring.
          </p>
        </div>
      </div>

      {assessmentQuestions.map((question) => (
        <SelfAssessmentQuestion
          key={question.id}
          question={question}
          response={assessmentResponses.find(r => r.questionId === question.id)}
          onResponseUpdate={(response) => handleResponseUpdate(question.id, response)}
        />
      ))}

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Previous Step
        </Button>
        <Button 
          onClick={() => handleNext()}
          disabled={!isAssessmentComplete()}
        >
          Continue to Review
        </Button>
      </div>
    </div>
  );
};
```

## 6. Admin Dashboard Requirements

### 6.1 Application Management Interface

#### 6.1.1 Pending Applications Dashboard
```typescript
// src/components/admin/recruitment/ApplicationsDashboard.tsx
const ApplicationsDashboard: React.FC = () => {
  const [applications, setApplications] = useState<ProfessionalApplication[]>([]);
  const [filters, setFilters] = useState({
    status: 'SUBMITTED',
    path: 'ALL',
    competencyLevel: 'ALL',
    dateRange: 'LAST_30_DAYS'
  });

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Professional Applications</h1>
          <p className="text-gray-600">Review and manage professional applications</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">Export Report</Button>
          <Button>Bulk Actions</Button>
        </div>
      </div>

      {/* Metrics Overview */}
      <ApplicationMetrics />

      {/* Filters */}
      <ApplicationFilters 
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Applications Table */}
      <ApplicationsTable
        applications={applications}
        onApplicationSelect={(app) => handleApplicationView(app)}
        onBulkSelect={(apps) => handleBulkSelection(apps)}
      />

      {/* Pagination */}
      <Pagination 
        currentPage={1}
        totalPages={10}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
```

#### 6.1.2 Individual Application Review
```typescript
// src/components/admin/recruitment/ApplicationReview.tsx
const ApplicationReview: React.FC<{ applicationId: string }> = ({ applicationId }) => {
  const [application, setApplication] = useState<DetailedApplication | null>(null);
  const [reviewDecision, setReviewDecision] = useState<ReviewDecision>('PENDING_REVIEW');
  const [scoreOverride, setScoreOverride] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Application Header */}
      <ApplicationHeader 
        application={application}
        onAssignReviewer={(adminId) => handleAssignment(adminId)}
      />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Professional Information */}
          <ProfessionalInfoCard application={application} />
          
          {/* Competency Assessment */}
          <CompetencyAssessmentCard 
            application={application}
            onScoreOverride={setScoreOverride}
          />

          {/* Self-Assessment Review */}
          <SelfAssessmentReviewCard 
            application={application}
            onConflictResolution={(resolution) => handleConflictResolution(resolution)}
          />

          {/* Documents Review */}
          <DocumentsReviewCard 
            documents={application?.documents}
            onDocumentView={(doc) => handleDocumentView(doc)}
            onVerificationUpdate={(docId, status) => handleVerificationUpdate(docId, status)}
          />
        </div>

        {/* Review Panel */}
        <div className="lg:col-span-1">
          <ReviewDecisionPanel
            application={application}
            decision={reviewDecision}
            scoreOverride={scoreOverride}
            onDecisionChange={setReviewDecision}
            onSubmitReview={(review) => handleSubmitReview(review)}
          />
        </div>
      </div>
    </div>
  );
};
```

### 6.2 Approval Workflow Implementation

#### 6.2.1 Decision Action Components
```typescript
// src/components/admin/recruitment/ReviewDecisionPanel.tsx
const ReviewDecisionPanel: React.FC<ReviewPanelProps> = ({
  application,
  decision,
  scoreOverride,
  onDecisionChange,
  onSubmitReview
}) => {
  const [reviewNotes, setReviewNotes] = useState('');
  const [workflowTrigger, setWorkflowTrigger] = useState<WorkflowType | null>(null);

  const handleSubmit = async () => {
    const reviewData = {
      decision,
      notes: reviewNotes,
      scoreOverride,
      workflowTrigger,
      competencyLevelOverride: decision === 'APPROVE' ? scoreOverride ? calculateLevel(scoreOverride) : null : null
    };

    await onSubmitReview(reviewData);
    
    // Trigger appropriate workflow
    if (decision === 'APPROVE') {
      triggerAcceptanceWorkflow(application.id);
    } else if (decision === 'REJECT') {
      triggerRejectionWorkflow(application.id);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Review Decision</h3>
          
          {/* Decision Options */}
          <RadioGroup value={decision} onValueChange={onDecisionChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="APPROVE" id="approve" />
              <Label htmlFor="approve" className="text-green-600">Approve Application</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="REJECT" id="reject" />
              <Label htmlFor="reject" className="text-red-600">Reject Application</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="REQUEST_MORE_INFO" id="more-info" />
              <Label htmlFor="more-info" className="text-yellow-600">Request More Information</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Score Override */}
        {decision === 'APPROVE' && (
          <ScoreOverrideSection
            currentScore={application?.competencyScore}
            currentLevel={application?.competencyLevel}
            onScoreChange={setScoreOverride}
          />
        )}

        {/* Review Notes */}
        <div>
          <Label htmlFor="notes">Review Notes</Label>
          <Textarea
            id="notes"
            placeholder="Add your review comments..."
            value={reviewNotes}
            onChange={(e) => setReviewNotes(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <Button 
          onClick={handleSubmit}
          className="w-full"
          disabled={!reviewNotes.trim()}
        >
          Submit Review
        </Button>
      </div>
    </Card>
  );
};
```

### 6.3 Bulk Processing Interface

#### 6.3.1 Bulk Action Component
```typescript
// src/components/admin/recruitment/BulkActionsPanel.tsx
const BulkActionsPanel: React.FC<BulkActionsProps> = ({
  selectedApplications,
  onBulkAction,
  onClearSelection
}) => {
  const [bulkAction, setBulkAction] = useState<BulkActionType>('');
  const [bulkNotes, setBulkNotes] = useState('');

  const availableActions = [
    { value: 'APPROVE_ALL', label: 'Approve All Selected', color: 'green' },
    { value: 'REJECT_ALL', label: 'Reject All Selected', color: 'red' },
    { value: 'REQUEST_INFO_ALL', label: 'Request Info from All', color: 'yellow' },
    { value: 'ASSIGN_REVIEWER', label: 'Assign Reviewer', color: 'blue' },
    { value: 'UPDATE_PRIORITY', label: 'Update Priority', color: 'purple' }
  ];

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            Bulk Actions ({selectedApplications.length} selected)
          </h3>
          <Button variant="outline" size="sm" onClick={onClearSelection}>
            Clear Selection
          </Button>
        </div>

        <Select value={bulkAction} onValueChange={setBulkAction}>
          <SelectTrigger>
            <SelectValue placeholder="Choose bulk action..." />
          </SelectTrigger>
          <SelectContent>
            {availableActions.map((action) => (
              <SelectItem key={action.value} value={action.value}>
                <span className={`text-${action.color}-600`}>{action.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Textarea
          placeholder="Bulk action notes (will be applied to all selected applications)"
          value={bulkNotes}
          onChange={(e) => setBulkNotes(e.target.value)}
        />

        <Button 
          onClick={() => onBulkAction(bulkAction, bulkNotes)}
          disabled={!bulkAction || !bulkNotes.trim()}
          className="w-full"
        >
          Apply Bulk Action
        </Button>
      </div>
    </Card>
  );
};
```

## 7. Data Security & GDPR Compliance

### 7.1 Data Protection Framework

#### 7.1.1 Enhanced Encryption
```typescript
// src/utils/encryption.ts
class GDPRCompliantEncryption {
  private static readonly ALGORITHM = 'aes-256-gcm';
  private static readonly KEY_LENGTH = 32;
  private static readonly IV_LENGTH = 16;
  private static readonly TAG_LENGTH = 16;

  static async encryptPersonalData(data: any, purpose: DataProcessingPurpose): Promise<EncryptedData> {
    const key = await this.deriveKeyForPurpose(purpose);
    const iv = crypto.randomBytes(this.IV_LENGTH);
    const cipher = crypto.createCipher(this.ALGORITHM, key, iv);
    
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const tag = cipher.getAuthTag();
    
    return {
      encryptedData: encrypted,
      iv: iv.toString('hex'),
      tag: tag.toString('hex'),
      purpose,
      encryptedAt: new Date().toISOString()
    };
  }

  static async decryptPersonalData(encryptedData: EncryptedData, purpose: DataProcessingPurpose): Promise<any> {
    // Verify purpose matches
    if (encryptedData.purpose !== purpose) {
      throw new Error('Unauthorized data access: purpose mismatch');
    }

    const key = await this.deriveKeyForPurpose(purpose);
    const decipher = crypto.createDecipher(
      this.ALGORITHM, 
      key, 
      Buffer.from(encryptedData.iv, 'hex')
    );
    
    decipher.setAuthTag(Buffer.from(encryptedData.tag, 'hex'));
    
    let decrypted = decipher.update(encryptedData.encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return JSON.parse(decrypted);
  }
}
```

#### 7.1.2 Consent Management
```typescript
// src/utils/gdprConsent.ts
interface ConsentRecord {
  candidateId: string;
  consentType: ConsentType;
  granted: boolean;
  grantedAt?: Date;
  revokedAt?: Date;
  purpose: DataProcessingPurpose[];
  legalBasis: GDPRLegalBasis;
  retentionPeriod: number; // days
  dataCategories: PersonalDataCategory[];
}

class GDPRConsentManager {
  static async recordConsent(candidateId: string, consents: ConsentRecord[]): Promise<void> {
    for (const consent of consents) {
      await prisma.gdprConsent.create({
        data: {
          candidateId,
          consentType: consent.consentType,
          granted: consent.granted,
          grantedAt: consent.granted ? new Date() : null,
          purpose: consent.purpose,
          legalBasis: consent.legalBasis,
          retentionPeriod: consent.retentionPeriod,
          dataCategories: consent.dataCategories,
          metadata: {
            ipAddress: this.getClientIP(),
            userAgent: this.getUserAgent(),
            timestamp: new Date().toISOString()
          }
        }
      });
    }
  }

  static async checkConsentValid(candidateId: string, purpose: DataProcessingPurpose): Promise<boolean> {
    const consent = await prisma.gdprConsent.findFirst({
      where: {
        candidateId,
        purpose: { has: purpose },
        granted: true,
        revokedAt: null,
        // Check if consent hasn't expired
        grantedAt: {
          gte: new Date(Date.now() - (consent.retentionPeriod * 24 * 60 * 60 * 1000))
        }
      }
    });

    return !!consent;
  }
}
```

### 7.2 AI Processing Privacy

#### 7.2.1 Data Minimization for AI
```typescript
// src/utils/aiDataMinimization.ts
class AIDataProcessor {
  static sanitizeForAIProcessing(applicationData: any): SanitizedData {
    // Remove direct identifiers
    const sanitized = { ...applicationData };
    delete sanitized.email;
    delete sanitized.phone;
    delete sanitized.governmentId;
    
    // Pseudonymize names
    sanitized.firstName = this.pseudonymize(sanitized.firstName);
    sanitized.lastName = this.pseudonymize(sanitized.lastName);
    
    // Keep only essential professional data
    return {
      professionalExperience: sanitized.professionalExperience,
      education: sanitized.education,
      publications: sanitized.publications,
      subspecialties: sanitized.subspecialties,
      // Add processing metadata
      processingId: uuidv4(),
      sanitizedAt: new Date().toISOString(),
      originalDataHash: this.hashOriginalData(applicationData)
    };
  }

  static async processWithAI(sanitizedData: SanitizedData): Promise<AIProcessingResult> {
    // Log AI processing for audit
    await this.logAIProcessing({
      processingId: sanitizedData.processingId,
      dataHash: sanitizedData.originalDataHash,
      aiProvider: 'OPENAI_GPT4',
      processingPurpose: 'CV_EXTRACTION',
      startTime: new Date()
    });

    const result = await this.performAIProcessing(sanitizedData);

    // Log completion
    await this.logAIProcessingComplete({
      processingId: sanitizedData.processingId,
      success: true,
      endTime: new Date(),
      resultHash: this.hashResult(result)
    });

    return result;
  }
}
```

### 7.3 Right to Erasure Implementation

#### 7.3.1 Data Deletion Framework
```typescript
// src/utils/gdprErasure.ts
class GDPRDataErasure {
  static async processErasureRequest(candidateId: string, reason: ErasureReason): Promise<ErasureResult> {
    const erasureLog = await this.createErasureLog(candidateId, reason);
    
    try {
      // 1. Remove personal data from main tables
      await this.erasePersonalData(candidateId);
      
      // 2. Remove or anonymize documents
      await this.handleDocuments(candidateId);
      
      // 3. Remove AI processing results
      await this.eraseAIResults(candidateId);
      
      // 4. Update audit logs (keep metadata for legal compliance)
      await this.anonymizeAuditLogs(candidateId);
      
      // 5. Notify external systems
      await this.notifyExternalSystems(candidateId);
      
      await this.completeErasureLog(erasureLog.id, 'SUCCESS');
      
      return {
        success: true,
        erasureId: erasureLog.id,
        itemsErased: this.getErasureCount(),
        completedAt: new Date()
      };
      
    } catch (error) {
      await this.completeErasureLog(erasureLog.id, 'FAILED', error.message);
      throw error;
    }
  }

  private static async erasePersonalData(candidateId: string): Promise<void> {
    // Instead of hard delete, replace with anonymized values
    await prisma.professionalCandidate.update({
      where: { id: candidateId },
      data: {
        firstName: `[ERASED_${Date.now()}]`,
        lastName: `[ERASED_${Date.now()}]`,
        email: `erased_${candidateId}@deleted.local`,
        phone: null,
        dateOfBirth: new Date('1900-01-01'), // Anonymous date
        nationality: 'ERASED',
        // Keep professional data for statistical purposes if consent given
        applicationStatus: 'ERASED',
        erasedAt: new Date(),
        erasureReason: reason
      }
    });
  }
}
```

## 8. Implementation Phases

### 8.1 Phase 1: Foundation Setup (Weeks 1-2)

#### 8.1.1 Database Schema Implementation
```sql
-- Migration script: 001_dual_path_foundation.sql
BEGIN;

-- Create new tables
CREATE TABLE application_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID NOT NULL REFERENCES professional_candidates(id) ON DELETE CASCADE,
  path_type VARCHAR(20) NOT NULL CHECK (path_type IN ('AI_ASSISTED', 'MANUAL')),
  started_at TIMESTAMP NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMP,
  ai_confidence_score FLOAT,
  ai_processing_time INTEGER,
  user_corrections_count INTEGER DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE self_assessment_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID NOT NULL REFERENCES professional_candidates(id) ON DELETE CASCADE,
  question_id VARCHAR(50) NOT NULL,
  question_text TEXT NOT NULL,
  self_declared_level VARCHAR(20),
  confidence_level INTEGER CHECK (confidence_level BETWEEN 1 AND 5),
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(candidate_id, question_id)
);

CREATE TABLE numbering_sequences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sequence_type VARCHAR(50) NOT NULL UNIQUE,
  prefix VARCHAR(10) NOT NULL,
  current_number INTEGER NOT NULL DEFAULT 0,
  format_pattern VARCHAR(100) NOT NULL,
  reset_annually BOOLEAN DEFAULT FALSE,
  last_reset_year INTEGER,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Initialize sequences
INSERT INTO numbering_sequences (sequence_type, prefix, current_number, format_pattern, reset_annually) 
VALUES 
  ('APPLICATION', 'APP', 0, '{prefix}-{year}-{number:06d}', true),
  ('PROFESSIONAL', 'PRO', 0, '{prefix}-{year}-{number:06d}', true);

-- Add indexes
CREATE INDEX idx_application_paths_candidate ON application_paths(candidate_id);
CREATE INDEX idx_application_paths_type ON application_paths(path_type);
CREATE INDEX idx_self_assessment_candidate ON self_assessment_responses(candidate_id);

COMMIT;
```

#### 8.1.2 AI Service Infrastructure
```typescript
// microservices/ai-integration-service/package.json
{
  "name": "ai-integration-service",
  "version": "1.0.0",
  "dependencies": {
    "openai": "^4.24.0",
    "pdf-parse": "^1.1.1",
    "express": "^4.18.2",
    "multer": "^1.4.5-lts.1",
    "@prisma/client": "^5.7.0"
  }
}
```

### 8.2 Phase 2: AI Integration (Weeks 3-4)

#### 8.2.1 OpenAI Service Implementation
```typescript
// microservices/ai-integration-service/src/openaiService.ts
export class OpenAIService {
  private client: OpenAI;
  
  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      organization: process.env.OPENAI_ORGANIZATION
    });
  }

  async extractCVData(pdfText: string): Promise<CVExtractionResult> {
    const systemPrompt = `You are a medical recruitment AI assistant specialized in extracting professional information from medical CVs with high precision.

EXTRACTION RULES:
1. Only extract information you are highly confident about (>85% confidence)
2. Do not infer or guess missing information
3. Provide confidence scores for each extracted field
4. Focus on: personal details, education, licensing, experience, publications, affiliations
5. Return structured JSON with confidence scores

REQUIRED OUTPUT STRUCTURE:
{
  "personalInfo": {
    "firstName": "string",
    "lastName": "string", 
    "email": "string",
    "phone": "string"
  },
  "education": {
    "medicalDegree": "string",
    "residency": "string",
    "fellowship": "string"
  },
  "licensing": {
    "licenseNumber": "string",
    "licenseState": "string",
    "expiryDate": "string"
  },
  "experience": {
    "yearsOfPractice": "number",
    "currentAffiliation": "string",
    "subspecialties": ["string"]
  },
  "research": {
    "publications": "number",
    "clinicalTrials": "boolean",
    "teachingRoles": "boolean"
  },
  "confidence": {
    "overall": "number",
    "fieldConfidence": {"field": "number"}
  }
}`;

    const response = await this.client.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Extract professional information from this medical CV:\n\n${pdfText}` }
      ],
      temperature: 0.1,
      max_tokens: 4000,
      response_format: { type: 'json_object' }
    });

    return JSON.parse(response.choices[0].message.content!);
  }
}
```

### 8.3 Phase 3: Frontend Development (Weeks 5-7)

#### 8.3.1 Application Path Selection
- Implement PathSelectorComponent
- Create AI-assisted upload flow
- Build manual step-by-step wizard
- Add progress indicators and validation

#### 8.3.2 Self-Assessment Integration
- Build self-assessment questionnaire
- Implement confidence rating system
- Add admin conflict resolution interface

### 8.4 Phase 4: Admin Dashboard Enhancement (Weeks 8-9)

#### 8.4.1 Application Management
- Enhanced applications list with filtering
- Individual application review interface
- Bulk action capabilities
- Approval workflow integration

#### 8.4.2 Competency Score Management
- Score override functionality
- Self-assessment vs. algorithm comparison
- Manual level adjustment interface

### 8.5 Phase 5: Workflow Integration (Weeks 10-11)

#### 8.5.1 Acceptance Workflow
```typescript
// microservices/workflow-engine-service/workflows/professionalAcceptance.ts
export const ProfessionalAcceptanceWorkflow = {
  id: 'professional_acceptance',
  name: 'Professional Application Acceptance',
  version: '2.0',
  steps: [
    {
      id: 'generate_professional_number',
      service: 'professional-recruitment-service',
      endpoint: '/api/v1/internal/generate-professional-number',
      input: { candidateId: '{{candidateId}}' },
      output: 'professionalNumber'
    },
    {
      id: 'create_professional_account',
      service: 'professional-service', 
      endpoint: '/api/v1/internal/create-from-candidate',
      input: { 
        candidateId: '{{candidateId}}',
        professionalNumber: '{{steps.generate_professional_number.output.professionalNumber}}'
      },
      output: 'professionalId'
    },
    {
      id: 'send_welcome_notification',
      service: 'notification-service',
      endpoint: '/api/v1/internal/send-template',
      input: {
        template: 'PROFESSIONAL_WELCOME',
        recipientId: '{{steps.create_professional_account.output.professionalId}}',
        data: {
          professionalNumber: '{{steps.generate_professional_number.output.professionalNumber}}',
          loginUrl: '{{env.PROFESSIONAL_PORTAL_URL}}/login'
        }
      }
    },
    {
      id: 'setup_platform_access',
      service: 'admin-management-service',
      endpoint: '/api/v1/internal/setup-professional-access', 
      input: {
        professionalId: '{{steps.create_professional_account.output.professionalId}}',
        competencyLevel: '{{candidateData.competencyLevel}}'
      }
    }
  ]
};
```

### 8.6 Phase 6: Testing & Deployment (Weeks 12-13)

#### 8.6.1 Comprehensive Testing Strategy
```typescript
// tests/integration/dualPathRecruitment.test.ts
describe('Dual-Path Recruitment System', () => {
  describe('AI-Assisted Path', () => {
    test('should process CV upload and extract data', async () => {
      const testCV = await loadTestFile('sample_cv.pdf');
      const response = await request(app)
        .post('/api/v1/recruitment/ai-path/upload-cv')
        .attach('cv', testCV)
        .send({ email: 'test@example.com' });

      expect(response.status).toBe(200);
      expect(response.body.data.aiAnalysis.overallConfidence).toBeGreaterThan(70);
      expect(response.body.data.prepopulatedApplication.firstName).toBeDefined();
    });

    test('should handle extraction review and correction', async () => {
      // Test user corrections and validation
    });
  });

  describe('Manual Path', () => {
    test('should complete step-by-step application', async () => {
      // Test manual application flow
    });
  });

  describe('Admin Workflow', () => {
    test('should process application approval with workflow trigger', async () => {
      // Test admin approval triggering acceptance workflow
    });
  });
});
```

## 9. Migration Strategy

### 9.1 Data Migration Plan

#### 9.1.1 Existing Applications
```sql
-- Migrate existing applications to new schema
UPDATE professional_candidates 
SET 
  application_path = 'MANUAL',
  processing_stage = CASE 
    WHEN application_status = 'SUBMITTED' THEN 'APPLICATION_SUBMITTED'
    WHEN application_status = 'UNDER_REVIEW' THEN 'ADMIN_REVIEW'
    WHEN application_status = 'APPROVED' THEN 'APPROVED'
    ELSE 'APPLICATION_SUBMITTED'
  END,
  last_activity_at = COALESCE(updated_at, created_at)
WHERE application_path IS NULL;

-- Generate application numbers for existing applications
UPDATE professional_candidates 
SET application_number = 'APP-' || EXTRACT(YEAR FROM created_at) || '-' || LPAD(ROW_NUMBER() OVER (ORDER BY created_at)::text, 6, '0')
WHERE application_number IS NULL;
```

### 9.2 Feature Flag Strategy

```typescript
// src/utils/featureFlags.ts
export const FeatureFlags = {
  DUAL_PATH_RECRUITMENT: process.env.FEATURE_DUAL_PATH === 'true',
  AI_CV_EXTRACTION: process.env.FEATURE_AI_EXTRACTION === 'true', 
  SELF_ASSESSMENT: process.env.FEATURE_SELF_ASSESSMENT === 'true',
  ENHANCED_ADMIN_DASHBOARD: process.env.FEATURE_ENHANCED_ADMIN === 'true'
};

// Gradual rollout configuration
export const RolloutConfig = {
  AI_PATH_PERCENTAGE: parseInt(process.env.AI_PATH_ROLLOUT_PERCENTAGE || '25'),
  ADMIN_DASHBOARD_USERS: (process.env.ENHANCED_ADMIN_USERS || '').split(',')
};
```

## 10. Performance & Scalability Considerations

### 10.1 AI Processing Optimization

#### 10.1.1 Async Processing Queue
```typescript
// src/queues/aiProcessingQueue.ts
import Bull from 'bull';

export const aiProcessingQueue = new Bull('AI Processing', {
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379')
  },
  defaultJobOptions: {
    attempts: 3,
    backoff: 'exponential',
    delay: 2000
  }
});

aiProcessingQueue.process('cv-extraction', 5, async (job) => {
  const { candidateId, documentPath, email } = job.data;
  
  try {
    const result = await aiService.extractCVData(documentPath, email);
    
    // Update candidate with results
    await prisma.professionalCandidate.update({
      where: { id: candidateId },
      data: {
        ai_confidence_overall: result.confidence.overall,
        processing_stage: 'AI_EXTRACTION_COMPLETE'
      }
    });

    return result;
  } catch (error) {
    await prisma.professionalCandidate.update({
      where: { id: candidateId },
      data: { processing_stage: 'AI_EXTRACTION_FAILED' }
    });
    throw error;
  }
});
```

### 10.2 Database Optimization

#### 10.2.1 Indexing Strategy
```sql
-- Optimized indexes for the dual-path system
CREATE INDEX CONCURRENTLY idx_candidates_path_status ON professional_candidates(application_path, application_status);
CREATE INDEX CONCURRENTLY idx_candidates_processing_stage ON professional_candidates(processing_stage, created_at);
CREATE INDEX CONCURRENTLY idx_ai_results_confidence ON ai_processing_results(confidence_score DESC, created_at);
CREATE INDEX CONCURRENTLY idx_self_assessment_candidate_question ON self_assessment_responses(candidate_id, question_id);

-- Partial indexes for active applications
CREATE INDEX CONCURRENTLY idx_active_applications ON professional_candidates(created_at) 
WHERE application_status IN ('SUBMITTED', 'UNDER_REVIEW');
```

## 11. Monitoring & Analytics

### 11.1 Application Metrics Dashboard

```typescript
// src/analytics/recruitmentMetrics.ts
export class RecruitmentAnalytics {
  static async getPathUsageMetrics(): Promise<PathUsageMetrics> {
    const [aiPath, manualPath] = await Promise.all([
      prisma.professionalCandidate.count({
        where: { application_path: 'AI_ASSISTED' }
      }),
      prisma.professionalCandidate.count({
        where: { application_path: 'MANUAL' }
      })
    ]);

    return {
      aiAssisted: {
        count: aiPath,
        percentage: (aiPath / (aiPath + manualPath)) * 100
      },
      manual: {
        count: manualPath,
        percentage: (manualPath / (aiPath + manualPath)) * 100
      }
    };
  }

  static async getAIPerformanceMetrics(): Promise<AIPerformanceMetrics> {
    const results = await prisma.aiProcessingResults.groupBy({
      by: ['processing_type'],
      _avg: {
        confidence_score: true,
        processing_time: true
      },
      _count: true
    });

    return results.map(result => ({
      processingType: result.processing_type,
      averageConfidence: result._avg.confidence_score,
      averageProcessingTime: result._avg.processing_time,
      totalProcessed: result._count
    }));
  }
}
```

## 12. Security Considerations

### 12.1 API Security Enhancements

```typescript
// src/middleware/apiSecurity.ts
export const enhancedSecurity = {
  // Rate limiting for AI endpoints
  aiEndpointLimiter: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit AI processing requests
    message: 'Too many AI processing requests',
    standardHeaders: true
  }),

  // File upload validation
  fileValidation: (req: Request, res: Response, next: NextFunction) => {
    if (req.files) {
      const files = Array.isArray(req.files) ? req.files : [req.files];
      
      for (const file of files) {
        // Virus scanning simulation
        if (file.size > 25 * 1024 * 1024) {
          return res.status(400).json({ error: 'File too large' });
        }
        
        // MIME type validation
        const allowedTypes = ['application/pdf'];
        if (!allowedTypes.includes(file.mimetype)) {
          return res.status(400).json({ error: 'Invalid file type' });
        }
      }
    }
    next();
  },

  // PII detection and masking
  piiProtection: async (req: Request, res: Response, next: NextFunction) => {
    if (req.body) {
      req.body = await sanitizePII(req.body);
    }
    next();
  }
};
```

## 13. Testing Strategy

### 13.1 End-to-End Testing

```typescript
// tests/e2e/dualPathFlow.e2e.ts
describe('Dual-Path Recruitment E2E', () => {
  test('Complete AI-assisted application flow', async () => {
    const page = await browser.newPage();
    
    // 1. Navigate to application start
    await page.goto('/professional/apply');
    
    // 2. Select AI-assisted path
    await page.click('[data-testid="ai-assisted-path"]');
    
    // 3. Upload CV
    await page.setInputFiles('[data-testid="cv-upload"]', 'tests/fixtures/sample_cv.pdf');
    await page.click('[data-testid="upload-button"]');
    
    // 4. Wait for AI processing
    await page.waitForSelector('[data-testid="ai-processing-complete"]', { timeout: 30000 });
    
    // 5. Review and edit extracted data
    await page.fill('[data-testid="first-name"]', 'Corrected Name');
    await page.click('[data-testid="submit-application"]');
    
    // 6. Verify application submitted
    await expect(page.locator('[data-testid="application-number"]')).toBeVisible();
    
    // 7. Admin review flow
    const adminPage = await browser.newPage();
    await adminLogin(adminPage);
    await adminPage.goto('/admin/recruitment/applications');
    
    // 8. Find and approve application
    await adminPage.click(`[data-testid="review-${applicationId}"]`);
    await adminPage.selectOption('[data-testid="decision"]', 'APPROVE');
    await adminPage.fill('[data-testid="review-notes"]', 'Excellent candidate');
    await adminPage.click('[data-testid="submit-review"]');
    
    // 9. Verify workflow triggered
    await expect(adminPage.locator('[data-testid="workflow-triggered"]')).toBeVisible();
  });
});
```

## 14. Documentation Requirements

### 14.1 API Documentation Updates

```yaml
# api-docs/recruitment-v2.yaml
openapi: 3.0.0
info:
  title: Professional Recruitment API v2
  description: Enhanced dual-path professional recruitment system
  version: 2.0.0

paths:
  /api/v1/recruitment/ai-path/upload-cv:
    post:
      summary: Upload CV for AI-assisted application
      requestBody:
        content:
          multipart/form-data:
            schema:
              type: object
              properties:
                cv:
                  type: string
                  format: binary
                  description: CV file (PDF only)
                email:
                  type: string
                  format: email
                  description: Candidate email for identification
      responses:
        '200':
          description: CV processed successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                  data:
                    type: object
                    properties:
                      prepopulatedApplication:
                        $ref: '#/components/schemas/ApplicationData'
                      aiAnalysis:
                        $ref: '#/components/schemas/AIAnalysisResult'
```

## 15. Conclusion

This comprehensive technical specification provides a detailed roadmap for implementing the dual-path professional recruitment system. The design maintains backward compatibility with the existing system while introducing advanced AI capabilities and enhanced admin workflows.

### Key Implementation Priorities:

1. **Database Schema Updates**: Foundation for all new features
2. **AI Integration Service**: Core functionality for CV extraction
3. **Frontend Path Selection**: User-facing interface for path choice
4. **Admin Dashboard Enhancement**: Comprehensive application management
5. **Workflow Integration**: Automated acceptance/rejection processes
6. **GDPR Compliance**: Enhanced data protection and privacy features

### Success Metrics:

- **Application Completion Rate**: Target >85% for AI-assisted path
- **Admin Processing Time**: Reduce by 40% with enhanced dashboard
- **AI Extraction Accuracy**: >90% confidence on key fields
- **User Satisfaction**: >4.5/5 rating on application experience
- **GDPR Compliance**: 100% compliance with data protection regulations

The phased implementation approach allows for gradual rollout and testing, ensuring system stability while introducing powerful new capabilities that will significantly improve the professional recruitment experience for both candidates and administrators.