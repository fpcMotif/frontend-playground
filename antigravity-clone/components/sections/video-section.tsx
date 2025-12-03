export function VideoSection() {
  return (
    <section id="video" className="px-4 lg:px-12">
      <div className="relative w-full max-w-6xl mx-auto aspect-video">
        <iframe
          className="w-full h-full rounded-3xl"
          src="https://www.youtube.com/embed/SVCBA-pBgt0?si=OzpiqP3jpwqNGTEu"
          title="Google Antigravity Introduction"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </section>
  )
}
