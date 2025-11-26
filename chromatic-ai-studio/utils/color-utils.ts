import type { ColorData, HSL, OKLCH, RGB } from "@/types";

const HEX_REGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

export const hexToRgb = (hex: string): RGB => {
  const result = HEX_REGEX.exec(hex);
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

export const rgbToHex = ({ r, g, b }: RGB): string =>
  "#" +
  (2 ** 24 + r * 2 ** 16 + g * 2 ** 8 + b).toString(16).slice(1).toUpperCase();

export const rgbToHsl = ({ r, g, b }: RGB): HSL => {
  const rN = r / 255;
  const gN = g / 255;
  const bN = b / 255;

  const max = Math.max(rN, gN, bN);
  const min = Math.min(rN, gN, bN);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rN:
        h = (gN - bN) / d + (gN < bN ? 6 : 0);
        break;
      case gN:
        h = (bN - rN) / d + 2;
        break;
      case bN:
        h = (rN - gN) / d + 4;
        break;
      default:
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

export const hslToRgb = ({ h, s, l }: HSL): RGB => {
  const sN = s / 100;
  const lN = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sN * Math.min(lN, 1 - lN);
  const f = (n: number) =>
    lN - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return {
    r: Math.round(255 * f(0)),
    g: Math.round(255 * f(8)),
    b: Math.round(255 * f(4)),
  };
};

// OKLCH Conversion Utils
const srgbToLinear = (c: number) => {
  const v = c / 255;
  return v <= 0.040_45 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};

const linearToSrgb = (v: number) => {
  const val = v <= 0.003_130_8 ? v * 12.92 : 1.055 * v ** (1.0 / 2.4) - 0.055;
  return Math.max(0, Math.min(255, Math.round(val * 255)));
};

export const rgbToOklch = ({ r, g, b }: RGB): OKLCH => {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  const l_lms =
    0.412_221_470_8 * lr + 0.536_332_536_3 * lg + 0.051_445_992_9 * lb;
  const m_lms =
    0.211_903_498_2 * lr + 0.680_699_545_1 * lg + 0.107_396_956_6 * lb;
  const s_lms =
    0.088_302_461_9 * lr + 0.281_718_837_6 * lg + 0.629_978_700_5 * lb;

  const l_ = Math.cbrt(l_lms);
  const m_ = Math.cbrt(m_lms);
  const s_ = Math.cbrt(s_lms);

  const L = 0.210_454_255_3 * l_ + 0.793_617_785 * m_ - 0.004_072_046_8 * s_;
  const A = 1.977_998_495_1 * l_ - 2.428_592_205 * m_ + 0.450_593_709_9 * s_;
  const B = 0.025_904_037_1 * l_ + 0.782_771_766_2 * m_ - 0.808_675_766 * s_;

  const C = Math.sqrt(A * A + B * B);
  let h = Math.atan2(B, A) * (180 / Math.PI);
  if (h < 0) {
    h += 360;
  }

  return {
    l: Number(L.toFixed(4)),
    c: Number(C.toFixed(4)),
    h: Number(h.toFixed(2)),
  };
};

export const oklchToRgb = ({ l, c, h }: OKLCH): RGB => {
  const L = l;
  const hRad = h * (Math.PI / 180);
  const A = c * Math.cos(hRad);
  const B = c * Math.sin(hRad);

  const l_ = L + 0.396_337_777_4 * A + 0.215_803_757_3 * B;
  const m_ = L - 0.105_561_345_8 * A - 0.063_854_172_8 * B;
  const s_ = L - 0.089_484_177_5 * A - 1.291_485_548 * B;

  const l_lms = l_ * l_ * l_;
  const m_lms = m_ * m_ * m_;
  const s_lms = s_ * s_ * s_;

  const lr =
    +4.076_741_662_1 * l_lms -
    3.307_711_591_3 * m_lms +
    0.230_969_929_2 * s_lms;
  const lg =
    -1.268_438_004_6 * l_lms +
    2.609_757_401_1 * m_lms -
    0.341_319_396_5 * s_lms;
  const lb =
    -0.004_196_086_3 * l_lms - 0.703_418_614_7 * m_lms + 1.707_614_701 * s_lms;

  return {
    r: linearToSrgb(lr),
    g: linearToSrgb(lg),
    b: linearToSrgb(lb),
  };
};

export const generateColorData = (hex: string): ColorData => {
  const cleanHex = hex.startsWith("#") ? hex : `#${hex}`;
  const rgb = hexToRgb(cleanHex);
  const hsl = rgbToHsl(rgb);
  const oklch = rgbToOklch(rgb);
  return { hex: cleanHex, rgb, hsl, oklch };
};

export const getContrastRatio = (hex1: string, hex2: string): number => {
  const lum1 = getLuminance(hexToRgb(hex1));
  const lum2 = getLuminance(hexToRgb(hex2));
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
};

const getLuminance = ({ r, g, b }: RGB): number => {
  const a = [r, g, b].map((val) => {
    const v = val / 255;
    return v <= 0.039_28 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

export const generateShades = (hex: string, steps = 10): ColorData[] => {
  const { h, s } = rgbToHsl(hexToRgb(hex));
  const shades: ColorData[] = [];
  for (let i = 0; i < steps; i++) {
    // Generate simple lightness steps for shades
    const l = Math.round((i / (steps - 1)) * 100);
    const rgb = hslToRgb({ h, s, l });
    shades.push(generateColorData(rgbToHex(rgb)));
  }
  return shades;
};
