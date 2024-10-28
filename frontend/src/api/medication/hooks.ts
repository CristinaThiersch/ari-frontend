import { useQuery, useMutation } from '@tanstack/react-query';
import { MedicationApi, IGetMedicationById, ICreateMedication } from './index';

// Hook para buscar medicamento pelo ID
export function useGetMedicationById(payload: IGetMedicationById) {
  return useQuery({
    queryKey: ['medication', payload.medicationId],
    queryFn: () => MedicationApi.getMedicationById(payload),
  });
}

// Hook para cadastrar novo medicamento
export function useCreateMedication() {
  return useMutation({
    mutationFn: (payload: ICreateMedication) => MedicationApi.createMedication(payload),
  });
}

// Hook para buscar todos os medicamentos
export function useGetMedication() {
    return useQuery({
      queryKey: ['medications'],
      queryFn: MedicationApi.getMedications,
    });
  }
  
