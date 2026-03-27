import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Train, Car, CreditCard, Utensils, Ticket, MapPin } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-20 md:pt-16 md:pb-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 text-black bg-accent/10 px-5 py-2 text-sm font-medium text-accent-foreground mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
           No busques, No compares. Solo pide
          </div>

          {/* Headline — short, visual */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-4 leading-[1.1]">
            No busques, No compares. Solo pide
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-12">
           Transporte, sitios turísticos, comida,  pagos y mucho más en un solo lugar (todo desde un chat, todo verificado on-chain)
          </p>

          {/* ── VISUAL CORE: the "one chat replaces everything" ── */}
          <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0 items-center mb-14">

            {/* LEFT — scattered app icons (the chaos) */}
            <div className="relative h-64 md:h-72">
              <p className="absolute top-0 left-0 right-0 text-xs font-medium text-muted-foreground uppercase tracking-widest text-center">Hoy usas</p>
              {[
                { icon: Train, label: "Metro", x: "10%", y: "28%", rotate: "-6deg" },
                { icon: Car, label: "Uber", x: "55%", y: "22%", rotate: "4deg" },
                { icon: CreditCard, label: "Banco", x: "5%", y: "58%", rotate: "3deg" },
                { icon: Utensils, label: "Rappi", x: "60%", y: "55%", rotate: "-3deg" },
                { icon: Ticket, label: "Ticketmaster", x: "30%", y: "72%", rotate: "5deg" },
                { icon: MapPin, label: "Maps", x: "35%", y: "30%", rotate: "-2deg" },
              ].map((app, i) => (
                <div
                  key={i}
                  className="absolute flex flex-col items-center gap-1 opacity-70"
                  style={{ left: app.x, top: app.y, transform: `rotate(${app.rotate})` }}
                >
                  <div className="h-12 w-12 rounded-xl border border-border bg-card flex items-center justify-center shadow-sm">
                    <app.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{app.label}</span>
                </div>
              ))}
            </div>

            {/* CENTER — arrow / "vs" */}
            <div className="flex flex-col items-center gap-2 px-6">
              <div className="hidden lg:block h-px w-16 bg-border" />
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <ArrowRight className="h-5 w-5 text-primary" />
              </div>
              <div className="hidden lg:block h-px w-16 bg-border" />
            </div>

            {/* RIGHT — the OndaMonad chat (the solution) */}
            <div className="relative">
              <p className="text-xs font-medium text-primary uppercase tracking-widest text-center mb-3">Con OndaMonad</p>
              <div className="rounded-2xl border-2 border-primary/30 bg-card shadow-2xl shadow-primary/10 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/50">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
                    <div className="h-2.5 w-2.5 rounded-full bg-accent/40" />
                    <div className="h-2.5 w-2.5 rounded-full bg-primary/40" />
                  </div>
                  <span className="text-[10px] text-muted-foreground ml-1.5 font-medium">OndaMonad</span>
                </div>
                <div className="p-4 space-y-3 text-left">
                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-3 py-2 text-xs max-w-[85%]">
                      Quiero ir al partido de mi selección, necesito llegar al Estadio Azteca.
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl rounded-bl-sm px-3 py-2 text-xs max-w-[90%] text-foreground space-y-1.5">
                      <p>Perfecto. El partido es hoy a las 18:00 en el Estadio Banorte. Te sugiero salir a las 16:00 — la Línea 2 del Metro va directo a Tasqueña y de ahí el metrobús. El Uber en esa hora cuesta ~$280 y tarda 55 min por tráfico.</p>
                      <div className="flex gap-1.5 pt-1">
                        <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Reservar Metro</span>
                        <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Pedir Uber</span>
                        <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Ver opciones de comida antes...</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-primary/5 border border-primary/20 rounded-lg px-3 py-1.5 text-[9px] text-primary font-mono">
                      ✓ tx 0xf4a2...3b1c confirmada en Monad
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button size="lg" asChild className="group h-12 px-8 text-base">
              <Link href="/chat">
                Habla con OndaMonad
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-12 px-8 text-base">
              <Link href="#how-it-works">
                Ver como funciona
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
