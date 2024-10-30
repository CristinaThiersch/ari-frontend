import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useGetPrescriptions, useDeletePrescription, useCreatePrescription, useUpdatePrescription } from '../../api/prescription/hooks';
import { useGetAllMedication } from '../../api/medication/hooks';
import HomeSection from '../commons/HomeSection';
import PrescriptionModal from './PrescriptionModal';
import { IUpdatePrescription } from '../../api/prescription/index';

export default function PrescriptionsHomePage() {
  const queryClient = useQueryClient();
  const { data: prescriptions, isLoading: loadingPrescriptions, error: errorPrescriptions } = useGetPrescriptions();
  const { data: medications, isLoading: loadingMedications, error: errorMedications } = useGetAllMedication();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<IUpdatePrescription | null>(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  
  const deletePrescription = useDeletePrescription();
  const createPrescription = useCreatePrescription();
  const updatePrescription = useUpdatePrescription();

  if (loadingPrescriptions || loadingMedications) return <p>Carregando...</p>;
  if (errorPrescriptions) return <p>Erro ao carregar prescrições: {errorPrescriptions.message}</p>;
  if (errorMedications) return <p>Erro ao carregar medicamentos: {errorMedications.message}</p>;

  const medicationMap = medications?.reduce((acc, medication) => {
    acc[medication.id] = medication.name;
    return acc;
  }, {} as Record<number, string>);

  const handleDelete = (prescriptionId: number) => {
    setSelectedPrescription({ prescriptionId } as IUpdatePrescription);
    setIsConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedPrescription) {
      try {
        console.log('Deleting prescription with ID:', selectedPrescription.prescriptionId);
        const result = await deletePrescription.mutateAsync({ prescriptionId: selectedPrescription.prescriptionId });
        console.log('Delete result:', result);
        queryClient.invalidateQueries(['prescriptions']);
        setIsConfirmDeleteOpen(false);
      } catch (error) {
        console.error('Erro ao deletar prescrição:', error);
        if (axios.isAxiosError(error)) {
          console.error('Response data:', error.response?.data);
        }
      }
    }
  };

  const handleEdit = (prescription: IUpdatePrescription) => {
    const formattedPrescription = {
      ...prescription,
      startDate: new Date(prescription.startDate).toISOString().split('T')[0],
      endDate: new Date(prescription.endDate).toISOString().split('T')[0],
    };
    setSelectedPrescription(formattedPrescription);
    setIsModalOpen(true);
  };

  const handleCreate = async (data: IUpdatePrescription) => {
    try {
      await createPrescription.mutateAsync(data);
      queryClient.invalidateQueries(['prescriptions']);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao criar prescrição:', error);
    }
  };

  const handleUpdate = async (data: IUpdatePrescription) => {
    try {
      console.log(data)
      await updatePrescription.mutateAsync(data);
      queryClient.invalidateQueries(['prescriptions']);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao atualizar prescrição:', error);
    }
  };

  return (
    <HomeSection sectionClassName="bg-secondary mt-[5.75rem]" id="prescricao">
      <div>
        <h1 className="text-2xl font-bold mb-4">Prescrições</h1>
        {!prescriptions || prescriptions.length === 0 ? (
          <p>Você ainda não possui prescrições cadastradas!</p>
        ) : (
          prescriptions.map((prescription) => (
            <div key={prescription.id} className="card bg-white shadow-md rounded-lg p-4 mb-4">
              <h2 className="text-xl font-semibold">Medicação: {medicationMap[prescription.medicationId] || 'Nome não disponível'}</h2>
              <p>Frequência: {prescription.frequency} vezes ao dia</p>
              <p>Observação: {prescription.observation || "Nenhuma"}</p>
              <p>Data de início: {new Date(prescription.startDate).toLocaleDateString()}</p>
              <p>Data de término: {new Date(prescription.endDate).toLocaleDateString()}</p>
              <div className="mt-2">
                <button onClick={() => handleEdit(prescription as IUpdatePrescription)} className="text-blue-500 hover:text-blue-700 mr-2">
                  Editar
                </button>
                <button onClick={() => handleDelete(prescription.id)} className="text-red-500 hover:text-red-700">
                  Excluir
                </button>
              </div>
            </div>
          ))
        )}
        <button
          onClick={() => {
            setSelectedPrescription(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Cadastrar Nova Prescrição
        </button>
        
        {isModalOpen && (
          <PrescriptionModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            selectedPrescription={selectedPrescription}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
          />
        )}

        {isConfirmDeleteOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4">Confirmação de Exclusão</h2>
              <p>Tem certeza que deseja excluir essa prescrição?</p>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsConfirmDeleteOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </HomeSection>
  );
}