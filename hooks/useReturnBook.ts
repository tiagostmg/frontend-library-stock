import { useState } from 'react';
import { api } from '@/utils/api';
import { toast } from 'sonner';

interface UseReturnBookProps {
  onSuccess?: () => void;
}

export function useReturnBook({ onSuccess }: UseReturnBookProps = {}) {
  const [loading, setLoading] = useState(false);

  const returnBook = async (instanceId: string) => {
    setLoading(true);
    try {
      await api.post(`/loan/return/${instanceId}`);
      toast.success('Livro devolvido com sucesso!');
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Erro ao devolver livro:', error);
      toast.error('Erro ao devolver livro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return { returnBook, loading };
}
