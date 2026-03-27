import Link from "next/link"
import { Mountain } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-gray-200/60 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Mountain className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">Cima</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-4">
              El primer agente urbano que planea, reserva, paga y deja 
              trazabilidad on-chain de todo lo que haces en la ciudad.
            </p>
            <p className="text-xs text-muted-foreground/60">
              Construido para el Mundial 2026 en CDMX. Impulsado por Monad.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Producto</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Diferenciadores
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Como funciona
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Hablar con Cima
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Para negocios</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#locatarios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Panel de locatarios
                </Link>
              </li>
              <li>
                <Link href="#locatarios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Registrar negocio
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Verificacion on-chain
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            2026 Cima. Trazabilidad on-chain en Monad.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacidad
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terminos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
