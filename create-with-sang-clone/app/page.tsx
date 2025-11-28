import { Hero } from "@/components/hero"
import { MarqueeSection } from "@/components/marquee-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <MarqueeSection />
      <PortfolioSection />
      <Footer />
    </main>
  )
}
