import {
  Smartphone,
  CreditCard,
  Utensils,
  Car,
  Ticket,
  MapPin,
  Star,
  ShieldOff,
  DollarSign,
  Languages,
  HelpCircle,
  Ban,
  ArrowDown,
} from "lucide-react"

export function Problem() {
  return (
    <section className="py-20 md:py-28 border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section heading — concise */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            La ciudad esta rota en pedazos
          </h2>
          <p className="text-muted-foreground">
            Y cada fragmento te cuesta tiempo, dinero y confianza.
          </p>
        </div>

        {/* ── PROBLEM 1: App fragmentation — visual grid ── */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                <Smartphone className="h-4 w-4 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Friccion urbana</h3>
            </div>

            {/* Visual: 6 app blocks with strike-through feel */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
              {[
                { icon: Car, name: "Uber" },
                { icon: Utensils, name: "Rappi" },
                { icon: Ticket, name: "Ticketmaster" },
                { icon: CreditCard, name: "Banco" },
                { icon: MapPin, name: "Maps" },
                { icon: Star, name: "TripAdvisor" },
              ].map((app, i) => (
                <div key={i} className="flex flex-col items-center gap-2 py-4 rounded-xl border border-border bg-muted/30">
                  <app.icon className="h-6 w-6 text-muted-foreground/60" />
                  <span className="text-[10px] text-muted-foreground/60">{app.name}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-4">
              <div className="h-px flex-1 bg-border" />
              <span className="text-4xl md:text-5xl font-bold text-destructive/80">5–8 apps</span>
              <span className="text-sm text-muted-foreground">para un solo dia</span>
              <div className="h-px flex-1 bg-border" />
            </div>
          </div>
        </div>

        {/* ── PROBLEMS 2 & 3 side by side ── */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Locatarios sin confianza */}
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                <ShieldOff className="h-4 w-4 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Sin capa de confianza</h3>
            </div>

            {/* Visual: commission bar */}
            <div className="space-y-4 mb-6">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Intermediarios</span>
                  <span className="font-semibold text-destructive/80">15–30%</span>
                </div>
                <div className="h-6 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-destructive/30 w-[30%] flex items-center justify-end pr-2">
                    <DollarSign className="h-3 w-3 text-destructive/60" />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Con OndaMonad</span>
                  <span className="font-semibold text-primary">Directo</span>
                </div>
                <div className="h-6 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary/20 w-full flex items-center justify-end pr-2">
                    <span className="text-[10px] font-medium text-primary">SPEI</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Resenas manipulables. Comisiones abusivas. Relacion con el cliente secuestrada.
            </p>
          </div>

          {/* Turista perdido */}
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                <Languages className="h-4 w-4 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Turista en blanco</h3>
            </div>

            {/* Visual: 3 barriers as blocked icons */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: Ban, label: "Sin pesos" },
                { icon: HelpCircle, label: "Sin contexto" },
                { icon: Languages, label: "Sin idioma" },
              ].map((barrier, i) => (
                <div key={i} className="flex flex-col items-center gap-2 py-5 rounded-xl border border-destructive/20 bg-destructive/5">
                  <barrier.icon className="h-7 w-7 text-destructive/50" />
                  <span className="text-[10px] font-medium text-destructive/60">{barrier.label}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <ArrowDown className="h-4 w-4 text-muted-foreground shrink-0" />
              <p className="text-xs text-muted-foreground">
                Casas de cambio al <span className="font-semibold text-destructive/80">8–12% spread</span>. Apps sin traducir. Cero orientacion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
