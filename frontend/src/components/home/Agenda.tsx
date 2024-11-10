import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useGetMedicationsByUser } from '../../api/medication/hooks';
import { useGetPrescriptions } from '../../api/prescription/hooks';
import HomeSection from '../commons/HomeSection';

interface Prescription {
  id: number;
  medicationId: number;
  observation: string;
  frequency: number;
  startDate: string;
  endDate: string;
}

export default function MedicationsHomePage() {
  const queryClient = useQueryClient();
  const { data: medications, isLoading: medicationsLoading, error: medicationsError } = useGetMedicationsByUser();
  const { data: prescriptions, isLoading: prescriptionsLoading, error: prescriptionsError } = useGetPrescriptions();
  const [checkedMeds, setCheckedMeds] = useState<Record<number, boolean[]>>({});
  const [expiredPrescriptions, setExpiredPrescriptions] = useState<Prescription[]>([]);
  const [showExpiredModal, setShowExpiredModal] = useState(false);

  useEffect(() => {
    if (prescriptions) {
      const today = new Date();
      const expired = prescriptions.filter(p => new Date(p.endDate) < today);
      setExpiredPrescriptions(expired);
      setShowExpiredModal(expired.length > 0);

      const savedCheckedState = localStorage.getItem('checkedMeds');
      if (savedCheckedState) {
        try {
          const parsedState = JSON.parse(savedCheckedState);
          setCheckedMeds(parsedState);
        } catch (error) {
          console.error('Error parsing saved checked state:', error);
          initializeCheckedMeds(prescriptions);
        }
      } else {
        initializeCheckedMeds(prescriptions);
      }
    }
  }, [prescriptions]);

  const initializeCheckedMeds = (prescriptions: Prescription[]) => {
    const initialCheckedState: Record<number, boolean[]> = {};
    prescriptions.forEach(p => {
      initialCheckedState[p.id] = Array(p.frequency).fill(false);
    });
    setCheckedMeds(initialCheckedState);
  };

  useEffect(() => {
    localStorage.setItem('checkedMeds', JSON.stringify(checkedMeds));
  }, [checkedMeds]);

  const handleCheck = (prescriptionId, index) => {
    setCheckedMeds(prev => {
      const newState = { ...prev };
      // Se não existe um array para essa prescrição, inicializa com base na frequência
      if (!newState[prescriptionId]) {
        const frequency = prescriptions?.find(p => p.id === prescriptionId)?.frequency || 0;
        newState[prescriptionId] = Array(frequency).fill(false);
      }
  
      // Cria uma nova cópia do array para evitar mutação direta
      const updatedChecks = [...newState[prescriptionId]];
      updatedChecks[index] = !updatedChecks[index];
      newState[prescriptionId] = updatedChecks;
  
      return newState;
    });
  };
  

  if (medicationsLoading || prescriptionsLoading) return <p>Carregando...</p>;
  if (medicationsError) return <p>Erro ao carregar medicações: {medicationsError.message}</p>;
  if (prescriptionsError) return <p>Erro ao carregar prescrições: {prescriptionsError.message}</p>;

  return (
    <HomeSection sectionClassName="bg-white mt-[5.75rem]" id="medicamento">
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Agenda de remédios</h1>
        <div className="bg-quaternary text-tertiary font-bold rounded-lg p-6 w-full mb-4">
          <p>Esses são todos os medicamentos que você está tomando no momento!</p>
        </div>

        {medications?.length === 0 ? (
          <p>Ainda não há medicamentos que você está tomando cadastrados no sistema! Cadastre sua prescrição agora!</p>
        ) : (
          medications.map((medication) => {
            const prescription = prescriptions?.find(p => p.medicationId === medication.id);
            if (!prescription) return null;

            const today = new Date();
            const startDate = new Date(prescription.startDate);
            const endDate = new Date(prescription.endDate);

            if (today >= startDate && today <= endDate) {
              return (
                <div key={medication.id} className="card bg-quaternary shadow-md rounded-lg p-4 mb-4">
                  <h2 className="text-xl font-semibold">Nome: {medication.name}</h2>
                  <p>Função: {medication.functionMed}</p>
                  <p>Dosagem: {medication.dosage}</p>
                  <p>Observação: {prescription.observation}</p>
                  <div className="mt-2 flex space-x-2">
                    {Array.from({ length: prescription.frequency }).map((_, index) => (
                      <label key={index} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={checkedMeds[prescription.id]?.[index] || false}
                          onChange={() => handleCheck(prescription.id, index)}
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2 text-sm">{index + 1}</span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          })
        )}
      </div>

      {showExpiredModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Prescrições Vencidas</h2>
            <p className="mb-4">As seguintes prescrições estão vencidas. Por favor, atualize ou remova-as.</p>
            {expiredPrescriptions.map(prescription => {
              const medication = medications?.find(m => m.id === prescription.medicationId);
              return (
                <div key={prescription.id} className="flex justify-between items-center mb-2">
                  <span>{medication ? medication.name : 'Medicamento não encontrado'}</span>
                  <span className="text-sm text-red-500">Vencida</span>
                </div>
              );
            })}
            <button
              onClick={() => setShowExpiredModal(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none w-full"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </HomeSection>
  );
}