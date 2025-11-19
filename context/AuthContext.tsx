"use client";

import { createContext, useState, useEffect } from "react";
import { login as loginService } from "@/services/auth.service";

export type User = {
  name: string;
  cpf: string;
  // Add other fields as needed based on your JWT payload
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (cpf: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      try {
        const userPayload = decodeToken(savedToken);
        setUser(userPayload);
      } catch (error) {
        console.error("Invalid token in storage", error);
        logout();
      }
    }
  }, []);

  function decodeToken(token: string): User {
    const [, payloadBase64] = token.split('.');
    const decodedPayload = JSON.parse(atob(payloadBase64));
    return {
      name: decodedPayload.name,
      cpf: decodedPayload.sub,
    };
  }

  async function login(cpf: string, password: string) {
    const data = await loginService(cpf, password);

    setToken(data.token);
    localStorage.setItem("token", data.token);

    try {
      const userPayload = decodeToken(data.token);
      setUser(userPayload);
    } catch (error) {
      console.error("Failed to decode token on login", error);
    }
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
