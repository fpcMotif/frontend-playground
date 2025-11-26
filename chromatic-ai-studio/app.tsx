import {
  BrainCircuit,
  Copy,
  Github,
  LayoutGrid,
  Menu,
  Moon,
  Palette as PaletteIcon,
  Sliders,
  Sun,
  X,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { HashRouter } from "react-router-dom";
import { AIGenerator } from "@/components/ai-generator";
import { Button } from "@/components/button";
import { ColorPicker } from "@/components/color-picker";
import { PaletteAnalysis } from "@/components/palette-analysis";
import { useTheme } from "@/hooks/use-theme";
import { type ColorData, ViewMode } from "@/types";
import { generateColorData, generateShades } from "@/utils/color-utils";

const App: React.FC = () => {
  const { toggleTheme, isDark } = useTheme();
  const [activeMode, setActiveMode] = useState<ViewMode>(ViewMode.PICKER);
  const [currentColor, setCurrentColor] = useState<ColorData>(
    generateColorData("#3B82F6")
  );
  const [palette, setPalette] = useState<ColorData[]>([]);
  const [paletteName, setPaletteName] = useState<string>("Generated Palette");
  const [exportFormat, setExportFormat] = useState<
    "tailwind_v4" | "tailwind_v3"
  >("tailwind_v4");
  const [copiedExport, setCopiedExport] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize palette on load
  useEffect(() => {
    setPalette(generateShades(currentColor.hex, 5));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentColor.hex]);

  const handleColorChange = (newColor: ColorData) => {
    setCurrentColor(newColor);
    // If in picker mode, automatically update simple shades palette
    if (activeMode === ViewMode.PICKER) {
      setPalette(generateShades(newColor.hex, 5));
    }
  };

  const handleAIPalette = (colors: ColorData[], name: string) => {
    setPalette(colors);
    setPaletteName(name);
    setCurrentColor(colors[0]); // Set primary to first color
    setActiveMode(ViewMode.PALETTE);
  };

  const generateExportCode = () => {
    if (exportFormat === "tailwind_v4") {
      return `@theme {
${palette.map((c, i) => `  --color-palette-${(i + 1) * 100}: oklch(${c.oklch.l.toFixed(3)} ${c.oklch.c.toFixed(3)} ${c.oklch.h.toFixed(1)});`).join("\n")}
}`;
    }
    return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'palette': {
${palette.map((c, i) => `          ${(i + 1) * 100}: '${c.hex}',`).join("\n")}
        }
      }
    }
  }
}`;
  };

  const copyExport = () => {
    navigator.clipboard.writeText(generateExportCode());
    setCopiedExport(true);
    setTimeout(() => setCopiedExport(false), 2000);
  };

  const navItems = [
    { mode: ViewMode.PICKER, icon: Sliders, label: "Picker" },
    { mode: ViewMode.AI_STUDIO, icon: BrainCircuit, label: "AI Studio" },
    { mode: ViewMode.PALETTE, icon: LayoutGrid, label: "Palette" },
  ];

  return (
    <HashRouter>
      <div className="flex h-screen flex-col overflow-hidden bg-(--color-bg) font-sans text-(--color-text-primary) transition-colors duration-200 selection:bg-(--color-accent-soft)">
        {/* Navigation / Header */}
        <header className="shrink-0 border-(--color-border-subtle) border-b bg-(--color-bg-overlay) backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/20">
                <PaletteIcon className="h-5 w-5 text-white" />
              </div>
              <span className="bg-linear-to-r from-(--color-text-primary) to-(--color-text-secondary) bg-clip-text font-bold text-lg text-transparent tracking-tight">
                Chromatic AI
              </span>
            </div>

            <nav className="hidden items-center gap-1 rounded-full border border-(--color-border-subtle) bg-(--color-bg-muted) p-1 md:flex">
              {navItems.map((item) => (
                <button
                  className={`flex items-center gap-2 rounded-full px-4 py-1.5 font-medium text-sm transition-all duration-200 ${
                    activeMode === item.mode
                      ? "bg-(--color-text-primary) text-(--color-text-inverted) shadow-lg"
                      : "text-(--color-text-muted) hover:bg-(--color-bg-elevated) hover:text-(--color-text-primary)"
                  }`}
                  key={item.mode}
                  onClick={() => setActiveMode(item.mode)}
                  type="button"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Right side: Theme toggle + GitHub */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle Button */}
              <button
                aria-label={
                  isDark ? "Switch to light mode" : "Switch to dark mode"
                }
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-(--color-border-subtle) bg-(--color-bg-muted) text-(--color-text-secondary) transition-all hover:bg-(--color-bg-elevated) hover:text-(--color-text-primary)"
                onClick={toggleTheme}
                type="button"
              >
                {isDark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>

              {/* Mobile Nav Toggle */}
              <div className="md:hidden">
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-(--color-border-subtle) bg-(--color-bg-muted) text-(--color-text-secondary) transition-all hover:bg-(--color-bg-elevated) hover:text-(--color-text-primary)"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  type="button"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </button>
              </div>

              <a
                className="hidden h-9 w-9 items-center justify-center rounded-xl text-(--color-text-muted) transition-colors hover:text-(--color-text-primary) md:flex"
                href="https://github.com/some-user/some-repo"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div className="slide-in-from-top-5 fade-in-20 absolute top-16 left-0 z-50 w-full animate-in border-(--color-border) border-b bg-(--color-bg-overlay) p-4 backdrop-blur-2xl md:hidden">
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all ${
                      activeMode === item.mode
                        ? "bg-(--color-accent-soft) text-(--color-accent)"
                        : "text-(--color-text-secondary) hover:bg-(--color-bg-muted) hover:text-(--color-text-primary)"
                    }`}
                    key={item.mode}
                    onClick={() => {
                      setActiveMode(item.mode);
                      setIsMobileMenuOpen(false);
                    }}
                    type="button"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col overflow-hidden p-4 md:p-6">
          {activeMode === ViewMode.PICKER && (
            <div className="fade-in zoom-in-95 flex min-h-0 flex-1 animate-in flex-col gap-4 duration-500">
              <div className="shrink-0 text-center md:text-left">
                <h1 className="mb-2 font-bold text-3xl tracking-tight md:text-4xl">
                  Color Picker
                </h1>
                <p className="max-w-2xl text-(--color-text-secondary) text-base leading-relaxed">
                  Professional grade color manipulation with{" "}
                  <span className="font-semibold text-(--color-accent)">
                    OKLCH
                  </span>{" "}
                  support.
                </p>
              </div>
              <div className="min-h-0 flex-1 overflow-hidden">
                <ColorPicker
                  color={currentColor}
                  onChange={handleColorChange}
                />
              </div>
            </div>
          )}

          {activeMode === ViewMode.AI_STUDIO && (
            <div className="flex min-h-0 flex-1 flex-col items-center justify-center">
              <AIGenerator onPaletteGenerated={handleAIPalette} />
            </div>
          )}

          {activeMode === ViewMode.PALETTE && (
            <div className="fade-in slide-in-from-bottom-8 flex min-h-0 flex-1 animate-in flex-col gap-4 overflow-hidden duration-500">
              <div className="flex shrink-0 flex-col justify-between gap-2 md:flex-row md:items-center">
                <div>
                  <h1 className="mb-1 font-bold text-2xl tracking-tight md:text-3xl">
                    {paletteName}
                  </h1>
                  <p className="text-(--color-text-secondary) text-sm">
                    Generated harmony based on perceptual analysis.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    icon={<BrainCircuit className="h-4 w-4" />}
                    onClick={() => setActiveMode(ViewMode.AI_STUDIO)}
                    variant="secondary"
                  >
                    Regenerate
                  </Button>
                </div>
              </div>

              <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden">
                {/* Palette Grid */}
                <div className="grid h-32 shrink-0 grid-cols-5 gap-3 md:h-40">
                  {palette.map((c, _i) => (
                    <div
                      className="group relative overflow-hidden rounded-2xl shadow-lg ring-(--color-border-subtle) ring-1 transition-all duration-300 hover:z-10 hover:scale-[1.03] hover:shadow-xl"
                      key={c.hex}
                      style={{ backgroundColor: c.hex }}
                    >
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-1 text-center opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
                        <span className="font-bold font-mono text-sm text-white drop-shadow-md">
                          {c.hex}
                        </span>
                        <span className="block font-mono text-[10px] text-white/80">
                          oklch({c.oklch.l.toFixed(2)} {c.oklch.c.toFixed(2)}{" "}
                          {c.oklch.h.toFixed(0)})
                        </span>
                        <button
                          className="mt-1 scale-90 transform rounded-full bg-white px-3 py-1 font-bold text-[10px] text-black shadow-lg transition-all delay-75 duration-300 hover:bg-gray-200 group-hover:scale-100"
                          onClick={() => handleColorChange(c)}
                          type="button"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-hidden lg:grid-cols-3">
                  <div className="min-h-0 overflow-hidden lg:col-span-2">
                    <PaletteAnalysis colors={palette} />
                  </div>

                  {/* Export Section */}
                  <div className="flex min-h-0 flex-col rounded-2xl border border-(--color-border-subtle) bg-(--color-bg-elevated) p-4 shadow-xl">
                    <div className="mb-3 flex shrink-0 items-center justify-between">
                      <h3 className="font-bold text-(--color-text-muted) text-xs uppercase tracking-wider">
                        Export Code
                      </h3>
                      <div className="flex rounded-lg bg-(--color-bg-muted) p-0.5">
                        <button
                          className={`rounded-md px-2 py-1 font-medium text-[10px] transition-all ${
                            exportFormat === "tailwind_v4"
                              ? "bg-(--color-accent) text-white shadow-lg"
                              : "text-(--color-text-muted) hover:text-(--color-text-primary)"
                          }`}
                          onClick={() => setExportFormat("tailwind_v4")}
                          type="button"
                        >
                          v4 CSS
                        </button>
                        <button
                          className={`rounded-md px-2 py-1 font-medium text-[10px] transition-all ${
                            exportFormat === "tailwind_v3"
                              ? "bg-(--color-accent) text-white shadow-lg"
                              : "text-(--color-text-muted) hover:text-(--color-text-primary)"
                          }`}
                          onClick={() => setExportFormat("tailwind_v3")}
                          type="button"
                        >
                          v3 JS
                        </button>
                      </div>
                    </div>

                    <div className="group relative min-h-0 flex-1">
                      <pre className="absolute inset-0 overflow-auto rounded-lg border border-(--color-border-subtle) bg-(--color-bg-muted) p-3 font-mono text-(--color-text-secondary) text-[10px] leading-relaxed">
                        {generateExportCode()}
                      </pre>
                      <button
                        className="absolute top-1.5 right-1.5 rounded-md bg-(--color-bg-overlay) p-1.5 text-(--color-text-primary) opacity-0 backdrop-blur-md transition-opacity hover:bg-(--color-bg-elevated) group-hover:opacity-100"
                        onClick={copyExport}
                        type="button"
                      >
                        {copiedExport ? (
                          <span className="px-1 font-bold text-[10px]">
                            Copied!
                          </span>
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                    <p className="mt-2 shrink-0 text-(--color-text-muted) text-[10px]">
                      {exportFormat === "tailwind_v4"
                        ? "Paste into your CSS file using the new @theme directive."
                        : "Paste into your tailwind.config.js theme.extend object."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
