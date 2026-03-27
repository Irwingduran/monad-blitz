"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Wallet, ArrowRight, CheckCircle } from "lucide-react"

interface PaymentData {
  amount: string
  currency: string
  recipient: string
  description: string
  status: "pending" | "confirmed" | "completed"
  txHash?: string
}

interface PaymentCardProps {
  data: PaymentData | null
  isLoading: boolean
}

export function PaymentCard({ data, isLoading }: PaymentCardProps) {
  if (isLoading) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (!data) return null

  return (
    <Card className="w-full max-w-sm border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
          <Wallet className="h-4 w-4 text-primary" />
          Pago en Monad
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {data.amount} <span className="text-accent">{data.currency}</span>
            </div>
            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <ArrowRight className="h-3 w-3" />
              {data.recipient}
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              {data.description}
            </p>
          </div>
        </div>

        {data.status === "pending" && (
          <Button className="w-full">
            Confirmar pago
          </Button>
        )}
        
        {data.status === "confirmed" && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            Procesando transaccion...
          </div>
        )}
        
        {data.status === "completed" && (
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-sm text-green-500">
              <CheckCircle className="h-4 w-4" />
              Pago completado
            </div>
            {data.txHash && (
              <a 
                href={`https://explorer.monad.xyz/tx/${data.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline"
              >
                Ver en explorador
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
