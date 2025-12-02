"use client"

import { useSearchBooks } from "@/hooks/useSearchBooks"
import { BookCard } from "@/components/BookCard"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchBar } from "@/components/SearchBar"
// Importe o novo componente Spinner
import LoadingSpinner from "@/components/LoadingSpinner"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import AddBookModal from "@/components/AddBookModal"

export default function BookPage() {
    const { books, loading, error, filter, setFilter, setType, page, setPage, totalPages } = useSearchBooks()

    return (
        <>
            <div className="flex gap-4 ml-4 mr-4 items-center">
                <SearchBar
                    value={filter}
                    onChange={(value) => setFilter(value)}
                />
                <p>Filtro:</p>

                <Select onValueChange={(value) => setType(value)} defaultValue="title">
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filtrar" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="title">Título</SelectItem>
                        <SelectItem value="author">Autor</SelectItem>
                        <SelectItem value="category">Categoria</SelectItem>
                    </SelectContent>
                </Select>

                <AddBookModal />

            </div>

            <div className="p-4 text-center">
                {loading && (
                    <div className="flex flex-col items-center">
                        <LoadingSpinner />
                    </div>
                )}

                {error && <p className="text-xl text-red-600">Erro ao carregar dados: {error}</p>}

                {!loading && !error && books.length === 0 && filter && (
                    <p className="text-xl text-muted-foreground">Nenhum livro encontrado para o filtro "{filter}".</p>
                )}
            </div>

            {!loading && !error && books.length > 0 && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                        {books.map(book => (
                            <BookCard key={book.id} {...book} />
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