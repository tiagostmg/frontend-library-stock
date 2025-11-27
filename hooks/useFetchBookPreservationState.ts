"use client"

import { api } from "@/utils/api";
import { useState, useEffect } from "react";
import { BookInstance } from "@/types/book-instance.types";

export function useFetchBookPreservationState() {
  const [bookInstancesPreservationState, setBookInstancesPreservationState] = useState<BookInstance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookInstances = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/book-instances/dash/bad-preservation`);
        const data: BookInstance[] = response.data;
        setBookInstancesPreservationState(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookInstances();
  }, []);

  return { bookInstancesPreservationState, loading, error };
}