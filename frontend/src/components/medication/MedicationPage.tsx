import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useGetAllMedication, useDeleteMedication, useCreateMedication, useUpdateMedication } from '../../api/medication/hooks';
import HomeSection from '../commons/HomeSection';
import MedicationModal from './MedicationModal';

export default function MedicationsHomePage() {
  const queryClient = useQueryClient();
  const { data: medications, isLoading, error } = useGetAllMedication();
  const deleteMedication = useDeleteMedication();
  const createMedication = useCreateMedication();
  const updateMedication = useUpdateMedication();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [selectedMedicationId, setSelectedMedicationId] = useState<number | null>(null);
  const [medicationToEdit, setMedicationToEdit] = useState<ICreateMedication | null>(null);

  const openModal = (medication?: ICreateMedication, id?: number) => {
    setMedicationToEdit(medication || null);
    setSelectedMedicationId(id || null);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setMedicationToEdit(null);
    setSelectedMedicationId(null);
  };

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar medicações: {error.message}</p>;

  const handleDelete = (medicationId: number) => {
    setSelectedMedicationId(medicationId);
    setIsConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedMedicationId !== null) {
      try {
        await deleteMedication.mutateAsync({ id: selectedMedicationId });
        queryClient.invalidateQueries(['medications']);
        setIsConfirmDeleteOpen(false);
      } catch (error) {
        console.error('Erro ao deletar medicação:', error);
      }
    }
  };

  const handleCreate = async (data: ICreateMedication) => {
    try {
      await createMedication.mutateAsync(data);
      queryClient.invalidateQueries(['medications']);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao criar medicação:', error);
    }
  };

  const handleUpdate = async (id: number, data: ICreateMedication) => {
    try {
      await updateMedication.mutateAsync({ medicationId: id, data });
      queryClient.invalidateQueries(['medications']);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao atualizar medicação:', error);
    }
  };

  return (
    <HomeSection sectionClassName="bg-white mt-[5.75rem]" id="medicamento">
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Medicações</h1>
        <div className="bg-gray-100 text-tertiary font-bold rounded-lg p-6 w-full mb-4">
          <p>Esses são todos os medicamentos já cadastrados no sistema!</p>
          <p>Caso o medicamento que você vai tomar não esteja cadastrado, cadastre-o antes de registrar sua prescrição!</p>
        </div>

        {medications?.length === 0 ? (
          <p>Ainda não há medicamentos cadastrados no sistema! Ajude cadastrando os medicamentos que você toma.</p>
        ) : (
          medications.map((medication) => (
            <div key={medication.id} className="card bg-quaternary shadow-md rounded-lg p-4 mb-4">
              <h2 className="text-xl font-semibold">Nome: {medication.name}</h2>
              <p>Função: {medication.functionMed}</p>
              <p>Dosagem: {medication.dosage}</p>
              <button
                onClick={() => openModal(medication, medication.id)}
                className="text-blue-500 hover:text-blue-700 mr-2 hover:font-bold"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(medication.id)}
                className="text-tertiary hover:text-tertiary hover:font-bold"
              >
                Excluir
              </button>
            </div>
          ))
        )}

        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Cadastrar Nova Medicação
        </button>

        {/* Modal de Cadastro ou Atualização de Medicação */}
        <MedicationModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          onCreate={handleCreate} 
          onUpdate={handleUpdate} 
          medication={medicationToEdit}
          id={selectedMedicationId}
        />

        {/* Modal de Confirmação de Exclusão */}
        {isConfirmDeleteOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4">Confirmação de Exclusão</h2>
              <p>Tem certeza que deseja excluir essa medicação?</p>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsConfirmDeleteOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-tertiary text-white rounded hover:bg-tertiary hover: font-bold"
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
