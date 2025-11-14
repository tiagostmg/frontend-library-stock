// src/services/authService.ts
import { api } from "@/lib/api";

export async function login(cpf: string, password: string) {
  const response = await api.post("/auth/login", {
    cpf,
    password,
  });

  return response.data; // deve conter token
}
