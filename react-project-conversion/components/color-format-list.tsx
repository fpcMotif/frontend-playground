"use client";

import type { ColorFormat } from "@/hooks/use-color-formats";
import { ColorFormatItem } from "./color-format-item";

interface ColorFormatListProps {
	formats: ColorFormat[];
}

export function ColorFormatList({ formats }: ColorFormatListProps) {
	return (
		<ul className="w-full flex flex-col gap-2 list-none p-0 m-0">
			{formats.map((format) => (
				<ColorFormatItem key={format.name} format={format} />
			))}
		</ul>
	);
}
