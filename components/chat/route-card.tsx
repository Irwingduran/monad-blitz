"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Train, Bus, Car, Clock, DollarSign, ArrowRight } from "lucide-react"

interface RouteData {
  origin: string
  destination: string
  options: Array<{
    type: "metro" | "metrobus" | "uber" | "combined"
    duration: string
    cost: string
    steps: string[]
  }>
}

interface RouteCardProps {
  data: RouteData | null
  isLoading: boolean
}

const transportIcons = {
  metro: Train,
  metrobus: Bus,
  uber: Car,
  combined: Train
}

const transportLabels = {
  metro: "Metro",
  metrobus: "Metrobus",
  uber: "Uber",
  combined: "Combinado"
}

export function RouteCard({ data, isLoading }: RouteCardProps) {
  if (isLoading) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (!data) return null

  return (
    <Card className="w-full max-w-sm border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-foreground">Opciones de ruta</CardTitle>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{data.origin}</span>
          <ArrowRight className="h-3 w-3" />
          <span>{data.destination}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.options.map((option, index) => {
          const Icon = transportIcons[option.type]
          return (
            <div 
              key={index}
              className="p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary" />
                  <Badge variant="secondary" className="text-xs">
                    {transportLabels[option.type]}
                  </Badge>
                </div>
                <Button size="sm" variant="ghost" className="h-7 text-xs">
                  Seleccionar
                </Button>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {option.duration}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  {option.cost}
                </span>
              </div>
              
              <div className="text-xs text-muted-foreground">
                {option.steps.slice(0, 2).join(" → ")}
                {option.steps.length > 2 && ` → +${option.steps.length - 2} mas`}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
