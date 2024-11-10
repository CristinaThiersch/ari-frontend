import { z } from 'zod';

// Funções de validação personalizadas
const hasUpperCase = (str: string) => /[A-Z]/.test(str);
const hasLowerCase = (str: string) => /[a-z]/.test(str);
const hasNumber = (str: string) => /\d/.test(str);
const hasSpecialChar = (str: string) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(str);

// Schema de validação da senha
const passwordRule = z
    .string({
        required_error: 'O campo senha é obrigatório!',
    })
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres!' })
    .refine((password) => hasUpperCase(password), {
        message: 'A senha deve conter pelo menos uma letra maiúscula.',
    })
    .refine((password) => hasLowerCase(password), {
        message: 'A senha deve conter pelo menos uma letra minúscula.',
    })
    .refine((password) => hasNumber(password), {
        message: 'A senha deve conter pelo menos um número.',
    })
    .refine((password) => hasSpecialChar(password), {
        message: 'A senha deve conter pelo menos um caractere especial.',
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
