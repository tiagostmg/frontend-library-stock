import { Book } from "@/types/book.types"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"
import { useRouter } from "next/navigation"

export function BookCard({ id, title, author, category }: Book) {
  const router = useRouter()
  return (
    <Card className="w-full hover:shadow-lg transition-all cursor-pointer rounded-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <BookOpen className="w-5 h-5 text-muted-foreground" />
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="text-muted-foreground space-y-1">
        <p>
          <span className="font-medium">Autor:</span> {author}
        </p>
        <p>
          <span className="font-medium">Categoria:</span> {category}
        </p>
      </CardContent>

      <CardFooter>
        <Button className="w-full cursor-pointer" variant="default"
          onClick={() => router.push(`/books/${id}`)}
        >
          Ver detalhes
        </Button>
      </CardFooter>
    </Card>
  )
}
