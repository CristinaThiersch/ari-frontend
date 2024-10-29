import { Link } from 'react-router-dom';
import { useGetMedication } from '../../api/medication/hooks';
import HomeSection from '../commons/HomeSection';

export default function MedicationsHomePage() {
  const { data: medications, isLoading, error } = useGetMedication();

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar medicações</p>;

  return (
    <HomeSection sectionClassName="bg-secondary mt-[5.75rem]" id="medicamento">
    <>
      <div>
        <h1>Medicações</h1>
        {medications?.length === 0 ? (
          <p>Você ainda não possui medicamentos cadastrados ou seus medicamentos cadastrados não tem uma prescrição!</p>
        ) : (
          medications.map((medication) => (
            <div key={medication.id} className="card">
              <h2>{medication.name}</h2>
              <p>Função: {medication.functionMed}</p>
              <p>Dosagem: {medication.dosage}</p>
            </div>
          ))
        )}
        <Link to="/medicamento/cadastrar" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Cadastrar Novo Medicamento
          </Link>
      </div>
    </>
    </HomeSection>
  );
}
