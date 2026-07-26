import { z } from 'zod';

export const analyzeScriptSchema = z.object({
  script: z
    .string()
    .min(20, { message: 'Script content must be at least 20 characters long.' })
    .max(50000, { message: 'Script exceeds maximum allowed length of 50,000 characters.' }),
  category: z.string().default('Educational / How-To'),
  targetDurationSeconds: z.number().optional(),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
});

export const adminUpdateSubscriptionSchema = z.object({
  userId: z.string().min(1, { message: 'User ID is required.' }),
  newPlan: z.enum(['FREE', 'PRO']),
});