-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "public"."CommunicationChannel" AS ENUM ('EMAIL', 'SMS', 'WHATSAPP');

-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "public"."Language" AS ENUM ('ENGLISH', 'GERMAN');

-- CreateEnum
CREATE TYPE "public"."TwoFactorMethod" AS ENUM ('EMAIL', 'SMS', 'WHATSAPP');

-- CreateEnum
CREATE TYPE "public"."QuestionnaireType" AS ENUM ('FAST_TRACK', 'COMPREHENSIVE');

-- CreateEnum
CREATE TYPE "public"."CaseUrgency" AS ENUM ('STANDARD', 'URGENT', 'EMERGENCY');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "public"."ProLevel" AS ENUM ('JUNIOR', 'SENIOR', 'EXPERT', 'DISTINGUISHED');

-- CreateEnum
CREATE TYPE "public"."CandidateStatus" AS ENUM ('SUBMITTED', 'UNDER_REVIEW', 'ADDITIONAL_INFO_REQUIRED', 'APPROVED', 'REJECTED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "public"."DocumentType" AS ENUM ('GOVERNMENT_ID', 'MEDICAL_DEGREE', 'RESIDENCY_CERTIFICATE', 'FELLOWSHIP_CERTIFICATE', 'BOARD_CERTIFICATION', 'LICENSE_CERTIFICATE', 'GOOD_STANDING_CERTIFICATE', 'CV', 'PUBLICATION_1', 'PUBLICATION_2', 'PUBLICATION_3', 'MALPRACTICE_INSURANCE', 'ADDITIONAL_DIPLOMA');

-- CreateEnum
CREATE TYPE "public"."ReviewDecision" AS ENUM ('APPROVE', 'REJECT', 'REQUEST_MORE_INFO', 'PENDING_REVIEW');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."customers" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "gender" "public"."Gender" DEFAULT 'PREFER_NOT_TO_SAY',
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "hashedPassword" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "phoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "twoFactorMethod" "public"."TwoFactorMethod" NOT NULL DEFAULT 'EMAIL',
    "twoFactorSecret" TEXT,
    "preferredLanguage" "public"."Language" NOT NULL DEFAULT 'ENGLISH',
    "preferredChannel" "public"."CommunicationChannel" NOT NULL DEFAULT 'EMAIL',
    "emailNotifications" BOOLEAN NOT NULL DEFAULT true,
    "smsNotifications" BOOLEAN NOT NULL DEFAULT false,
    "whatsappNotifications" BOOLEAN NOT NULL DEFAULT false,
    "googleId" TEXT,
    "appleId" TEXT,
    "microsoftId" TEXT,
    "oauthProvider" TEXT,
    "profileCompleted" BOOLEAN NOT NULL DEFAULT false,
    "termsAccepted" BOOLEAN NOT NULL DEFAULT false,
    "privacyAccepted" BOOLEAN NOT NULL DEFAULT false,
    "marketingConsent" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB,
    "searchVector" tsvector,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."temp_submissions" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "payload" JSONB NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "temp_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."customer_sessions" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "customerId" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "twoFactorVerified" BOOLEAN NOT NULL DEFAULT false,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "lastActivity" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."customer_notifications" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "customerId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "channel" "public"."CommunicationChannel" NOT NULL,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "language" "public"."Language" NOT NULL DEFAULT 'ENGLISH',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "scheduledFor" TIMESTAMP(3),
    "sentAt" TIMESTAMP(3),
    "readAt" TIMESTAMP(3),
    "errorMessage" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."service_pricing" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "professionalLevel" TEXT NOT NULL,
    "urgencyLevel" "public"."CaseUrgency" NOT NULL DEFAULT 'STANDARD',
    "basePriceEUR" DOUBLE PRECISION NOT NULL,
    "currencyCode" TEXT NOT NULL DEFAULT 'EUR',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "validFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validUntil" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_pricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."questionnaire_responses" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "caseId" TEXT NOT NULL,
    "questionnaireType" "public"."QuestionnaireType" NOT NULL,
    "language" "public"."Language" NOT NULL DEFAULT 'ENGLISH',
    "responses" JSONB NOT NULL,
    "aiAnalysis" JSONB,
    "completenessScore" DOUBLE PRECISION,
    "confidence" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "questionnaire_responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."case_payments" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "caseId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "professionalLevel" TEXT NOT NULL,
    "urgencyLevel" "public"."CaseUrgency" NOT NULL DEFAULT 'STANDARD',
    "status" "public"."PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMethod" TEXT,
    "transactionId" TEXT,
    "paymentDate" TIMESTAMP(3),
    "refundDate" TIMESTAMP(3),
    "refundReason" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "case_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."cases" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "caseNumber" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "chiefComplaint" TEXT,
    "category" TEXT NOT NULL DEFAULT 'GENERAL_MEDICINE',
    "medicalHistory" JSONB,
    "currentMedications" JSONB,
    "allergies" JSONB,
    "familyHistory" JSONB,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "priority" TEXT NOT NULL DEFAULT 'NORMAL',
    "requestedProfessionalLevel" TEXT NOT NULL DEFAULT 'SENIOR',
    "talentPool" TEXT,
    "urgencyReason" TEXT,
    "submittedAt" TIMESTAMP(3),
    "reviewStartedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "assignedProfessionalId" TEXT,
    "assignedAt" TIMESTAMP(3),
    "qualityScore" DOUBLE PRECISION,
    "completenessScore" DOUBLE PRECISION,
    "metadata" JSONB,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "version" INTEGER NOT NULL DEFAULT 1,
    "ethnicity" TEXT,
    "gender" TEXT,
    "diseaseType" TEXT,
    "isFirstOccurrence" BOOLEAN,
    "geneticFamilyHistory" JSONB,
    "paymentId" TEXT,
    "consentAccepted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."case_status_history" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "caseId" TEXT NOT NULL,
    "fromStatus" TEXT,
    "toStatus" TEXT NOT NULL,
    "reason" TEXT,
    "notes" TEXT,
    "changedByType" TEXT NOT NULL,
    "changedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "case_status_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."uploaded_files" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "caseId" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "s3Key" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "metadata" JSONB,
    "checksum" TEXT,
    "encrypted" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "uploaded_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."medical_professionals" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "proNumber" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "nationality" TEXT,
    "licenseNumber" TEXT NOT NULL,
    "licenseCountry" TEXT NOT NULL,
    "licenseExpiry" TIMESTAMP(3) NOT NULL,
    "vetted" BOOLEAN NOT NULL DEFAULT false,
    "level" "public"."ProLevel" NOT NULL DEFAULT 'JUNIOR',
    "cvUrl" TEXT,
    "documents" JSONB,
    "subspecialties" JSONB,
    "yearsPractice" INTEGER NOT NULL,
    "publications" INTEGER NOT NULL,
    "trialInvolved" BOOLEAN NOT NULL,
    "leadership" TEXT,
    "societyMemberships" JSONB,
    "competencyData" JSONB,
    "availability" JSONB,
    "score" INTEGER,
    "hashedPassword" TEXT,
    "twoFactorMethod" "public"."TwoFactorMethod" NOT NULL DEFAULT 'EMAIL',
    "twoFactorSecret" TEXT,
    "profileLastUpdated" TIMESTAMP(3),
    "codeOfConductAcknowledged" TIMESTAMP(3),
    "address" TEXT,
    "billingAddress" TEXT,
    "bankDetails" JSONB,
    "vatNumber" TEXT,
    "billingRate" DOUBLE PRECISION,
    "performanceMetrics" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medical_professionals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."professional_sessions" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "professionalId" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "twoFactorVerified" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "professional_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."case_assignments" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "caseId" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'assigned',
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "estimatedDuration" INTEGER,
    "actualDuration" INTEGER,
    "metadata" JSONB,

    CONSTRAINT "case_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ai_analyses" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "caseId" TEXT NOT NULL,
    "analysisType" TEXT NOT NULL,
    "results" JSONB NOT NULL,
    "confidence" DOUBLE PRECISION,
    "processingTime" INTEGER,
    "aiProvider" TEXT,
    "modelVersion" TEXT,
    "cost" DOUBLE PRECISION,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_analyses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."medical_opinions" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "caseId" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "version" INTEGER NOT NULL DEFAULT 1,
    "digitalSignature" TEXT,
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "publishedAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medical_opinions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."professional_payments" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "caseId" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "paymentMethod" TEXT,
    "transactionId" TEXT,
    "processedAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "professional_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."admins" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "permissions" JSONB,
    "lastLoginAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."professional_candidates" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "nationality" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "emailVerificationToken" TEXT,
    "medicalDegreeUploaded" BOOLEAN NOT NULL DEFAULT false,
    "residencyCompleted" BOOLEAN NOT NULL DEFAULT false,
    "fellowshipCompleted" BOOLEAN NOT NULL DEFAULT false,
    "boardCertificationNumber" TEXT,
    "medicalLicenseNumber" TEXT NOT NULL,
    "licenseCountry" TEXT NOT NULL,
    "licenseState" TEXT,
    "licenseExpiry" TIMESTAMP(3) NOT NULL,
    "certificateGoodStanding" BOOLEAN NOT NULL DEFAULT false,
    "yearsIndependentPractice" INTEGER NOT NULL,
    "currentAffiliation" TEXT NOT NULL,
    "subspecialties" JSONB,
    "annualPatientLoad" INTEGER,
    "secondOpinionsGiven" INTEGER,
    "peerReviewedPublications" INTEGER NOT NULL DEFAULT 0,
    "clinicalTrialInvolvement" BOOLEAN NOT NULL DEFAULT false,
    "clinicalTrialDetails" TEXT,
    "conferencepresentations" BOOLEAN NOT NULL DEFAULT false,
    "conferenceDetails" TEXT,
    "teachingRoles" BOOLEAN NOT NULL DEFAULT false,
    "teachingDetails" TEXT,
    "oncologySocieties" JSONB,
    "awardsHonors" TEXT,
    "leadershipRoles" TEXT,
    "professionalReferences" JSONB,
    "malpracticeInsurance" BOOLEAN NOT NULL DEFAULT false,
    "noActiveDisciplinary" BOOLEAN NOT NULL DEFAULT false,
    "dataProtectionAgreed" BOOLEAN NOT NULL DEFAULT false,
    "competencyScore" DOUBLE PRECISION,
    "competencyLevel" "public"."ProLevel",
    "scoreBreakdown" JSONB,
    "applicationStatus" "public"."CandidateStatus" NOT NULL DEFAULT 'SUBMITTED',
    "submittedAt" TIMESTAMP(3),
    "reviewStartedAt" TIMESTAMP(3),
    "reviewedAt" TIMESTAMP(3),
    "reviewedBy" TEXT,
    "reviewNotes" TEXT,
    "rejectionReason" TEXT,
    "approvedToProfessionalId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "professional_candidates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."candidate_documents" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "candidateId" TEXT NOT NULL,
    "documentType" "public"."DocumentType" NOT NULL,
    "fileName" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "s3Key" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "checksum" TEXT,
    "encrypted" BOOLEAN NOT NULL DEFAULT true,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "candidate_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."application_reviews" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "candidateId" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "decision" "public"."ReviewDecision" NOT NULL,
    "notes" TEXT,
    "scoreAdjustment" JSONB,
    "recommendedLevel" "public"."ProLevel",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "application_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "public"."customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customers_googleId_key" ON "public"."customers"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "customers_appleId_key" ON "public"."customers"("appleId");

-- CreateIndex
CREATE UNIQUE INDEX "customers_microsoftId_key" ON "public"."customers"("microsoftId");

-- CreateIndex
CREATE UNIQUE INDEX "customers_userId_key" ON "public"."customers"("userId");

-- CreateIndex
CREATE INDEX "customers_searchVector_idx" ON "public"."customers" USING GIN ("searchVector");

-- CreateIndex
CREATE INDEX "customers_email_idx" ON "public"."customers"("email");

-- CreateIndex
CREATE INDEX "customers_googleId_idx" ON "public"."customers"("googleId");

-- CreateIndex
CREATE INDEX "customers_appleId_idx" ON "public"."customers"("appleId");

-- CreateIndex
CREATE INDEX "customers_microsoftId_idx" ON "public"."customers"("microsoftId");

-- CreateIndex
CREATE INDEX "customers_createdAt_idx" ON "public"."customers"("createdAt");

-- CreateIndex
CREATE INDEX "temp_submissions_expiresAt_idx" ON "public"."temp_submissions"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "customer_sessions_sessionToken_key" ON "public"."customer_sessions"("sessionToken");

-- CreateIndex
CREATE INDEX "customer_sessions_sessionToken_idx" ON "public"."customer_sessions"("sessionToken");

-- CreateIndex
CREATE INDEX "customer_sessions_customerId_idx" ON "public"."customer_sessions"("customerId");

-- CreateIndex
CREATE INDEX "customer_sessions_expiresAt_idx" ON "public"."customer_sessions"("expiresAt");

-- CreateIndex
CREATE INDEX "customer_notifications_customerId_idx" ON "public"."customer_notifications"("customerId");

-- CreateIndex
CREATE INDEX "customer_notifications_status_idx" ON "public"."customer_notifications"("status");

-- CreateIndex
CREATE INDEX "customer_notifications_scheduledFor_idx" ON "public"."customer_notifications"("scheduledFor");

-- CreateIndex
CREATE INDEX "customer_notifications_createdAt_idx" ON "public"."customer_notifications"("createdAt");

-- CreateIndex
CREATE INDEX "service_pricing_professionalLevel_idx" ON "public"."service_pricing"("professionalLevel");

-- CreateIndex
CREATE INDEX "service_pricing_urgencyLevel_idx" ON "public"."service_pricing"("urgencyLevel");

-- CreateIndex
CREATE INDEX "service_pricing_isActive_idx" ON "public"."service_pricing"("isActive");

-- CreateIndex
CREATE INDEX "service_pricing_validFrom_idx" ON "public"."service_pricing"("validFrom");

-- CreateIndex
CREATE UNIQUE INDEX "questionnaire_responses_caseId_key" ON "public"."questionnaire_responses"("caseId");

-- CreateIndex
CREATE INDEX "questionnaire_responses_questionnaireType_idx" ON "public"."questionnaire_responses"("questionnaireType");

-- CreateIndex
CREATE INDEX "questionnaire_responses_createdAt_idx" ON "public"."questionnaire_responses"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "case_payments_caseId_key" ON "public"."case_payments"("caseId");

-- CreateIndex
CREATE INDEX "case_payments_caseId_idx" ON "public"."case_payments"("caseId");

-- CreateIndex
CREATE INDEX "case_payments_customerId_idx" ON "public"."case_payments"("customerId");

-- CreateIndex
CREATE INDEX "case_payments_status_idx" ON "public"."case_payments"("status");

-- CreateIndex
CREATE INDEX "case_payments_paymentDate_idx" ON "public"."case_payments"("paymentDate");

-- CreateIndex
CREATE UNIQUE INDEX "cases_caseNumber_key" ON "public"."cases"("caseNumber");

-- CreateIndex
CREATE INDEX "cases_caseNumber_idx" ON "public"."cases"("caseNumber");

-- CreateIndex
CREATE INDEX "cases_customerId_idx" ON "public"."cases"("customerId");

-- CreateIndex
CREATE INDEX "cases_status_idx" ON "public"."cases"("status");

-- CreateIndex
CREATE INDEX "cases_category_idx" ON "public"."cases"("category");

-- CreateIndex
CREATE INDEX "cases_priority_idx" ON "public"."cases"("priority");

-- CreateIndex
CREATE INDEX "cases_createdAt_idx" ON "public"."cases"("createdAt");

-- CreateIndex
CREATE INDEX "case_status_history_caseId_idx" ON "public"."case_status_history"("caseId");

-- CreateIndex
CREATE INDEX "case_status_history_createdAt_idx" ON "public"."case_status_history"("createdAt");

-- CreateIndex
CREATE INDEX "uploaded_files_caseId_idx" ON "public"."uploaded_files"("caseId");

-- CreateIndex
CREATE INDEX "uploaded_files_s3Key_idx" ON "public"."uploaded_files"("s3Key");

-- CreateIndex
CREATE INDEX "uploaded_files_category_idx" ON "public"."uploaded_files"("category");

-- CreateIndex
CREATE UNIQUE INDEX "medical_professionals_proNumber_key" ON "public"."medical_professionals"("proNumber");

-- CreateIndex
CREATE UNIQUE INDEX "medical_professionals_email_key" ON "public"."medical_professionals"("email");

-- CreateIndex
CREATE INDEX "medical_professionals_email_idx" ON "public"."medical_professionals"("email");

-- CreateIndex
CREATE INDEX "medical_professionals_licenseNumber_idx" ON "public"."medical_professionals"("licenseNumber");

-- CreateIndex
CREATE INDEX "medical_professionals_level_idx" ON "public"."medical_professionals"("level");

-- CreateIndex
CREATE INDEX "medical_professionals_vetted_idx" ON "public"."medical_professionals"("vetted");

-- CreateIndex
CREATE INDEX "medical_professionals_createdAt_idx" ON "public"."medical_professionals"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "professional_sessions_sessionToken_key" ON "public"."professional_sessions"("sessionToken");

-- CreateIndex
CREATE INDEX "professional_sessions_sessionToken_idx" ON "public"."professional_sessions"("sessionToken");

-- CreateIndex
CREATE INDEX "professional_sessions_professionalId_idx" ON "public"."professional_sessions"("professionalId");

-- CreateIndex
CREATE INDEX "professional_sessions_expiresAt_idx" ON "public"."professional_sessions"("expiresAt");

-- CreateIndex
CREATE INDEX "case_assignments_caseId_idx" ON "public"."case_assignments"("caseId");

-- CreateIndex
CREATE INDEX "case_assignments_professionalId_idx" ON "public"."case_assignments"("professionalId");

-- CreateIndex
CREATE INDEX "case_assignments_status_idx" ON "public"."case_assignments"("status");

-- CreateIndex
CREATE INDEX "case_assignments_assignedAt_idx" ON "public"."case_assignments"("assignedAt");

-- CreateIndex
CREATE INDEX "ai_analyses_caseId_idx" ON "public"."ai_analyses"("caseId");

-- CreateIndex
CREATE INDEX "ai_analyses_analysisType_idx" ON "public"."ai_analyses"("analysisType");

-- CreateIndex
CREATE INDEX "ai_analyses_aiProvider_idx" ON "public"."ai_analyses"("aiProvider");

-- CreateIndex
CREATE INDEX "ai_analyses_createdAt_idx" ON "public"."ai_analyses"("createdAt");

-- CreateIndex
CREATE INDEX "ai_analyses_results_idx" ON "public"."ai_analyses" USING GIN ("results");

-- CreateIndex
CREATE INDEX "medical_opinions_caseId_idx" ON "public"."medical_opinions"("caseId");

-- CreateIndex
CREATE INDEX "medical_opinions_professionalId_idx" ON "public"."medical_opinions"("professionalId");

-- CreateIndex
CREATE INDEX "medical_opinions_status_idx" ON "public"."medical_opinions"("status");

-- CreateIndex
CREATE INDEX "medical_opinions_createdAt_idx" ON "public"."medical_opinions"("createdAt");

-- CreateIndex
CREATE INDEX "professional_payments_caseId_idx" ON "public"."professional_payments"("caseId");

-- CreateIndex
CREATE INDEX "professional_payments_professionalId_idx" ON "public"."professional_payments"("professionalId");

-- CreateIndex
CREATE INDEX "professional_payments_status_idx" ON "public"."professional_payments"("status");

-- CreateIndex
CREATE INDEX "professional_payments_createdAt_idx" ON "public"."professional_payments"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "public"."admins"("email");

-- CreateIndex
CREATE INDEX "admins_email_idx" ON "public"."admins"("email");

-- CreateIndex
CREATE INDEX "admins_role_idx" ON "public"."admins"("role");

-- CreateIndex
CREATE UNIQUE INDEX "professional_candidates_email_key" ON "public"."professional_candidates"("email");

-- CreateIndex
CREATE INDEX "professional_candidates_email_idx" ON "public"."professional_candidates"("email");

-- CreateIndex
CREATE INDEX "professional_candidates_applicationStatus_idx" ON "public"."professional_candidates"("applicationStatus");

-- CreateIndex
CREATE INDEX "professional_candidates_competencyLevel_idx" ON "public"."professional_candidates"("competencyLevel");

-- CreateIndex
CREATE INDEX "professional_candidates_submittedAt_idx" ON "public"."professional_candidates"("submittedAt");

-- CreateIndex
CREATE INDEX "candidate_documents_candidateId_idx" ON "public"."candidate_documents"("candidateId");

-- CreateIndex
CREATE INDEX "candidate_documents_documentType_idx" ON "public"."candidate_documents"("documentType");

-- CreateIndex
CREATE INDEX "application_reviews_candidateId_idx" ON "public"."application_reviews"("candidateId");

-- CreateIndex
CREATE INDEX "application_reviews_reviewerId_idx" ON "public"."application_reviews"("reviewerId");

-- CreateIndex
CREATE INDEX "application_reviews_decision_idx" ON "public"."application_reviews"("decision");

-- AddForeignKey
ALTER TABLE "public"."customers" ADD CONSTRAINT "customers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."customer_sessions" ADD CONSTRAINT "customer_sessions_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."customer_notifications" ADD CONSTRAINT "customer_notifications_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."questionnaire_responses" ADD CONSTRAINT "questionnaire_responses_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "public"."cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."case_payments" ADD CONSTRAINT "case_payments_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "public"."cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."cases" ADD CONSTRAINT "cases_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."case_status_history" ADD CONSTRAINT "case_status_history_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "public"."cases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."uploaded_files" ADD CONSTRAINT "uploaded_files_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "public"."cases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."professional_sessions" ADD CONSTRAINT "professional_sessions_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "public"."medical_professionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."case_assignments" ADD CONSTRAINT "case_assignments_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "public"."cases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."case_assignments" ADD CONSTRAINT "case_assignments_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "public"."medical_professionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ai_analyses" ADD CONSTRAINT "ai_analyses_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "public"."cases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."medical_opinions" ADD CONSTRAINT "medical_opinions_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "public"."cases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."medical_opinions" ADD CONSTRAINT "medical_opinions_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "public"."medical_professionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."professional_payments" ADD CONSTRAINT "professional_payments_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "public"."cases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."professional_payments" ADD CONSTRAINT "professional_payments_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "public"."medical_professionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."candidate_documents" ADD CONSTRAINT "candidate_documents_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "public"."professional_candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."application_reviews" ADD CONSTRAINT "application_reviews_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "public"."professional_candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

