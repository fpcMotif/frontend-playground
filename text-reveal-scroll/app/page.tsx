import { HeroSection } from "@/components/hero-section"
import { TextRevealSection } from "@/components/text-reveal-section"
import { EffectSection } from "@/components/effect-section"
import { HowToUseSection } from "@/components/how-to-use-section"
import { FooterSection } from "@/components/footer-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f2f2f2]">
      <HeroSection />
      <TextRevealSection />
      <EffectSection
        number="001"
        title="Blur Reveal"
        description="Every effect comes fully pre-configured. Just drop it into your page, change the text, adjust a few settings if you want, and it's instantly ready to use, no setup or animation work required."
        effect="blur"
      />
      <EffectSection
        number="002"
        title="Fade in"
        description="Every effect comes fully pre-configured. Just drop it into your page, change the text, adjust a few settings if you want, and it's instantly ready to use, no setup or animation work required."
        effect="fade"
      />
      <EffectSection
        number="003"
        title="Change color"
        description="Every effect comes fully pre-configured. Just drop it into your page, change the text, adjust a few settings if you want, and it's instantly ready to use, no setup or animation work required."
        effect="color"
      />
      <EffectSection
        number="004"
        title="Scale reveal"
        description="Every effect comes fully pre-configured. Just drop it into your page, change the text, adjust a few settings if you want, and it's instantly ready to use, no setup or animation work required."
        effect="scale"
      />
      <EffectSection
        number="005"
        title="Random Stagger"
        description="Every effect comes fully pre-configured. Just drop it into your page, change the text, adjust a few settings if you want, and it's instantly ready to use, no setup or animation work required."
        effect="stagger"
      />
      <EffectSection
        number="006"
        title="Random Scale"
        description="Every effect comes fully pre-configured. Just drop it into your page, change the text, adjust a few settings if you want, and it's instantly ready to use, no setup or animation work required."
        effect="randomScale"
      />
      <EffectSection
        number="007"
        title="Overscale"
        description="Every effect comes fully pre-configured. Just drop it into your page, change the text, adjust a few settings if you want, and it's instantly ready to use, no setup or animation work required."
        effect="overscale"
      />
      <EffectSection
        number="008"
        title="Slide"
        description="Every effect comes fully pre-configured. Just drop it into your page, change the text, adjust a few settings if you want, and it's instantly ready to use, no setup or animation work required."
        effect="slide"
      />
      <div className="flex items-center justify-center py-20">
        <p className="text-5xl md:text-7xl font-bold text-[#1e1e1e] tracking-tight">AND MORE</p>
      </div>
      <HowToUseSection />
      <FooterSection />
    </main>
  )
}
