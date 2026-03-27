import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function ForBusiness() {
  return (
    <section id="locatarios" className="py-20 md:py-28 bg-gray-200/60">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            El locatario gana sin saber de cripto
          </h2>
          <p className="text-muted-foreground">
            Registrate. Recibe clientes. Cobra en pesos por SPEI.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* LEFT: Visual flow — how money moves */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-6">Como fluye el dinero</p>

            <div className="space-y-0">
              {/* Step 1 */}
              <div className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">1</div>
                  <div className="w-px h-8 bg-border" />
                </div>
                <div className="pt-2 pb-4">
                  <p className="text-sm font-medium text-foreground">Turista paga con USDC</p>
                  <p className="text-[10px] text-muted-foreground">En la conversacion con Cima</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-sm font-bold text-accent">2</div>
                  <div className="w-px h-8 bg-border" />
                </div>
                <div className="pt-2 pb-4">
                  <p className="text-sm font-medium text-foreground">Swap automatico en Monad</p>
                  <p className="text-[10px] text-muted-foreground">USDC → MXN · hash verificable</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">3</div>
                </div>
                <div className="pt-2">
                  <p className="text-sm font-medium text-foreground">Tu recibes pesos por SPEI</p>
                  <p className="text-[10px] text-muted-foreground">En tu CLABE normal · sin cripto, sin apps nuevas</p>
                </div>
              </div>
            </div>

            {/* Visual: commission comparison */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-center">
                <div className="text-2xl font-bold text-destructive/70 line-through">30%</div>
                <div className="text-[10px] text-muted-foreground mt-1">Rappi / Uber Eats</div>
              </div>
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
                <div className="text-2xl font-bold text-primary">Directo</div>
                <div className="text-[10px] text-muted-foreground mt-1">Con Cima</div>
              </div>
            </div>
          </div>

          {/* RIGHT: Dashboard mockup */}
          <div className="rounded-2xl border border-border bg-card shadow-xl shadow-primary/5 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-muted/50">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
                <div className="h-2.5 w-2.5 rounded-full bg-accent/40" />
                <div className="h-2.5 w-2.5 rounded-full bg-primary/40" />
              </div>
              <span className="text-[10px] text-muted-foreground ml-1.5 font-medium">
                Panel de Locatario
              </span>
            </div>
            <div className="p-5 space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-muted/50 border border-border p-3 text-center">
                  <div className="text-xl font-bold text-foreground">47</div>
                  <div className="text-[9px] text-muted-foreground">Clientes</div>
                </div>
                <div className="rounded-xl bg-muted/50 border border-border p-3 text-center">
                  <div className="text-xl font-bold text-primary">$18.4k</div>
                  <div className="text-[9px] text-muted-foreground">Ventas MXN</div>
                </div>
                <div className="rounded-xl bg-muted/50 border border-border p-3 text-center">
                  <div className="text-xl font-bold text-accent">4.8★</div>
                  <div className="text-[9px] text-muted-foreground">On-chain</div>
                </div>
              </div>

              {/* Transactions */}
              <div className="space-y-2">
                {[
                  { name: "Cena para 2", amount: "$680", hash: "0xa3f2...8c1b" },
                  { name: "Menu del dia", amount: "$185", hash: "0x7e91...4d2a" },
                  { name: "Mezcal tasting", amount: "$450", hash: "0xb5c8...9f3e" },
                ].map((tx, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg bg-background border border-border px-3 py-2.5">
                    <div>
                      <div className="text-xs font-medium text-foreground">{tx.name}</div>
                      <div className="text-[9px] text-muted-foreground font-mono">{tx.hash}</div>
                    </div>
                    <div className="text-xs font-semibold text-primary">{tx.amount}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-lg bg-primary/5 border border-primary/20 px-3 py-2 text-center">
                <p className="text-[10px] text-primary/80 font-medium">
                  Todo verificable en Monad Explorer
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild className="group">
            <Link href="/chat">
              Registrar mi negocio
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
