import { api } from "@/utils/api";
import { useState } from "react";
import { toast } from "sonner";

export function useDeleteBookInstance() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteBookInstance = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await api.delete(`/book-instances/${id}`);
    } catch (e: any) {
      toast.error("Erro ao desabilitar exemplar.");
      setError(e.message || "Erro ao desabilitar exemplar.");
      throw e;
    } finally {
      toast.success("Exemplar desabilitado com sucesso!");
      setLoading(false);
    }
  };

  return { deleteBookInstance, loading, error };
}
