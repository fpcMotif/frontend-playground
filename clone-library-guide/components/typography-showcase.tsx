export function TypographyShowcase() {
  return (
    <section className="overflow-hidden py-8">
      {/* Typography pattern - yellow background with letters */}
      <div className="relative h-64 overflow-hidden bg-[#FEFF00]">
        <div className="absolute inset-0 flex items-center">
          <div className="whitespace-nowrap font-bold text-[12rem] text-black leading-none tracking-tighter opacity-90">
            <span className="font-serif">A</span>
            <span className="font-sans">a</span>
            <span className="font-serif">A</span>
            <span className="font-sans italic">a</span>
            <span className="font-serif">a</span>
            <span className="font-sans">A</span>
          </div>
        </div>
        <div className="absolute inset-0 flex items-end">
          <div className="whitespace-nowrap font-bold text-[12rem] text-black leading-none tracking-tighter opacity-90">
            <span className="font-serif">B</span>
            <span className="font-sans italic">b</span>
            <span className="font-serif">b</span>
            <span className="font-sans">B</span>
            <span className="font-serif italic">b</span>
            <span className="font-sans">b</span>
            <span className="font-serif">B</span>
          </div>
        </div>
      </div>

      {/* Colorful stripe pattern */}
      <div className="relative h-48">
        <div className="absolute inset-0 flex">
          {/* Blue and black diagonal stripes */}
          <div className="relative flex-1 overflow-hidden bg-[#3B82F6]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, #3B82F6 0px, #3B82F6 40px, #000 40px, #000 80px)",
                backgroundSize: "113px 113px",
              }}
            />
          </div>
        </div>
      </div>

      {/* Yellow, white stripe pattern */}
      <div className="relative h-24">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, #FEFF00 0px, #FEFF00 40px, #fff 40px, #fff 80px, #3B82F6 80px, #3B82F6 120px)",
            backgroundSize: "170px 170px",
          }}
        />
      </div>

      {/* Purple and black section */}
      <div className="flex h-48">
        <div className="w-1/2 bg-[#8751E6]" />
        <div className="w-1/2 bg-black" />
      </div>

      {/* Bottom colored bars */}
      <div className="flex h-16">
        <div className="flex-1 bg-[#06B6D4]" />
        <div className="flex-1 bg-[#3B82F6]" />
        <div className="flex-1 bg-[#FEFF00]" />
        <div className="flex-1 bg-[#F59E0B]" />
      </div>
    </section>
  );
}
