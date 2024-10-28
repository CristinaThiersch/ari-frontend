import { z } from 'zod';

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const passwordRule = z
  .string({
    required_error: 'O campo senha é obrigatório!',
  })
  .min(8, { message: 'A senha deve ter no mínimo 8 caracteres!' })
  .regex(passwordValidation, {
    message: 'Senha inválida!',
  });

  export const registerSchema = z
  .object({
    name: z
      .string({
        required_error: 'O campo nome é obrigatório!',
      })
      .min(5, { message: 'O nome deve ter no mínimo 5 caracteres!' }),
    email: z.string().email({ message: 'O campo e-mail é obrigatório!' }),
    password: passwordRule,
    confirmPassword: passwordRule,
    birthDate: z
      .string({
        required_error: 'O campo data de nascimento é obrigatório!',
      })
      .refine(
        (date) => new Date(date) <= new Date(),
        'A data de nascimento não pode ser maior que hoje'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senha não conferem!',
    path: ['confirmPassword'],
  });
