"use client";

import { useParams, useRouter } from 'next/navigation';
import { useFetchBookInstanceById } from '@/hooks/useFetchBookInstanceById';
import LoadingSpinner from '@/components/LoadingSpinner';
import { BackButton } from '@/components/BackButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFetchLoanHistoryByInstance } from '@/hooks/useFetchLoanHistoryByInstance';
import { Loan } from '@/types/loan.types';
import { Input } from '@/components/ui/input';
import { useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSearchReaders } from '@/hooks/useSearchReaders';
import { useSearchReaderByCpf } from '@/hooks/useSearchReaderByCpf';
import { api } from '@/utils/api';
import { AuthContext } from '@/context/AuthContext';
import { useBorrowBook } from '@/hooks/useBorrowBook';
import { useReturnBook } from '@/hooks/useReturnBook';


export default function BookInstancePage() {
  const params = useParams();
  const instanceId = params.instanceId as string;
  const router = useRouter();

  const auth = useContext(AuthContext);

  if (!auth || !auth.user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-zinc-500">Carregando informações do usuário...</p>
      </div>
    );
  }

  const { bookInstance, loading, error, refetch: refetchBookInstance } = useFetchBookInstanceById(instanceId);

  const { loanHistory, loading: loanHistoryLoading, error: loanHistoryError, refetch: refetchLoanHistory } = useFetchLoanHistoryByInstance(instanceId);

  const { reader, loading: readerLoading, error: readerError, cpf, setCpf } = useSearchReaderByCpf();

  const { borrowBook, loading: borrowing } = useBorrowBook({
    onSuccess: () => {
      refetchBookInstance();
      refetchLoanHistory();
      setCpf('');
    }
  });

  const { returnBook, loading: returning } = useReturnBook({
    onSuccess: () => {
      refetchBookInstance();
      refetchLoanHistory();
    }
  });

  const handleLoanBook = async () => {
    if (!auth.user || !reader) return;
    const userCpfFromToken = auth.user.cpf;
    await borrowBook(instanceId, userCpfFromToken, reader.id);
  };

  const handleReturnBook = async () => {
    await returnBook(instanceId);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (!bookInstance) {
    return <div className="p-4">Instância do livro não encontrada.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-start gap-8 mb-4">
        <BackButton />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Informações da Instância</CardTitle>
            <CardDescription>Detalhes específicos desta cópia do livro.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Título:</p>
              <p className="text-sm font-semibold">{bookInstance?.book.title}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Autor:</p>
              <p className="text-sm font-semibold">{bookInstance?.book.author}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">ID da Instância:</p>
              <p className="text-sm text-foreground">{bookInstance?.id}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Código Interno:</p>
              <p className="text-sm text-foreground">{bookInstance?.internalCode}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Status:</p>
              <p className={`text-sm px-2 py-1 rounded-full font-semibold ${bookInstance?.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {bookInstance?.status === 'AVAILABLE' ? 'Disponível' : 'Indisponível'}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Estado de Preservação:</p>
              <p className={`text-sm px-2 py-1 rounded-full font-semibold ${bookInstance?.preservationState === 'EXCELLENT' ? 'bg-green-100 text-green-800' :
                bookInstance?.preservationState === 'GOOD' ? 'bg-blue-100 text-blue-800' :
                  bookInstance?.preservationState === 'REGULAR' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                }`}>
                {bookInstance?.preservationState === 'EXCELLENT' ? 'Excelente' :
                  bookInstance?.preservationState === 'GOOD' ? 'Bom' :
                    bookInstance?.preservationState === 'REGULAR' ? 'Regular' :
                      'Ruim'}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t">
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Localização</h3>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Corredor:</p>
              <p className="text-sm text-foreground">{bookInstance?.location.aisle}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Posição:</p>
              <p className="text-sm text-foreground">{bookInstance?.location.position}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Setor:</p>
              <p className="text-sm text-foreground">{bookInstance?.location.sector}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Prateleira:</p>
              <p className="text-sm text-foreground">{bookInstance?.location.shelf}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Nível:</p>
              <p className="text-sm text-foreground">{bookInstance?.location.shelfLevel}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Classificação:</p>
              <p className="text-sm text-foreground">{bookInstance?.location.classificationCode}</p>
            </div>
          </CardContent>
        </Card>

        <div className="bg-card shadow-md rounded-lg p-6 flex-1 border">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Histórico de Empréstimos</h2>
          {/* Assuming bookInstance has a loanHistory array for demonstration */}
          {loanHistory && loanHistory.length > 0 ? (
            <div className="space-y-3">
              {loanHistory
                .sort((a, b) => new Date(b.loanDate).getTime() - new Date(a.loanDate).getTime())
                .map((loan: Loan, index: number) => (
                  <div key={index} className="border rounded-lg p-4 bg-background shadow-sm">
                    <div className="mb-2">
                      <h3
                        className="text-base cursor-pointer hover:text-zinc-600 mb-2 font-medium"
                        onClick={() => router.push(`/readers/${loan.readerViewModel.id}`)}>{loan.readerViewModel.name}
                      </h3>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Devolução: {loan.expectedReturnDate ? new Date(loan.expectedReturnDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'Pendente'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Empréstimo: {new Date(loan.loanDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Nenhum histórico de empréstimo encontrado para esta instância.</p>
          )}
        </div>

        <div className="bg-card shadow-md rounded-lg p-6 flex-1 border">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Realizar Empréstimo</h2>
          {bookInstance?.status === 'AVAILABLE' ? (
            <>
              <Input
                className="mb-4"
                placeholder="CPF do leitor"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />

              <div className='mb-4'>
                {(() => {
                  if (cpf.trim() === '') {
                    return (
                      <div className="p-4 border bg-zinc-50 dark:bg-zinc-900/20 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 text-center">
                        Pesquise pelo CPF do leitor.
                      </div>
                    );
                  }
                  if (readerLoading) {
                    return (
                      <div className="p-4 border bg-zinc-50 dark:bg-zinc-900/20 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 h-24">
                        <LoadingSpinner />
                      </div>
                    );
                  }
                  if (!readerLoading && !reader) { // Corrected condition for "Reader not found"
                    return (
                      <div className="p-4 border bg-red-50 dark:bg-red-900/20 rounded-lg shadow-sm border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-center">
                        Leitor não encontrado.
                      </div>
                    );
                  }
                  if (reader) {
                    return (
                      <div className="p-4 border bg-zinc-50 dark:bg-zinc-900/20 rounded-lg shadow border border-zinc-100 dark:border-zinc-900/50">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3
                              className="font-semibold text-lg text-zinc-900 dark:text-zinc-100 cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-400"
                              onClick={() => router.push(`/readers/${reader.id}`)}
                            >
                              {reader.name}
                            </h3>
                            {reader.email && <p className="text-sm mt-1 text-zinc-600 dark:text-zinc-400">Email: {reader.email}</p>}
                            {reader.phone && <p className="text-sm mt-1 text-zinc-600 dark:text-zinc-400">Telefone: {reader.phone}</p>}
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>
              <Button
                className="w-full font-bold text-md p-5 cursor-pointer"
                onClick={handleLoanBook}
                disabled={!reader || borrowing}
              >
                {borrowing ? <LoadingSpinner /> : 'Emprestar Livro'}
              </Button>
            </>
          ) : (
            <Button
              className="w-full font-bold text-md p-5 cursor-pointer"
              onClick={handleReturnBook}
              disabled={returning}
            >
              {returning ? <LoadingSpinner /> : 'Devolver Livro'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
