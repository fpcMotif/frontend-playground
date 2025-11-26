import { Check, Copy, Eye } from "lucide-react";
import type React from "react";
import { useCallback, useMemo, useState } from "react";
import { ColorSlider } from "@/components/color-slider";
import type { ColorData } from "@/types";
import {
  generateColorData,
  hslToRgb,
  oklchToRgb,
  rgbToHex,
} from "@/utils/color-utils";

type ColorPickerProps = {
  color: ColorData;
  onChange: (color: ColorData) => void;
};

type Mode = "HSL" | "RGB" | "OKLCH";

const HEX_REGEX = /^[0-9A-Fa-f]{0,6}$/;

export const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onChange,
}) => {
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<Mode>("OKLCH");

  // Helper to handle HSL changes
  const updateHsl = useCallback(
    (key: "h" | "s" | "l", val: number) => {
      const newHsl = { ...color.hsl, [key]: val };
      const newRgb = hslToRgb(newHsl);
      const newHex = rgbToHex(newRgb);
      onChange(generateColorData(newHex));
    },
    [color.hsl, onChange]
  );

  // Helper to handle RGB changes
  const updateRgb = useCallback(
    (key: "r" | "g" | "b", val: number) => {
      const newRgb = { ...color.rgb, [key]: val };
      const newHex = rgbToHex(newRgb);
      onChange(generateColorData(newHex));
    },
    [color.rgb, onChange]
  );

  // Helper to handle OKLCH changes
  const updateOklch = useCallback(
    (key: "l" | "c" | "h", val: number) => {
      const newOklch = { ...color.oklch, [key]: val };
      const newRgb = oklchToRgb(newOklch);
      const newHex = rgbToHex(newRgb);
      onChange(generateColorData(newHex));
    },
    [color.oklch, onChange]
  );

  // Handle Hex input manually
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (val.startsWith("#")) {
      val = val.slice(1);
    }
    if (HEX_REGEX.test(val) && val.length === 6) {
      onChange(generateColorData(`#${val}`));
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate CSS gradients for sliders to visualize changes
  const hueGradient =
    "linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)";
  const satGradient = `linear-gradient(to right, hsl(${color.hsl.h}, 0%, ${color.hsl.l}%), hsl(${color.hsl.h}, 100%, ${color.hsl.l}%))`;
  const lightGradient = `linear-gradient(to right, hsl(${color.hsl.h}, ${color.hsl.s}%, 0%), hsl(${color.hsl.h}, ${color.hsl.s}%, 50%), hsl(${color.hsl.h}, ${color.hsl.s}%, 100%))`;

  // Calculate dynamic OKLCH gradients
  // We use native OKLCH CSS syntax to prevent sRGB clipping in the UI visualization
  const oklchGradients = useMemo(() => {
    const getGradient = (channel: "l" | "c" | "h") => {
      const stops = 12;
      const colorStops = Array.from({ length: stops + 1 }, (_, i) => {
        const t = i / stops;
        let l = color.oklch.l;
        let c = color.oklch.c;
        let h = color.oklch.h;

        // Determine range for each slider
        if (channel === "l") {
          l = t; // 0 to 1
        }
        if (channel === "c") {
          c = t * 0.37; // 0 to 0.37 (slider max)
        }
        if (channel === "h") {
          h = t * 360; // 0 to 360
        }

        // Use native CSS function for maximum color fidelity
        return `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)}) ${Math.round(t * 100)}%`;
      });
      return `linear-gradient(to right, ${colorStops.join(", ")})`;
    };

    return {
      l: getGradient("l"),
      c: getGradient("c"),
      h: getGradient("h"),
    };
  }, [color.oklch.l, color.oklch.c, color.oklch.h]);

  return (
    <div className="grid h-full grid-cols-1 items-start gap-6 lg:grid-cols-2">
      {/* Visual Preview */}
      <div className="flex h-full min-h-0 flex-col gap-3 rounded-3xl border border-(--color-border-subtle) bg-(--color-bg-elevated) p-4 shadow-xl">
        <div
          className="group relative min-h-0 flex-1 overflow-hidden rounded-2xl shadow-xl ring-(--color-border-subtle) ring-1 transition-colors duration-200"
          style={{ backgroundColor: color.hex }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />

          {/* Copy Button Container - Center aligned */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <button
              aria-label="Copy Hex Code"
              className={`group/btn relative flex h-20 w-20 items-center justify-center rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                copied
                  ? "scale-100 border-emerald-500/50 bg-emerald-500/20 opacity-100 shadow-[0_0_30px_rgba(16,185,129,0.3)] ring-2 ring-emerald-500/30"
                  : "scale-95 border-white/20 bg-black/20 opacity-0 hover:border-white/50 hover:bg-black/50 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] group-hover:scale-100 group-hover:opacity-100"
              }border active:scale-90 active:bg-black/60`}
              onClick={copyToClipboard}
              type="button"
            >
              {/* Ripple Effect on Copy */}
              {copied && (
                <div className="pointer-events-none absolute inset-0 animate-ping rounded-2xl bg-emerald-500/30 duration-700" />
              )}

              <div className="relative z-20 flex h-7 w-7 items-center justify-center">
                <div
                  className={`absolute transform transition-all duration-300 ease-out ${copied ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
                >
                  <Copy className="group-hover/btn:-rotate-12 h-7 w-7 text-white drop-shadow-md transition-transform duration-300 group-active/btn:rotate-0" />
                </div>
                <div
                  className={`absolute transform transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${copied ? "rotate-0 scale-125 opacity-100" : "rotate-90 scale-0 opacity-0"}`}
                >
                  <Check className="h-8 w-8 text-emerald-400 drop-shadow-lg" />
                </div>
              </div>

              {/* Floating Tooltip */}
              <span
                className={`-bottom-10 -translate-x-1/2 pointer-events-none absolute left-1/2 z-30 whitespace-nowrap rounded-full border px-2.5 py-1 font-bold text-[10px] uppercase tracking-widest shadow-xl backdrop-blur-xl transition-all duration-300 ease-out ${
                  copied
                    ? "translate-y-0 scale-105 border-emerald-400 bg-emerald-500 text-white opacity-100"
                    : "translate-y-2 border-white/10 bg-black/90 text-white/90 opacity-0 group-hover/btn:translate-y-0 group-hover/btn:opacity-100"
                }
                    `}
              >
                {copied ? "Copied!" : "Copy Hex"}
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-muted px-4 py-3 shadow-sm ring-(--color-border-subtle) ring-1 transition-all hover:ring-border-strong">
          <span className="font-medium font-mono text-text-muted text-xs tracking-wider">
            HEX
          </span>
          <div className="flex items-center gap-2">
            <span className="select-none text-text-muted">#</span>
            <input
              className="w-20 bg-transparent text-right font-mono text-text-primary uppercase focus:outline-none"
              maxLength={6}
              onChange={handleHexChange}
              type="text"
              value={color.hex.replace("#", "")}
            />
          </div>
        </div>

        {/* OKLCH Preview Readout */}
        <div className="flex flex-col gap-1.5 rounded-xl bg-(--color-bg-muted) px-4 py-3 shadow-sm ring-(--color-border-subtle) ring-1 transition-all hover:ring-border-strong">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[10px] text-text-muted tracking-wider">
              CSS VAR (Tailwind v4)
            </span>
            <Eye className="h-3 w-3 text-text-muted" />
          </div>
          <code className="select-all break-all font-mono text-success text-xs">
            oklch({color.oklch.l.toFixed(3)} {color.oklch.c.toFixed(3)}{" "}
            {color.oklch.h.toFixed(1)})
          </code>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col rounded-3xl border border-(--color-border-subtle) bg-(--color-bg-elevated) p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-semibold text-text-muted text-xs uppercase tracking-wider">
            Color Model
          </span>
          <span className="font-mono text-[11px] text-text-muted">
            {mode === "OKLCH" && "Perceptual"}
            {mode === "HSL" && "HSL"}
            {mode === "RGB" && "sRGB"}
          </span>
        </div>

        {/* Mode Toggles */}
        <div className="mb-6 flex rounded-xl bg-(--color-bg-muted) p-1">
          {(["OKLCH", "HSL", "RGB"] as Mode[]).map((m) => (
            <button
              className={`flex-1 rounded-lg py-2 font-bold text-sm transition-all duration-200 ${
                mode === m
                  ? "scale-[1.02] bg-text-primary text-text-inverted shadow-lg"
                  : "text-text-muted hover:text-text-secondary"
              }`}
              key={m}
              onClick={() => setMode(m)}
              type="button"
            >
              {m}
            </button>
          ))}
        </div>

        <div className="space-y-5">
          {mode === "OKLCH" && (
            <div className="fade-in slide-in-from-right-4 animate-in space-y-5 duration-300">
              <ColorSlider
                background={oklchGradients.l}
                label="Lightness (L)"
                max={1}
                onChange={(v) => updateOklch("l", v)}
                value={Math.round(color.oklch.l * 100) / 100}
              />
              <ColorSlider
                background={oklchGradients.c}
                label="Chroma (C)"
                max={0.37}
                onChange={(v) => updateOklch("c", v)}
                value={Math.round(color.oklch.c * 100) / 100}
              />
              <ColorSlider
                background={oklchGradients.h}
                label="Hue (H)"
                max={360}
                onChange={(v) => updateOklch("h", v)}
                value={Math.round(color.oklch.h * 10) / 10}
              />
            </div>
          )}

          {mode === "HSL" && (
            <div className="fade-in slide-in-from-right-4 animate-in space-y-5 duration-300">
              <ColorSlider
                background={hueGradient}
                label="Hue"
                max={360}
                onChange={(v) => updateHsl("h", v)}
                value={color.hsl.h}
              />
              <ColorSlider
                background={satGradient}
                label="Saturation"
                max={100}
                onChange={(v) => updateHsl("s", v)}
                value={color.hsl.s}
              />
              <ColorSlider
                background={lightGradient}
                label="Lightness"
                max={100}
                onChange={(v) => updateHsl("l", v)}
                value={color.hsl.l}
              />
            </div>
          )}

          {mode === "RGB" && (
            <div className="fade-in slide-in-from-right-4 animate-in space-y-5 duration-300">
              <ColorSlider
                background={`linear-gradient(to right, rgb(0, ${color.rgb.g}, ${color.rgb.b}), rgb(255, ${color.rgb.g}, ${color.rgb.b}))`}
                label="Red"
                max={255}
                onChange={(v) => updateRgb("r", v)}
                value={color.rgb.r}
              />
              <ColorSlider
                background={`linear-gradient(to right, rgb(${color.rgb.r}, 0, ${color.rgb.b}), rgb(${color.rgb.r}, 255, ${color.rgb.b}))`}
                label="Green"
                max={255}
                onChange={(v) => updateRgb("g", v)}
                value={color.rgb.g}
              />
              <ColorSlider
                background={`linear-gradient(to right, rgb(${color.rgb.r}, ${color.rgb.g}, 0), rgb(${color.rgb.r}, ${color.rgb.g}, 255))`}
                label="Blue"
                max={255}
                onChange={(v) => updateRgb("b", v)}
                value={color.rgb.b}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
