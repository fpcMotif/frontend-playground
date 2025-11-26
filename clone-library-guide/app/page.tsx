import { CTASection } from "@/components/cta-section";
import { FigmaSection } from "@/components/figma-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { MouseCursors } from "@/components/mouse-cursors";
import { Navigation } from "@/components/navigation";
import { ProductShowcase } from "@/components/product-showcase";
import { TypographyShowcase } from "@/components/typography-showcase";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <MouseCursors />
      <Navigation />
      <HeroSection />
      <ProductShowcase />
      <FigmaSection />
      <TypographyShowcase />
      <CTASection />
      <Footer />
    </main>
  );
}
