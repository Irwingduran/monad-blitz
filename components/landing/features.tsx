import { 
  Zap, 
  Link2, 
  Shield, 
  Globe,
  ArrowRightLeft,
  Ticket,
} from "lucide-react"

const items = [
  {
    icon: Zap,
    title: "< 90 seg",
    subtitle: "De pregunta a accion",
    color: "primary" as const,
  },
  {
    icon: Link2,
    title: "Ejecuta",
    subtitle: "No redirige a links",
    color: "accent" as const,
  },
  {
    icon: Shield,
    title: "On-chain",
    subtitle: "Trazabilidad automatica",
    color: "primary" as const,
  },
  {
    icon: Globe,
    title: "ES / EN",
    subtitle: "Bilingue nativo",
    color: "accent" as const,
  },
  {
    icon: ArrowRightLeft,
    title: "USDC → MXN",
    subtitle: "Swap + SPEI al comercio",
    color: "primary" as const,
  },
  {
    icon: Ticket,
    title: "NFT Tickets",
    subtitle: "Prueba de acceso inmutable",
    color: "accent" as const,
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 md:py-28 bg-gray-200/60">
      <div className="container mx-auto px-4 md:px-6">

        {/* Heading — minimal */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            Lo que ningun otro asistente tiene
          </h2>
          <p className="text-muted-foreground">
            IA que entiende + blockchain que verifica. En una sola conversacion.
          </p>
        </div>

        {/* ── Comparison: Others vs OndaMonad — side by side ── */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Others */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-5">Otros asistentes</p>
            <div className="space-y-3">
              {[
                "Te dan links → tu haces el trabajo",
                "Sin prueba de lo que paso",
                "No manejan pagos reales",
                "Solo un idioma",
                "Resenas manipulables",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground/70">
                  <div className="h-5 w-5 rounded-full border border-border flex items-center justify-center shrink-0">
                    <span className="text-[10px]">✗</span>
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* OndaMonad */}
          <div className="rounded-2xl border-2 border-primary/30 bg-card p-6 shadow-lg shadow-primary/5">
            <p className="text-xs font-medium text-primary uppercase tracking-widest mb-5">OndaMonad</p>
            <div className="space-y-3">
              {[
                "Reserva, paga y confirma por ti",
                "Hash on-chain como prueba",
                "Swap USDC→MXN en la conversacion",
                "Espanol e Ingles nativos",
                "Reputacion verificable en Monad",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-foreground">
                  <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-[10px] text-primary font-bold">✓</span>
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Capabilities strip — icon-heavy, minimal text ── */}
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center rounded-2xl border border-border bg-card p-5 hover:border-primary/30 transition-colors"
            >
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-3 ${
                item.color === "accent" ? "bg-accent/10" : "bg-primary/10"
              }`}>
                <item.icon className={`h-6 w-6 ${
                  item.color === "accent" ? "text-accent" : "text-primary"
                }`} />
              </div>
              <div className="text-base font-bold text-foreground">{item.title}</div>
              <div className="text-[10px] text-muted-foreground mt-1">{item.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
