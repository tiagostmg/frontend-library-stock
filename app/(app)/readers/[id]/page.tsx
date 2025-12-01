"use client";

import { useParams, useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import { BackButton } from '@/components/BackButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loan } from '@/types/loan.types';
import { useFetchReaderById } from '@/hooks/useFetchReaderById';
import { useFetchLoanHistoryByReader } from '@/hooks/useFetchLoanHistoryByReader';

interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

interface Reader {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  address: Address;
  registrationDate: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export default function ReaderPage() {
  const params = useParams();
  const readerId = params.id as string; // Assuming the parameter is 'id' for reader
  const router = useRouter();

  // Placeholder hooks for fetching reader data and loan history by reader
  const { reader, loading, error } = useFetchReaderById(readerId);
  const { loanHistory, loading: loanHistoryLoading, error: loanHistoryError } = useFetchLoanHistoryByReader(readerId);

  if (loading || loanHistoryLoading) {
    return (
      <div className="flex flex-col items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (loanHistoryError) {
    return <div className="p-4 text-red-500">Error loading loan history: {loanHistoryError}</div>;
  }

  if (!reader) {
    return <div className="p-4">Leitor não encontrado.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-start gap-8 mb-4">
        <BackButton />
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side: Reader Information */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Informações do Leitor</CardTitle>
            <CardDescription>Detalhes cadastrais do leitor.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Nome:</p>
              <p className="text-sm font-semibold">{reader.name}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">CPF:</p>
              <p className="text-sm text-foreground">{reader.cpf}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Email:</p>
              <p className="text-sm text-foreground">{reader.email}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Telefone:</p>
              <p className="text-sm text-foreground">{reader.phone}</p>
            </div>
            <div className="mt-6 pt-4 border-t">
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Endereço</h3>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Endereço:</p>
              <p className="text-sm text-foreground">{reader.address}</p>
            </div>
          </CardContent>
        </Card>

        {/* Right side: Loan History */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Histórico de Empréstimos</CardTitle>
            <CardDescription>Todos os empréstimos associados a este leitor.</CardDescription>
          </CardHeader>
          <CardContent>
            {loanHistory && loanHistory.length > 0 ? (
              <div className="max-h-[60vh] overflow-y-auto pr-2"> {/* Added max height and scroll for loan history */}
                <div className="space-y-3">
                  {loanHistory.map((loan: Loan) => (
                    <div key={loan.loanId} className="border rounded-lg p-4 bg-background shadow-sm">
                      <div className="mb-2">
                        <h3
                          className="text-base cursor-pointer hover:text-zinc-600 mb-2 font-medium"
                          onClick={() => router.push(`/books/instance/${loan.bookInstanceViewModel.id}`)} // Navigate to book instance page
                        >
                          {loan.bookInstanceViewModel.book.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Autor: {loan.bookInstanceViewModel.book.author}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Empréstimo: {new Date(loan.loanDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                        </p>
                        <p className="text-sm text-muted-foreground mb-1">
                          Devolução Prevista: {loan.expectedReturnDate ? new Date(loan.expectedReturnDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'N/A'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Devolução Real: {loan.actualReturnDate ? new Date(loan.actualReturnDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'Pendente'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">Nenhum histórico de empréstimo encontrado para este leitor.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
