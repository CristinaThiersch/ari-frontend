import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useGetAllHistories, useDeleteHistory } from '../../api/history/hooks';
import HomeSection from '../commons/HomeSection';

export default function HistoriesHomePage() {
  const queryClient = useQueryClient();
  const { data: histories, isLoading, error } = useGetAllHistories();
  const deleteHistory = useDeleteHistory();
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [selectedHistoryId, setSelectedHistoryId] = useState<number | null>(null);

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar o histórico: {error.message}</p>;

  const handleDelete = (historyId: number) => {
    setSelectedHistoryId(historyId);
    setIsConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedHistoryId !== null) {
      try {
        await deleteHistory.mutateAsync({ historyId: selectedHistoryId });
        queryClient.invalidateQueries(['history']);
        setIsConfirmDeleteOpen(false);
      } catch (error) {
        console.error('Erro ao deletar o histórico:', error);
      }
    }
  };

  return (
    <HomeSection sectionClassName="bg-white mt-[5.75rem]" id="historico">
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Histórico de Prescrições</h1>
        <div className="bg-gray-100 text-tertiary font-bold rounded-lg p-6 w-full mb-4">
          <p>Essas são todas as suas prescrições cadastradas no sistema! O histórico que você apagou não aparecerá mais aqui.</p>
        </div>

        {histories?.length === 0 ? (
          <p>Ainda não há histórico de prescrições no sistema.</p>
        ) : (
          histories.map((history) => (
            <div key={history.id} className="card bg-quaternary shadow-md rounded-lg p-4 mb-4">
              <h2 className="text-xl font-semibold">Prescrição: {history.prescriptionId}</h2>
              <p>Data: {new Date(history.currentDate).toLocaleDateString()}</p>
              <p>Status: {history.prescription.status ? 'Ativo' : 'Inativo'}</p>
              <h3 className="text-lg font-semibold mt-2">Detalhes da Medicação</h3>
              <p>Nome: {history.prescription.medication.name}</p>
              <p>Função: {history.prescription.medication.functionMed}</p>
              <p>Dosagem: {history.prescription.medication.dosage}</p>
              <p>Frequência: {history.prescription.frequency} vez(es) ao dia</p>
              <p>Início: {new Date(history.prescription.startDate).toLocaleDateString()}</p>
              <p>Fim: {new Date(history.prescription.endDate).toLocaleDateString()}</p>
              <p>Observação: {history.prescription.observation}</p>
              <button
                onClick={() => handleDelete(history.id)}
                className="mt-2 text-tertiary hover:text-tertiary font-bold"
              >
                Excluir
              </button>
            </div>
          ))
        )}

        {/* Modal de Confirmação de Exclusão */}
        {isConfirmDeleteOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4">Confirmação de Exclusão</h2>
              <p>Tem certeza que deseja excluir esse histórico de prescrição?</p>
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
                  className="px-4 py-2 bg-tertiary text-white rounded hover:bg-tertiary font-bold"
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
