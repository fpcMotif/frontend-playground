"use client";

import { useEffect, useRef } from "react";

interface ColorInputProps {
	value: string;
	onChange: (color: string) => void;
}

export function ColorInput({ value, onChange }: ColorInputProps) {
	const inputRef = useRef<HTMLElement>(null);

	useEffect(() => {
		// Dynamically import the web component
		import("hdr-color-input");
	}, []);

	useEffect(() => {
		const el = inputRef.current;
		if (!el) return;

		const handleInput = (e: Event) => {
			const target = e.target as HTMLInputElement;
			onChange(target.value);
		};

		el.addEventListener("input", handleInput);
		return () => el.removeEventListener("input", handleInput);
	}, [onChange]);

	return (
		<div className="color-input-wrapper">
			{/* @ts-expect-error - Custom element from hdr-color-input */}
			<color-input ref={inputRef} value={value} />
			<style jsx>{`
        .color-input-wrapper {
          --size: 200px;
        }
        .color-input-wrapper :global(color-input) {
          inline-size: var(--size);
          block-size: var(--size);
        }
        .color-input-wrapper :global(color-input::part(input)) {
          display: none;
        }
      `}</style>
		</div>
	);
}
