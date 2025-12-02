import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useState } from "react"
import { api } from "@/utils/api"
import { toast } from "sonner"

interface AddBookInstanceModalProps {
  bookId: string;
  onSuccess?: () => void;
}

export default function AddBookInstanceModal({ bookId, onSuccess }: AddBookInstanceModalProps) {
  const [preservationState, setPreservationState] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddInstance = async () => {
    const newErrors: { [key: string]: string } = {};

    if (!preservationState) {
      newErrors.preservationState = 'Estado de preservação é obrigatório';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      await api.post(`/book-instances/${bookId}`, {
        preservationState,
        notes
      });

      toast.success("Exemplar adicionado com sucesso!");
      setIsModalOpen(false);
      setPreservationState('');
      setNotes('');

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Erro ao adicionar exemplar:", error);
      toast.error("Erro ao adicionar exemplar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const handleCleanInputs = () => {
    setPreservationState('');
    setNotes('');
    setErrors({});
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" onClick={handleCleanInputs}>
          <Plus className="h-4 w-4" />
          Adicionar Exemplar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Exemplar</DialogTitle>
          <DialogDescription>
            Preencha os detalhes do novo exemplar abaixo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-left">
              Estado de Preservação
            </Label>
            <Select
              value={preservationState}
              onValueChange={(value) => {
                setPreservationState(value);
                setErrors((prev) => ({ ...prev, preservationState: '' }));
              }}
            >
              <SelectTrigger className={`col-span-3 ${errors.preservationState ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Selecione o estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EXCELLENT">Excelente</SelectItem>
                <SelectItem value="GOOD">Bom</SelectItem>
                <SelectItem value="REGULAR">Regular</SelectItem>
                <SelectItem value="BAD">Ruim</SelectItem>
              </SelectContent>
            </Select>
            {errors.preservationState && <p className="text-red-500 text-sm col-start-2 col-span-3">{errors.preservationState}</p>}
          </div>
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-left">
              Notas
            </Label>
            <Textarea
              placeholder="Notas"
              className="col-span-3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div> */}

        </div>
        <DialogFooter>
          <Button type="submit" className="cursor-pointer" onClick={handleAddInstance} disabled={loading}>
            {loading ? "Adicionando..." : "Adicionar Exemplar"}
          </Button>
          <Button variant="outline" className="cursor-pointer" onClick={() => setIsModalOpen(false)}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}