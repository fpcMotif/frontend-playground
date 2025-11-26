import { AlertCircle, Sparkles, Wand2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/button";
import { generateAIPalette } from "@/services/gemini-service";
import type { ColorData } from "@/types";
import { generateColorData } from "@/utils/color-utils";

type AIGeneratorProps = {
  onPaletteGenerated: (colors: ColorData[], name: string) => void;
};

export const AIGenerator: React.FC<AIGeneratorProps> = ({
  onPaletteGenerated,
}) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      return;
    }

    setIsGenerating(true);
    setError(null);
    try {
      const result = await generateAIPalette(prompt);
      const colorObjects = result.colors.map((hex) => generateColorData(hex));
      onPaletteGenerated(colorObjects, result.paletteName);
    } catch (_err) {
      setError(
        "Failed to generate palette. Please check API key configuration or try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const suggestions = [
    "Cyberpunk city at midnight",
    "Pastel french bakery",
    "Deep forest moss and earth",
    "Sunset over Santorini",
  ];

  return (
    <div className="fade-in slide-in-from-bottom-4 mx-auto w-full max-w-2xl animate-in space-y-8 duration-500">
      <div className="space-y-2 text-center">
        <div className="mb-4 inline-flex items-center justify-center rounded-full bg-(--color-accent-soft) p-3">
          <Sparkles className="h-8 w-8 text-(--color-accent)" />
        </div>
        <h2 className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text font-bold text-3xl text-transparent">
          AI Palette Studio
        </h2>
        <p className="text-(--color-text-secondary)">
          Describe a mood, scene, or object, and Gemini will create the perfect
          palette.
        </p>
      </div>

      <div className="flex items-center rounded-2xl border border-(--color-border-subtle) bg-(--color-bg-elevated) p-1 shadow-xl">
        <input
          className="flex-1 border-none bg-transparent px-6 py-4 text-(--color-text-primary) text-lg placeholder-current/40 focus:outline-none focus:ring-0"
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
          placeholder="e.g., 'Retro vaporwave sunset'..."
          type="text"
          value={prompt}
        />
        <Button
          className="m-2 border-0 bg-linear-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500"
          icon={<Wand2 className="h-4 w-4" />}
          isLoading={isGenerating}
          onClick={handleGenerate}
        >
          Generate
        </Button>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-(--color-error-soft) p-4 text-(--color-error)">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-3">
        <p className="font-medium text-(--color-text-muted) text-sm uppercase tracking-wide">
          Try these prompts
        </p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              className="rounded-full bg-(--color-bg-muted) px-4 py-2 text-(--color-text-secondary) text-sm transition-colors hover:bg-(--color-bg-elevated) hover:text-(--color-text-primary)"
              key={s}
              onClick={() => setPrompt(s)}
              type="button"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
