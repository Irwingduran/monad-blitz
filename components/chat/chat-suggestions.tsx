"use client"

import { Button } from "@/components/ui/button"
import { Train, MapPin, Wallet, Coffee } from "lucide-react"

const suggestions = [
  {
    icon: Train,
    text: "Como llego de Polanco a Coyoacan en Metro?",
    short: "Ruta Metro"
  },
  {
    icon: MapPin,
    text: "Que restaurantes recomiendas cerca de Reforma?",
    short: "Recomendaciones"
  },
  {
    icon: Wallet,
    text: "Quiero pagar un servicio con $MON",
    short: "Pago cripto"
  },
  {
    icon: Coffee,
    text: "Busco una cafeteria con wifi en Roma Norte",
    short: "Cafeterias"
  }
]

interface ChatSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void
}

export function ChatSuggestions({ onSuggestionClick }: ChatSuggestionsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="outline"
          className="h-auto p-4 flex items-start gap-3 text-left justify-start hover:bg-muted/50 hover:border-primary/50 transition-colors"
          onClick={() => onSuggestionClick(suggestion.text)}
        >
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <suggestion.icon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-muted-foreground">{suggestion.short}</span>
            <span className="text-sm text-foreground font-normal leading-snug">{suggestion.text}</span>
          </div>
        </Button>
      ))}
    </div>
  )
}
