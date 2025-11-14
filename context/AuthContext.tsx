"use client";

import { createContext, useState, useEffect } from "react";
import { login as loginService } from "@/services/authService";

type AuthContextType = {
  user: any;
  token: string | null;
  login: (cpf: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) setToken(saved);
  }, []);

  async function login(cpf: string, password: string) {
    const data = await loginService(cpf, password);

    setToken(data.token);
    localStorage.setItem("token", data.token);

    setUser(data.user);
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
