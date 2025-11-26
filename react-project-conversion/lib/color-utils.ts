export function hexToRgb(hex: string): string {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (!result) return "rgb(0, 0, 0)";

	const r = Number.parseInt(result[1], 16);
	const g = Number.parseInt(result[2], 16);
	const b = Number.parseInt(result[3], 16);

	return `rgb(${r}, ${g}, ${b})`;
}

export function hexToHsl(hex: string): string {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (!result) return "hsl(0, 0%, 0%)";

	const r = Number.parseInt(result[1], 16) / 255;
	const g = Number.parseInt(result[2], 16) / 255;
	const b = Number.parseInt(result[3], 16) / 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h = 0;
	let s = 0;
	const l = (max + min) / 2;

	if (max !== min) {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		switch (max) {
			case r:
				h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
				break;
			case g:
				h = ((b - r) / d + 2) / 6;
				break;
			case b:
				h = ((r - g) / d + 4) / 6;
				break;
		}
	}

	return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

export function hexToOklch(hex: string): string {
	// Convert hex to linear RGB
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (!result) return "oklch(0% 0 0)";

	let r = Number.parseInt(result[1], 16) / 255;
	let g = Number.parseInt(result[2], 16) / 255;
	let b = Number.parseInt(result[3], 16) / 255;

	// Convert to linear RGB
	r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
	g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
	b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;

	// Convert to OKLab
	const l_ = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
	const m_ = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
	const s_ = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

	const l = Math.cbrt(l_);
	const m = Math.cbrt(m_);
	const s = Math.cbrt(s_);

	const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
	const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
	const bOk = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;

	// Convert to OKLCH
	const C = Math.sqrt(a * a + bOk * bOk);
	let H = Math.atan2(bOk, a) * (180 / Math.PI);
	if (H < 0) H += 360;

	return `oklch(${(L * 100).toFixed(1)}% ${C.toFixed(3)} ${H.toFixed(1)})`;
}

export function hexToP3(hex: string): string {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (!result) return "color(display-p3 0 0 0)";

	const r = (Number.parseInt(result[1], 16) / 255).toFixed(3);
	const g = (Number.parseInt(result[2], 16) / 255).toFixed(3);
	const b = (Number.parseInt(result[3], 16) / 255).toFixed(3);

	return `color(display-p3 ${r} ${g} ${b})`;
}
