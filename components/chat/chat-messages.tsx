"use client"

import { useRef, useEffect } from "react"
import type { UIMessage } from "ai"
import { cn } from "@/lib/utils"
import { Mountain, User } from "lucide-react"
import { RouteCard } from "@/components/chat/route-card"
import { PaymentCard } from "@/components/chat/payment-card"
import { RecommendationCard } from "@/components/chat/recommendation-card"

interface ChatMessagesProps {
  messages: UIMessage[]
  isLoading: boolean
}

function getUIMessageText(msg: UIMessage): string {
  if (!msg.parts || !Array.isArray(msg.parts)) return ""
  return msg.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("")
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {messages.map((message) => {
          const text = getUIMessageText(message)
          const isAssistant = message.role === "assistant"

          // Check for tool calls in message parts
          const toolCalls = message.parts?.filter(
            (p) => p.type === "tool-invocation"
          ) || []

          return (
            <div key={message.id} className={cn(
              "flex gap-3",
              isAssistant ? "flex-row" : "flex-row-reverse"
            )}>
              <div className={cn(
                "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center",
                isAssistant ? "bg-primary" : "bg-muted"
              )}>
                {isAssistant ? (
                  <Mountain className="h-4 w-4 text-primary-foreground" />
                ) : (
                  <User className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              
              <div className={cn(
                "flex flex-col gap-2 max-w-[80%]",
                !isAssistant && "items-end"
              )}>
                {text && (
                  <div className={cn(
                    "rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    isAssistant 
                      ? "bg-muted text-foreground rounded-tl-sm" 
                      : "bg-primary text-primary-foreground rounded-tr-sm"
                  )}>
                    {text}
                  </div>
                )}
                
                {toolCalls.map((toolCall, idx) => {
                  if (toolCall.type !== "tool-invocation") return null
                  
                  if (toolCall.toolName === "getRoute") {
                    return (
                      <RouteCard 
                        key={idx} 
                        data={toolCall.state === "output-available" ? toolCall.output : null}
                        isLoading={toolCall.state === "input-streaming" || toolCall.state === "input-available"}
                      />
                    )
                  }
                  
                  if (toolCall.toolName === "initiatePayment") {
                    return (
                      <PaymentCard 
                        key={idx}
                        data={toolCall.state === "output-available" ? toolCall.output : null}
                        isLoading={toolCall.state === "input-streaming" || toolCall.state === "input-available"}
                      />
                    )
                  }

                  if (toolCall.toolName === "getRecommendations") {
                    return (
                      <RecommendationCard 
                        key={idx}
                        data={toolCall.state === "output-available" ? toolCall.output : null}
                        isLoading={toolCall.state === "input-streaming" || toolCall.state === "input-available"}
                      />
                    )
                  }
                  
                  return null
                })}
              </div>
            </div>
          )
        })}

        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex gap-3">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <Mountain className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
