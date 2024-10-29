import { useQuery, useMutation } from '@tanstack/react-query';
import { PrescriptionApi, IGetPrescriptionById, ICreatePrescription } from './index';

// Hook para buscar prescrição pelo ID
export function useGetPrescriptionById(payload: IGetPrescriptionById) {
  return useQuery({
    queryKey: ['prescription', payload.prescriptionId],
    queryFn: () => PrescriptionApi.getPrescriptionById(payload),
  });
}

// Hook para criar nova prescrição
export function useCreatePrescription() {
  return useMutation<ICreatePrescription, Error, ICreatePrescription>({
    mutationFn: (payload: ICreatePrescription) => PrescriptionApi.createPrescription(payload),
  });
}

// Hook para buscar todas as prescrições do usuário
export function useGetPrescriptions() {
  return useQuery({
    queryKey: ['prescriptions'],
    queryFn: PrescriptionApi.getPrescriptions,
  });
}
