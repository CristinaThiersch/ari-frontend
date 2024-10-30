import { useForm } from 'react-hook-form';
import { useGetAllMedication } from '../../api/medication/hooks';
import { ICreatePrescription, IUpdatePrescription } from '../../api/prescription/index';
import { useEffect } from 'react';

interface PrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPrescription: IUpdatePrescription | null;
  onCreate: (data: ICreatePrescription) => Promise<void>;
  onUpdate: (data: IUpdatePrescription) => Promise<void>;
}

export default function PrescriptionModal({ isOpen, onClose, selectedPrescription, onCreate, onUpdate }: PrescriptionModalProps) {
  const { register, handleSubmit, formState: { errors }, watch, reset, setValue } = useForm<ICreatePrescription>();
  const { data: medications, isLoading: isLoadingMedications } = useGetAllMedication();

  const startDate = watch("startDate");

  useEffect(() => {
    if (selectedPrescription) {
      setValue("medicationId", selectedPrescription.medicationId);
      setValue("observation", selectedPrescription.observation);
      setValue("frequency", selectedPrescription.frequency);
      setValue("startDate", selectedPrescription.startDate);
      setValue("endDate", selectedPrescription.endDate);
    } else {
      reset();
    }
  }, [isOpen, selectedPrescription, reset, setValue]);

  const onSubmit = async (data: ICreatePrescription) => {
    try {
      const userId = parseInt(localStorage.getItem("user") || '0');
      if (!userId) {
        console.error('ID do usuário não encontrado.');
        return;
      }
      
      const payload = {
        ...data,
        userId,
        frequency: parseInt(data.frequency as unknown as string),
        medicationId: parseInt(data.medicationId as unknown as string),
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
      };
  
      if (selectedPrescription) {
        await onUpdate({ ...payload, prescriptionId: selectedPrescription.prescriptionId });
      } else {
        await onCreate(payload);
      }
      
      onClose();
    } catch (error) {
      console.error('Erro ao salvar prescrição:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">{selectedPrescription ? 'Editar Prescrição' : 'Cadastrar Prescrição'}</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="medicationId" className="block text-sm font-medium text-gray-700">Medicação:</label>
            {isLoadingMedications ? (
              <p>Carregando medicamentos...</p>
            ) : medications?.length === 0 ? (
              <p className="text-red-500">Nenhum medicamento disponível.</p>
            ) : (
              <select id="medicationId" {...register("medicationId", { required: true })} className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                <option value="">Selecione uma medicação</option>
                {medications.map((medication) => (
                  <option key={medication.id} value={medication.id}>{medication.name}</option>
                ))}
              </select>
            )}
            {errors.medicationId && <span className="text-red-500">Medicação é obrigatória.</span>}
          </div>

          <div>
            <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">Frequência:</label>
            <input type="number" {...register("frequency", { required: true, min: 1 })} id="frequency" className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
            {errors.frequency && <span className="text-red-500">Frequência é obrigatória e deve ser um número positivo.</span>}
          </div>

          <div>
            <label htmlFor="observation" className="block text-sm font-medium text-gray-700">Observação:</label>
            <textarea {...register("observation")} id="observation" className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>

          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Data de Início:</label>
            <input type="date" {...register("startDate", { required: true })} id="startDate" className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
            {errors.startDate && <span className="text-red-500">Data de início é obrigatória.</span>}
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Data de Término:</label>
            <input
              type="date"
              {...register("endDate", {
                required: true,
                validate: (value) => new Date(value) >= new Date(startDate) || 'Data de término deve ser maior ou igual à data de início.'
              })}
              id="endDate"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
            {errors.endDate && <span className="text-red-500">{errors.endDate.message}</span>}
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            >
              {selectedPrescription ? 'Salvar Alterações' : 'Cadastrar Prescrição'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}