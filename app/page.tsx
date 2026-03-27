import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Problem } from "@/components/landing/problem"
import { Features } from "@/components/landing/features"
import { HowItWorks } from "@/components/landing/how-it-works"
import { ForBusiness } from "@/components/landing/for-business"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Problem />
      <Features />
      <HowItWorks />
      <ForBusiness />
      <Footer />
    </main>
  )
}
