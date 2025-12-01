import { useState } from 'react';
import { api } from '@/utils/api';
import { toast } from 'sonner';

interface UseBorrowBookProps {
  onSuccess?: () => void;
}

export function useBorrowBook({ onSuccess }: UseBorrowBookProps = {}) {
  const [loading, setLoading] = useState(false);

  const borrowBook = async (instanceId: string, userCpf: string, readerId: number) => {
    setLoading(true);
    try {
      await api.post(`/loan/borrow?bookInstanceId=${instanceId}&userCpf=${userCpf}&readerId=${readerId}`);
      toast.success('Livro emprestado com sucesso!');
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Erro ao emprestar livro:', error);
      toast.error('Erro ao emprestar livro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return { borrowBook, loading };
}
