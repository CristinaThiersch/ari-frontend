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

// Para atualizar uma prescrição
export interface IUpdatePrescription extends ICreatePrescription {
  prescriptionId: number; // Incluindo o ID da prescrição a ser atualizada
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
  async putPrescription(payload: IUpdatePrescription) {
    console.log(payload)
    const { prescriptionId, ...updateData } = payload; // Separar prescriptionId dos outros dados
    const { data } = await axios.put(`/prescription/${prescriptionId}`, updateData); // Enviar apenas os dados a serem atualizados
    console.log(data)
    return data;
  },
  async deletePrescription(payload: IGetPrescriptionById) {
    const { prescriptionId } = payload;
    const { data } = await axios.delete(`/prescription/${prescriptionId}`);
    return data;
  },
};
