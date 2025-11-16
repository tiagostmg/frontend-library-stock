"use client"

import { useFetchBooks } from "@/hooks/useFetchBooks"
import { BookCard } from "@/components/BookCard"
import { SearchBarWithCommand } from "@/components/SearchBarWithCommand"

export default function BookPage() {
    const { books, loading, error } = useFetchBooks()

    if (loading) return <p>Carregando...</p>
    if (error) return <p>{error}</p>

    return (
        <>
            <div className="flex gap-10 m-4">
                <SearchBarWithCommand
                    items={books}
                    onSelect={(book) => console.log("Selecionado:", book)}
                />

            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {books.map(book => (
                    <BookCard key={book.id} {...book} />
                ))}
            </div>
        </>
    )
}
