Agente Urbano On-Chain
Product Requirements Document · Versión 0 Ciudad de México · Mundial 2026

1. Visión del producto
Un agente autónomo de vida urbana: una sola conversación que planea, reserva, paga y deja trazabilidad de todo lo que ocurre en la ciudad. Lo que Perplexity intenta con su modo assistant o Rabbit R1 como hardware, pero con algo que ninguno tiene — una capa de verdad on-chain.

El Mundial 2026 es el evento ancla perfecto: millones de personas con dinero en un lugar físico específico durante un tiempo acotado, donde los problemas que resolvemos — transporte, pagos, acceso, confianza, idioma — son los más urgentes del momento. Si el sistema funciona ahí, funciona en cualquier ciudad, cualquier día.

2. Problema que resolvemos
2.1 La fricción urbana es caótica y costosa
El usuario urbano moderno necesita coordinar transporte, pagos, acceso a eventos y consumo local todos los días — pero lo hace a través de 5 a 8 apps distintas, con múltiples métodos de pago y sin ninguna capa de confianza que conecte a los actores. El costo oculto de esta fricción es tiempo, malas decisiones y dinero perdido en intermediarios.

2.2 Los locatarios no tienen herramientas de confianza
Los comercios locales — restaurantes, guías, vendedores en estadios — no tienen forma de demostrar su calidad más allá de reseñas en plataformas que pueden ser manipuladas. Dependen de Airbnb Experiences, TripAdvisor o Rappi, que cobran entre 15% y 30% de comisión y se quedan con la relación con el cliente.

2.3 Los turistas extranjeros son los más vulnerables
Un visitante extranjero en CDMX durante el Mundial 2026 llega sin pesos, sin contexto de movilidad, sin saber qué es confiable y sin hablar el idioma. Las casas de cambio cobran spreads de 8 a 12%. Las aplicaciones locales no están en inglés. No existe un agente que resuelva todo esto en una sola interfaz.

3. Usuarios objetivo
Tres perfiles, una plataforma.

Perfil A — Turista extranjero (usuario primario)
Llega a CDMX en blanco: sin pesos, sin contexto de movilidad, sin red local, frecuentemente sin español. Tiene dinero y disposición a gastar, pero la fricción operativa lo lleva a las opciones más seguras y más caras.

Dolor principal: No sabe en qué confiar ni cómo moverse
Momento clave: Las primeras 4 horas después de aterrizar
Métrica de valor: Tiempo desde llegada al aeropuerto hasta primera transacción completada
Disposición a pagar: Alta — está en modo "que alguien me resuelva esto"
Perfil B — Usuario local urbano (usuario secundario)
Vive en CDMX y usa entre 5 y 8 apps para coordinar su semana. Sufre la fragmentación diaria: Uber para ir, Ticketmaster para entrar, Rappi para comer, una wallet distinta para cada cosa.

Dolor principal: Fatiga de apps y fricción en pagos cotidianos
Momento clave: Planear un fin de semana, ir a un partido, explorar algo nuevo
Métrica de valor: Reducción de pasos entre "quiero hacer algo" y "está confirmado"
Disposición a pagar: Media — valora la conveniencia pero es más sensible al precio
Perfil C — Locatario / negocio local (usuario B2B del panel)
Restaurante, guía turístico, vendedor en fan fest, hotel boutique. Tiene calidad real pero no puede demostrarla fuera de plataformas que le cobran 15–30%.

Dolor principal: Dependencia de intermediarios costosos y reputación no portable
Momento clave: Cuando recibe su primer cliente atribuido por el agente
Métrica de valor: Tráfico incremental atribuible + ahorro en comisiones
Disposición a pagar: Media-alta si ya recibió valor demostrable primero
4. Propuesta de valor y diferenciadores
4.1 Posicionamiento
No somos una wallet de cripto. No somos un asistente de IA. Somos el primer agente urbano que actúa en el mundo real con trazabilidad on-chain — el punto de convergencia entre la experiencia de usuario que da la IA y la confianza que da blockchain.

4.2 Diferenciadores de ejecución
1. Del lenguaje natural a la acción en menos de 90 segundos El usuario no navega menús ni cambia de app. Escribe como habla. El agente detecta la intención, consulta APIs en paralelo y presenta opciones. Una respuesta ejecuta todo.

2. Ejecución real, no redirección La mayoría de los asistentes responden con links. Este agente paga, reserva y confirma dentro de la misma conversación. El hash on-chain es la prueba.

3. Trazabilidad como subproducto natural Cada acción ejecutada queda registrada en Monad sin que el usuario haga nada extra. La confianza no se declara — se demuestra con datos públicos y verificables.

4. Bilingüe por diseño El turista escribe en inglés, el comercio opera en pesos, el sistema liquida en segundos. La barrera de idioma y la barrera de pago se resuelven en la misma transacción.

5. El locatario gana sin saber de cripto El comercio recibe por SPEI en su CLABE normal. La capa on-chain es invisible para ellos hasta que deciden subir al producto premium.

5. Alcance del MVP — V1
5.1 Qué entra en V1
Interfaz conversacional en español e inglés (web + Telegram)
Módulo de movilidad: consulta en tiempo real de Metro STC, Metrobús y estimados de Uber
Módulo de pagos: swap cripto → MXN on-chain en Monad con liquidación por SPEI
Módulo de tickets: compra de accesos a eventos con NFT en Monad como prueba de ownership
Módulo de predicciones: pools del Mundial con micropagos y liquidación automática
Panel de locatario: registro on-chain, recepción de pagos y dashboard básico de ventas
Una ciudad piloto: Ciudad de México
5.2 Qué queda fuera de V1 — deliberadamente
Soporte multichain completo (ETH, SOL, BTC) — solo USDC en Monad en V1
Expansión a GDL y MTY — después del piloto CDMX
App nativa iOS / Android — solo web y Telegram en V1
Integración con Rappi y Uber Eats — solo Uber para transporte en V1
Tokenomics propios y token nativo — no en V1
5.3 Criterios de éxito del MVP
| Métrica | Objetivo | |---|---| | Transacciones on-chain en primeros 3 partidos | 500 | | Locatarios verificados y activos antes del primer partido | 50 | | Tiempo promedio conversación → acción ejecutada | < 90 segundos | | NPS del usuario turista | > 50 | | Fee de conversión cobrado exitosamente | 95% de transacciones |

6. Arquitectura del sistema
6.1 Las cuatro capas
┌─────────────────────────────────────────┐
│         CAPA 1: CONVERSACIÓN            │
│  Telegram Bot + Web · ES/EN             │
│  Detección de intención · Contexto      │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│         CAPA 2: ORQUESTACIÓN            │
│  Agente Claude · Tool calling           │
│  Google Maps · Metro API · Uber API     │
│  Planificación multi-paso               │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│         CAPA 3: EJECUCIÓN               │
│  Swap USDC→MXNB · Monad                 │
│  Mint NFT ticket · SPEI liquidación     │
│  Pools de predicción · Micropagos       │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│         CAPA 4: TRAZABILIDAD            │
│  Registro on-chain en Monad             │
│  Atribución de tráfico por QR/link      │
│  Reputación del locatario · Dashboard   │
└─────────────────────────────────────────┘