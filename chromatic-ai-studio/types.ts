export type RGB = {
  r: number;
  g: number;
  b: number;
};

export type HSL = {
  h: number;
  s: number;
  l: number;
};

export type OKLCH = {
  l: number;
  c: number;
  h: number;
};

export type ColorData = {
  hex: string;
  rgb: RGB;
  hsl: HSL;
  oklch: OKLCH;
  name?: string;
};

export type Palette = {
  id: string;
  name: string;
  colors: ColorData[];
  description?: string;
};

export type AIResponseSchema = {
  paletteName: string;
  description: string;
  colors: string[]; // Hex codes
};

export const ViewMode = {
  PICKER: "PICKER",
  PALETTE: "PALETTE",
  AI_STUDIO: "AI_STUDIO",
} as const;

export type ViewMode = (typeof ViewMode)[keyof typeof ViewMode];
