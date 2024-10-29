import { useForm } from 'react-hook-form';
import { useCreatePrescription } from '../../api/prescription/hooks';
import { useGetAllMedication } from '../../api/medication/hooks';
import { ICreatePrescription } from '../../api/prescription/index';
import { useNavigate } from 'react-router-dom';
import HomeSection from '../commons/HomeSection';

export default function PrescriptionFormPage() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ICreatePrescription>();
  const createPrescription = useCreatePrescription();
  const navigate = useNavigate();
  const { data: medications, isLoading: isLoadingMedications } = useGetAllMedication();

  // Observa o campo startDate para validar endDate
  const startDate = watch("startDate");

  const onSubmit = async (data: ICreatePrescription) => {
    try {
      // Adiciona o ID do usuário capturado do localStorage
      const userId = parseInt(localStorage.getItem("user") || '0');
      if (!userId) {
        console.error('ID do usuário não encontrado.');
        return;
      }
      
      // Atualiza os dados com o ID do usuário
      await createPrescription.mutateAsync({ ...data, userId });
      navigate('/prescricoes'); // Redireciona após o sucesso
    } catch (error) {
      console.error('Erro ao criar prescrição:', error);
    }
  };

  return (
    <HomeSection sectionClassName="bg-secondary mt-[5.75rem]" id="prescricao">
      <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Cadastrar Prescrição</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="medicationId" className="block text-sm font-medium text-gray-700">Medicação:</label>
            {isLoadingMedications ? (
              <p>Carregando medicamentos...</p>
            ) : medications?.length === 0 ? (
              <p>Você ainda não possui medicamentos cadastrados. Cadastre um medicamento primeiro.</p>
            ) : (
              <select
                id="medicationId"
                {...register('medicationId', { required: 'Medicação é obrigatória' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Selecione uma medicação</option>
                {medications.map((medication) => (
                  <option key={medication.id} value={medication.id}>{medication.name}</option>
                ))}
              </select>
            )}
            {errors.medicationId && <span className="text-red-500 text-sm">{errors.medicationId.message}</span>}
          </div>

          <div>
            <label htmlFor="observation" className="block text-sm font-medium text-gray-700">Observação:</label>
            <input
              id="observation"
              {...register('observation')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">Frequência:</label>
            <input
              id="frequency"
              type="number"
              {...register('frequency', { required: 'Frequência é obrigatória' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.frequency && <span className="text-red-500 text-sm">{errors.frequency.message}</span>}
          </div>

          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Data de Início:</label>
            <input
              id="startDate"
              type="date"
              {...register('startDate', { required: 'Data de início é obrigatória' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.startDate && <span className="text-red-500 text-sm">{errors.startDate.message}</span>}
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Data de Término:</label>
            <input
              id="endDate"
              type="date"
              {...register('endDate', {
                required: 'Data de término é obrigatória',
                validate: (value) => !startDate || new Date(value) >= new Date(startDate) || 'Data de término deve ser posterior à data de início'
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.endDate && <span className="text-red-500 text-sm">{errors.endDate.message}</span>}
          </div>

          <button
            type="submit"
            disabled={createPrescription.isPending}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            {createPrescription.isPending ? 'Cadastrando...' : 'Cadastrar'}
          </button>

          {createPrescription.isError && (
            <span className="block text-red-500 mt-2">Erro ao cadastrar prescrição. Tente novamente.</span>
          )}
        </form>
      </div>
      </>
    </HomeSection>
  );
}
