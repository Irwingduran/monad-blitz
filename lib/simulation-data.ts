import type { UIMessage } from "ai"

/**
 * Conversación simulada: un turista estadounidense llega a CDMX
 * para el Mundial 2026. El agente OndaMonad lo guía paso a paso:
 * transporte, comida, pagos on-chain y reputación verificable.
 *
 * Cada "step" contiene uno o más mensajes que se revelan juntos.
 */

export interface SimulationStep {
  messages: UIMessage[]
  delay: number // ms antes de mostrar el siguiente step
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

export function getSimulationSteps(): SimulationStep[] {
  idCounter = 0

  return [
    // ─── Step 1: Turista llega al aeropuerto ─────────────────────
    {
      delay: 800,
      messages: [
        {
          id: nextId(),
          role: "user",
          parts: [
            {
              type: "text",
              text: "Hey! I just landed at Mexico City airport for the World Cup. I need to get to my hotel in Polanco. What's the best way?",
            },
          ],
        },
      ],
    },

    // ─── Step 2: Agente responde con rutas ───────────────────────
    {
      delay: 2000,
      messages: [
        {
          id: nextId(),
          role: "assistant",
          parts: [
            {
              type: "text",
              text: "Welcome to CDMX! 🇲🇽 Great timing for the World Cup. Let me find the best routes from the airport to Polanco for you.",
            },
            toolPart({
              toolCallId: "route-1",
              toolName: "getRoute",
              state: "output-available",
              input: {
                origin: "Aeropuerto",
                destination: "Polanco",
                preferredMode: "any",
              },
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
              text: "The Metro is incredibly cheap ($5 MXN ≈ $0.25 USD) but it involves one transfer and can be crowded with luggage. Uber is faster and more comfortable — I'd recommend it for your first trip with bags. Want me to help with anything else once you arrive?",
            },
          ],
        },
      ],
    },

    // ─── Step 3: Turista pregunta por comida ─────────────────────
    {
      delay: 1500,
      messages: [
        {
          id: nextId(),
          role: "user",
          parts: [
            {
              type: "text",
              text: "I'll take Uber, thanks! Once I'm at the hotel, where can I get some authentic tacos near Polanco? Something the locals actually eat.",
            },
          ],
        },
      ],
    },

    // ─── Step 4: Agente recomienda lugares ───────────────────────
    {
      delay: 2200,
      messages: [
        {
          id: nextId(),
          role: "assistant",
          parts: [
            {
              type: "text",
              text: "Great choice! Here are my top picks for real-deal tacos in Polanco — all verified merchants on our network with on-chain reputation:",
            },
            toolPart({
              toolCallId: "rec-1",
              toolName: "getRecommendations",
              state: "output-available",
              input: {
                location: "Polanco",
                category: "restaurant",
                query: "tacos autenticos",
              },
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
              text: "Notice the 🔗 on-chain badges — these merchants have verified transaction histories on Monad. El Turix has 127 successful payments registered; no fake reviews, just real transactions. Want to pay with crypto when you go?",
            },
          ],
        },
      ],
    },

    // ─── Step 5: Turista quiere pagar con cripto ─────────────────
    {
      delay: 1800,
      messages: [
        {
          id: nextId(),
          role: "user",
          parts: [
            {
              type: "text",
              text: "El Turix looks amazing! Yes, I'd love to pay with crypto. I have some USDC. How does it work?",
            },
          ],
        },
      ],
    },

    // ─── Step 6: Agente explica y ejecuta pago simulado ──────────
    {
      delay: 2500,
      messages: [
        {
          id: nextId(),
          role: "assistant",
          parts: [
            {
              type: "text",
              text: "Here's how it works: you pay in USDC on Monad, we swap it to MXNB instantly, and El Turix receives pesos in their bank account via SPEI. They don't need to know about crypto — they just get paid. Let me set up a payment for a typical taco meal:",
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
              text: "Once you confirm, the payment goes through in seconds. The swap rate is transparent — no hidden 8-12% exchange fees like currency exchange booths. And this transaction gets registered on-chain automatically, building El Turix's verified reputation score.",
            },
          ],
        },
      ],
    },

    // ─── Step 7: Turista pregunta sobre reputación ───────────────
    {
      delay: 2000,
      messages: [
        {
          id: nextId(),
          role: "user",
          parts: [
            {
              type: "text",
              text: "That's cool! So all these on-chain records... how does the reputation system actually work? How do I know I can trust a place?",
            },
          ],
        },
      ],
    },

    // ─── Step 8: Agente explica el smart contract ────────────────
    {
      delay: 2800,
      messages: [
        {
          id: nextId(),
          role: "assistant",
          parts: [
            {
              type: "text",
              text: `Every payment through OndaMonad creates an immutable record on Monad via our Reputación smart contract. Here's what gets tracked for each merchant:

📊 **Perfil on-chain de El Turix:**
• Total transactions: 127
• Total volume: 48,350 MXNB
• First transaction: March 15, 2026
• Last transaction: Today
• Open disputes: 0
• Resolved disputes: 1 (out of 127 — 99.2% clean)

This data is 100% public and verifiable — anyone can audit it on the Monad explorer. No one can fake it, delete it, or buy better numbers. It's the opposite of TripAdvisor where reviews can be bought.

The smart contract categorizes every payment (Food, Transport, Events, Lodging, Experiences) so you can see exactly what kind of business they do. The reputation score is calculated off-chain from this public data.

Think of it as a credit score for local businesses — but transparent and owned by no one. 🔗`,
            },
          ],
        },
      ],
    },

    // ─── Step 9: Turista pregunta por el partido ─────────────────
    {
      delay: 1500,
      messages: [
        {
          id: nextId(),
          role: "user",
          parts: [
            {
              type: "text",
              text: "That's really smart. Now, my match is tomorrow at Estadio Azteca. Can you help me plan the route from Polanco and maybe find a place to pregame near the stadium?",
            },
          ],
        },
      ],
    },

    // ─── Step 10: Agente da ruta al Azteca + recomendaciones ─────
    {
      delay: 2500,
      messages: [
        {
          id: nextId(),
          role: "assistant",
          parts: [
            {
              type: "text",
              text: "Match day! 🏟️ Let me plan your route to Estadio Azteca and find some spots near the stadium.",
            },
            toolPart({
              toolCallId: "route-2",
              toolName: "getRoute",
              state: "output-available",
              input: {
                origin: "Polanco",
                destination: "Estadio Azteca",
                preferredMode: "any",
              },
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
              input: {
                location: "Estadio Azteca",
                category: "any",
                query: "pre-game food drinks",
              },
              output: {
                state: "ready",
                location: "Estadio Azteca",
                category: "any",
                query: "pre-game food drinks",
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
              text: "Pro tip: take the Metro on match day — traffic gets insane around the Azteca. Leave 2 hours early. The Fan Fest is the place to be pre-game, and you can pay for everything there with crypto through me. All transactions traceable on Monad. Enjoy the match! ⚽",
            },
          ],
        },
      ],
    },

    // ─── Step 11: Cierre — agente resume el valor ────────────────
    {
      delay: 2000,
      messages: [
        {
          id: nextId(),
          role: "user",
          parts: [
            {
              type: "text",
              text: "This is incredible. One conversation and I've got transport, food, payments, and I can verify everything on-chain. Way better than juggling 5 different apps.",
            },
          ],
        },
      ],
    },

    {
      delay: 2200,
      messages: [
        {
          id: nextId(),
          role: "assistant",
          parts: [
            {
              type: "text",
              text: `That's exactly the idea! 🎯 Here's what we just did in one conversation:

🚇 **Transporte** — Ruta óptima del aeropuerto a tu hotel + al Estadio Azteca
🌮 **Comida** — Restaurantes verificados con reputación on-chain real
💰 **Pagos** — Crypto → pesos en segundos, sin comisiones abusivas
🔗 **Trazabilidad** — Cada transacción registrada en Monad, verificable por cualquiera

No currency exchange scams. No fake reviews. No 15-30% platform fees for merchants. Just one agent that plans, pays, and proves everything on-chain.

Welcome to CDMX. Enjoy the Mundial! 🇲🇽⚽`,
            },
          ],
        },
      ],
    },
  ]
}
