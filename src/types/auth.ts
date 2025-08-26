import { z } from 'zod';

export const PreferredChannel = z.enum(["EMAIL", "SMS"]);
export type PreferredChannel = z.infer<typeof PreferredChannel>;

export const RegisterPayload = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  tempId: z.string().optional(), // link temp submission
  firstName: z.string().min(1),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
  dob: z.string(),
  phone: z.string().optional(),
  preferredChannel: PreferredChannel.optional(),
});
export type RegisterPayload = z.infer<typeof RegisterPayload>;

export const LoginPayload = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type LoginPayload = z.infer<typeof LoginPayload>;

export const CustomerProfile = z.object({
  firstName: z.string().min(1),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
  dob: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  preferredChannel: PreferredChannel,
});
export type CustomerProfile = z.infer<typeof CustomerProfile>;

export const TempSubmissionPayload = z.object({
  medicalFiles: z.array(z.any()).min(1).max(10),
  contextInfo: z.any(),
  // optional early PII if provided before Identify step
});
export type TempSubmissionPayload = z.infer<typeof TempSubmissionPayload>;

// Professional Authentication Types
export const ProfessionalLoginPayload = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type ProfessionalLoginPayload = z.infer<typeof ProfessionalLoginPayload>;

export const TwoFactorPayload = z.object({
  code: z.string().length(6),
  sessionId: z.string(),
});
export type TwoFactorPayload = z.infer<typeof TwoFactorPayload>;

export const ProfessionalSession = z.object({
  id: z.string(),
  professionalId: z.string(),
  email: z.string(),
  proNumber: z.string(),
  level: z.enum(["JUNIOR", "SENIOR", "EXPERT", "DISTINGUISHED"]),
  twoFactorVerified: z.boolean(),
  expiresAt: z.date(),
});
export type ProfessionalSession = z.infer<typeof ProfessionalSession>;

export const TwoFactorMethod = z.enum(["EMAIL", "SMS"]);
export type TwoFactorMethod = z.infer<typeof TwoFactorMethod>;
