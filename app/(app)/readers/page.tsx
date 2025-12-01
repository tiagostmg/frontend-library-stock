
"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchBar } from "@/components/SearchBar"
import LoadingSpinner from "@/components/LoadingSpinner"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useSearchReaders } from "@/hooks/useSearchReaders"
import { ReaderCard } from "@/components/ReaderCard"

export default function ReaderPage() {
  const { readers, loading, error, filter, setFilter, setType, page, setPage, totalPages } = useSearchReaders()

  return (
    <>
      <div className="flex gap-4 ml-4 mr-4 items-center">
        <SearchBar
          value={filter}
          onChange={(value) => setFilter(value)}
        />
        <p>Filtro:</p>

        <Select onValueChange={(value) => setType(value)} defaultValue="name">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filtrar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nome</SelectItem>
            <SelectItem value="cpf">CPF</SelectItem>
            <SelectItem value="email">Email</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="p-4 text-center">
        {loading && (
          <div className="flex flex-col items-center">
            <LoadingSpinner />
          </div>
        )}

        {error && <p className="text-xl text-red-600">Erro ao carregar dados: {error}</p>}

        {!loading && !error && readers.length === 0 && filter && (
          <p className="text-xl text-muted-foreground">Nenhum leitor encontrado para o filtro "{filter}".</p>
        )}
      </div>

      {!loading && !error && readers.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {readers.map(reader => (
              <ReaderCard key={reader.id} {...reader} />
            ))}
          </div>

          <div className="py-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page > 0) setPage(page - 1);
                    }}
                    className={page === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>

                <PaginationItem>
                  <span className="px-4 text-sm text-muted-foreground">
                    Página {page + 1} de {totalPages}
                  </span>
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page < totalPages - 1) setPage(page + 1);
                    }}
                    className={page >= totalPages - 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}
    </>
  )
}