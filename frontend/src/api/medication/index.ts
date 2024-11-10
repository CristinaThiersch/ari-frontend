import axios from '../api';

export interface IGetMedicationById {
  id: number;
}

export interface ICreateMedication {
  name: string;
  functionMed: string;
  dosage: string;
}

export const MedicationApi = {
  async getMedicationById(payload: IGetMedicationById) {
    const { id } = payload;
    const { data } = await axios.get(`/medication/${id}`);
    return data;
  },
  async createMedication(payload: ICreateMedication) {
    const { data } = await axios.post('/medication', payload);
    return data;
  },
  async getMedicationsByUser() {
    const userId = localStorage.getItem("user");
    const { data } = await axios.get(`/medications-user/${userId}`);
    return data;
  },
  async getAllMedications() {
    const { data } = await axios.get('/medications');
    return data;
  },
  async updateMedication(medicationId: number, payload: ICreateMedication) {
    const { data } = await axios.put(`/medication/${medicationId}`, payload);
    return data;
  },
  async deleteMedication(payload: IGetMedicationById) {
    const { id } = payload;
    const { data } = await axios.delete(`/medication/${id}`);
    return data;
  },
};
