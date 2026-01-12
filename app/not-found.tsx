import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-foreground">Pagina niet gevonden</h2>
        <p className="mt-2 text-muted-foreground max-w-md mx-auto">
          De pagina die je zoekt bestaat niet of is verplaatst.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Naar Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Naar Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
