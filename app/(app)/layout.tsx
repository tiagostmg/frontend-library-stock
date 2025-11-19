"use client"

import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useContext } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const auth = useContext(AuthContext);

  function handleLogout() {
    if (!auth) return;

    auth.logout();
  }
  return (
    <div className="min-h-screen flex flex-col">

      {/* HEADER */}
      <header className="bg-zinc-900 text-white p-4 flex items-center justify-between">
        <Link href="/dashboard" className="text-xl font-semibold hover:text-zinc-300">Library Stock</Link>

        {/* NAVBAR */}
        <nav className="flex gap-6 text-sm">
          <Link href="/dashboard" className="hover:text-zinc-300">
            Dashboard
          </Link>

          <Link href="/books" className="hover:text-zinc-300">
            Books
          </Link>

          <Link href="/auth/signin" className="hover:text-zinc-300"
            onClick={() => handleLogout()}
          >
            Logout
          </Link>
        </nav>
      </header>

      {/* PAGE CONTENT */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
