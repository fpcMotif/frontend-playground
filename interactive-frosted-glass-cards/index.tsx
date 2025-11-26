import { provideZonelessChangeDetection } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import "./src/styles.css";

import { AppComponent } from "@/app.component";

bootstrapApplication(AppComponent, {
	providers: [provideZonelessChangeDetection()],
}).catch((err) => console.error(err));

// AI Studio always uses an `index.tsx` file for all project types.
