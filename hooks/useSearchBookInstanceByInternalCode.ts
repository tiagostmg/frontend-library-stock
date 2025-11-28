"use client"

import { useEffect, useState } from "react"
import { api } from "@/utils/api"
import { BookInstance } from "@/types/book.types"

const DEBOUNCE_DELAY_MS = 500

export function useSearchBookInstanceByInternalCode() {
  // ... (Seus states de filtro e paginação)
  const [code, setCode] = useState<string>("")

  const [bookInstance, setBookInstance] = useState<BookInstance | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isInitialLoad, setIsInitialLoad] = useState(true)

  async function fetchBookInstanceByInternalCode() {
    setLoading(true)
    setError(null)
    try {
      const url = `/book-instances/dash/${code}`
      const res = await api.get(url)
      setBookInstance(res.data)
    } catch (err) {
      setError("Erro ao carregar livros.")
      setBookInstance(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isInitialLoad) {
      fetchBookInstanceByInternalCode()
      setIsInitialLoad(false)
      return
    }

    const handler = setTimeout(() => {
      fetchBookInstanceByInternalCode()
    }, DEBOUNCE_DELAY_MS)

    return () => {
      clearTimeout(handler)
    }
  }, [code])

  return { bookInstance, loading, error, code, setCode }
}