"use client"

import { useEffect, useState } from "react"
import { api } from "@/utils/api"
import { Book } from "@/types/book.types"

export function useFetchBooks() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/books")
        setBooks(res.data)
      } catch (err) {
        setError("Erro ao carregar livros.")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return { books, loading, error }
}
