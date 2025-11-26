interface GradientPreviewProps {
	color: string;
	steps?: number;
}

export function GradientPreview({ color, steps = 7 }: GradientPreviewProps) {
	const gradientStops = Array.from({ length: steps }, (_, i) => {
		const percent = Math.round((i / (steps - 1)) * 100);
		return `color-mix(in oklch, ${color}, black ${percent}%)`;
	});

	const gradient = `linear-gradient(to right, ${gradientStops.join(", ")})`;

	return (
		<div
			className="w-full h-12 rounded-lg shadow-md"
			style={{ background: gradient }}
			aria-label={`Gradient preview from ${color} to black`}
		/>
	);
}
