import axios from '../api';

export const AnnouncementApi = {
  async getAnnouncements() {
    const { data } = await axios.get('/announcement'); 
    return data; 
  },
};
