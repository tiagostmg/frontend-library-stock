'use client';

import AddBookInstanceModal from '@/components/AddBookInstanceModal';
import { BackButton } from '@/components/BackButton';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
      <div className="bg-card shadow-md rounded-lg p-6 mb-4 border">
        <h3 className="text-3xl font-bold text-foreground">{book?.title || 'Livro'} {book?.author && <span className="text-sm md:text-lg text-muted-foreground mt-1"> - por {book.author}</span>}</h3>
        <hr className="my-4" />
        <div className="mt-2 text-muted-foreground space-y-1">
          {book?.isbn && <p><strong>ISBN:</strong> {book.isbn}</p>}
          {book?.category && <p><strong>Categoria:</strong> {book.category}</p>}
          {book?.publisher && <p><strong>Editora:</strong> {book.publisher}</p>}
          {book?.notes && <p><strong>Notas:</strong> {book.notes}</p>}
        </div>
      </div>

      <div className="flex justify-end mb-4 mr-4">
        <AddBookInstanceModal />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookInstances.map((instance) => (
          <Card
            key={instance.id}
            className="shadow-sm flex hover:shadow-lg transition-all flex-col gap-2 bg-card cursor-pointer"
            onClick={() => router.push(`/books/instance/${instance.id}`)}
          >
            <CardHeader>
              <CardTitle className="text-lg">ID da Instância: {instance.id}</CardTitle>
              <CardDescription>Código Interno: {instance.internalCode}</CardDescription>
            </CardHeader>
            <CardContent className='pt-0 flex flex-col gap-2'>
              {instance.acquisitionDate && <p className="text-sm text-muted-foreground">Data de Aquisição: {new Date(instance.acquisitionDate).toLocaleDateString('pt-BR')}</p>}

              <p className="text-sm text-muted-foreground">
                <strong>Status:</strong>{' '}
                <span className={`px-2 py-1 rounded-full font-semibold ${instance.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {instance.status === 'AVAILABLE' ? 'Disponível' : 'Indisponível'}
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Preservação:</strong>{' '}
                <span className={`px-2 py-1 rounded-full font-semibold ${instance.preservationState === 'EXCELLENT' || instance.preservationState === 'GOOD' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {instance.preservationState === 'EXCELLENT' ? 'Excelente' : instance.preservationState === 'GOOD' ? 'Bom' : instance.preservationState === 'REGULAR' ? 'Regular' : 'Ruim'}
                </span>
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className='w-full cursor-pointer mt-4'
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/books/instance/${instance.id}`);
                }}
              >
                Ver Detalhes
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
