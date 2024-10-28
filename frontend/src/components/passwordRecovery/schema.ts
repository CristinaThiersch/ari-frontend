import { z } from 'zod';

export const passwordRecoverySchema = z.object({
  email: z.string().email({ message: 'O campo e-mail é obrigatório!' }),
});
