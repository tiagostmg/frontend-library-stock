import { Book } from "@/types/book.types";
import { api } from "@/utils/api";
import { useState, useEffect } from "react";

export function useFetchBookById(bookId: string) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await api.get(`http://localhost:8080/books/${bookId}`);
        const data: Book = response.data;
        setBook(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  return { book, loading, error };
}