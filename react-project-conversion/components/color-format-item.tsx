"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import type { ColorFormat } from "@/hooks/use-color-formats";

interface ColorFormatItemProps {
	format: ColorFormat;
}

export function ColorFormatItem({ format }: ColorFormatItemProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(format.value);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	return (
		<li className="flex items-center justify-between gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
			<div className="flex flex-col gap-1 min-w-0 flex-1">
				<span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
					{format.name}
				</span>
				<code className="text-sm font-mono truncate">{format.value}</code>
			</div>
			<button
				onClick={handleCopy}
				className="shrink-0 p-2 rounded-md hover:bg-background transition-colors"
				aria-label={`Copy ${format.name} value`}
			>
				{copied ? (
					<Check className="w-4 h-4 text-green-500" />
				) : (
					<Copy className="w-4 h-4 text-muted-foreground" />
				)}
			</button>
		</li>
	);
}
