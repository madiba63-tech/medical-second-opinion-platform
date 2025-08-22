export interface PersonalInfo {
  firstName: string;
  middleName?: string;
  lastName: string;
  dob: string;
  email: string;
  phone?: string;
}

export interface MedicalFile {
  name: string;
  size: number;
  type: string;
  category: "Doctor's Letter" | "Image" | "Lab Report" | "Other Document";
  s3Key: string;
  file?: File; // For preview purposes
}

export interface MedicalContext {
  ethnicity?: string;
  gender?: string;
  diseaseType?: string;
  isFirstOccurrence?: boolean;
  geneticFamilyHistory?: string[];
}

export interface FormData {
  personalInfo: PersonalInfo;
  medicalFiles: MedicalFile[];
  contextInfo: MedicalContext;
  paymentId?: string;
  consentAccepted: boolean;
}

export const ETHNICITIES = [
  "Prefer not to say",
  "White/Caucasian",
  "Black/African American", 
  "Hispanic/Latino",
  "Asian",
  "Native American",
  "Pacific Islander",
  "Mixed/Multiple",
  "Other"
];

export const GENDERS = [
  "Male",
  "Female", 
  "Non-binary",
  "Prefer not to say"
];

export const DISEASE_TYPES = [
  "Breast Cancer",
  "Lung Cancer",
  "Prostate Cancer",
  "Colorectal Cancer",
  "Melanoma",
  "Lymphoma", 
  "Leukemia",
  "Brain Cancer",
  "Ovarian Cancer",
  "Pancreatic Cancer",
  "Other"
];

export const FAMILY_HISTORY_OPTIONS = [
  "Parents",
  "Siblings", 
  "Blood relatives"
];

export const FILE_CATEGORIES = [
  "Doctor's Letter",
  "Image", 
  "Lab Report",
  "Other Document"
] as const;

export interface StepFormProps {
  formData: FormData;
  updateFormData: (stepData: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  setCaseId: (caseId: string) => void;
  goToStep?: (step: number) => void;
}

