(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
	typeof document === "object" ? document.currentScript : undefined,
	"[project]/react-project-conversion/node_modules/hdr-color-input/dist/index.js [app-client] (ecmascript, async loader)",
	(__turbopack_context__) => {
		__turbopack_context__.v((parentImport) => {
			return Promise.all(
				[
					"static/chunks/f34e2_hdr-color-input_dist_index_5e6d0204.js",
					"static/chunks/f34e2_hdr-color-input_dist_index_888c4594.js",
				].map((chunk) => __turbopack_context__.l(chunk)),
			).then(() => {
				return parentImport(
					"[project]/react-project-conversion/node_modules/hdr-color-input/dist/index.js [app-client] (ecmascript)",
				);
			});
		});
	},
]);
