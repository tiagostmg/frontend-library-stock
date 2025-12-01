import { Reader } from "@/types/reader.types";
import { api } from "@/utils/api";
import { useState, useEffect } from "react";

const DEBOUNCE_DELAY_MS = 500;

export function useSearchReaderByCpf() {
  const [reader, setReader] = useState<Reader | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cpf, setCpf] = useState<string>("");

  async function fetchReaderByCpf() {
    setLoading(true)
    setError(null)
    try {
      if (cpf.trim() === '') {
        setReader(null)
        return
      }
      const url = `/reader/cpf/${cpf}`
      const res = await api.get(url)
      setReader(res.data)
    } catch (err) {
      setError("Erro ao carregar leitor")
      setReader(null)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {

    const handler = setTimeout(() => {
      fetchReaderByCpf()
    }, DEBOUNCE_DELAY_MS);

    return () => clearTimeout(handler);
  }, [cpf]);

  return { reader, loading, error, cpf, setCpf };
}