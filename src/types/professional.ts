import { z } from 'zod';

export const ProLevel = z.enum(["JUNIOR", "SENIOR", "EXPERT", "DISTINGUISHED"]);
export type ProLevel = z.infer<typeof ProLevel>;

export const ProfessionalApplication = z.object({
  // Step 1: Identity & Contact
  firstName: z.string().min(1),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
  dob: z.string(),
  nationality: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  governmentId: z.object({
    name: z.string(),
    size: z.number(),
    type: z.string(),
    s3Key: z.string(),
  }),

  // Step 2: Education & Training
  medicalDegree: z.object({
    name: z.string(),
    size: z.number(),
    type: z.string(),
    s3Key: z.string(),
  }),
  residencyCertificate: z.object({
    name: z.string(),
    size: z.number(),
    type: z.string(),
    s3Key: z.string(),
  }),
  fellowshipCertificate: z.object({
    name: z.string(),
    size: z.number(),
    type: z.string(),
    s3Key: z.string(),
  }),
  boardCertification: z.object({
    number: z.string(),
    certificate: z.object({
      name: z.string(),
      size: z.number(),
      type: z.string(),
      s3Key: z.string(),
    }),
  }),
  additionalCertificates: z.array(z.object({
    name: z.string(),
    size: z.number(),
    type: z.string(),
    s3Key: z.string(),
  })).optional(),

  // Step 3: Licensing
  licenseNumber: z.string().min(1),
  licenseCountry: z.string().min(1),
  licenseExpiry: z.string(),
  licenseCertificate: z.object({
    name: z.string(),
    size: z.number(),
    type: z.string(),
    s3Key: z.string(),
  }),
  goodStandingCertificate: z.object({
    name: z.string(),
    size: z.number(),
    type: z.string(),
    s3Key: z.string(),
  }),

  // Step 4: Professional Experience
  yearsPractice: z.number().min(0),
  currentAffiliation: z.string().min(1),
  cv: z.object({
    name: z.string(),
    size: z.number(),
    type: z.string(),
    s3Key: z.string(),
  }),
  subspecialties: z.array(z.string()).min(1),
  annualPatientLoad: z.number().min(0),
  previousSecondOpinions: z.number().min(0).optional(),

  // Step 5: Research & Academic
  publications: z.number().min(0),
  representativePublications: z.array(z.object({
    name: z.string(),
    size: z.number(),
    type: z.string(),
    s3Key: z.string(),
  })).optional(),
  clinicalTrials: z.object({
    involved: z.boolean(),
    description: z.string().optional(),
  }),
  conferencePresentations: z.object({
    involved: z.boolean(),
    details: z.string().optional(),
  }),
  teachingRoles: z.object({
    involved: z.boolean(),
    details: z.string().optional(),
  }),

  // Step 6: Professional Recognition
  societyMemberships: z.array(z.string()),
  awards: z.string().optional(),
  leadershipRoles: z.string().optional(),

  // Step 7: Good Standing & Compliance
  references: z.array(z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    relationship: z.string(),
  })).min(2),
  malpracticeInsurance: z.object({
    name: z.string(),
    size: z.number(),
    type: z.string(),
    s3Key: z.string(),
  }).optional(),
  noDisciplinaryProceedings: z.boolean(),
  dataProtectionAgreement: z.boolean(),
});

export type ProfessionalApplication = z.infer<typeof ProfessionalApplication>;

export const CompetencyScore = z.object({
  yearsPractice: z.number().min(0).max(20),
  boardCertification: z.number().min(0).max(10),
  subspecialtyFocus: z.number().min(0).max(5),
  publications: z.number().min(0).max(15),
  clinicalTrials: z.number().min(0).max(10),
  conferenceTeaching: z.number().min(0).max(10),
  societyMembership: z.number().min(0).max(5),
  leadershipRoles: z.number().min(0).max(10),
  peerReviewGuidelines: z.number().min(0).max(15),
  totalScore: z.number().min(0).max(100),
  level: ProLevel,
});

export type CompetencyScore = z.infer<typeof CompetencyScore>;
