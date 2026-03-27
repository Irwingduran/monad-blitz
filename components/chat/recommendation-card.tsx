"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, Star, DollarSign } from "lucide-react"

interface Place {
  name: string
  type: string
  address: string
  rating: number
  priceLevel: string
  highlight: string
}

interface RecommendationData {
  location: string
  category: string
  query: string | null
  places: Place[]
}

interface RecommendationCardProps {
  data: RecommendationData | null
  isLoading: boolean
}

export function RecommendationCard({ data, isLoading }: RecommendationCardProps) {
  if (isLoading) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-40" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (!data || !data.places || data.places.length === 0) return null

  return (
    <Card className="w-full max-w-sm border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          Recomendaciones en {data.location}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.places.map((place, index) => (
          <div 
            key={index}
            className="p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/50 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-medium text-foreground text-sm">{place.name}</h4>
                <p className="text-xs text-muted-foreground">{place.address}</p>
              </div>
              <Badge variant="secondary" className="text-xs">
                {place.type === "cafe" ? "Cafe" : 
                 place.type === "restaurant" ? "Restaurante" : 
                 place.type === "shop" ? "Tienda" : place.type}
              </Badge>
            </div>
            
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 text-accent fill-accent" />
                {place.rating}
              </span>
              <span className="flex items-center gap-0.5">
                <DollarSign className="h-3 w-3" />
                {place.priceLevel}
              </span>
            </div>
            
            <p className="text-xs text-primary">
              {place.highlight}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
