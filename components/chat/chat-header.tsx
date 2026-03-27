import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mountain, ArrowLeft, Settings } from "lucide-react"

export function ChatHeader() {
  return (
    <header className="flex items-center justify-between h-14 px-4 border-b border-border bg-background">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild className="h-8 w-8">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Volver al inicio</span>
          </Link>
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Mountain className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <span className="font-semibold text-foreground text-sm">OndaMonad</span>
            <div className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-xs text-muted-foreground">En linea</span>
            </div>
          </div>
        </div>
      </div>

      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Settings className="h-4 w-4" />
        <span className="sr-only">Configuracion</span>
      </Button>
    </header>
  )
}
