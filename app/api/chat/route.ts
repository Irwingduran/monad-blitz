import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  tool,
  UIMessage,
} from "ai"
import * as z from "zod"
import { metroLines, metrobusLines, findRoute, fares, transferStations } from "@/lib/metro-cdmx"

export const maxDuration = 60

// Mapeo de zonas/colonias a estaciones de metro cercanas
const zoneToStation: Record<string, string[]> = {
  "polanco": ["Polanco", "Auditorio"],
  "condesa": ["Chilpancingo", "Patriotismo"],
  "roma": ["Insurgentes", "Sevilla", "Hospital General"],
  "roma norte": ["Insurgentes", "Sevilla"],
  "coyoacan": ["Coyoacan", "Viveros"],
  "centro": ["Zocalo", "Bellas Artes", "Allende"],
  "centro historico": ["Zocalo", "Bellas Artes"],
  "reforma": ["Insurgentes", "Chapultepec", "Hidalgo"],
  "chapultepec": ["Chapultepec", "Auditorio"],
  "santa fe": ["Observatorio"],
  "del valle": ["Zapata", "Division del Norte"],
  "narvarte": ["Etiopia", "Eugenia"],
  "doctores": ["Doctores", "Hospital General"],
  "aeropuerto": ["Terminal Aerea", "Hangares"],
  "xochimilco": ["Tasquena"],
  "iztapalapa": ["Iztapalapa", "Constitucion de 1917"],
  "tepito": ["Tepito", "Lagunilla"],
  "la merced": ["Merced", "Candelaria"],
  "mixcoac": ["Mixcoac"],
  "tacubaya": ["Tacubaya"],
  "indios verdes": ["Indios Verdes"],
  "universidad": ["Universidad", "Copilco"],
  "cuauhtemoc": ["Cuauhtemoc"],
}

function findNearestStation(location: string): string {
  const locationLower = location.toLowerCase()
  
  // Buscar en zonas conocidas
  for (const [zone, stations] of Object.entries(zoneToStation)) {
    if (locationLower.includes(zone)) {
      return stations[0]
    }
  }
  
  // Buscar si es directamente una estacion
  for (const line of metroLines) {
    const station = line.stations.find(s => 
      s.toLowerCase().includes(locationLower) || 
      locationLower.includes(s.toLowerCase())
    )
    if (station) return station
  }
  
  return location
}

// Tool: Get transit route
const getRouteTool = tool({
  description: "Obtiene opciones de ruta de transporte en CDMX entre dos puntos. Usa esta herramienta cuando el usuario pregunte como llegar de un lugar a otro.",
  inputSchema: z.object({
    origin: z.string().describe("Punto de origen del viaje"),
    destination: z.string().describe("Punto de destino del viaje"),
    preferredMode: z.enum(["metro", "metrobus", "uber", "any"]).default("any").describe("Modo de transporte preferido"),
  }),
  async *execute({ origin, destination, preferredMode }) {
    yield { state: "loading" as const }
    
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    const originStation = findNearestStation(origin)
    const destStation = findNearestStation(destination)
    const route = findRoute(originStation, destStation)
    
    const routeOptions = []
    
    if ((preferredMode === "any" || preferredMode === "metro") && route) {
      const lineInfo = metroLines.find(l => l.id === route.lines[0])
      const steps = [`Caminar a estacion ${originStation}`]
      
      if (route.transfers.length > 0) {
        steps.push(`Tomar Linea ${route.lines[0]} direccion ${lineInfo?.terminals[1] || "terminal"}`)
        steps.push(`Transbordar en ${route.transfers[0]} a Linea ${route.lines[1]}`)
        steps.push(`Bajar en estacion ${destStation}`)
      } else {
        steps.push(`Tomar Linea ${route.lines[0]} direccion ${lineInfo?.terminals[1] || "terminal"}`)
        steps.push(`Bajar en estacion ${destStation}`)
      }
      
      routeOptions.push({
        type: "metro" as const,
        duration: `${route.estimatedTime} min`,
        cost: `$${fares.metro} MXN`,
        steps,
      })
    }
    
    if (preferredMode === "any" || preferredMode === "metrobus") {
      routeOptions.push({
        type: "metrobus" as const,
        duration: `${(route?.estimatedTime || 30) + 5} min`,
        cost: `$${fares.metrobus} MXN`,
        steps: [
          `Caminar a parada de Metrobus cerca de ${origin}`,
          "Tomar linea mas cercana",
          `Bajar en parada cercana a ${destination}`,
        ],
      })
    }
    
    if (preferredMode === "any" || preferredMode === "uber") {
      const basePrice = Math.floor(Math.random() * 50) + 70
      routeOptions.push({
        type: "uber" as const,
        duration: `${Math.floor((route?.estimatedTime || 30) * 0.6)} min`,
        cost: `$${basePrice}-${basePrice + 40} MXN`,
        steps: [
          `Uber te recoge en ${origin}`,
          `Viaje directo a ${destination}`,
        ],
      })
    }

    yield {
      state: "ready" as const,
      origin,
      destination,
      options: routeOptions,
    }
  },
})

// Tool: Initiate payment
const initiatePaymentTool = tool({
  description: "Inicia un pago en cripto usando Monad blockchain. Usa esta herramienta cuando el usuario quiera pagar algo con criptomonedas.",
  inputSchema: z.object({
    amount: z.string().describe("Cantidad a pagar"),
    currency: z.string().default("MON").describe("Moneda (por defecto MON)"),
    recipient: z.string().describe("Destinatario del pago"),
    description: z.string().describe("Descripcion del pago"),
  }),
  async *execute({ amount, currency, recipient, description }) {
    yield { state: "loading" as const }
    
    await new Promise((resolve) => setTimeout(resolve, 1000))

    yield {
      state: "ready" as const,
      amount,
      currency,
      recipient,
      description,
      status: "pending" as const,
    }
  },
})

// Tool: Get recommendations
const getRecommendationsTool = tool({
  description: "Obtiene recomendaciones de lugares cerca de una ubicacion. Usa esta herramienta cuando el usuario busque restaurantes, cafeterias, tiendas u otros lugares.",
  inputSchema: z.object({
    location: z.string().describe("Ubicacion o zona de la ciudad"),
    category: z.enum(["restaurant", "cafe", "shop", "entertainment", "any"]).describe("Categoria de lugar"),
    query: z.string().nullable().describe("Busqueda especifica opcional"),
  }),
  async *execute({ location, category, query }) {
    yield { state: "loading" as const }
    
    await new Promise((resolve) => setTimeout(resolve, 1200))
    
    // Mock recommendations
    const places = [
      {
        name: "Cafe Avellaneda",
        type: "cafe",
        address: `${location}, CDMX`,
        rating: 4.7,
        priceLevel: "$$",
        highlight: "Wifi rapido, ambiente tranquilo",
      },
      {
        name: "La Docena Oyster Bar",
        type: "restaurant", 
        address: `${location}, CDMX`,
        rating: 4.5,
        priceLevel: "$$$",
        highlight: "Mariscos frescos, terraza",
      },
      {
        name: "Cielito Querido Cafe",
        type: "cafe",
        address: `${location}, CDMX`,
        rating: 4.3,
        priceLevel: "$",
        highlight: "Cafe mexicano, ambiente acogedor",
      },
    ]

    yield {
      state: "ready" as const,
      location,
      category,
      query,
      places: places.filter(p => category === "any" || p.type === category).slice(0, 3),
    }
  },
})

const tools = {
  getRoute: getRouteTool,
  initiatePayment: initiatePaymentTool,
  getRecommendations: getRecommendationsTool,
}

const systemPrompt = `Eres Cima, un asistente de IA amigable y util para navegar la Ciudad de Mexico.

Tu personalidad:
- Eres bilingue (espanol e ingles), pero prefieres responder en espanol a menos que el usuario escriba en ingles
- Eres conciso pero amable, usas un tono conversacional
- Conoces muy bien la CDMX: colonias, transporte publico, lugares populares
- Eres entusiasta sobre tecnologia blockchain y Monad

Tus capacidades:
- Puedes ayudar con rutas de transporte usando Metro, Metrobus y Uber
- Puedes iniciar pagos en criptomonedas con Monad ($MON)
- Puedes recomendar lugares: restaurantes, cafeterias, tiendas, entretenimiento
- Conoces horarios del Metro (5am-12am entre semana, 6am-12am sabados, 7am-12am domingos)

Reglas importantes:
- Siempre usa las herramientas disponibles cuando sean relevantes
- Para rutas, usa la herramienta getRoute
- Para pagos cripto, usa la herramienta initiatePayment
- Para recomendaciones de lugares, usa la herramienta getRecommendations
- Si no tienes informacion especifica, se honesto y sugiere alternativas
- Manten las respuestas breves (2-3 oraciones max) a menos que el usuario pida mas detalles`

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: "openai/gpt-4o-mini",
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    tools,
    stopWhen: stepCountIs(5),
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse()
}
