"use client"

import { useEffect, useState } from "react"
import { api } from "@/utils/api"
import { Book } from "@/types/book.types"

const DEBOUNCE_DELAY_MS = 500

export function useSearchBooks() {
  // ... (Seus states de filtro e paginação)
  const [filter, setFilter] = useState<string>("")
  const [type, setType] = useState<string>("title")
  const [page, setPage] = useState<number>(0)
  const [pageSize, setpageSize] = useState<number>(16)

  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isInitialLoad, setIsInitialLoad] = useState(true)

  const [totalPages, setTotalPages] = useState<number>(0)

  async function loadBooks() {
    setLoading(true)
    setError(null)
    try {
      const url = `/books/search?filter=${filter}&type=${type}&page=${page}&size=${pageSize}`
      const res = await api.get(url)
      setBooks(res.data.content)
      setTotalPages(res.data.totalPages)
    } catch (err) {
      setError("Erro ao carregar livros.")
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isInitialLoad) {
      loadBooks()
      setIsInitialLoad(false)
      return
    }

    const handler = setTimeout(() => {
      loadBooks()
    }, DEBOUNCE_DELAY_MS)

    return () => {
      clearTimeout(handler)
    }
  }, [filter, type, page, pageSize])

  useEffect(() => {
    setPage(0)
  }, [pageSize])

  return { books, loading, error, filter, setFilter, setType, page, setPage, pageSize, setpageSize, totalPages }
}