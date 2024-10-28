import { useForm, type SubmitHandler } from 'react-hook-form';
import { PasswordRecoveryFormSchema } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import ErrorsMessage from '../commons/FormErrorsMessage';
import { passwordRecoverySchema } from './schema';

export default function PasswordRecovery() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordRecoveryFormSchema>({
    resolver: zodResolver(passwordRecoverySchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<PasswordRecoveryFormSchema> = (data) => {
    console.log(data);
  };

  return (
    <section className="bg-secondary">
      <div className="flex flex-col items-center justify-center px-6 py-6 gap-4 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center">
        <Link to="/login">
          <img
            className="w-[6rem] h-[6rem]"
            src="./img/logo-atual.png"
            alt="logo"
          />
          </Link>
          <span className="text-3xl font-bold text-tertiary">ARI</span>
        </div>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Recuperação de Senha
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Seu email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="nome@email.com"
                  {...register('email')}
                />
                {errors.email?.message && (
                  <ErrorsMessage
                    message={errors.email.message}
                    className="mt-1"
                  />
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-secondary"
              >
                Enviar link de recuperação
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
