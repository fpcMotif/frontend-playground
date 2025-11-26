module.exports = [
	"[project]/react-project-conversion/lib/color-utils.ts [app-ssr] (ecmascript)",
	(__turbopack_context__) => {
		"use strict";

		__turbopack_context__.s([
			"hexToHsl",
			() => hexToHsl,
			"hexToOklch",
			() => hexToOklch,
			"hexToP3",
			() => hexToP3,
			"hexToRgb",
			() => hexToRgb,
		]);
		function hexToRgb(hex) {
			const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			if (!result) return "rgb(0, 0, 0)";
			const r = Number.parseInt(result[1], 16);
			const g = Number.parseInt(result[2], 16);
			const b = Number.parseInt(result[3], 16);
			return `rgb(${r}, ${g}, ${b})`;
		}
		function hexToHsl(hex) {
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
		function hexToOklch(hex) {
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
		function hexToP3(hex) {
			const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			if (!result) return "color(display-p3 0 0 0)";
			const r = (Number.parseInt(result[1], 16) / 255).toFixed(3);
			const g = (Number.parseInt(result[2], 16) / 255).toFixed(3);
			const b = (Number.parseInt(result[3], 16) / 255).toFixed(3);
			return `color(display-p3 ${r} ${g} ${b})`;
		}
	},
	"[project]/react-project-conversion/hooks/use-color-formats.ts [app-ssr] (ecmascript)",
	(__turbopack_context__) => {
		"use strict";

		__turbopack_context__.s(["useColorFormats", () => useColorFormats]);
		var __TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
			__turbopack_context__.i(
				"[project]/react-project-conversion/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
			);
		var __TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$lib$2f$color$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
			__turbopack_context__.i(
				"[project]/react-project-conversion/lib/color-utils.ts [app-ssr] (ecmascript)",
			);
		("use client");
		function useColorFormats(hex) {
			return (0,
			__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
				"useMemo"
			])(() => {
				const rgb = (0,
				__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$lib$2f$color$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
					"hexToRgb"
				])(hex);
				const hsl = (0,
				__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$lib$2f$color$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
					"hexToHsl"
				])(hex);
				const oklch = (0,
				__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$lib$2f$color$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
					"hexToOklch"
				])(hex);
				const p3 = (0,
				__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$lib$2f$color$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
					"hexToP3"
				])(hex);
				return [
					{
						name: "HEX",
						value: hex.toUpperCase(),
					},
					{
						name: "RGB",
						value: rgb,
					},
					{
						name: "HSL",
						value: hsl,
					},
					{
						name: "OKLCH",
						value: oklch,
					},
					{
						name: "Display P3",
						value: p3,
					},
				];
			}, [hex]);
		}
	},
	"[project]/react-project-conversion/components/color-format-item.tsx [app-ssr] (ecmascript)",
	(__turbopack_context__) => {
		"use strict";

		__turbopack_context__.s(["ColorFormatItem", () => ColorFormatItem]);
		var __TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
			__turbopack_context__.i(
				"[project]/react-project-conversion/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
			);
		var __TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ =
			__turbopack_context__.i(
				"[project]/react-project-conversion/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>",
			);
		var __TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ =
			__turbopack_context__.i(
				"[project]/react-project-conversion/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript) <export default as Copy>",
			);
		var __TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
			__turbopack_context__.i(
				"[project]/react-project-conversion/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
			);
		("use client");
		function ColorFormatItem({ format }) {
			const [copied, setCopied] = (0,
			__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
				"useState"
			])(false);
			const handleCopy = async () => {
				try {
					await navigator.clipboard.writeText(format.value);
					setCopied(true);
					setTimeout(() => setCopied(false), 1500);
				} catch (err) {
					setCopied(false);
				}
			};
			return /*#__PURE__*/ (0,
			__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
				"jsxDEV"
			])(
				"li",
				{
					className:
						"flex items-center justify-between gap-4 rounded-xl border border-border/70 bg-card px-3 py-3 shadow-sm transition-all hover:-translate-y-[1px] hover:shadow-md",
					children: [
						/*#__PURE__*/ (0,
						__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
							"jsxDEV"
						])(
							"div",
							{
								className: "flex flex-col gap-1 min-w-0 flex-1",
								children: [
									/*#__PURE__*/ (0,
									__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
										"jsxDEV"
									])(
										"span",
										{
											className:
												"text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.18em]",
											children: format.name,
										},
										void 0,
										false,
										{
											fileName:
												"[project]/react-project-conversion/components/color-format-item.tsx",
											lineNumber: 27,
											columnNumber: 5,
										},
										this,
									),
									/*#__PURE__*/ (0,
									__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
										"jsxDEV"
									])(
										"code",
										{
											className:
												"text-sm font-mono truncate text-foreground/90",
											children: format.value,
										},
										void 0,
										false,
										{
											fileName:
												"[project]/react-project-conversion/components/color-format-item.tsx",
											lineNumber: 30,
											columnNumber: 5,
										},
										this,
									),
								],
							},
							void 0,
							true,
							{
								fileName:
									"[project]/react-project-conversion/components/color-format-item.tsx",
								lineNumber: 26,
								columnNumber: 4,
							},
							this,
						),
						/*#__PURE__*/ (0,
						__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
							"jsxDEV"
						])(
							"button",
							{
								onClick: handleCopy,
								type: "button",
								className:
									"shrink-0 rounded-full border border-transparent bg-muted px-2.5 py-2 text-muted-foreground transition-colors hover:border-border hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
								"aria-label": `Copy ${format.name} value`,
								children: copied
									? /*#__PURE__*/ (0,
										__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
											"jsxDEV"
										])(
											__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__[
												"Check"
											],
											{
												className: "h-4 w-4 text-emerald-500",
											},
											void 0,
											false,
											{
												fileName:
													"[project]/react-project-conversion/components/color-format-item.tsx",
												lineNumber: 41,
												columnNumber: 6,
											},
											this,
										)
									: /*#__PURE__*/ (0,
										__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
											"jsxDEV"
										])(
											__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__[
												"Copy"
											],
											{
												className: "h-4 w-4",
											},
											void 0,
											false,
											{
												fileName:
													"[project]/react-project-conversion/components/color-format-item.tsx",
												lineNumber: 43,
												columnNumber: 6,
											},
											this,
										),
							},
							void 0,
							false,
							{
								fileName:
									"[project]/react-project-conversion/components/color-format-item.tsx",
								lineNumber: 34,
								columnNumber: 4,
							},
							this,
						),
					],
				},
				void 0,
				true,
				{
					fileName:
						"[project]/react-project-conversion/components/color-format-item.tsx",
					lineNumber: 25,
					columnNumber: 3,
				},
				this,
			);
		}
	},
	"[project]/react-project-conversion/components/color-format-list.tsx [app-ssr] (ecmascript)",
	(__turbopack_context__) => {
		"use strict";

		__turbopack_context__.s(["ColorFormatList", () => ColorFormatList]);
		var __TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
			__turbopack_context__.i(
				"[project]/react-project-conversion/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
			);
		var __TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$components$2f$color$2d$format$2d$item$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
			__turbopack_context__.i(
				"[project]/react-project-conversion/components/color-format-item.tsx [app-ssr] (ecmascript)",
			);
		("use client");
		function ColorFormatList({ formats }) {
			return /*#__PURE__*/ (0,
			__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
				"jsxDEV"
			])(
				"ul",
				{
					className: "w-full flex flex-col gap-2 list-none p-0 m-0",
					children: formats.map((format) =>
						/*#__PURE__*/ (0,
						__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
							"jsxDEV"
						])(
							__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$components$2f$color$2d$format$2d$item$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
								"ColorFormatItem"
							],
							{
								format: format,
							},
							format.name,
							false,
							{
								fileName:
									"[project]/react-project-conversion/components/color-format-list.tsx",
								lineNumber: 14,
								columnNumber: 5,
							},
							this,
						),
					),
				},
				void 0,
				false,
				{
					fileName:
						"[project]/react-project-conversion/components/color-format-list.tsx",
					lineNumber: 12,
					columnNumber: 3,
				},
				this,
			);
		}
	},
	"[project]/react-project-conversion/components/color-input.tsx [app-ssr] (ecmascript)",
	(__turbopack_context__) => {
		"use strict";

		__turbopack_context__.s(["ColorInput", () => ColorInput]);
		var __TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
			__turbopack_context__.i(
				"[project]/react-project-conversion/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
			);
		var __TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
			__turbopack_context__.i(
				"[project]/react-project-conversion/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)",
			);
		var __TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
			__turbopack_context__.i(
				"[project]/react-project-conversion/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
			);
		("use client");
		function ColorInput({ value, onChange }) {
			const inputRef = (0,
			__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
				"useRef"
			])(null);
			(0,
			__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
				"useEffect"
			])(() => {
				// Dynamically import the web component
				__turbopack_context__.A(
					"[project]/react-project-conversion/node_modules/hdr-color-input/dist/index.js [app-ssr] (ecmascript, async loader)",
				);
			}, []);
			(0,
			__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
				"useEffect"
			])(() => {
				const el = inputRef.current;
				if (!el) return;
				const handleInput = (e) => {
					const target = e.target;
					onChange(target.value);
				};
				el.addEventListener("input", handleInput);
				return () => el.removeEventListener("input", handleInput);
			}, [onChange]);
			return /*#__PURE__*/ (0,
			__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
				"jsxDEV"
			])(
				"div",
				{
					className: "jsx-1b9a1f681a861f14" + " " + "color-input-wrapper",
					children: [
						/*#__PURE__*/ (0,
						__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
							"jsxDEV"
						])(
							"color-input",
							{
								ref: inputRef,
								value: value,
								className: "jsx-1b9a1f681a861f14",
							},
							void 0,
							false,
							{
								fileName:
									"[project]/react-project-conversion/components/color-input.tsx",
								lineNumber: 34,
								columnNumber: 4,
							},
							this,
						),
						/*#__PURE__*/ (0,
						__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
							"jsxDEV"
						])(
							__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
								"default"
							],
							{
								id: "1b9a1f681a861f14",
								children:
									".color-input-wrapper.jsx-1b9a1f681a861f14{--size:200px}.color-input-wrapper.jsx-1b9a1f681a861f14 color-input{width:var(--size);height:var(--size)}.color-input-wrapper.jsx-1b9a1f681a861f14 color-input::part(input){display:none}",
							},
							void 0,
							false,
							void 0,
							this,
						),
					],
				},
				void 0,
				true,
				{
					fileName:
						"[project]/react-project-conversion/components/color-input.tsx",
					lineNumber: 32,
					columnNumber: 3,
				},
				this,
			);
		}
	},
	"[project]/react-project-conversion/components/gradient-preview.tsx [app-ssr] (ecmascript)",
	(__turbopack_context__) => {
		"use strict";

		__turbopack_context__.s(["GradientPreview", () => GradientPreview]);
		var __TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
			__turbopack_context__.i(
				"[project]/react-project-conversion/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
			);
		function GradientPreview({ color, steps = 7 }) {
			const gradientStops = Array.from(
				{
					length: steps,
				},
				(_, i) => {
					const percent = Math.round((i / (steps - 1)) * 100);
					return `color-mix(in oklch, ${color}, black ${percent}%)`;
				},
			);
			const gradient = `linear-gradient(to right, ${gradientStops.join(", ")})`;
			return /*#__PURE__*/ (0,
			__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
				"jsxDEV"
			])(
				"div",
				{
					className: "w-full space-y-2",
					children: [
						/*#__PURE__*/ (0,
						__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
							"jsxDEV"
						])(
							"div",
							{
								className:
									"flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
								children: [
									/*#__PURE__*/ (0,
									__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
										"jsxDEV"
									])(
										"span",
										{
											children: "Gradient",
										},
										void 0,
										false,
										{
											fileName:
												"[project]/react-project-conversion/components/gradient-preview.tsx",
											lineNumber: 17,
											columnNumber: 5,
										},
										this,
									),
									/*#__PURE__*/ (0,
									__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
										"jsxDEV"
									])(
										"span",
										{
											className:
												"font-medium tracking-normal text-[11px] text-foreground/70",
											children: color.toUpperCase(),
										},
										void 0,
										false,
										{
											fileName:
												"[project]/react-project-conversion/components/gradient-preview.tsx",
											lineNumber: 18,
											columnNumber: 5,
										},
										this,
									),
								],
							},
							void 0,
							true,
							{
								fileName:
									"[project]/react-project-conversion/components/gradient-preview.tsx",
								lineNumber: 16,
								columnNumber: 4,
							},
							this,
						),
						/*#__PURE__*/ (0,
						__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
							"jsxDEV"
						])(
							"div",
							{
								className:
									"h-10 rounded-xl shadow-[0_14px_35px_rgba(15,23,42,0.45)]",
								style: {
									background: gradient,
								},
								"aria-label": `Gradient preview from ${color} to black`,
							},
							void 0,
							false,
							{
								fileName:
									"[project]/react-project-conversion/components/gradient-preview.tsx",
								lineNumber: 22,
								columnNumber: 4,
							},
							this,
						),
					],
				},
				void 0,
				true,
				{
					fileName:
						"[project]/react-project-conversion/components/gradient-preview.tsx",
					lineNumber: 15,
					columnNumber: 3,
				},
				this,
			);
		}
	},
	"[project]/react-project-conversion/components/color-picker-app.tsx [app-ssr] (ecmascript)",
	(__turbopack_context__) => {
		"use strict";

		__turbopack_context__.s(["ColorPickerApp", () => ColorPickerApp]);
		var __TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
			__turbopack_context__.i(
				"[project]/react-project-conversion/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
			);
		var __TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
			__turbopack_context__.i(
				"[project]/react-project-conversion/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
			);
		var __TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$hooks$2f$use$2d$color$2d$formats$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
			__turbopack_context__.i(
				"[project]/react-project-conversion/hooks/use-color-formats.ts [app-ssr] (ecmascript)",
			);
		var __TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$components$2f$color$2d$format$2d$list$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
			__turbopack_context__.i(
				"[project]/react-project-conversion/components/color-format-list.tsx [app-ssr] (ecmascript)",
			);
		var __TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$components$2f$color$2d$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
			__turbopack_context__.i(
				"[project]/react-project-conversion/components/color-input.tsx [app-ssr] (ecmascript)",
			);
		var __TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$components$2f$gradient$2d$preview$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
			__turbopack_context__.i(
				"[project]/react-project-conversion/components/gradient-preview.tsx [app-ssr] (ecmascript)",
			);
		("use client");
		function ColorPickerApp() {
			const [color, setColor] = (0,
			__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
				"useState"
			])("#ff6b6b");
			const formats = (0,
			__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$hooks$2f$use$2d$color$2d$formats$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
				"useColorFormats"
			])(color);
			return /*#__PURE__*/ (0,
			__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
				"jsxDEV"
			])(
				"main",
				{
					className:
						"min-h-screen bg-gradient-to-b from-background via-background to-muted/60 px-4 py-10",
					children: /*#__PURE__*/ (0,
					__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
						"jsxDEV"
					])(
						"div",
						{
							className: "mx-auto flex w-full max-w-5xl flex-col gap-8",
							children: [
								/*#__PURE__*/ (0,
								__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
									"jsxDEV"
								])(
									"header",
									{
										className: "space-y-3 text-center",
										children: [
											/*#__PURE__*/ (0,
											__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
												"jsxDEV"
											])(
												"p",
												{
													className:
														"inline-flex items-center justify-center rounded-full bg-muted px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground",
													children: "Color Playground",
												},
												void 0,
												false,
												{
													fileName:
														"[project]/react-project-conversion/components/color-picker-app.tsx",
													lineNumber: 17,
													columnNumber: 6,
												},
												this,
											),
											/*#__PURE__*/ (0,
											__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
												"jsxDEV"
											])(
												"h1",
												{
													className:
														"text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl",
													children: "HDR 颜色拾取与渐变预览",
												},
												void 0,
												false,
												{
													fileName:
														"[project]/react-project-conversion/components/color-picker-app.tsx",
													lineNumber: 20,
													columnNumber: 6,
												},
												this,
											),
											/*#__PURE__*/ (0,
											__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
												"jsxDEV"
											])(
												"p",
												{
													className:
														"mx-auto max-w-2xl text-sm text-muted-foreground md:text-base",
													children:
														"拖动上方拾色器，实时查看渐变效果，并一键复制常见色彩格式，方便在设计、 代码和多设备显示场景中复用。",
												},
												void 0,
												false,
												{
													fileName:
														"[project]/react-project-conversion/components/color-picker-app.tsx",
													lineNumber: 23,
													columnNumber: 6,
												},
												this,
											),
										],
									},
									void 0,
									true,
									{
										fileName:
											"[project]/react-project-conversion/components/color-picker-app.tsx",
										lineNumber: 16,
										columnNumber: 5,
									},
									this,
								),
								/*#__PURE__*/ (0,
								__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
									"jsxDEV"
								])(
									"div",
									{
										className:
											"grid items-start gap-8 rounded-3xl border border-border/60 bg-card/90 px-6 py-6 shadow-[0_22px_60px_rgba(15,23,42,0.35)] backdrop-blur-xl md:px-10 md:py-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:px-12 lg:py-10",
										children: [
											/*#__PURE__*/ (0,
											__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
												"jsxDEV"
											])(
												"section",
												{
													className: "space-y-6",
													children: /*#__PURE__*/ (0,
													__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
														"jsxDEV"
													])(
														"div",
														{
															className: "flex flex-col gap-6",
															children: [
																/*#__PURE__*/ (0,
																__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
																	"jsxDEV"
																])(
																	__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$components$2f$color$2d$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
																		"ColorInput"
																	],
																	{
																		value: color,
																		onChange: setColor,
																	},
																	void 0,
																	false,
																	{
																		fileName:
																			"[project]/react-project-conversion/components/color-picker-app.tsx",
																		lineNumber: 32,
																		columnNumber: 8,
																	},
																	this,
																),
																/*#__PURE__*/ (0,
																__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
																	"jsxDEV"
																])(
																	__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$components$2f$gradient$2d$preview$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
																		"GradientPreview"
																	],
																	{
																		color: color,
																	},
																	void 0,
																	false,
																	{
																		fileName:
																			"[project]/react-project-conversion/components/color-picker-app.tsx",
																		lineNumber: 33,
																		columnNumber: 8,
																	},
																	this,
																),
															],
														},
														void 0,
														true,
														{
															fileName:
																"[project]/react-project-conversion/components/color-picker-app.tsx",
															lineNumber: 31,
															columnNumber: 7,
														},
														this,
													),
												},
												void 0,
												false,
												{
													fileName:
														"[project]/react-project-conversion/components/color-picker-app.tsx",
													lineNumber: 30,
													columnNumber: 6,
												},
												this,
											),
											/*#__PURE__*/ (0,
											__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
												"jsxDEV"
											])(
												"section",
												{
													"aria-label": "颜色格式列表",
													className:
														"flex max-h-[420px] flex-col gap-3 overflow-y-auto pr-1",
													children: [
														/*#__PURE__*/ (0,
														__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
															"jsxDEV"
														])(
															"h2",
															{
																className:
																	"text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground",
																children: "颜色格式",
															},
															void 0,
															false,
															{
																fileName:
																	"[project]/react-project-conversion/components/color-picker-app.tsx",
																lineNumber: 41,
																columnNumber: 7,
															},
															this,
														),
														/*#__PURE__*/ (0,
														__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
															"jsxDEV"
														])(
															__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$components$2f$color$2d$format$2d$list$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
																"ColorFormatList"
															],
															{
																formats: formats,
															},
															void 0,
															false,
															{
																fileName:
																	"[project]/react-project-conversion/components/color-picker-app.tsx",
																lineNumber: 44,
																columnNumber: 7,
															},
															this,
														),
														/*#__PURE__*/ (0,
														__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
															"jsxDEV"
														])(
															"p",
															{
																className:
																	"mt-1 text-[11px] text-muted-foreground",
																children:
																	"点击每一行右侧的按钮即可复制对应值到剪贴板。",
															},
															void 0,
															false,
															{
																fileName:
																	"[project]/react-project-conversion/components/color-picker-app.tsx",
																lineNumber: 45,
																columnNumber: 7,
															},
															this,
														),
													],
												},
												void 0,
												true,
												{
													fileName:
														"[project]/react-project-conversion/components/color-picker-app.tsx",
													lineNumber: 37,
													columnNumber: 6,
												},
												this,
											),
										],
									},
									void 0,
									true,
									{
										fileName:
											"[project]/react-project-conversion/components/color-picker-app.tsx",
										lineNumber: 29,
										columnNumber: 5,
									},
									this,
								),
							],
						},
						void 0,
						true,
						{
							fileName:
								"[project]/react-project-conversion/components/color-picker-app.tsx",
							lineNumber: 15,
							columnNumber: 4,
						},
						this,
					),
				},
				void 0,
				false,
				{
					fileName:
						"[project]/react-project-conversion/components/color-picker-app.tsx",
					lineNumber: 14,
					columnNumber: 3,
				},
				this,
			);
		}
	},
	"[project]/react-project-conversion/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
	(__turbopack_context__, module, exports) => {
		"use strict";

		module.exports = __turbopack_context__.r(
			"[project]/react-project-conversion/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)",
		).vendored["react-ssr"].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
	},
	"[project]/react-project-conversion/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-ssr] (ecmascript)",
	(__turbopack_context__) => {
		"use strict";

		/**
		 * @license lucide-react v0.454.0 - ISC
		 *
		 * This source code is licensed under the ISC license.
		 * See the LICENSE file in the root directory of this source tree.
		 */ __turbopack_context__.s([
			"mergeClasses",
			() => mergeClasses,
			"toKebabCase",
			() => toKebabCase,
		]);
		const toKebabCase = (string) =>
			string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
		const mergeClasses = (...classes) =>
			classes
				.filter((className, index, array) => {
					return (
						Boolean(className) &&
						className.trim() !== "" &&
						array.indexOf(className) === index
					);
				})
				.join(" ")
				.trim();
		//# sourceMappingURL=utils.js.map
	},
	"[project]/react-project-conversion/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-ssr] (ecmascript)",
	(__turbopack_context__) => {
		"use strict";

		/**
		 * @license lucide-react v0.454.0 - ISC
		 *
		 * This source code is licensed under the ISC license.
		 * See the LICENSE file in the root directory of this source tree.
		 */ __turbopack_context__.s(["default", () => defaultAttributes]);
		var defaultAttributes = {
			xmlns: "http://www.w3.org/2000/svg",
			width: 24,
			height: 24,
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: 2,
			strokeLinecap: "round",
			strokeLinejoin: "round",
		};
		//# sourceMappingURL=defaultAttributes.js.map
	},
	"[project]/react-project-conversion/node_modules/lucide-react/dist/esm/Icon.js [app-ssr] (ecmascript)",
	(__turbopack_context__) => {
		"use strict";

		/**
		 * @license lucide-react v0.454.0 - ISC
		 *
		 * This source code is licensed under the ISC license.
		 * See the LICENSE file in the root directory of this source tree.
		 */ __turbopack_context__.s(["default", () => Icon]);
		var __TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
			__turbopack_context__.i(
				"[project]/react-project-conversion/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
			);
		var __TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
			__turbopack_context__.i(
				"[project]/react-project-conversion/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-ssr] (ecmascript)",
			);
		var __TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
			__turbopack_context__.i(
				"[project]/react-project-conversion/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-ssr] (ecmascript)",
			);
		const Icon = (0,
		__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
			"forwardRef"
		])(
			(
				{
					color = "currentColor",
					size = 24,
					strokeWidth = 2,
					absoluteStrokeWidth,
					className = "",
					children,
					iconNode,
					...rest
				},
				ref,
			) => {
				return (0,
				__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
					"createElement"
				])(
					"svg",
					{
						ref,
						...__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
							"default"
						],
						width: size,
						height: size,
						stroke: color,
						strokeWidth: absoluteStrokeWidth
							? (Number(strokeWidth) * 24) / Number(size)
							: strokeWidth,
						className: (0,
						__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
							"mergeClasses"
						])("lucide", className),
						...rest,
					},
					[
						...iconNode.map(([tag, attrs]) =>
							(0,
							__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
								"createElement"
							])(tag, attrs),
						),
						...(Array.isArray(children) ? children : [children]),
					],
				);
			},
		);
		//# sourceMappingURL=Icon.js.map
	},
	"[project]/react-project-conversion/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)",
	(__turbopack_context__) => {
		"use strict";

		/**
		 * @license lucide-react v0.454.0 - ISC
		 *
		 * This source code is licensed under the ISC license.
		 * See the LICENSE file in the root directory of this source tree.
		 */ __turbopack_context__.s(["default", () => createLucideIcon]);
		var __TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
			__turbopack_context__.i(
				"[project]/react-project-conversion/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
			);
		var __TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
			__turbopack_context__.i(
				"[project]/react-project-conversion/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-ssr] (ecmascript)",
			);
		var __TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
			__turbopack_context__.i(
				"[project]/react-project-conversion/node_modules/lucide-react/dist/esm/Icon.js [app-ssr] (ecmascript)",
			);
		const createLucideIcon = (iconName, iconNode) => {
			const Component = (0,
			__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
				"forwardRef"
			])(({ className, ...props }, ref) =>
				(0,
				__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
					"createElement"
				])(
					__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
						"default"
					],
					{
						ref,
						iconNode,
						className: (0,
						__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
							"mergeClasses"
						])(
							`lucide-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toKebabCase"])(iconName)}`,
							className,
						),
						...props,
					},
				),
			);
			Component.displayName = `${iconName}`;
			return Component;
		};
		//# sourceMappingURL=createLucideIcon.js.map
	},
	"[project]/react-project-conversion/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript)",
	(__turbopack_context__) => {
		"use strict";

		/**
		 * @license lucide-react v0.454.0 - ISC
		 *
		 * This source code is licensed under the ISC license.
		 * See the LICENSE file in the root directory of this source tree.
		 */ __turbopack_context__.s(["default", () => Check]);
		var __TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
			__turbopack_context__.i(
				"[project]/react-project-conversion/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)",
			);
		const Check = (0,
		__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
			"default"
		])("Check", [
			[
				"path",
				{
					d: "M20 6 9 17l-5-5",
					key: "1gmf2c",
				},
			],
		]);
		//# sourceMappingURL=check.js.map
	},
	"[project]/react-project-conversion/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>",
	(__turbopack_context__) => {
		"use strict";

		__turbopack_context__.s([
			"Check",
			() =>
				__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
					"default"
				],
		]);
		var __TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
			__turbopack_context__.i(
				"[project]/react-project-conversion/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript)",
			);
	},
	"[project]/react-project-conversion/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript)",
	(__turbopack_context__) => {
		"use strict";

		/**
		 * @license lucide-react v0.454.0 - ISC
		 *
		 * This source code is licensed under the ISC license.
		 * See the LICENSE file in the root directory of this source tree.
		 */ __turbopack_context__.s(["default", () => Copy]);
		var __TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
			__turbopack_context__.i(
				"[project]/react-project-conversion/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)",
			);
		const Copy = (0,
		__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
			"default"
		])("Copy", [
			[
				"rect",
				{
					width: "14",
					height: "14",
					x: "8",
					y: "8",
					rx: "2",
					ry: "2",
					key: "17jyea",
				},
			],
			[
				"path",
				{
					d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
					key: "zix9uf",
				},
			],
		]);
		//# sourceMappingURL=copy.js.map
	},
	"[project]/react-project-conversion/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript) <export default as Copy>",
	(__turbopack_context__) => {
		"use strict";

		__turbopack_context__.s([
			"Copy",
			() =>
				__TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
					"default"
				],
		]);
		var __TURBOPACK__imported__module__$5b$project$5d2f$react$2d$project$2d$conversion$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
			__turbopack_context__.i(
				"[project]/react-project-conversion/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript)",
			);
	},
	"[project]/react-project-conversion/node_modules/next/dist/compiled/client-only/index.js [app-ssr] (ecmascript)",
	(__turbopack_context__, module, exports) => {},
	"[project]/react-project-conversion/node_modules/styled-jsx/dist/index/index.js [app-ssr] (ecmascript)",
	(__turbopack_context__, module, exports) => {
		__turbopack_context__.r(
			"[project]/react-project-conversion/node_modules/next/dist/compiled/client-only/index.js [app-ssr] (ecmascript)",
		);
		var React = __turbopack_context__.r(
			"[project]/react-project-conversion/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
		);
		function _interopDefaultLegacy(e) {
			return e && typeof e === "object" && "default" in e
				? e
				: {
						default: e,
					};
		}
		var React__default = /*#__PURE__*/ _interopDefaultLegacy(React);
		/*
Based on Glamor's sheet
https://github.com/threepointone/glamor/blob/667b480d31b3721a905021b26e1290ce92ca2879/src/sheet.js
*/ function _defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}
		function _createClass(Constructor, protoProps, staticProps) {
			if (protoProps) _defineProperties(Constructor.prototype, protoProps);
			if (staticProps) _defineProperties(Constructor, staticProps);
			return Constructor;
		}
		var isProd =
			typeof process !== "undefined" &&
			process.env &&
			("TURBOPACK compile-time value", "development") === "production";
		var isString = (o) =>
			Object.prototype.toString.call(o) === "[object String]";
		var StyleSheet = /*#__PURE__*/ (() => {
			function StyleSheet(param) {
				var ref = param === void 0 ? {} : param,
					_name = ref.name,
					name = _name === void 0 ? "stylesheet" : _name,
					_optimizeForSpeed = ref.optimizeForSpeed,
					optimizeForSpeed =
						_optimizeForSpeed === void 0 ? isProd : _optimizeForSpeed;
				invariant$1(isString(name), "`name` must be a string");
				this._name = name;
				this._deletedRulePlaceholder = "#" + name + "-deleted-rule____{}";
				invariant$1(
					typeof optimizeForSpeed === "boolean",
					"`optimizeForSpeed` must be a boolean",
				);
				this._optimizeForSpeed = optimizeForSpeed;
				this._serverSheet = undefined;
				this._tags = [];
				this._injected = false;
				this._rulesCount = 0;
				var node =
					("TURBOPACK compile-time value", "undefined") !== "undefined" &&
					document.querySelector('meta[property="csp-nonce"]');
				this._nonce = ("TURBOPACK compile-time falsy", 0)
					? "TURBOPACK unreachable"
					: null;
			}
			var _proto = StyleSheet.prototype;
			_proto.setOptimizeForSpeed = function setOptimizeForSpeed(bool) {
				invariant$1(
					typeof bool === "boolean",
					"`setOptimizeForSpeed` accepts a boolean",
				);
				invariant$1(
					this._rulesCount === 0,
					"optimizeForSpeed cannot be when rules have already been inserted",
				);
				this.flush();
				this._optimizeForSpeed = bool;
				this.inject();
			};
			_proto.isOptimizeForSpeed = function isOptimizeForSpeed() {
				return this._optimizeForSpeed;
			};
			_proto.inject = function inject() {
				invariant$1(!this._injected, "sheet already injected");
				this._injected = true;
				if (
					("TURBOPACK compile-time value", "undefined") !== "undefined" &&
					this._optimizeForSpeed //TURBOPACK unreachable
				);
				this._serverSheet = {
					cssRules: [],
					insertRule: (rule, index) => {
						if (typeof index === "number") {
							this._serverSheet.cssRules[index] = {
								cssText: rule,
							};
						} else {
							this._serverSheet.cssRules.push({
								cssText: rule,
							});
						}
						return index;
					},
					deleteRule: (index) => {
						this._serverSheet.cssRules[index] = null;
					},
				};
			};
			_proto.getSheetForTag = function getSheetForTag(tag) {
				if (tag.sheet) {
					return tag.sheet;
				}
				// this weirdness brought to you by firefox
				for (var i = 0; i < document.styleSheets.length; i++) {
					if (document.styleSheets[i].ownerNode === tag) {
						return document.styleSheets[i];
					}
				}
			};
			_proto.getSheet = function getSheet() {
				return this.getSheetForTag(this._tags[this._tags.length - 1]);
			};
			_proto.insertRule = function insertRule(rule, index) {
				invariant$1(isString(rule), "`insertRule` accepts only strings");
				if (("TURBOPACK compile-time truthy", 1)) {
					if (typeof index !== "number") {
						index = this._serverSheet.cssRules.length;
					}
					this._serverSheet.insertRule(rule, index);
					return this._rulesCount++;
				}
				//TURBOPACK unreachable
				var sheet;
				var insertionPoint;
			};
			_proto.replaceRule = function replaceRule(index, rule) {
				if (
					this._optimizeForSpeed ||
					("TURBOPACK compile-time value", "undefined") === "undefined"
				) {
					var sheet = ("TURBOPACK compile-time falsy", 0)
						? "TURBOPACK unreachable"
						: this._serverSheet;
					if (!rule.trim()) {
						rule = this._deletedRulePlaceholder;
					}
					if (!sheet.cssRules[index]) {
						// @TBD Should we throw an error?
						return index;
					}
					sheet.deleteRule(index);
					try {
						sheet.insertRule(rule, index);
					} catch (error) {
						if (("TURBOPACK compile-time truthy", 1)) {
							console.warn(
								"StyleSheet: illegal rule: \n\n" +
									rule +
									"\n\nSee https://stackoverflow.com/q/20007992 for more info",
							);
						}
						// In order to preserve the indices we insert a deleteRulePlaceholder
						sheet.insertRule(this._deletedRulePlaceholder, index);
					}
				} //TURBOPACK unreachable
				else {
					var tag;
				}
				return index;
			};
			_proto.deleteRule = function deleteRule(index) {
				if (("TURBOPACK compile-time truthy", 1)) {
					this._serverSheet.deleteRule(index);
					return;
				}
				//TURBOPACK unreachable
				var tag;
			};
			_proto.flush = function flush() {
				this._injected = false;
				this._rulesCount = 0;
				if (
					("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
				);
				else {
					// simpler on server
					this._serverSheet.cssRules = [];
				}
			};
			_proto.cssRules = function cssRules() {
				if (("TURBOPACK compile-time truthy", 1)) {
					return this._serverSheet.cssRules;
				}
				//TURBOPACK unreachable
			};
			_proto.makeStyleTag = function makeStyleTag(
				name,
				cssString,
				relativeToTag,
			) {
				if (cssString) {
					invariant$1(
						isString(cssString),
						"makeStyleTag accepts only strings as second parameter",
					);
				}
				var tag = document.createElement("style");
				if (this._nonce) tag.setAttribute("nonce", this._nonce);
				tag.type = "text/css";
				tag.setAttribute("data-" + name, "");
				if (cssString) {
					tag.appendChild(document.createTextNode(cssString));
				}
				var head = document.head || document.getElementsByTagName("head")[0];
				if (relativeToTag) {
					head.insertBefore(tag, relativeToTag);
				} else {
					head.appendChild(tag);
				}
				return tag;
			};
			_createClass(StyleSheet, [
				{
					key: "length",
					get: function get() {
						return this._rulesCount;
					},
				},
			]);
			return StyleSheet;
		})();
		function invariant$1(condition, message) {
			if (!condition) {
				throw new Error("StyleSheet: " + message + ".");
			}
		}
		function hash(str) {
			var _$hash = 5381,
				i = str.length;
			while (i) {
				_$hash = (_$hash * 33) ^ str.charCodeAt(--i);
			}
			/* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
			 * integers. Since we want the results to be always positive, convert the
			 * signed int to an unsigned by doing an unsigned bitshift. */ return (
				_$hash >>> 0
			);
		}
		var stringHash = hash;
		var sanitize = (rule) => rule.replace(/\/style/gi, "\\/style");
		var cache = {};
		/**
		 * computeId
		 *
		 * Compute and memoize a jsx id from a basedId and optionally props.
		 */ function computeId(baseId, props) {
			if (!props) {
				return "jsx-" + baseId;
			}
			var propsToString = String(props);
			var key = baseId + propsToString;
			if (!cache[key]) {
				cache[key] = "jsx-" + stringHash(baseId + "-" + propsToString);
			}
			return cache[key];
		}
		/**
		 * computeSelector
		 *
		 * Compute and memoize dynamic selectors.
		 */ function computeSelector(id, css) {
			var selectoPlaceholderRegexp = /__jsx-style-dynamic-selector/g;
			// Sanitize SSR-ed CSS.
			// Client side code doesn't need to be sanitized since we use
			// document.createTextNode (dev) and the CSSOM api sheet.insertRule (prod).
			if (("TURBOPACK compile-time truthy", 1)) {
				css = sanitize(css);
			}
			var idcss = id + css;
			if (!cache[idcss]) {
				cache[idcss] = css.replace(selectoPlaceholderRegexp, id);
			}
			return cache[idcss];
		}
		function mapRulesToStyle(cssRules, options) {
			if (options === void 0) options = {};
			return cssRules.map((args) => {
				var id = args[0];
				var css = args[1];
				return /*#__PURE__*/ React__default["default"].createElement("style", {
					id: "__" + id,
					// Avoid warnings upon render with a key
					key: "__" + id,
					nonce: options.nonce ? options.nonce : undefined,
					dangerouslySetInnerHTML: {
						__html: css,
					},
				});
			});
		}
		var StyleSheetRegistry = /*#__PURE__*/ (() => {
			function StyleSheetRegistry(param) {
				var ref = param === void 0 ? {} : param,
					_styleSheet = ref.styleSheet,
					styleSheet = _styleSheet === void 0 ? null : _styleSheet,
					_optimizeForSpeed = ref.optimizeForSpeed,
					optimizeForSpeed =
						_optimizeForSpeed === void 0 ? false : _optimizeForSpeed;
				this._sheet =
					styleSheet ||
					new StyleSheet({
						name: "styled-jsx",
						optimizeForSpeed: optimizeForSpeed,
					});
				this._sheet.inject();
				if (styleSheet && typeof optimizeForSpeed === "boolean") {
					this._sheet.setOptimizeForSpeed(optimizeForSpeed);
					this._optimizeForSpeed = this._sheet.isOptimizeForSpeed();
				}
				this._fromServer = undefined;
				this._indices = {};
				this._instancesCounts = {};
			}
			var _proto = StyleSheetRegistry.prototype;
			_proto.add = function add(props) {
				if (undefined === this._optimizeForSpeed) {
					this._optimizeForSpeed = Array.isArray(props.children);
					this._sheet.setOptimizeForSpeed(this._optimizeForSpeed);
					this._optimizeForSpeed = this._sheet.isOptimizeForSpeed();
				}
				if (
					("TURBOPACK compile-time value", "undefined") !== "undefined" &&
					!this._fromServer //TURBOPACK unreachable
				);
				var ref = this.getIdAndRules(props),
					styleId = ref.styleId,
					rules = ref.rules;
				// Deduping: just increase the instances count.
				if (styleId in this._instancesCounts) {
					this._instancesCounts[styleId] += 1;
					return;
				}
				var indices = rules
					.map((rule) => this._sheet.insertRule(rule)) // Filter out invalid rules
					.filter((index) => index !== -1);
				this._indices[styleId] = indices;
				this._instancesCounts[styleId] = 1;
			};
			_proto.remove = function remove(props) {
				var styleId = this.getIdAndRules(props).styleId;
				invariant(
					styleId in this._instancesCounts,
					"styleId: `" + styleId + "` not found",
				);
				this._instancesCounts[styleId] -= 1;
				if (this._instancesCounts[styleId] < 1) {
					var tagFromServer = this._fromServer && this._fromServer[styleId];
					if (tagFromServer) {
						tagFromServer.parentNode.removeChild(tagFromServer);
						delete this._fromServer[styleId];
					} else {
						this._indices[styleId].forEach((index) =>
							this._sheet.deleteRule(index),
						);
						delete this._indices[styleId];
					}
					delete this._instancesCounts[styleId];
				}
			};
			_proto.update = function update(props, nextProps) {
				this.add(nextProps);
				this.remove(props);
			};
			_proto.flush = function flush() {
				this._sheet.flush();
				this._sheet.inject();
				this._fromServer = undefined;
				this._indices = {};
				this._instancesCounts = {};
			};
			_proto.cssRules = function cssRules() {
				var fromServer = this._fromServer
					? Object.keys(this._fromServer).map((styleId) => [
							styleId,
							this._fromServer[styleId],
						])
					: [];
				var cssRules = this._sheet.cssRules();
				return fromServer.concat(
					Object.keys(this._indices)
						.map((styleId) => [
							styleId,
							this._indices[styleId]
								.map((index) => cssRules[index].cssText)
								.join(this._optimizeForSpeed ? "" : "\n"),
						]) // filter out empty rules
						.filter((rule) => Boolean(rule[1])),
				);
			};
			_proto.styles = function styles(options) {
				return mapRulesToStyle(this.cssRules(), options);
			};
			_proto.getIdAndRules = function getIdAndRules(props) {
				var css = props.children,
					dynamic = props.dynamic,
					id = props.id;
				if (dynamic) {
					var styleId = computeId(id, dynamic);
					return {
						styleId: styleId,
						rules: Array.isArray(css)
							? css.map((rule) => computeSelector(styleId, rule))
							: [computeSelector(styleId, css)],
					};
				}
				return {
					styleId: computeId(id),
					rules: Array.isArray(css) ? css : [css],
				};
			};
			/**
			 * selectFromServer
			 *
			 * Collects style tags from the document with id __jsx-XXX
			 */ _proto.selectFromServer = function selectFromServer() {
				var elements = Array.prototype.slice.call(
					document.querySelectorAll('[id^="__jsx-"]'),
				);
				return elements.reduce((acc, element) => {
					var id = element.id.slice(2);
					acc[id] = element;
					return acc;
				}, {});
			};
			return StyleSheetRegistry;
		})();
		function invariant(condition, message) {
			if (!condition) {
				throw new Error("StyleSheetRegistry: " + message + ".");
			}
		}
		var StyleSheetContext = /*#__PURE__*/ React.createContext(null);
		StyleSheetContext.displayName = "StyleSheetContext";
		function createStyleRegistry() {
			return new StyleSheetRegistry();
		}
		function StyleRegistry(param) {
			var configuredRegistry = param.registry,
				children = param.children;
			var rootRegistry = React.useContext(StyleSheetContext);
			var ref = React.useState(
					() => rootRegistry || configuredRegistry || createStyleRegistry(),
				),
				registry = ref[0];
			return /*#__PURE__*/ React__default["default"].createElement(
				StyleSheetContext.Provider,
				{
					value: registry,
				},
				children,
			);
		}
		function useStyleRegistry() {
			return React.useContext(StyleSheetContext);
		}
		// Opt-into the new `useInsertionEffect` API in React 18, fallback to `useLayoutEffect`.
		// https://github.com/reactwg/react-18/discussions/110
		var useInsertionEffect =
			React__default["default"].useInsertionEffect ||
			React__default["default"].useLayoutEffect;
		var defaultRegistry = ("TURBOPACK compile-time falsy", 0)
			? "TURBOPACK unreachable"
			: undefined;
		function JSXStyle(props) {
			var registry = ("TURBOPACK compile-time falsy", 0)
				? "TURBOPACK unreachable"
				: useStyleRegistry();
			// If `registry` does not exist, we do nothing here.
			if (!registry) {
				return null;
			}
			if (("TURBOPACK compile-time truthy", 1)) {
				registry.add(props);
				return null;
			}
			//TURBOPACK unreachable
		}
		JSXStyle.dynamic = (info) =>
			info
				.map((tagInfo) => {
					var baseId = tagInfo[0];
					var props = tagInfo[1];
					return computeId(baseId, props);
				})
				.join(" ");
		exports.StyleRegistry = StyleRegistry;
		exports.createStyleRegistry = createStyleRegistry;
		exports.style = JSXStyle;
		exports.useStyleRegistry = useStyleRegistry;
	},
	"[project]/react-project-conversion/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)",
	(__turbopack_context__, module, exports) => {
		module.exports = __turbopack_context__.r(
			"[project]/react-project-conversion/node_modules/styled-jsx/dist/index/index.js [app-ssr] (ecmascript)",
		).style;
	},
];

//# sourceMappingURL=react-project-conversion_98fa3f2b._.js.map
