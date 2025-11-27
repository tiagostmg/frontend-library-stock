"use client"

import { api } from "@/utils/api";
import { useState, useEffect } from "react";
import { OverdueLoan } from "@/types/loan.types";

export function useFetchOverdueLoan() {
  const [overdueLoans, setOverdueLoans] = useState<OverdueLoan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookInstances = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/loan/dash/overdue-loan`);
        const data: OverdueLoan[] = response.data;
        setOverdueLoans(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookInstances();
  }, []);

  return { overdueLoans, loading, error };
}