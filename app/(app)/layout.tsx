"use client"

import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useContext } from "react";
import { BookOpen, Home, LogOut, Settings, User, UserCircle } from "lucide-react"
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"; // Assuming this path for shadcn dropdown-menu
import { ModeToggle } from "@/components/ModeToggle";


export default function AppLayout({ children }: { children: React.ReactNode }) {
  const auth = useContext(AuthContext);
  const router = useRouter();

  function handleLogout() {
    if (!auth) return;

    auth.logout();
    router.push('/auth/signin');
  }
  return (
    <div className="h-screen overflow-hidden flex flex-col">

      {/* HEADER */}
      <header className="bg-zinc-900 text-white p-4 flex items-center justify-between shadow-lg">
        <Link href="/home" className="text-xl font-semibold hover:text-zinc-300">Biblioteca</Link>

        {/* NAVBAR */}
        <nav className="flex gap-6 text-sm">

          <Link href="/home" className="hover:text-zinc-300 flex gap-2 items-center">
            <Home className="w-5 h-5" />
            Home
          </Link>

          <Link href="/books" className="hover:text-zinc-300 flex gap-2 items-center">
            <BookOpen className="w-5 h-5" />
            Livros
          </Link>

          <Link href="/readers" className="hover:text-zinc-300 flex gap-2 items-center">
            <User className="w-5 h-5" />
            Leitores
          </Link>

          <ModeToggle className="bg-transparent border-zinc-700 text-white hover:bg-zinc-800 hover:text-white" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button suppressHydrationWarning className="flex items-center gap-2 hover:text-zinc-300 focus:outline-none cursor-pointer">
                {/*
                  TODO: ver problema do suppressHydrationWarning
                */}
                <UserCircle className="w-6 h-6" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 bg-white text-zinc-900 rounded-md shadow-lg py-1 z-10">
              <div className="block w-full text-left px-4 py-2 text-sm text-zinc-700">
                {auth?.user?.name || "Nome Usuário"}
              </div>
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-zinc-100 cursor-pointer">
                  <Settings className="w-4 h-4" />
                  Informações do Perfil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 cursor-pointer">
                <LogOut className="w-4 h-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </header>

      {/* PAGE CONTENT */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
