"use client";

import { useMemo } from "react";
import { hexToHsl, hexToOklch, hexToP3, hexToRgb } from "@/lib/color-utils";

export interface ColorFormat {
	name: string;
	value: string;
}

export function useColorFormats(hex: string): ColorFormat[] {
	return useMemo(() => {
		const rgb = hexToRgb(hex);
		const hsl = hexToHsl(hex);
		const oklch = hexToOklch(hex);
		const p3 = hexToP3(hex);

		return [
			{ name: "HEX", value: hex.toUpperCase() },
			{ name: "RGB", value: rgb },
			{ name: "HSL", value: hsl },
			{ name: "OKLCH", value: oklch },
			{ name: "Display P3", value: p3 },
		];
	}, [hex]);
}
