import { useState } from 'react';
import { useGetMedication } from '../../api/medication/hooks';
import HomeSection from '../commons/HomeSection';
import MedicationModal from './MedicationModal';

export default function MedicationsHomePage() {
  const { data: medications, isLoading, error } = useGetMedication();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar medicações</p>;

  return (
    <HomeSection sectionClassName="bg-secondary mt-[5.75rem]" id="medicamento">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Medicações</h1>
        
        {medications?.length === 0 ? (
          <p>Você ainda não possui medicamentos cadastrados ou seus medicamentos cadastrados não têm uma prescrição!</p>
        ) : (
          medications.map((medication) => (
            <div key={medication.id} className="card mb-4">
              <h2>{medication.name}</h2>
              <p>Função: {medication.functionMed}</p>
              <p>Dosagem: {medication.dosage}</p>
            </div>
          ))
        )}

        <button
          onClick={openModal}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Cadastrar Nova Medicação
        </button>

        {/* Modal de Cadastro de Medicação */}
        <MedicationModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </HomeSection>
  );
}
