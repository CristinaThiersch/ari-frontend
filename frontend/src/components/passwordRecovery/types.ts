import type { z } from 'zod';
import { passwordRecoverySchema } from './schema';

export type PasswordRecoveryFormSchema = z.infer<typeof passwordRecoverySchema>;
