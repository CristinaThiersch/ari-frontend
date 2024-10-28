import { useQuery } from '@tanstack/react-query';
import { AnnouncementApi } from '.';

export function useGetAnnouncements() {
  return useQuery({
    queryKey: ['announcements'],
    queryFn: () => AnnouncementApi.getAnnouncements(),
    // Adicione a opção `select` para garantir que os dados estejam sempre em um array
    select: (data) => data || [], // Isso garante que `data` seja um array
  });
}
