'use client';

import { BackButton } from '@/components/BackButton';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { useFetchBookById } from '@/hooks/useFetchBookById';
import { useFetchBookInstances } from '@/hooks/useFetchBookInstances';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { use } from 'react';

interface BookInstancesPageProps {
  params: Promise<{
    id: string; // This will be the bookId
  }>;
}

export default function BookInstancesPage({ params: paramsPromise }: BookInstancesPageProps) {
  const resolvedParams = use(paramsPromise);
  const { id: bookId } = resolvedParams;

  const { bookInstances, loading: bookInstancesLoading, error: bookInstancesError } = useFetchBookInstances(bookId)

  const { book, loading: bookLoading, error: bookError } = useFetchBookById(bookId)

  const router = useRouter();

  if (bookInstancesLoading || bookLoading) {
    return (
      <div className="flex flex-col items-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (bookInstancesError || bookError) {
    return <div className="p-4 text-red-500">Error: {bookInstancesError || bookError}</div>;
  }

  if (bookInstances.length === 0) {
    return <div className="p-4">No instances found for this book.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-start gap-8 mb-4">
        <BackButton />
      </div>
      <div className="bg-card shadow-md rounded-lg p-6 mb-6 border">
        <h3 className="text-3xl font-bold text-foreground">{book?.title || 'Livro'} {book?.author && <span className="text-sm md:text-lg text-muted-foreground mt-1"> - por {book.author}</span>}</h3>
        <hr className="my-4" />
        <div className="mt-2 text-muted-foreground space-y-1">
          {book?.isbn && <p><strong>ISBN:</strong> {book.isbn}</p>}
          {book?.category && <p><strong>Categoria:</strong> {book.category}</p>}
          {book?.publisher && <p><strong>Editora:</strong> {book.publisher}</p>}
          {book?.notes && <p><strong>Notas:</strong> {book.notes}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookInstances.map((instance) => (
          <div key={instance.id} className="border p-4 rounded-lg shadow-sm flex flex-col gap-2 bg-card">
            <h4 className="text-lg font-bold">ID da Instância: {instance.id}</h4>
            <p className="text-sm text-muted-foreground">Código Interno: {instance.internalCode}</p>

            <div className=" flex flex-col gap-2 mt-2">
              <p>Status: <span className={`px-2 py-1 rounded-full text-xs font-semibold ${instance.status === 'AVAILABLE' ? 'bg-green-500 text-white' :
                instance.status === 'CHECKED_OUT' ? 'bg-yellow-500 text-white' :
                  instance.status === 'LOST' ? 'bg-red-500 text-white' : 'bg-muted text-muted-foreground'
                }`}>{instance.status === 'AVAILABLE' ? 'DISPONÍVEL' : instance.status === 'CHECKED_OUT' ? 'EMPRESTADO' : instance.status === 'LOST' ? 'PERDIDO' : instance.status}</span></p>
              <p>Estado de Preservação: <span className={`px-2 py-1 rounded-full text-xs font-semibold ${instance.preservationState === 'EXCELLENT' ? 'bg-green-500 text-white' :
                instance.preservationState === 'GOOD' ? 'bg-blue-500 text-white' :
                  instance.preservationState === 'REGULAR' ? 'bg-yellow-500 text-white' :
                    instance.preservationState === 'BAD' ? 'bg-red-500 text-white' : 'bg-muted text-muted-foreground'
                }`}>{instance.preservationState === 'EXCELLENT' ? 'EXCELENTE' : instance.preservationState === 'GOOD' ? 'BOM' : instance.preservationState === 'REGULAR' ? 'REGULAR' : instance.preservationState === 'BAD' ? 'RUIM' : instance.preservationState}</span></p>
              <p>Data de Aquisição: {new Date(instance.acquisitionDate).toLocaleDateString()}</p>
            </div>

            <div className="flex flex-col gap-2 mt-2 border-t pt-2">
              <h5 className="font-semibold">Detalhes da Localização:</h5>
              {/* <p>Setor: {instance.location.sector}</p>
                <p>Corredor: {instance.location.aisle}</p>
                <p>Prateleira: {instance.location.shelf}</p>
                <p>Nível: {instance.location.shelfLevel}</p>
                <p>Posição: {instance.location.position}</p> */}
              <p>Código de Classificação: {instance.location.classificationCode}</p>
            </div>

            <Button
              disabled={instance.status !== 'AVAILABLE'}
              className='mt-4 cursor-pointer'
              onClick={() => { router.push(`/books/instance/${instance.id}`); }}
            >
              Emprestar
              <ArrowRight />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
