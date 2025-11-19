export default function HomePage() {
  return (
    <div className="flex gap-6 w-full h-full">
      {/* COLUMN 1: Livros Atrasados */}
      <div className="flex-1 bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md flex flex-col">
        <h2 className="text-xl font-semibold mb-4 text-red-600 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-circle"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
          Livros Atrasados
        </h2>
        <div className="flex-1 overflow-y-auto space-y-3">
          {[
            { title: "Dom Casmurro", user: "Ana Silva", days: 5 },
            { title: "1984", user: "Carlos Souza", days: 2 },
            { title: "O Pequeno Príncipe", user: "Mariana Lima", days: 12 },
            { title: "A Revolução dos Bichos", user: "Pedro Santos", days: 1 },
          ].map((item, i) => (
            <div key={i} className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900/50">
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100">{item.title}</h3>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-zinc-600 dark:text-zinc-400">{item.user}</span>
                <span className="text-red-600 font-semibold">{item.days} dias</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COLUMN 2: Estado de Conservação */}
      <div className="flex-1 bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md flex flex-col">
        <h2 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
          Estado de Conservação
        </h2>
        <div className="flex-1 overflow-y-auto space-y-3">
          {[
            { title: "Clean Code", condition: "Excelente", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
            { title: "Harry Potter 1", condition: "Bom", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
            { title: "Senhor dos Anéis", condition: "Regular", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" },
            { title: "Iracema", condition: "Ruim", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
            { title: "O Hobbit", condition: "Excelente", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">{item.title}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.color}`}>
                {item.condition}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* COLUMN 3: Empréstimo */}
      <div className="flex-1 bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md flex flex-col">
        <h2 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right-left"><path d="m16 3 4 4-4 4" /><path d="M20 7H4" /><path d="m8 21-4-4 4-4" /><path d="M4 17h16" /></svg>
          Empréstimo
        </h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Pesquisar Livro</label>
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              <input
                type="text"
                placeholder="ISBN, Título ou Autor..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-100 dark:border-zinc-800">
            <div className="text-center text-zinc-500 dark:text-zinc-400 py-4 text-sm">
              Nenhum livro selecionado
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
              Emprestar
            </button>
            <button className="flex items-center justify-center gap-2 py-2 px-4 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 rounded-lg font-medium transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
              Devolver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
