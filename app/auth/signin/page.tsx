"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      await login(cpf, password);
      toast.success("Login OK");
      router.push("/home");
    } catch (err) {
      toast.error("Credenciais inválidas");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl flex overflow-hidden">
        {/* Left Column for Login Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col gap-4 justify-center">
          <h1 className="text-3xl font-bold text-center mb-2 mt-8 text-gray-800">
            Bem-vindo de volta!
          </h1>
          <p className="text-center text-gray-600 mb-4">
            Faça login para continuar.
          </p>
          <Input
            placeholder="CPF"
            onChange={(e) => setCpf(e.target.value)}
            className="p-3 text-lg"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                document.getElementById("password-input")?.focus();
              }
            }}
          />

          <Input
            id="password-input"
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 text-lg"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleLogin();
              }
            }}
          />

          <Button className="w-full mt-6 py-3 text-lg font-semibold cursor-pointer" onClick={handleLogin}>
            Entrar
          </Button>

          {/* <p className="text-center text-sm text-gray-500 mt-4">
            Não tem uma conta? <a href="#" className="text-blue-600 hover:underline">Registre-se</a>
          </p> */}
        </div>

        {/* Right Column for Visual (hidden on small screens) */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 items-center justify-center p-8">
          <div className="text-white text-center">
            <h2 className="text-4xl font-extrabold mb-4">Seu Portal de Gestão</h2>
            <p className="text-xl leading-relaxed">
              Acesse suas informações e gerencie seus dados de forma eficiente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
