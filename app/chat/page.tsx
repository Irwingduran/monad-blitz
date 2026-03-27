"use client"

import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { ChatHeader } from "@/components/chat/chat-header"
import { ChatMessages } from "@/components/chat/chat-messages"
import { ChatInput } from "@/components/chat/chat-input"
import { ChatSuggestions } from "@/components/chat/chat-suggestions"

export default function ChatPage() {
  const [input, setInput] = useState("")
  
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
