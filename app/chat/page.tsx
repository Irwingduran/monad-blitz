"use client"

import { useState, useRef, useCallback } from "react"
import type { UIMessage } from "ai"
import { ChatHeader } from "@/components/chat/chat-header"
import { ChatMessages } from "@/components/chat/chat-messages"
import { getSimulationExchanges } from "@/lib/simulation-data"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

export default function ChatPage() {
  const [messages, setMessages] = useState<UIMessage[]>([])
  const [exchangeIdx, setExchangeIdx] = useState(0)
  const [typing, setTyping] = useState(false)
  const [waitingForUser, setWaitingForUser] = useState(true)
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const exchangesRef = useRef(getSimulationExchanges())

  const totalExchanges = exchangesRef.current.length
  const done = exchangeIdx >= totalExchanges
  const currentExchange = !done ? exchangesRef.current[exchangeIdx] : null

  const handleUserClick = useCallback(() => {
    if (typing || done || !currentExchange) return

    setMessages((prev) => [...prev, currentExchange.userMessage])
    setWaitingForUser(false)
    setTyping(true)

    typingTimer.current = setTimeout(() => {
      setMessages((prev) => [...prev, ...currentExchange.agentMessages])
      setTyping(false)
      setExchangeIdx((prev) => prev + 1)
      setWaitingForUser(true)
    }, 2500)
  }, [typing, done, currentExchange])

  const resetChat = () => {
    if (typingTimer.current) clearTimeout(typingTimer.current)
    exchangesRef.current = getSimulationExchanges()
    setMessages([])
    setExchangeIdx(0)
    setTyping(false)
    setWaitingForUser(true)
  }

  const isEmpty = messages.length === 0

  return (
    <div className="flex flex-col h-screen bg-background">
      <ChatHeader />

      <main className="flex-1 overflow-hidden flex flex-col">
        {isEmpty && !typing ? (
          <div className="flex-1 flex flex-col items-center justify-center p-4 gap-6">
            <div className="text-center">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-primary">O</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Hola, soy OndaMonad
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Tu agente urbano para la Ciudad de México.
                Transporte, comida, pagos y reputación on-chain — todo en una conversación.
              </p>
            </div>

            {currentExchange && (
              <button
                onClick={handleUserClick}
                className="max-w-md w-full text-left bg-muted hover:bg-muted/80 border border-border hover:border-primary/50 rounded-2xl p-5 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">
                    Haz click para empezar
                  </span>
                  <span className="text-[10px] text-muted-foreground">↵</span>
                </div>
                <p className="text-sm text-foreground group-hover:text-primary transition-colors">
                  {currentExchange.userPrompt}
                </p>
              </button>
            )}
          </div>
        ) : (
          <ChatMessages messages={messages} isLoading={typing} />
        )}

        {/* Área de input */}
        <div className="border-t border-border p-4 bg-background">
          <div className="max-w-3xl mx-auto">
            {done ? (
              <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-2xl p-4">
                <p className="text-sm text-primary font-medium">
                  Así funciona el agente urbano on-chain
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs gap-1"
                  onClick={resetChat}
                >
                  <RotateCcw className="h-3 w-3" /> Reiniciar
                </Button>
              </div>
            ) : typing ? (
              <div className="relative flex items-center justify-center bg-muted/50 rounded-2xl p-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-2 w-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span className="text-xs text-muted-foreground">OndaMonad está respondiendo...</span>
                </div>
              </div>
            ) : waitingForUser && currentExchange ? (
              <button
                onClick={handleUserClick}
                className="w-full text-left bg-muted hover:bg-muted/80 border border-border hover:border-primary/50 rounded-2xl p-4 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">
                    Haz click para enviar
                  </span>
                  <span className="text-[10px] text-muted-foreground">↵</span>
                </div>
                <p className="text-sm text-foreground group-hover:text-primary transition-colors">
                  {currentExchange.userPrompt}
                </p>
              </button>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  )
}
