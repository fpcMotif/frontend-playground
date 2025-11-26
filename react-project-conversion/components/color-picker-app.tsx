"use client";

import { useState } from "react";
import { useColorFormats } from "@/hooks/use-color-formats";
import { ColorFormatList } from "./color-format-list";
import { ColorInput } from "./color-input";
import { GradientPreview } from "./gradient-preview";

export function ColorPickerApp() {
	const [color, setColor] = useState("#ff6b6b");
	const formats = useColorFormats(color);

	return (
		<main className="min-h-screen flex items-center justify-center p-8 bg-background">
			<div className="flex flex-col items-center gap-8 w-full max-w-md">
				<ColorInput value={color} onChange={setColor} />
				<GradientPreview color={color} />
				<ColorFormatList formats={formats} />
			</div>
		</main>
	);
}
