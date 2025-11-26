import { effect, Injectable, signal } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class ThemeService {
	darkMode = signal<boolean>(true);

	constructor() {
		// Initialize based on localStorage or system preference
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme) {
			this.darkMode.set(savedTheme === "dark");
		} else {
			const systemDark = window.matchMedia(
				"(prefers-color-scheme: dark)",
			).matches;
			this.darkMode.set(systemDark);
		}

		// Effect to apply the class and save preference
		effect(() => {
			const isDark = this.darkMode();
			const html = document.documentElement;

			if (isDark) {
				html.classList.add("dark");
				html.classList.remove("light"); // Ensure light class is removed if present
			} else {
				html.classList.remove("dark");
				html.classList.add("light"); // Add light class for specific light mode styles
			}

			localStorage.setItem("theme", isDark ? "dark" : "light");
		});
	}

	toggleTheme() {
		this.darkMode.update((d) => !d);
	}
}
