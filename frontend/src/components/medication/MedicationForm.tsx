import React, { useEffect, useState } from 'react';
import { useGetMedication } from '../../api/medication/hooks'; // Usando o hook adequado para buscar a lista
import Header from '../home/header/Header';
import MedicationForm from './MedicationForm'; // Certifique-se de que esse caminho está correto

export default function MedicationsPage() {
  const { data: medications, error, isLoading } = useGetMedication(); // Buscando medicações do usuário
  const [noMedications, setNoMedications] = useState(false);

  useEffect(() => {
    if (medications && medications.length === 0) {
      setNoMedications(true);
    }
  }, [medications]);

  if (isLoading) return <div>PAGE2...</div>;
  if (error) return <div>PAGE2</div>;

  return (
    <>
      <Header />
      <div>
        <h1>Medicações</h1>
        {noMedications ? (
          <p>Você ainda não possui medicamentos cadastrados!</p>
        ) : (
          medications.map((medication) => (
            <div key={medication.id} className="card">
              <h2>{medication.name}</h2>
              <p>Função: {medication.functionMed}</p>
              <p>Dosagem: {medication.dosage}</p>
            </div>
          ))
        )}
        <button onClick={() => <MedicationForm />}>PAGE2</button>
      </div>
    </>
  );
}
