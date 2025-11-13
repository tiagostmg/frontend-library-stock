"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [cpf, setCpf] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("cpf:", cpf);
    console.log("senha:", password);
    //router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white shadow-xl rounded-2xl p-8 flex flex-col gap-4">
        
        <h1 className="text-2xl font-semibold text-center mb-4">
          Login
        </h1>

        <Input placeholder="Insira seu CPF" onChange={(e) => setCpf(e.target.value)} />

        <Input type="password" placeholder="Insira sua senha" onChange={(e) => setPassword(e.target.value)} />

        <Button 
          className="w-full mt-4"
          onClick={handleLogin}
        >
          Entrar
        </Button>

      </div>
    </div>
  );
}
