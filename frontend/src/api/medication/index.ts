import axios from '../api';

export interface IGetMedicationById {
  medicationId: number;
}

export interface ICreateMedication {
  name: string;
  functionMed: string;
  dosage: string;
}

export const MedicationApi = {
  async getMedicationById(payload: IGetMedicationById) {
    const { medicationId } = payload;
    const { data } = await axios.get(`/medication/${medicationId}`);
    return data;
  },
  async createMedication(payload: ICreateMedication) {
    const { data } = await axios.post('/medication', payload);
    return data;
  },
  async getMedications() {
    const { data } = await axios.get('/medications');
    return data;
  },
  async getAllMedications() {
    const { data } = await axios.get('/medications');
    return data;
  },
  async deleteMedication(payload: IGetMedicationById) {
    const { medicationId } = payload;
    const { data } = await axios.delete(`/medication/${medicationId}`);
    return data;
  },
};
