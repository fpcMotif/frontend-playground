import type React from "react";

type ColorSliderProps = {
  label: string;
  value: number;
  max: number;
  onChange: (val: number) => void;
  background?: string;
};

export const ColorSlider: React.FC<ColorSliderProps> = ({
  label,
  value,
  max,
  onChange,
  background,
}) => {
  // Determine step size based on max value. Small max implies float values needed.
  const step = max <= 1 ? 0.001 : 1;

  return (
    <div className="group flex w-full flex-col gap-2">
      <div className="flex justify-between font-semibold text-(--color-text-muted) text-xs tracking-wider">
        <span className="uppercase transition-colors group-hover:text-(--color-text-primary)">
          {label}
        </span>
        <span className="font-mono">{value}</span>
      </div>
      <input
        className="h-4 w-full cursor-pointer appearance-none rounded-full bg-transparent transition-all focus:outline-none disabled:opacity-50 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-(--color-text-primary) [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:bg-(--color-bg)/50 [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:transition-all hover:[&::-moz-range-thumb]:scale-110 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-(--color-text-primary) [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:bg-(--color-bg)/50 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-all hover:[&::-webkit-slider-thumb]:scale-110"
        max={max}
        min="0"
        onChange={(e) => onChange(Number(e.target.value))}
        step={step}
        style={{
          background: background || "var(--color-border-strong)",
        }}
        type="range"
        value={value}
      />
    </div>
  );
};
