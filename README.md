# OndaMonad

**El primer agente urbano con trazabilidad on-chain.**

Una sola conversación que planea tu ruta, reserva tu lugar, paga tu cuenta y deja todo verificado en blockchain — transporte, comida, eventos y pagos resueltos en segundos.

Construido para el **Mundial 2026** en la Ciudad de México. Desplegado en **Monad**.

---

## El problema

Vivir o visitar una ciudad grande implica coordinar transporte, pagos, acceso a eventos y consumo local todos los días — pero hoy eso se hace a través de 5 a 8 apps distintas, con múltiples métodos de pago y sin ninguna capa de confianza que conecte a los actores.

### Para el turista extranjero
Un visitante llega a CDMX sin pesos, sin contexto de movilidad, sin saber qué es confiable y sin hablar el idioma. Las casas de cambio cobran spreads del 8 al 12%. Las apps locales no están en inglés. No existe un agente que resuelva todo en una sola interfaz.

### Para el usuario local
Usa Uber para ir, Ticketmaster para entrar, Rappi para comer, una wallet distinta para cada cosa. La fricción diaria es tiempo perdido y dinero en intermediarios.

### Para el negocio local
Restaurantes, guías turísticos, vendedores en fan fests y hoteles boutique no tienen forma de demostrar su calidad más allá de reseñas que pueden ser manipuladas. Dependen de plataformas que cobran entre 15% y 30% de comisión y se quedan con la relación con el cliente.

---

## La solución

OndaMonad es un agente conversacional que **actúa** en el mundo real:

- **Hablas como hablas.** El agente detecta tu intención, consulta APIs en paralelo y presenta opciones. Una respuesta ejecuta todo.
- **Ejecución real, no redirección.** La mayoría de los asistentes responden con links. OndaMonad paga, reserva y confirma dentro de la misma conversación.
- **Trazabilidad como subproducto.** Cada acción ejecutada queda registrada en Monad sin que hagas nada extra. La confianza no se declara — se demuestra con datos públicos.
- **Bilingüe por diseño.** El turista escribe en inglés, el comercio opera en pesos, el sistema liquida en segundos.
- **El negocio gana sin saber de cripto.** El comercio recibe pesos por SPEI en su CLABE normal. La capa on-chain es invisible para ellos.

---

## Cómo funciona

El sistema tiene cuatro capas que operan en secuencia — invisibles para el usuario:

```
┌─────────────────────────────────────────┐
│         CAPA 1: CONVERSACIÓN            │
│  Web + Telegram · Español / Inglés      │
│  Detección de intención · Contexto      │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│         CAPA 2: ORQUESTACIÓN            │
│  Agente IA · Tool calling               │
│  Metro API · Uber API · Google Maps     │
│  Planificación multi-paso               │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│         CAPA 3: EJECUCIÓN               │
│  Swap USDC → MXNB en Monad             │
│  Liquidación SPEI · Micropagos          │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│         CAPA 4: TRAZABILIDAD            │
│  Registro on-chain en Monad             │
│  Reputación del locatario · Dashboard   │
│  Historial público y verificable        │
└─────────────────────────────────────────┘
```

**El usuario escribe → el agente actúa → la blockchain registra.**

---

## Reputación on-chain: reemplazar la reseña por el hecho

Hoy un restaurante tiene 4.3 estrellas en Google. Ese número puede ser manipulado, comprado o simplemente subjetivo. No hay forma de saber si esas 847 reseñas son reales.

OndaMonad hace algo diferente: **en lugar de guardar una opinión, guarda un hecho verificable.**

> _"El 14 de junio de 2026 a las 20:47, se ejecutó un pago de $850 MXN al negocio Taquería El Paisa. Transacción completada."_

Ese hecho vive en Monad para siempre. Nadie lo puede borrar. Nadie lo puede editar.

### Cómo funciona

1. **El pago genera el registro automáticamente.** Cuando el agente ejecuta una transacción, en ese mismo momento se escribe un registro en Monad con el ID del negocio, monto, timestamp, hash y categoría del servicio. El usuario no hace nada extra.

2. **El contrato inteligente acumula el historial.** Cada transacción completada se suma al perfil on-chain del negocio: total de transacciones, volumen acumulado, antigüedad, última actividad y disputas.

3. **El score de reputación se calcula encima de esos datos.** El score vive en el backend pero se deriva de datos on-chain verificables. Cualquiera puede auditarlo en el explorador de Monad.

4. **La reputación es portable.** El locatario tiene una dirección en Monad que es suya. Si mañana sale de OndaMonad y se une a otra plataforma que lea datos de Monad, su historial va con él.

### Comparativa

|  | TripAdvisor / Google | OndaMonad |
|---|---|---|
| ¿Dónde vive el historial? | En sus servidores | En Monad (blockchain pública) |
| ¿Qué pasa si cierran? | Se pierde todo | El historial queda para siempre |
| ¿Puede el negocio llevárselo? | No | Sí — es su dirección on-chain |
| ¿Se puede falsificar? | Sí (reseñas compradas) | No — cada transacción tiene hash real |

---

## Smart Contract — Reputacion.sol

El contrato `Reputacion` es el núcleo de la capa de trazabilidad. Registra cada pago como un hecho inmutable y acumula el perfil de cada negocio.

### Contrato desplegado

| Red | Dirección |
|---|---|
| **Monad** | [`0x767541ff1434aDf07A7Da738C81ADE007d975ceF`](https://explorer.monad.xyz/address/0x767541ff1434aDf07A7Da738C81ADE007d975ceF) |

### Funciones principales

| Función | Qué hace |
|---|---|
| `registrarLocatario(address)` | Da de alta un negocio en el sistema |
| `registrarPago(address, monto, categoria)` | Registra un pago completado — se llama automáticamente cuando el agente liquida una transacción |
| `abrirDisputa(address)` / `resolverDisputa(address)` | Tracking de reclamaciones |
| `obtenerPerfil(address)` | Consulta pública del perfil acumulado de un negocio |
| `obtenerTransaccion(txId)` | Detalle de cualquier transacción — cualquiera puede verificar |

### Datos del perfil acumulado

Cada negocio registrado tiene un `PerfilLocatario` con:
- Total de transacciones completadas
- Volumen total en MXNB
- Timestamp de la primera y última transacción (antigüedad)
- Disputas abiertas y resueltas

Todos estos datos son públicos. Cualquiera puede consultarlos directamente en la blockchain.

---

## Para quién es esto

### Turista extranjero
Llega a CDMX sin pesos, sin contexto, frecuentemente sin español. Tiene dinero y disposición a gastar. OndaMonad le resuelve las primeras 4 horas después de aterrizar — transporte, comida, pagos, idioma — en una sola conversación.

### Usuario local
Vive en CDMX y quiere dejar de usar 8 apps para planear un fin de semana. Un chat que coordina todo, desde la ruta en Metro hasta la reserva del restaurante.

### Negocio local (locatario)
Restaurante, guía, vendedor en fan fest, hotel boutique. Recibe clientes atribuidos por el agente, cobra en pesos por SPEI, y acumula un historial de reputación que es suyo — no de Rappi ni de TripAdvisor.

---

## Stack técnico

| Capa | Tecnología |
|---|---|
| Frontend | Next.js · React · Tailwind CSS |
| Agente IA | Vercel AI SDK · Claude |
| Movilidad | Metro CDMX API · Google Maps · Uber |
| Blockchain | Monad (EVM-compatible) · Solidity 0.8.24 |
| Contratos | Hardhat 3 |

---

## Desarrollo local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar contratos
npx hardhat build

# Build de producción
npm run build
```

---

## El Mundial 2026 como evento ancla

El Mundial 2026 es el escenario perfecto: millones de personas con dinero en un lugar físico específico durante un tiempo acotado, donde los problemas que resolvemos — transporte, pagos, acceso, confianza, idioma — son los más urgentes del momento.

Si el sistema funciona ahí, funciona en cualquier ciudad, cualquier día.

---

**OndaMonad** — tu ciudad en una conversación, con prueba on-chain.
