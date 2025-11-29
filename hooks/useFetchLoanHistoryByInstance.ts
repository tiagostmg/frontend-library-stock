import { useEffect, useState } from "react";
import { Loan } from "@/types/loan.types";

export const useFetchLoanHistoryByInstance = (instanceId: string) => {

  const [loanHistory, setLoanHistory] = useState<Loan[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLoanHistoryByInstance = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/loan-history/${instanceId}`);
        const data = await response.json();
        setLoanHistory(data);
        setError(null);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book instance history:', error);
        setError('Error fetching book instance history');
        setLoading(false);
      }
    };
    fetchLoanHistoryByInstance();
  }, [instanceId]);

  return { error, loading, bookInstanceHistory: loanHistory };
}