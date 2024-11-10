import { useQuery, useMutation } from '@tanstack/react-query';
import { HistoryApi, IGetHistoryById} from './index';

  // Hook para buscar todo o histórico
export function useGetAllHistories() {
  return useQuery({
    queryKey: ['history'],
    queryFn: HistoryApi.getAllHistories,
  });
}

// Hook para deletar um historico
export function useDeleteHistory() {
  return useMutation<IGetHistoryById, Error, IGetHistoryById>({
    mutationFn: (payload: IGetHistoryById) => HistoryApi.deleteHistory(payload),
  });
}
  
