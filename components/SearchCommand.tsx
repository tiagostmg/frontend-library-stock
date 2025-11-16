import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
} from "@/components/ui/command"

import { Book } from "@/types/book.types"

interface SearchCommandProps {
  items: Book[]
  onSelect: (book: Book) => void
}

export function SearchCommand({ items, onSelect }: SearchCommandProps) {
  return (
    <Command className="rounded-lg border shadow-md w-full">
      {/* <CommandInput placeholder="Buscar livros..." /> */}

      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>

        <CommandGroup>
          {items.map((item) => (
            <CommandItem
              key={item.id}
              value={item.title}
              onSelect={() => onSelect(item)}
            >
              <div className="flex flex-col">
                <span className="font-semibold">{item.title}</span>
                <span className="text-sm text-muted-foreground">
                  {item.author} • {item.category}
                </span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
