import { useForm } from 'react-hook-form';
import { useCreateMedication } from '../../api/medication/hooks';
import { ICreateMedication } from '../../api/medication';
import { useEffect } from 'react';

interface MedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MedicationModal({ isOpen, onClose }: MedicationModalProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ICreateMedication>();
  const createMedication = useCreateMedication();

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  const onSubmit = async (data: ICreateMedication) => {
    try {
      await createMedication.mutateAsync(data);
      onClose(); // Fecha o modal após o sucesso
    } catch (error) {
      console.error('Erro ao criar medicamento:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Cadastrar Medicação</h2>
        
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

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={createMedication.isPending}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
            >
              {createMedication.isPending ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </div>

          {createMedication.isError && (
            <span className="block text-red-500 mt-2">Erro ao cadastrar medicamento. Tente novamente.</span>
          )}
        </form>
      </div>
    </div>
  );
}
