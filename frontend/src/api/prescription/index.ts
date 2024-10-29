import axios from '../api';

export interface IGetPrescriptionById {
  prescriptionId: number;
}

export interface ICreatePrescription {
  userId: number;
  medicationId: number;
  observation?: string;
  frequency: number;
  startDate: Date;
  endDate: Date;
}


export const PrescriptionApi = {
  async getPrescriptionById(payload: IGetPrescriptionById) {
    const { prescriptionId } = payload;
    const { data } = await axios.get(`/prescription/${prescriptionId}`);
    return data;
  },
  async createPrescription(payload: ICreatePrescription) {
    const { data } = await axios.post('/prescription', payload);
    return data;
  },
  async getPrescriptions() {
    const userId = localStorage.getItem("user");
    const { data } = await axios.get(`/prescriptions-user/${userId}`);
    return data;
  },
};
