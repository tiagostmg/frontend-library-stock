"use client";

import { useParams } from 'next/navigation';
import { useFetchBookInstanceById } from '@/hooks/useFetchBookInstanceById';
import LoadingSpinner from '@/components/LoadingSpinner';
import { BackButton } from '@/components/BackButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from 'lucide-react';


export default function BookInstancePage() {
  const params = useParams();
  const instanceId = params.instanceId as string;

  const { bookInstance, loading, error } = useFetchBookInstanceById(instanceId);

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
        {/* Left side: Book Instance Details */}
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
          </CardContent>
        </Card>

        {/* Middle side: Loan History */}
        <div className="bg-card shadow-md rounded-lg p-6 flex-1 border">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Histórico de Empréstimos</h2>
          {/* Assuming bookInstance has a loanHistory array for demonstration */}
          {/* {bookInstance.loanHistory && bookInstance.loanHistory.length > 0 ? (
            <ul className="space-y-3">
              {bookInstance.loanHistory.map((loan: any, index: number) => (
                <li key={index} className="p-3 bg-muted rounded-md">
                  <p className="text-sm text-foreground"><strong>Leitor:</strong> {loan.borrowerName}</p>
                  <p className="text-xs text-muted-foreground"><strong>Empréstimo:</strong> {new Date(loan.loanDate).toLocaleDateString()}</p>
                  <p className="text-xs text-muted-foreground"><strong>Devolução:</strong> {loan.returnDate ? new Date(loan.returnDate).toLocaleDateString() : 'Pendente'}</p>
                </li>
              ))}
            </ul>
          ) : ( */}
          <p className="text-muted-foreground">Nenhum histórico de empréstimo encontrado para esta instância.</p>
          {/* )} */}
        </div>

        {/* Right side: Loan Form */}
        <div className="bg-card shadow-md rounded-lg p-6 flex-1 border">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Realizar Empréstimo</h2>
          <div className="mb-4">
            <label htmlFor="cpf" className="block text-sm font-medium text-foreground mb-2">CPF do Leitor</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              className="mt-1 block w-full px-3 py-2 border border-input bg-background rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Ex: 123.456.789-00"
            />
          </div>
          <button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Emprestar Livro
          </button>
        </div>
      </div>
    </div>
  );
}
