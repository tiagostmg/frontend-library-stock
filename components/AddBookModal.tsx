import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export default function AddBookModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Livro
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Livro</DialogTitle>
          <DialogDescription>
            Preencha os detalhes do novo livro abaixo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Título
            </Label>
            <Input placeholder="Título" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Autor
            </Label>
            <Input id="author" placeholder="J.R.R. Tolkien" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Editora
            </Label>
            <Input id="publisher" placeholder="HarperCollins" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              ISBN
            </Label>
            <Input id="isbn" placeholder="978-0-618-05326-7" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Categoria
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fiction">Ficção</SelectItem>
                <SelectItem value="fantasy">Fantasia</SelectItem>
                <SelectItem value="science">Ciência</SelectItem>
                <SelectItem value="history">História</SelectItem>
                <SelectItem value="biography">Biografia</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Notas
            </Label>
            <Textarea placeholder="Alguma nota sobre o livro..." className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="cursor-pointer">Adicionar Livro</Button>
          <Button variant="outline" className="cursor-pointer">Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}