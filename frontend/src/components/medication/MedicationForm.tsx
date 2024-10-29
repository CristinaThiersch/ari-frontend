import { useForm } from 'react-hook-form'
import { useCreateMedication } from '../../api/medication/hooks' // Adjust the import path as needed
import { ICreateMedication } from '../../api/medication/index' // Adjust the import path as needed
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import HomeSection from '../commons/HomeSection';

export default function MedicationsFormPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<ICreateMedication>();
  const createMedication = useCreateMedication();
  const navigate = useNavigate(); // Inicia useNavigate

  const onSubmit = async (data: ICreateMedication) => {
    try {
      await createMedication.mutateAsync(data); // Espera a mutação ser bem-sucedida
      navigate('/medicamento'); // Redireciona após o sucesso
    } catch (error) {
      console.error('Erro ao criar medicamento:', error);
      // Aqui você pode mostrar uma mensagem de erro ao usuário
    }
  };

  return (
    <HomeSection sectionClassName="bg-secondary mt-[5.75rem]" id="medicamento">
    <>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Medicação</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome:</label>
          <input
            id="name"
            {...register('name', { required: 'Nome é obrigatório' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>

        <div>
          <label htmlFor="functionMed" className="block text-sm font-medium text-gray-700">Função:</label>
          <input
            id="functionMed"
            {...register('functionMed', { required: 'Função é obrigatória' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.functionMed && <span className="text-red-500 text-sm">{errors.functionMed.message}</span>}
        </div>

        <div>
          <label htmlFor="dosage" className="block text-sm font-medium text-gray-700">Dosagem:</label>
          <input
            id="dosage"
            {...register('dosage', { required: 'Dosagem é obrigatória' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.dosage && <span className="text-red-500 text-sm">{errors.dosage.message}</span>}
        </div>

        <button 
          type="submit" 
          disabled={createMedication.isPending}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
        >
          {createMedication.isPending ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        {createMedication.isError && (
          <span className="block text-red-500 mt-2">Erro ao cadastrar medicamento. Tente novamente.</span>
        )}
      </form>
    </div>
    </>
    </HomeSection>
  )
}