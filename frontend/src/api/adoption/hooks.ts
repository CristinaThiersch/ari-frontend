import { useMutation } from '@tanstack/react-query';
import { AdoptionApi } from '.';
import { CreateAdoptionAnnouncementPayload } from './types';

export const useCreateAdoptionAnnouncement = () => {
  return useMutation({
    mutationFn: (payload: CreateAdoptionAnnouncementPayload) => AdoptionApi.createAdoption(payload),
  });
};
