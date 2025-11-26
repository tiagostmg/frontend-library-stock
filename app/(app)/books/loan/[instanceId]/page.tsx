"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface BookInstance {
  id: string;
  book: {
    title: string;
    author: string;
  };
  status: 'available' | 'loaned' | 'reserved';
  due_back?: string;
  imprint: string;
}

// This function would typically be in a separate API service file
async function fetchBookInstanceById(id: string): Promise<BookInstance> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  if (id === '123') {
    return {
      id: '123',
      book: { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
      status: 'loaned',
      due_back: '2023-12-31',
      imprint: 'Scribner, 2004',
    };
  }
  throw new Error('Book instance not found');
}

export default function BookLoanInstancePage() {
  const params = useParams();
  const instanceId = params.instanceId as string;

  const [bookInstance, setBookInstance] = useState<BookInstance | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!instanceId) {
      setError("No instance ID provided.");
      setLoading(false);
      return;
    }

    const loadBookInstance = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchBookInstanceById(instanceId);
        setBookInstance(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBookInstance();
  }, [instanceId]);

  if (loading) {
    return <div>Carregando detalhes da instância do livro...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  if (!bookInstance) {
    return <div>Nenhuma instância de livro encontrada.</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Detalhes da Instância do Livro</h1>
      <p><strong>ID da Instância:</strong> {bookInstance.id}</p>
      <p><strong>Título:</strong> {bookInstance.book.title}</p>
      <p><strong>Autor:</strong> {bookInstance.book.author}</p>
      <p><strong>Imprint:</strong> {bookInstance.imprint}</p>
      <p><strong>Status:</strong> {bookInstance.status}</p>
      {bookInstance.status === 'loaned' && bookInstance.due_back && (
        <p><strong>Data de Devolução:</strong> {bookInstance.due_back}</p>
      )}
    </div>
  );
}
