import { useState, useEffect } from 'react';
import axios from 'axios';

// Defina uma interface para os dados esperados
interface Animal {
  title: string;
  description: string;
  animal: string;
  contact_phone: string;
  contact_email: string;
  images: string[];
  status_animal: string;
  announcement_type: string;
  type: string;
  breed: string;
  size_animal: string;
  weight: string;
  age: string;
}

export const useGetAnimals = () => {
  const [animals, setAnimals] = useState<Animal[] | null>(null); // Estado aceita array ou null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await axios.get<Animal[]>('http://localhost:8080/animal'); // Tipando a resposta esperada
        setAnimals(response.data);  // Aqui os dados serão do tipo correto
      } catch (err) {
        setError('Failed to load animals');  // Mantenha a mensagem de erro específica
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  return { animals, loading, error };
};
