"use client"

import { useEffect, useState } from "react"
import { api } from "@/utils/api"
import { Reader } from "@/types/reader.types"

const DEBOUNCE_DELAY_MS = 500

export function useSearchReaders() {
  // ... (Seus states de filtro e paginação)
  const [filter, setFilter] = useState<string>("")
  const [type, setType] = useState<string>("name")
  const [page, setPage] = useState<number>(0)
  const [pageSize, setpageSize] = useState<number>(12)

  const [readers, setReaders] = useState<Reader[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isInitialLoad, setIsInitialLoad] = useState(true)

  const [totalPages, setTotalPages] = useState<number>(0)

  async function loadReaders() {
    setLoading(true)
    setError(null)
    try {
      const url = `/reader/search?filter=${filter}&type=${type}&page=${page}&size=${pageSize}`
      const res = await api.get(url)
      setReaders(res.data.content)
      setTotalPages(res.data.totalPages)
    } catch (err) {
      setError("Erro ao carregar leitores.")
      setReaders([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isInitialLoad) {
      loadReaders()
      setIsInitialLoad(false)
      return
    }

    const handler = setTimeout(() => {
      loadReaders()
    }, DEBOUNCE_DELAY_MS)

    return () => {
      clearTimeout(handler)
    }
  }, [filter, type, page, pageSize])

  useEffect(() => {
    setPage(0)
  }, [pageSize])

  return { readers, loading, error, filter, setFilter, setType, page, setPage, pageSize, setpageSize, totalPages }
}