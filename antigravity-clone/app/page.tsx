import { Header } from "@/components/layout/header"
import { HeroSection } from "@/components/sections/hero-section"
import { VideoSection } from "@/components/sections/video-section"
import { ProductSection } from "@/components/sections/product-section"
import { DevelopersSection } from "@/components/sections/developers-section"
import { CTASection } from "@/components/sections/cta-section"
import { DownloadSection } from "@/components/sections/download-section"
import { Footer } from "@/components/layout/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <VideoSection />
        <ProductSection />
        <DevelopersSection />
        <CTASection />
        <DownloadSection />
      </main>
      <Footer />
    </>
  )
}
