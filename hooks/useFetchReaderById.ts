import { Reader } from "@/types/reader.types";
import { api } from "@/utils/api";
import { useState, useEffect } from "react";

export function useFetchReaderById(readerId: string) {
  const [reader, setReader] = useState<Reader | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReader = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/reader/${readerId}`);
        const data: Reader = response.data;
        setReader(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (readerId) {
      fetchReader();
    }
  }, [readerId]);

  return { reader, loading, error };
}