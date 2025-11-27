"use client"

import LoadingSpinner from "@/components/LoadingSpinner";
import { useFetchBookPreservationState } from "@/hooks/useFetchBookPreservationState";
import { useFetchOverdueLoan } from "@/hooks/useFetchOverdueLoan";
import { AlertCircle, ArrowRightLeft, Book } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomePage() {

  const { overdueLoans, loading: loadingOverdueLoans, error: errorOverdueLoans } = useFetchOverdueLoan();
  const { bookInstancesPreservationState, loading: loadingPreservationState, error: errorPreservationState } = useFetchBookPreservationState();

  const router = useRouter();
  return (
    <div className="flex gap-6 w-full h-full">
      {/* COLUMN 1: Livros Atrasados */}
      <div className="flex-1 bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md flex flex-col">
        <h2 className="text-xl font-semibold mb-4 text-red-600 flex items-center gap-2">
          <AlertCircle className="w-6 h-6" />
          Livros Atrasados
        </h2>
        {loadingOverdueLoans ? (
          <div className="flex-1 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
            <LoadingSpinner />
          </div>
        ) : errorOverdueLoans ? (
          <div className="flex-1 flex items-center justify-center text-red-500 dark:text-red-400">
            Erro ao carregar livros atrasados.
          </div>
        ) : overdueLoans.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
            Nenhum livro atrasado encontrado.
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-3">
            {overdueLoans.map((item, i) => (
              <div key={i} className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900/50">
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100">{item.overdueBookInstanceViewModel.book.title}</h3>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-zinc-600 dark:text-zinc-400">{item.overdueReaderViewModel.name}</span>
                  {(() => {
                    const todayDate = new Date(new Date().toISOString().split("T")[0]);
                    const returnDate = new Date(item.expectedReturnDate);
                    const diffTime = todayDate.getTime() - returnDate.getTime();
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    return (
                      <span className="text-red-600 font-semibold">Atrasado em {diffDays} {diffDays == 1 ? 'dia' : 'dias'}</span>
                    );
                  })()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* COLUMN 2: Estado de Conservação */}
      <div className="flex-1 bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md flex flex-col">
        <h2 className="text-xl font-semibold mb-4 text-red-600 flex items-center gap-2">
          <Book className="w-6 h-6" />
          Baixo estado de Conservação
        </h2>
        {loadingPreservationState ? (
          <div className="flex-1 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
            <LoadingSpinner />
          </div>
        ) : errorPreservationState ? (
          <div className="flex-1 flex items-center justify-center text-red-500 dark:text-red-400">
            Erro ao carregar estado de conservação.
          </div>
        ) : bookInstancesPreservationState.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
            Nenhum livro encontrado.
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-3">
            {bookInstancesPreservationState.map((item, i) => (
              <div
                key={i}
                onClick={() => router.push(`/books/instance/${item.id}`)}
                className="block p-3 bg-zinc-50 dark:bg-zinc-900/20 rounded-lg border border-zinc-100 dark:border-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100">{item.book.title}</h3>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-zinc-600 dark:text-zinc-400">Exemplar: {item.internalCode}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${(() => {
                    switch (item.preservationState) {
                      case 'EXCELLENT':
                        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
                      case 'GOOD':
                        return 'bg-lime-100 text-lime-800 dark:bg-lime-900/20 dark:text-lime-300';
                      case 'REGULAR':
                        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
                      case 'BAD':
                        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
                      default:
                        return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300';
                    }
                  })()}`}>
                    {item.preservationState === "BAD" ? "Ruim" : item.preservationState === "REGULAR" ? "Regular" : item.preservationState === "GOOD" ? "Bom" : "Excelente"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* COLUMN 3: Empréstimo */}
      <div className="flex-1 bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md flex flex-col">
        <h2 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
          <ArrowRightLeft className="w-6 h-6" />
          Empréstimo
        </h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Pesquisar Livro</label>
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              <input
                type="text"
                placeholder="ISBN, Título ou Autor..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-100 dark:border-zinc-800">
            <div className="text-center text-zinc-500 dark:text-zinc-400 py-4 text-sm">
              Nenhum livro selecionado
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
              Emprestar
            </button>
            <button className="flex items-center justify-center gap-2 py-2 px-4 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 rounded-lg font-medium transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
              Devolver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
