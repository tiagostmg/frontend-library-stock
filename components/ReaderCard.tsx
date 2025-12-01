import { Reader } from "@/types/reader.types"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import { useRouter } from "next/navigation"

export function ReaderCard({ id, name, email, phone, cpf }: Reader) {
  const router = useRouter()
  return (
    <Card
      className="w-full hover:shadow-lg transition-all cursor-pointer rounded-2xl"
      onClick={() => router.push(`/readers/${id}`)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <User className="w-5 h-5 text-muted-foreground" />
          {name}
        </CardTitle>
      </CardHeader>

      <CardContent className="text-muted-foreground space-y-1">
        <p>
          <span className="font-medium">CPF:</span> {cpf}
        </p>
        <p>
          <span className="font-medium">Email:</span> {email}
        </p>
        <p>
          <span className="font-medium">Telefone:</span> {phone}
        </p>
      </CardContent>

      <CardFooter>
        <Button className="w-full cursor-pointer" variant="default"
          onClick={() => router.push(`/readers/${id}`)}
        >
          Ver detalhes
        </Button>
      </CardFooter>
    </Card>
  )
}
