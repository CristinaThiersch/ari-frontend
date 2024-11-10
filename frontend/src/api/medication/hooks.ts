import { useQuery, useMutation } from '@tanstack/react-query';
import { MedicationApi, IGetMedicationById, ICreateMedication } from './index';

// Hook para buscar medicamento pelo ID
export function useGetMedicationById(payload: IGetMedicationById) {
  return useQuery({
    queryKey: ['medication', payload.id],
    queryFn: () => MedicationApi.getMedicationById(payload),
  });
}

// Hook para cadastrar novo medicamento
export function useCreateMedication() {
  return useMutation<ICreateMedication, Error, ICreateMedication>({
    mutationFn: (payload: ICreateMedication) => MedicationApi.createMedication(payload),
  });
}

// Hook para buscar todos os medicamentos por usuário
export function useGetMedicationsByUser() {
    return useQuery({
      queryKey: ['medications'],
      queryFn: MedicationApi.getMedicationsByUser,
    });
  }

  // Hook para buscar todos os medicamentos
export function useGetAllMedication() {
  return useQuery({
    queryKey: ['medications'],
    queryFn: MedicationApi.getAllMedications,
  });
}

// Hook para deletar um medicamento
export function useDeleteMedication() {
  return useMutation<IGetMedicationById, Error, IGetMedicationById>({
    mutationFn: (payload: IGetMedicationById) => MedicationApi.deleteMedication(payload),
  });
}
  
export function useUpdateMedication() {
  return useMutation<void, Error, { medicationId: number; data: ICreateMedication }>({
    mutationFn: ({ medicationId, data }) => MedicationApi.updateMedication(medicationId, data),
  });
}
