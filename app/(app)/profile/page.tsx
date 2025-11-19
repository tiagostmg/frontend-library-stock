"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { UserCircle, Shield, CreditCard } from "lucide-react";

export default function ProfilePage() {
  const auth = useContext(AuthContext);

  if (!auth || !auth.user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-zinc-500">Carregando informações do usuário...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full">
      <h1 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">Meu Perfil</h1>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        {/* Header Background */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="bg-white dark:bg-zinc-900 p-1 rounded-full">
              <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400">
                <UserCircle className="w-16 h-16" />
              </div>
            </div>
            <button className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
              Editar Perfil
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{auth.user.name || "Nome do Usuário"}</h2>
              <p className="text-zinc-500 dark:text-zinc-400">Membro da Biblioteca</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3 mb-2 text-zinc-900 dark:text-zinc-100 font-medium">
                  <CreditCard className="w-5 h-5 text-blue-500" />
                  Informações Pessoais
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">CPF</span>
                    <span className="font-mono text-zinc-700 dark:text-zinc-300">{auth.user.cpf || "00000000000"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Status</span>
                    <span className="text-green-600 font-medium">Ativo</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3 mb-2 text-zinc-900 dark:text-zinc-100 font-medium">
                  <Shield className="w-5 h-5 text-indigo-500" />
                  Segurança
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500">Senha</span>
                    <button className="text-blue-600 hover:underline text-xs">Alterar senha</button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500">Autenticação</span>
                    <span className="text-zinc-700 dark:text-zinc-300">Básica</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
