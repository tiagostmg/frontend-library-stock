import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { api } from "@/utils/api"
import { toast } from "sonner"
import { useState } from "react"

interface AddBookModalProps {
  onSuccess?: () => void;
}

export default function AddBookModal({ onSuccess }: AddBookModalProps) {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [publisher, setPublisher] = useState<string>('');
  const [isbn, setIsbn] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleAddBook = async () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Título é obrigatório';
    }
    if (!author.trim()) {
      newErrors.author = 'Autor é obrigatório';
    }
    if (!publisher.trim()) {
      newErrors.publisher = 'Editora é obrigatória';
    }
    if (!isbn.trim()) {
      newErrors.isbn = 'ISBN é obrigatório';
    }
    if (!category.trim()) {
      newErrors.category = 'Categoria é obrigatória';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If no errors, proceed with adding the book
    try {
      await api.post('/books', {
        title,
        author,
        publisher,
        isbn,
        category,
        notes
      });

      toast.success("Livro adicionado com sucesso!");

      // Clear inputs and close modal after successful submission
      handleCleanInputs();
      setIsModalOpen(false);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Erro ao adicionar livro:", error);
      toast.error("Erro ao adicionar livro. Tente novamente.");
    }
  }

  const handleCleanInputs = () => {
    setTitle('');
    setAuthor('');
    setPublisher('');
    setIsbn('');
    setCategory('');
    setNotes('');
    setErrors({}); // Clear errors as well
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer"
          onClick={handleCleanInputs}
        >
          <Plus className="h-4 w-4" />
          Adicionar Livro
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Livro</DialogTitle>
          <DialogDescription>
            Preencha os detalhes do novo livro abaixo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="title" className="text-right pt-2">
              Título
            </Label>
            <div className="col-span-3">
              <Input
                id="title"
                placeholder="Senhor dos Anéis"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setErrors((prev: { [key: string]: string }) => ({ ...prev, title: '' }));
                }}
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="author" className="text-right pt-2">
              Autor
            </Label>
            <div className="col-span-3">
              <Input
                id="author"
                placeholder="J.R.R. Tolkien"
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                  setErrors((prev: { [key: string]: string }) => ({ ...prev, author: '' }));
                }}
                className={errors.author ? 'border-red-500' : ''}
              />
              {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="publisher" className="text-right pt-2">
              Editora
            </Label>
            <div className="col-span-3">
              <Input
                id="publisher"
                placeholder="HarperCollins"
                value={publisher}
                onChange={(e) => {
                  setPublisher(e.target.value);
                  setErrors((prev: { [key: string]: string }) => ({ ...prev, publisher: '' }));
                }}
                className={errors.publisher ? 'border-red-500' : ''}
              />
              {errors.publisher && <p className="text-red-500 text-sm mt-1">{errors.publisher}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="isbn" className="text-right pt-2">
              ISBN
            </Label>
            <div className="col-span-3">
              <Input
                id="isbn"
                placeholder="9780618053267"
                value={isbn}
                onChange={(e) => {
                  setIsbn(e.target.value);
                  setErrors((prev: { [key: string]: string }) => ({ ...prev, isbn: '' }));
                }}
                className={errors.isbn ? 'border-red-500' : ''}
              />
              {errors.isbn && <p className="text-red-500 text-sm mt-1">{errors.isbn}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="category" className="text-right pt-2">
              Categoria
            </Label>
            <div className="col-span-3">
              <Select
                value={category}
                onValueChange={(value) => {
                  setCategory(value);
                  setErrors((prev: { [key: string]: string }) => ({ ...prev, category: '' }));
                }}
              >
                <SelectTrigger id="category" className={errors.category ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ficcao">Ficção</SelectItem>
                  <SelectItem value="Nao-ficcao">Não Ficção</SelectItem>
                  <SelectItem value="Historia">História</SelectItem>
                  <SelectItem value="Ciencia">Ciência</SelectItem>
                  <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                  <SelectItem value="Biografia">Biografia</SelectItem>
                  <SelectItem value="Fantasia">Fantasia</SelectItem>
                  <SelectItem value="Misterio">Mistério</SelectItem>
                  <SelectItem value="Romance">Romance</SelectItem>
                  <SelectItem value="Filosofia">Filosofia</SelectItem>
                  <SelectItem value="Educacao">Educação</SelectItem>
                  <SelectItem value="Arte">Arte</SelectItem>
                  <SelectItem value="Religiao">Religião</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="notes" className="text-right pt-2">
              Notas
            </Label>
            <div className="col-span-3">
              <Textarea
                id="notes"
                placeholder="Alguma nota sobre o livro..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="cursor-pointer" onClick={handleAddBook}>Adicionar Livro</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}