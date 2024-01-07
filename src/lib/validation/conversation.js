import { z } from 'zod';

export const conversationSchema = z.object({
  subject: z.string().max(255, { message: 'Subject Too Long' }),
  model: z
    .string()
    .min(1, { message: 'Model is Required' })
    .max(255, { message: 'Invalid Model' }),
});
