import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">

      {/* HEADER */}
      <header className="bg-zinc-900 text-white p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Library Stock</h1>

        {/* NAVBAR */}
        <nav className="flex gap-6 text-sm">
          <Link href="/dashboard" className="hover:text-zinc-300">
            Dashboard
          </Link>

          <Link href="/books" className="hover:text-zinc-300">
            Books
          </Link>

          <Link href="/login" className="hover:text-zinc-300">
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
