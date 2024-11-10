import { useForm } from 'react-hook-form';
import { ICreateMedication } from '../../api/medication';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios'; // Importando AxiosError

interface MedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: ICreateMedication) => Promise<void>;
  medication?: ICreateMedication; // Adicionando a medicação para edição
  onUpdate?: (id: number, data: ICreateMedication) => Promise<void>; // Função de update
  id?: number; // ID da medicação para atualização
}

export default function MedicationModal({
  isOpen, 
  onClose, 
  onCreate, 
  onUpdate, 
  medication, 
  id
}: MedicationModalProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ICreateMedication>({
    defaultValues: medication || { name: '', functionMed: '', dosage: '' }, // Caso medication esteja vazio, use valores padrão vazios
  });

  // Estado para controle do erro específico (medicamento já cadastrado)
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && medication) {
      reset(medication); // Atualiza o formulário quando a medicação mudar
    }
  }, [isOpen, medication, reset]);

  const onSubmit = async (data: ICreateMedication) => {
    try {
      if (id && onUpdate) {
        await onUpdate(id, data); // Atualiza a medicação
      } else {
        await onCreate(data); // Cria nova medicação
      }
      setErrorMessage(null); // Limpa qualquer mensagem de erro anterior
    } catch (error) {
      console.error('Erro ao criar medicação:', error);

      // Garantir que error é do tipo AxiosError para acessar response
      const axiosError = error as AxiosError;

      // Verificando se o erro é do tipo AxiosError e se a mensagem é sobre "Medicamento já existe"
      if (axiosError?.response?.data?.error === 'Medicamento já existe.') {
        setErrorMessage('Medicamento já cadastrado!'); // Exibe a mensagem de erro específica
      } else {
        setErrorMessage('Erro ao salvar medicamento. Tente novamente.'); // Mensagem genérica
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">{id ? 'Atualizar Medicação' : 'Cadastrar Medicação'}</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome:</label>
            <input
              id="name"
              {...register('name', { required: 'Nome é obrigatório' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.name && <span className="text-tertiary text-sm">{errors.name.message}</span>}
          </div>

          <div>
            <label htmlFor="functionMed" className="block text-sm font-medium text-gray-700">Função:</label>
            <input
              id="functionMed"
              {...register('functionMed', { required: 'Função é obrigatória' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.functionMed && <span className="text-tertiary text-sm">{errors.functionMed.message}</span>}
          </div>

          <div>
            <label htmlFor="dosage" className="block text-sm font-medium text-gray-700">Dosagem:</label>
            <input
              id="dosage"
              {...register('dosage', { required: 'Dosagem é obrigatória' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.dosage && <span className="text-tertiary text-sm">{errors.dosage.message}</span>}
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
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {id ? 'Atualizar' : 'Cadastrar'}
            </button>
          </div>

          {/* Exibe a mensagem de erro, caso exista */}
          {errorMessage && (
            <div className="mt-4 text-red-500">
              <p>{errorMessage}</p>
            </div>
          )}

          {errors.name || errors.functionMed || errors.dosage ? (
            <span className="block text-tertiary mt-2">
              {errors.name?.message} {errors.functionMed?.message} {errors.dosage?.message}
            </span>
          ) : null}
        </form>
      </div>
    </div>
  );
}
