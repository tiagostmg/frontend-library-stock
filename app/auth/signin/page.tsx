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
      router.push("/dashboard");
    } catch (err) {
      toast.error("Credenciais inválidas");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white shadow-xl rounded-2xl p-8 flex flex-col gap-4">

        <h1 className="text-2xl font-semibold text-center mb-4">
          Login
        </h1>

        <Input placeholder="CPF" onChange={(e) => setCpf(e.target.value)} />

        <Input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />

        <Button className="w-full mt-4" onClick={handleLogin}>
          Entrar
        </Button>

      </div>
    </div>
  );
}
