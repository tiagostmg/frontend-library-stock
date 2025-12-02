import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export default function AddBookInstanceModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Exemplar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Exemplar</DialogTitle>
          <DialogDescription>
            Preencha os detalhes do novo exemplar abaixo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-left">
              Status
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AVAILABLE">Disponível</SelectItem>
                <SelectItem value="CHECKED_OUT">Emprestado</SelectItem>
                <SelectItem value="LOST">Perdido</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-left">
              Estado de Preservação
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EXCELLENT">Excelente</SelectItem>
                <SelectItem value="GOOD">Bom</SelectItem>
                <SelectItem value="REGULAR">Regular</SelectItem>
                <SelectItem value="BAD">Ruim</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </div>
        <DialogFooter>
          <Button type="submit" className="cursor-pointer">Adicionar Exemplar</Button>
          <Button variant="outline" className="cursor-pointer">Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}