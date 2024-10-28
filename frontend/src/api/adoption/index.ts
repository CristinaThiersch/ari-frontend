import axios from '../api';
import { CreateAdoptionAnnouncementPayload } from './types';

export const AdoptionApi = {
  async createAdoption(payload: CreateAdoptionAnnouncementPayload) {
    const { data } = await axios.post('/announcement/new-adoption-announcement', payload);
    return data;
  },

  async fetchAdoptions() {
    const { data } = await axios.get('/adoptions');
    return data;
  },
};
