import { Link } from 'react-router-dom';
import { useGetPrescriptions } from '../../api/prescription/hooks';
import HomeSection from '../commons/HomeSection';

export default function PrescriptionsHomePage() {
  const { data: prescriptions, isLoading, error } = useGetPrescriptions();

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar prescrições</p>;

  return (
    <HomeSection sectionClassName="bg-secondary mt-[5.75rem]" id="prescricao">
      <>
        <div>
          <h1>Prescrições</h1>
          {prescriptions?.length === 0 ? (
            <p>Você ainda não possui prescrições cadastradas!</p>
          ) : (
            prescriptions.map((prescription) => (
              <div key={prescription.id} className="card">
                <h2>Medicação: {prescription.medication.name}</h2>
                <p>Frequência: {prescription.frequency} vezes ao dia</p>
                <p>Observação: {prescription.observation || "Nenhuma"}</p>
                <p>Data de início: {new Date(prescription.startDate).toLocaleDateString()}</p>
                <p>Data de término: {new Date(prescription.endDate).toLocaleDateString()}</p>
              </div>
            ))
          )}
          <Link to="/prescricao/cadastrar" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Cadastrar Nova Prescrição
          </Link>
        </div>
      </>
    </HomeSection>
  );
}
