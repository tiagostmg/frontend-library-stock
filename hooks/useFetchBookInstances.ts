import { BookInstance } from "@/types/book.types";
import { api } from "@/utils/api";
import { useState, useEffect } from "react";

export function useFetchBookInstances(bookId: string) {
  const [bookInstances, setBookInstances] = useState<BookInstance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookInstances = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/book-instances/book/${bookId}`);
        const data: BookInstance[] = response.data;
        setBookInstances(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (bookId) {
      fetchBookInstances();
    }
  }, [bookId]);

  return { bookInstances, loading, error };
}