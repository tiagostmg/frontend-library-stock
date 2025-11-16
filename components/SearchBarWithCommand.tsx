"use client"

import { useState } from "react"
import { SearchCommand } from "./SearchCommand"
import { Input } from "@/components/ui/input"
import { Book } from "@/types/book.types"

interface Props {
  items: Book[]
  onSelect: (book: Book) => void
}

export function SearchBarWithCommand({ items, onSelect }: Props) {
  const [query, setQuery] = useState("")

  // filtra os livros pelo título, autor ou categoria
  const filtered = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.author.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="relative w-full">
      {/* Campo de busca */}
      <Input
        placeholder="Buscar livro..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Somente aparece quando há texto digitado */}
      {query.length > 0 && (
        <div className="absolute z-50 w-full mt-2">
          <SearchCommand items={filtered} onSelect={(book) => {
            onSelect(book)
            setQuery("") // limpa após selecionar
          }} />
        </div>
      )}
    </div>
  )
}
