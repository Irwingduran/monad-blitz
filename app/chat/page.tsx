"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import type { UIMessage } from "ai"
import { ChatHeader } from "@/components/chat/chat-header"
import { ChatMessages } from "@/components/chat/chat-messages"
import { ChatInput } from "@/components/chat/chat-input"
import { ChatSuggestions } from "@/components/chat/chat-suggestions"
import { getSimulationSteps } from "@/lib/simulation-data"
import { Button } from "@/components/ui/button"
import { Play, SkipForward, RotateCcw, Pause } from "lucide-react"

export default function ChatPage() {
  const [input, setInput] = useState("")

  // ── Modo simulación ──────────────────────────────────────────
  const [simMode, setSimMode] = useState(false)
  const [simMessages, setSimMessages] = useState<UIMessage[]>([])
  const [simStepIndex, setSimStepIndex] = useState(0)
  const [simPlaying, setSimPlaying] = useState(false)
  const [simTyping, setSimTyping] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const stepsRef = useRef(getSimulationSteps())

  const simTotalSteps = stepsRef.current.length
  const simDone = simStepIndex >= simTotalSteps

  // Avanzar un paso
  const advanceStep = useCallback(() => {
    const steps = stepsRef.current
    if (simStepIndex >= steps.length) {
      setSimPlaying(false)
      return
    }
    const step = steps[simStepIndex]
    setSimTyping(true)

    // Simular un pequeño delay de "typing"
    const typingDelay = step.messages[0]?.role === "assistant" ? 1200 : 400
    timerRef.current = setTimeout(() => {
      setSimMessages((prev) => [...prev, ...step.messages])
      setSimStepIndex((prev) => prev + 1)
      setSimTyping(false)
    }, typingDelay)
  }, [simStepIndex])

  // Auto-play loop
  useEffect(() => {
    if (!simPlaying || simDone || simTyping) return
    const steps = stepsRef.current
    const delay = simStepIndex > 0 ? steps[simStepIndex - 1]?.delay ?? 1500 : 600
    timerRef.current = setTimeout(() => {
      advanceStep()
    }, delay)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [simPlaying, simStepIndex, simDone, simTyping, advanceStep])

  const startSimulation = () => {
    stepsRef.current = getSimulationSteps()
    setSimMode(true)
    setSimMessages([])
    setSimStepIndex(0)
    setSimPlaying(true)
    setSimTyping(false)
  }

  const resetSimulation = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    stepsRef.current = getSimulationSteps()
    setSimMessages([])
    setSimStepIndex(0)
    setSimPlaying(false)
    setSimTyping(false)
  }

  const exitSimulation = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setSimMode(false)
    setSimMessages([])
    setSimStepIndex(0)
    setSimPlaying(false)
    setSimTyping(false)
  }

  // ── Modo normal (chat con API) ───────────────────────────────
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const isLoading = status === "streaming" || status === "submitted"
  const isEmpty = messages.length === 0

  const handleSend = () => {
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  const handleSuggestionClick = (suggestion: string) => {
    if (isLoading) return
    sendMessage({ text: suggestion })
  }

  // ── Render ───────────────────────────────────────────────────

  // Simulación activa
  if (simMode) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <ChatHeader />

        {/* Barra de controles de simulación */}
        <div className="border-b border-border bg-muted/30 px-4 py-2">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-xs font-medium text-primary">
                SIMULACIÓN
              </span>
              <span className="text-xs text-muted-foreground">
                Paso {Math.min(simStepIndex + (simTyping ? 1 : 0), simTotalSteps)} de {simTotalSteps}
              </span>
            </div>

            <div className="flex items-center gap-1">
              {!simDone && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs gap-1"
                    onClick={() => setSimPlaying((p) => !p)}
                  >
                    {simPlaying ? (
                      <><Pause className="h-3 w-3" /> Pausar</>
                    ) : (
                      <><Play className="h-3 w-3" /> Continuar</>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs gap-1"
                    onClick={() => {
                      setSimPlaying(false)
                      advanceStep()
                    }}
                    disabled={simTyping}
                  >
                    <SkipForward className="h-3 w-3" /> Paso
                  </Button>
                </>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs gap-1"
                onClick={resetSimulation}
              >
                <RotateCcw className="h-3 w-3" /> Reiniciar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs ml-2"
                onClick={exitSimulation}
              >
                Salir
              </Button>
            </div>
          </div>
        </div>

        <main className="flex-1 overflow-hidden flex flex-col">
          {simMessages.length === 0 && !simTyping ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground text-sm animate-pulse">
                Iniciando simulación...
              </p>
            </div>
          ) : (
            <ChatMessages messages={simMessages} isLoading={simTyping} />
          )}

          {/* Input deshabilitado en simulación */}
          <div className="border-t border-border p-4 bg-background">
            <div className="max-w-3xl mx-auto">
              <div className="relative flex items-center justify-center bg-muted/50 rounded-2xl p-3">
                <p className="text-xs text-muted-foreground">
                  {simDone
                    ? "✅ Simulación completada — esta es la experiencia del agente urbano on-chain"
                    : "Observa cómo el agente resuelve todo en una sola conversación..."}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // ── Modo normal ──────────────────────────────────────────────
  return (
    <div className="flex flex-col h-screen bg-background">
      <ChatHeader />

      <main className="flex-1 overflow-hidden flex flex-col">
        {isEmpty ? (
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="max-w-2xl w-full text-center">
              <div className="mb-8">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-primary">O</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Hola, soy OndaMonad
                </h1>
                <p className="text-muted-foreground">
                  Tu asistente para navegar la Ciudad de Mexico. Preguntame sobre rutas,
                  transporte, recomendaciones o pagos.
                </p>
              </div>

              <ChatSuggestions onSuggestionClick={handleSuggestionClick} />

              {/* Botón de simulación */}
              <div className="mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  className="gap-2 text-sm"
                  onClick={startSimulation}
                >
                  <Play className="h-4 w-4" />
                  Ver simulación del agente urbano
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Observa cómo un turista usa OndaMonad en el Mundial 2026
                </p>
              </div>
            </div>
          </div>
        ) : (
          <ChatMessages messages={messages} isLoading={isLoading} />
        )}

        <ChatInput
          input={input}
          setInput={setInput}
          onSend={handleSend}
          isLoading={isLoading}
        />
      </main>
    </div>
  )
}
