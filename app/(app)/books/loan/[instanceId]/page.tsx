"use client";

import { useParams } from 'next/navigation';
import { useFetchBookInstanceById } from '@/hooks/useFetchBookInstanceById';
import LoadingSpinner from '@/components/LoadingSpinner';
import { BackButton } from '@/components/BackButton';


export default function BookLoanInstancePage() {
  const params = useParams();
  const instanceId = params.instanceId as string;

  const { bookInstance, loading, error } = useFetchBookInstanceById(instanceId);

  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-6 self-start">
        <BackButton />
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Detalhes do exemplar</h1>

      <div className="flex flex-col md:flex-row w-full max-w-4xl gap-8">
        {/* Left side: Book Instance Details */}
        <div className="flex-1 p-6 border border-gray-200 rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Informações do Livro</h2>
          <p className="mb-2 text-gray-600"><strong>Título:</strong> {bookInstance?.book.title}</p>
          <p className="mb-2 text-gray-600"><strong>Autor:</strong> {bookInstance?.book.author}</p>
          <p className="mb-2 text-gray-600"><strong>ID da Instância:</strong> {bookInstance?.id}</p>
          <p className="mb-2 text-gray-600"><strong>Status:</strong> {bookInstance?.status}</p>
          <p className="mb-2 text-gray-600"><strong>Código Interno:</strong> {bookInstance?.internalCode}</p>
        </div>

        {/* Right side: Loan Form */}
        <div className="flex-1 p-6 border border-gray-200 rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Realizar Empréstimo</h2>
          <div className="mb-4">
            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-2">CPF do Leitor</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
