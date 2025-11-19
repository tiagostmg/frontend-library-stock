"use client"

import { useSearchBooks } from "@/hooks/useFetchBooks"
import { BookCard } from "@/components/BookCard"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchBar } from "@/components/SearchBar"
// Importe o novo componente Spinner
import LoadingSpinner from "@/components/LoadingSpinner"

export default function BookPage() {
    const { books, loading, error, filter, setFilter, setType } = useSearchBooks()

    return (
        <>
            <div className="flex gap-4 ml-4 mr-4 items-center">
                {/* O p-tag não precisa de classes extras, pois o flexbox fará o alinhamento */}
                <SearchBar
                    value={filter}
                    onChange={(value) => setFilter(value)}
                />
                <p>Filtro:</p>

                {/* Defina o valor padrão inicial */}
                <Select onValueChange={(value) => setType(value)} defaultValue="title">
                    <SelectTrigger className="w-40">
                        {/* Define o placeholder, mas o defaultValue o sobrescreverá */}
                        <SelectValue placeholder="Filtrar" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="title">Título</SelectItem>
                        <SelectItem value="author">Autor</SelectItem>
                        <SelectItem value="category">Categoria</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* 3. Nova Seção para a Lógica de Estado (Loading/Error/Dados) */}
            <div className="p-4 text-center">
                {loading && (
                    <div className="flex flex-col items-center">
                        <LoadingSpinner />
                    </div>
                )}

                {/* Exibe a mensagem de erro se houver */}
                {error && <p className="text-xl text-red-600">Erro ao carregar dados: {error}</p>}

                {/* Nenhum resultado encontrado */}
                {!loading && !error && books.length === 0 && filter && (
                    <p className="text-xl text-gray-500">Nenhum livro encontrado para o filtro "{filter}".</p>
                )}
            </div>

            {/* 4. Renderiza a lista de livros APENAS se não estiver carregando e não houver erro */}
            {!loading && !error && books.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {books.map(book => (
                        <BookCard key={book.id} {...book} />
                    ))}
                </div>
            )}
        </>
    )
}