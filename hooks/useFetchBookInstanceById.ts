import { BookInstance } from "@/types/book.types";
import { api } from "@/utils/api";
import { useState, useEffect } from "react";

export function useFetchBookInstanceById(bookInstanceId: string) {
  const [bookInstance, setBookInstance] = useState<BookInstance>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookInstance = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/book-instances/${bookInstanceId}`);
        const data: BookInstance = response.data;
        setBookInstance(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (bookInstanceId) {
      fetchBookInstance();
    }
  }, [bookInstanceId]);

  return { bookInstance, loading, error };
}