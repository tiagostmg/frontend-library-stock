'use client';

import { BackButton } from '@/components/BackButton';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useFetchBookInstances } from '@/hooks/useFetchBookInstances';
import { use } from 'react';

interface BookInstancesPageProps {
  params: Promise<{
    id: string; // This will be the bookId
  }>;
}

export default function BookInstancesPage({ params: paramsPromise }: BookInstancesPageProps) {
  const resolvedParams = use(paramsPromise);
  const { id: bookId } = resolvedParams;

  const { bookInstances, loading, error } = useFetchBookInstances(bookId)

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (bookInstances.length === 0) {
    return <div className="p-4">No instances found for this book.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-start gap-8  mb-4">
        <BackButton />
        <h3 className="text-xl font-bold">Book Instances for "{bookInstances[0]?.book.title || 'Book'}"</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookInstances.map((instance) => (
          <div key={instance.id} className="border p-4 rounded-lg shadow-sm">
            <p className="text-lg font-semibold">ID: {instance.id}</p>
            <p>internalCode: {instance.internalCode}</p>
            <p>Status: <span className={`font-medium ${instance.status === 'AVAILABLE' ? 'text-green-600' :
              instance.status === 'LOANED' ? 'text-yellow-600' :
                instance.status === 'MAINTENANCE' ? 'text-red-600' : 'text-gray-600'
              }`}>{instance.status}</span></p>
            <p>Acquisition Date: {instance.acquisitionDate}</p>
            <p>Preservation State: {instance.preservationState}</p>
            <p>Book: {instance.book.title}</p>
            <p>Location: {instance.location.sector}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
