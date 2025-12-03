import { PillButton } from "@/components/ui/pill-button"

export function CTASection() {
  return (
    <section id="who" className="flex flex-col lg:flex-row items-center justify-around text-center py-16 lg:py-0">
      <div className="h-[40vh] lg:h-[80vh] flex flex-col items-center justify-center gap-4">
        <h3 className="text-2xl lg:text-4xl font-normal leading-tight">
          For developers
          <br />
          <span className="text-on-surface-variant">Achieve new heights</span>
        </h3>
        <PillButton className="text-lg">Download</PillButton>
      </div>

      <div className="h-[40vh] lg:h-[80vh] flex flex-col items-center justify-center gap-4">
        <h3 className="text-2xl lg:text-4xl font-normal leading-tight">
          For organizations
          <br />
          <span className="text-on-surface-variant">Level up your entire team</span>
        </h3>
        <PillButton variant="secondary" className="text-lg">
          Notify me
        </PillButton>
      </div>
    </section>
  )
}
