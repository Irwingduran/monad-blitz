"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Mic } from "lucide-react"
import { useRef, useEffect } from "react"

interface ChatInputProps {
  input: string
  setInput: (value: string) => void
  onSend: () => void
  isLoading: boolean
}

export function ChatInput({ input, setInput, onSend, isLoading }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [input])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className="border-t border-border p-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="relative flex items-end gap-2 bg-muted rounded-2xl p-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Pregunta a Cima..."
            className="min-h-[44px] max-h-[200px] resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 pr-20 text-sm"
            disabled={isLoading}
            rows={1}
          />
          
          <div className="flex items-center gap-1 absolute right-2 bottom-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              disabled={isLoading}
            >
              <Mic className="h-4 w-4" />
              <span className="sr-only">Grabar voz</span>
            </Button>
            
            <Button 
              size="icon" 
              className="h-8 w-8"
              onClick={onSend}
              disabled={!input.trim() || isLoading}
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Enviar mensaje</span>
            </Button>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground text-center mt-2">
          Cima puede cometer errores. Verifica informacion importante.
        </p>
      </div>
    </div>
  )
}
