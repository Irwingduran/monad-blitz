"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mountain, Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Mountain className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">Cima</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Funciones
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Como funciona
          </Link>
          <Link href="#locatarios" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Para negocios
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/chat">Iniciar chat</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/chat">Probar Cima</Link>
          </Button>
        </div>

        <button 
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4">
          <nav className="flex flex-col gap-4">
            <Link 
              href="#features" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Funciones
            </Link>
            <Link 
              href="#how-it-works" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Como funciona
            </Link>
            <Link 
              href="#locatarios" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Para negocios
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <Button variant="ghost" size="sm" asChild className="justify-start">
                <Link href="/chat">Iniciar chat</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/chat">Probar Cima</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
