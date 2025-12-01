import { useEffect, useState } from "react";
import { Loan } from "@/types/loan.types";
import { api } from "@/utils/api";

export const useFetchLoanHistoryByInstance = (instanceId: string) => {

  const [loanHistory, setLoanHistory] = useState<Loan[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLoanHistoryByInstance = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/loan/book-instance/${instanceId}`); // TODO: Implementar endpoint
      const data: Loan[] = await response.data;
      setLoanHistory(data);
      setError(null);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching book instance history:', error);
      setError('Error fetching book instance history');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoanHistoryByInstance();
  }, [instanceId]);

  return { loanHistory, error, loading, refetch: fetchLoanHistoryByInstance };
}