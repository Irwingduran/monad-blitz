import { MessageCircle, Cpu, Blocks, Eye, ChevronDown } from "lucide-react"

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            Cuatro capas. Una conversacion.
          </h2>
          <p className="text-muted-foreground">
            Asi funciona el sistema por dentro — invisible para ti.
          </p>
        </div>

        {/* ── VISUAL STACK DIAGRAM ── */}
        <div className="max-w-3xl mx-auto space-y-0">

          {/* Layer 1 — Conversacion */}
          <div className="rounded-t-2xl border-2 border-primary/40 bg-primary/5 p-6 md:p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <MessageCircle className="h-7 w-7 text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Capa 1</p>
                <h3 className="text-xl font-bold text-foreground">Conversacion</h3>
              </div>
            </div>
            {/* Mini chat visual */}
            <div className="bg-card rounded-xl border border-border p-4 max-w-md">
              <div className="flex justify-end mb-2">
                <div className="bg-primary text-primary-foreground rounded-xl rounded-br-sm px-3 py-1.5 text-xs">
                  Necesito llegar al Azteca y cenar
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-muted rounded-xl rounded-bl-sm px-3 py-1.5 text-xs text-muted-foreground">
                  Entendido. Buscando rutas y restaurantes...
                </div>
              </div>
            </div>
          </div>

          {/* Connector */}
          <div className="flex justify-center -my-1 relative z-10">
            <div className="h-8 w-8 rounded-full bg-card border-2 border-border flex items-center justify-center">
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Layer 2 — Orquestacion */}
          <div className="border-x-2 border-accent/30 bg-accent/5 p-6 md:p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-14 w-14 rounded-xl bg-accent/10 flex items-center justify-center">
                <Cpu className="h-7 w-7 text-accent" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Capa 2</p>
                <h3 className="text-xl font-bold text-foreground">Orquestacion</h3>
              </div>
            </div>
            {/* Visual: parallel API calls */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {["Metro API", "Uber API", "Google Maps", "Locatarios"].map((api, i) => (
                <div key={i} className="rounded-lg border border-border bg-card px-3 py-2.5 text-center">
                  <div className="text-xs font-mono font-medium text-foreground">{api}</div>
                  <div className="text-[9px] text-accent mt-0.5">en paralelo</div>
                </div>
              ))}
            </div>
          </div>

          {/* Connector */}
          <div className="flex justify-center -my-1 relative z-10">
            <div className="h-8 w-8 rounded-full bg-card border-2 border-border flex items-center justify-center">
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Layer 3 — Ejecucion */}
          <div className="border-x-2 border-primary/30 bg-primary/5 p-6 md:p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Blocks className="h-7 w-7 text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Capa 3</p>
                <h3 className="text-xl font-bold text-foreground">Ejecucion</h3>
              </div>
            </div>
            {/* Visual: transaction flow */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: "USDC", sub: "entrada" },
                { label: "→", sub: "" },
                { label: "Swap", sub: "Monad" },
                { label: "→", sub: "" },
                { label: "MXN", sub: "SPEI" },
                { label: "+", sub: "" },
                { label: "NFT", sub: "ticket" },
                { label: "+", sub: "" },
                { label: "Reserva", sub: "confirmada" },
              ].map((step, i) => (
                <div key={i} className="text-center">
                  {step.sub ? (
                    <div className="rounded-lg border border-border bg-card px-3 py-2">
                      <div className="text-sm font-bold text-foreground">{step.label}</div>
                      <div className="text-[9px] text-primary">{step.sub}</div>
                    </div>
                  ) : (
                    <span className="text-lg text-muted-foreground font-light">{step.label}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Connector */}
          <div className="flex justify-center -my-1 relative z-10">
            <div className="h-8 w-8 rounded-full bg-card border-2 border-border flex items-center justify-center">
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Layer 4 — Trazabilidad */}
          <div className="rounded-b-2xl border-2 border-accent/40 bg-accent/5 p-6 md:p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-14 w-14 rounded-xl bg-accent/10 flex items-center justify-center">
                <Eye className="h-7 w-7 text-accent" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Capa 4</p>
                <h3 className="text-xl font-bold text-foreground">Trazabilidad</h3>
              </div>
            </div>
            {/* Visual: on-chain receipt */}
            <div className="rounded-xl border border-border bg-card p-4 max-w-md font-mono text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-muted-foreground">tx</span>
                <span className="text-primary">0xf4a2...3b1c</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">red</span>
                <span className="text-foreground">Monad</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">locatario</span>
                <span className="text-foreground">La Capital ★ 4.8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">estado</span>
                <span className="text-accent font-bold">✓ verificado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
