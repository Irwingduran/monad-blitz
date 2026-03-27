import type { UIMessage } from "ai"

/**
 * Simulación interactiva: un turista llega a CDMX para el Mundial 2026.
 * El usuario clickea la sugerencia → se muestra su mensaje →
 * el agente responde con typing animado.
 *
 * Cada "exchange" tiene el texto del usuario y la respuesta del agente.
 */

export interface SimulationExchange {
  /** Texto que ve el usuario como sugerencia clickeable */
  userPrompt: string
  /** Mensaje del usuario que aparece en el chat */
  userMessage: UIMessage
  /** Respuesta(s) del agente */
  agentMessages: UIMessage[]
}

// ai SDK v6 usa "dynamic-tool" como type para tools dinámicas
function toolPart(data: {
  toolCallId: string
  toolName: string
  state: string
  input: unknown
  output: unknown
}): UIMessage["parts"][number] {
  return {
    type: "dynamic-tool",
    ...data,
  } as UIMessage["parts"][number]
}

let idCounter = 0
const nextId = () => `sim-${++idCounter}`

export function getSimulationExchanges(): SimulationExchange[] {
  idCounter = 0

  return [
    // ─── 1: Turista llega al aeropuerto ──────────────────────────
    {
      userPrompt: "Acabo de aterrizar en el aeropuerto de CDMX para el Mundial. ¿Cómo llego a mi hotel en Polanco?",
      userMessage: {
        id: nextId(),
        role: "user",
        parts: [{ type: "text", text: "Acabo de aterrizar en el aeropuerto de CDMX para el Mundial. ¿Cómo llego a mi hotel en Polanco?" }],
      },
      agentMessages: [
        {
          id: nextId(),
          role: "assistant",
          parts: [
            {
              type: "text",
              text: "¡Bienvenido a la CDMX! 🇲🇽 Excelente timing para el Mundial. Te busco las mejores opciones del aeropuerto a Polanco.",
            },
            toolPart({
              toolCallId: "route-1",
              toolName: "getRoute",
              state: "output-available",
              input: { origin: "Aeropuerto", destination: "Polanco", preferredMode: "any" },
              output: {
                state: "ready",
                origin: "Aeropuerto (AICM)",
                destination: "Polanco",
                options: [
                  {
                    type: "metro",
                    duration: "45 min",
                    cost: "$5 MXN",
                    steps: [
                      "Caminar a estación Terminal Aérea",
                      "Tomar Línea 5 (amarilla) dirección Politécnico",
                      "Transbordar en La Raza a Línea 3",
                      "Bajar en estación Polanco",
                    ],
                  },
                  {
                    type: "uber",
                    duration: "25 min",
                    cost: "$180-$250 MXN",
                    steps: [
                      "Uber te recoge en Terminal 1 – Puerta 4",
                      "Viaje directo a Polanco por Circuito Interior",
                    ],
                  },
                ],
              },
            }),
            {
              type: "text",
              text: "El Metro es baratísimo ($5 MXN ≈ $0.25 USD) pero implica un transbordo y puede ser complicado con maletas. Uber es más rápido y cómodo — te lo recomiendo para tu primer viaje con equipaje.",
            },
          ],
        },
      ],
    },

    // ─── 2: Buscar comida ────────────────────────────────────────
    {
      userPrompt: "¡Va, Uber! Ya estando en el hotel, ¿dónde como unos buenos tacos cerca de Polanco?",
      userMessage: {
        id: nextId(),
        role: "user",
        parts: [{ type: "text", text: "¡Va, Uber! Ya estando en el hotel, ¿dónde como unos buenos tacos cerca de Polanco? Algo que coman los locales de verdad." }],
      },
      agentMessages: [
        {
          id: nextId(),
          role: "assistant",
          parts: [
            {
              type: "text",
              text: "¡Buena elección! Aquí van mis top picks de tacos reales en Polanco — todos verificados en nuestra red con reputación on-chain:",
            },
            toolPart({
              toolCallId: "rec-1",
              toolName: "getRecommendations",
              state: "output-available",
              input: { location: "Polanco", category: "restaurant", query: "tacos autenticos" },
              output: {
                state: "ready",
                location: "Polanco",
                category: "restaurant",
                query: "tacos autenticos",
                places: [
                  {
                    name: "El Turix",
                    type: "restaurant",
                    address: "Emilio Castelar 212, Polanco",
                    rating: 4.8,
                    priceLevel: "$",
                    highlight: "🔗 127 pagos on-chain · Cochinita pibil legendaria",
                  },
                  {
                    name: "Taquería Orinoco",
                    type: "restaurant",
                    address: "Av. Presidente Masaryk 62, Polanco",
                    rating: 4.6,
                    priceLevel: "$$",
                    highlight: "🔗 89 pagos on-chain · Tacos norteños, carne asada",
                  },
                  {
                    name: "Los Panchos",
                    type: "restaurant",
                    address: "Tolstoi 9, Polanco",
                    rating: 4.5,
                    priceLevel: "$",
                    highlight: "🔗 203 pagos on-chain · Carnitas desde 1945",
                  },
                ],
              },
            }),
            {
              type: "text",
              text: "Fíjate en los badges 🔗 on-chain — estos negocios tienen historial de transacciones verificado en Monad. El Turix tiene 127 pagos registrados; no son reseñas falsas, son transacciones reales. ¿Quieres pagar con cripto cuando vayas?",
            },
          ],
        },
      ],
    },

    // ─── 3: Pagar con cripto ─────────────────────────────────────
    {
      userPrompt: "¡El Turix se ve increíble! Sí, quiero pagar con cripto. Tengo USDC.",
      userMessage: {
        id: nextId(),
        role: "user",
        parts: [{ type: "text", text: "¡El Turix se ve increíble! Sí, quiero pagar con cripto. Tengo USDC, ¿cómo funciona?" }],
      },
      agentMessages: [
        {
          id: nextId(),
          role: "assistant",
          parts: [
            {
              type: "text",
              text: "Así funciona: tú pagas en USDC sobre Monad, hacemos el swap a MXNB al instante, y El Turix recibe pesos en su cuenta bancaria por SPEI. Ellos no necesitan saber de cripto — simplemente les llega su pago. Te preparo uno para una comida típica:",
            },
            toolPart({
              toolCallId: "pay-1",
              toolName: "initiatePayment",
              state: "output-available",
              input: {
                amount: "12.50",
                currency: "USDC",
                recipient: "El Turix – Polanco",
                description: "Comida · Cochinita Pibil x2 + Aguas frescas",
              },
              output: {
                state: "ready",
                amount: "12.50",
                currency: "USDC",
                recipient: "El Turix – Polanco",
                description: "Comida · Cochinita Pibil x2 + Aguas frescas",
                status: "pending",
              },
            }),
            {
              type: "text",
              text: "Cuando confirmes, el pago se procesa en segundos. El tipo de cambio es transparente — sin las comisiones ocultas del 8-12% de las casas de cambio. Y esta transacción se registra on-chain automáticamente, construyendo el score de reputación verificado de El Turix.",
            },
          ],
        },
      ],
    },

    // ─── 4: Preguntar sobre reputación ───────────────────────────
    {
      userPrompt: "¿Cómo funciona exactamente el sistema de reputación on-chain?",
      userMessage: {
        id: nextId(),
        role: "user",
        parts: [{ type: "text", text: "Está buenísimo eso. Y todos estos registros on-chain... ¿cómo funciona el sistema de reputación? ¿Cómo sé que puedo confiar en un lugar?" }],
      },
      agentMessages: [
        {
          id: nextId(),
          role: "assistant",
          parts: [
            {
              type: "text",
              text: `Cada pago que pasa por OndaMonad crea un registro inmutable en Monad a través de nuestro smart contract de Reputación. Esto es lo que se trackea por cada negocio:

📊 **Perfil on-chain de El Turix:**
• Transacciones totales: 127
• Volumen total: 48,350 MXNB
• Primera transacción: 15 de marzo, 2026
• Última transacción: Hoy
• Disputas abiertas: 0
• Disputas resueltas: 1 (de 127 — 99.2% limpio)

Estos datos son 100% públicos y verificables — cualquiera puede auditarlos en el explorador de Monad. Nadie puede falsificarlos, borrarlos ni comprar mejores números. Es lo opuesto a TripAdvisor donde compras reseñas.

El contrato categoriza cada pago (Comida, Transporte, Eventos, Hospedaje, Experiencias) para que veas exactamente qué tipo de negocio hacen. El score de reputación se calcula off-chain a partir de estos datos públicos.

Piensa en ello como un buró de crédito para negocios locales — pero transparente y que no le pertenece a nadie. 🔗`,
            },
          ],
        },
      ],
    },

    // ─── 5: Planear el partido ───────────────────────────────────
    {
      userPrompt: "Mi partido es mañana en el Azteca. ¿Me ayudas a planear la ruta y dónde comer antes?",
      userMessage: {
        id: nextId(),
        role: "user",
        parts: [{ type: "text", text: "Buenísimo. Oye, mi partido es mañana en el Estadio Azteca. ¿Me ayudas con la ruta desde Polanco y un lugar para comer antes del partido?" }],
      },
      agentMessages: [
        {
          id: nextId(),
          role: "assistant",
          parts: [
            {
              type: "text",
              text: "¡Día de partido! 🏟️ Te planeo la ruta al Estadio Azteca y te busco spots cerca del estadio.",
            },
            toolPart({
              toolCallId: "route-2",
              toolName: "getRoute",
              state: "output-available",
              input: { origin: "Polanco", destination: "Estadio Azteca", preferredMode: "any" },
              output: {
                state: "ready",
                origin: "Polanco",
                destination: "Estadio Azteca",
                options: [
                  {
                    type: "metro",
                    duration: "55 min",
                    cost: "$5 MXN",
                    steps: [
                      "Caminar a estación Polanco (Línea 7)",
                      "Tomar Línea 7 dirección Barranca del Muerto",
                      "Transbordar en Tacubaya a Línea 9",
                      "Bajar en Estadio Azteca",
                    ],
                  },
                  {
                    type: "uber",
                    duration: "35 min",
                    cost: "$220-$350 MXN",
                    steps: [
                      "Uber te recoge en Polanco",
                      "Viaje por Periférico Sur al Estadio Azteca",
                      "⚠️ Tráfico intenso en día de partido — sal con tiempo",
                    ],
                  },
                ],
              },
            }),
            toolPart({
              toolCallId: "rec-2",
              toolName: "getRecommendations",
              state: "output-available",
              input: { location: "Estadio Azteca", category: "any", query: "comida bebidas pre-partido" },
              output: {
                state: "ready",
                location: "Estadio Azteca",
                category: "any",
                query: "comida bebidas pre-partido",
                places: [
                  {
                    name: "Fan Fest Azteca",
                    type: "entertainment",
                    address: "Explanada del Estadio Azteca",
                    rating: 4.4,
                    priceLevel: "$$",
                    highlight: "🔗 312 pagos on-chain · Pantallas gigantes, cerveza, ambiente",
                  },
                  {
                    name: "Tacos Don Güero",
                    type: "restaurant",
                    address: "Calzada de Tlalpan 3465",
                    rating: 4.7,
                    priceLevel: "$",
                    highlight: "🔗 56 pagos on-chain · Suadero y pastor, clásico de estadio",
                  },
                ],
              },
            }),
            {
              type: "text",
              text: "Pro tip: toma el Metro en día de partido — el tráfico alrededor del Azteca se pone loco. Sal 2 horas antes. El Fan Fest es el lugar para calentar antes del partido, y puedes pagar todo ahí con cripto a través de mí. Todas las transacciones rastreables en Monad. ¡Disfruta el partido! ⚽",
            },
          ],
        },
      ],
    },

    // ─── 6: Cierre ───────────────────────────────────────────────
    {
      userPrompt: "Increíble. Una sola conversación y ya tengo todo resuelto.",
      userMessage: {
        id: nextId(),
        role: "user",
        parts: [{ type: "text", text: "Esto es increíble. Una sola conversación y tengo transporte, comida, pagos y puedo verificar todo on-chain. Mucho mejor que andar con 5 apps diferentes." }],
      },
      agentMessages: [
        {
          id: nextId(),
          role: "assistant",
          parts: [
            {
              type: "text",
              text: `¡Exactamente la idea! 🎯 Esto es lo que resolvimos en una sola conversación:

🚇 **Transporte** — Ruta óptima del aeropuerto a tu hotel + al Estadio Azteca
🌮 **Comida** — Restaurantes verificados con reputación on-chain real
💰 **Pagos** — Cripto → pesos en segundos, sin comisiones abusivas
🔗 **Trazabilidad** — Cada transacción registrada en Monad, verificable por cualquiera

Sin estafas de casas de cambio. Sin reseñas falsas. Sin comisiones del 15-30% para los negocios. Un solo agente que planea, paga y comprueba todo on-chain.

¡Bienvenido a la CDMX. Disfruta el Mundial! 🇲🇽⚽`,
            },
          ],
        },
      ],
    },
  ]
}
