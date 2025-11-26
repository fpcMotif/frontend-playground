import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from "@angular/core";

@Component({
	selector: "app-card",
	templateUrl: "./card.component.html",
	styleUrls: ["./card.component.css"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
	title = input.required<string>();
	imageUrl = input.required<string>();
	isLoaded = input(false);
	cardIndex = input(0);
	totalCards = input(1);

	// Expose Math to the component's context to avoid runtime errors.
	protected readonly Math = Math;

	transformStyle = computed(() => {
		if (this.isLoaded()) {
			return "translateY(0) rotate(0deg) scale(1)";
		}

		// Initial state: create a fanned-out deck of cards stacked in one grid cell
		const index = this.cardIndex();
		const midIndex = (this.totalCards() - 1) / 2;
		const rotation = (index - midIndex) * 5;
		const yOffset = this.Math.abs(index - midIndex) * 6;

		return `scale(0.85) rotate(${rotation}deg) translateY(${yOffset}px)`;
	});

	transitionDelay = computed(() => {
		// Stagger the animation for a nicer "unfolding" effect
		return this.isLoaded() ? `${this.cardIndex() * 60}ms` : "0ms";
	});

	zIndex = computed(() => {
		if (this.isLoaded()) {
			return null;
		}
		const index = this.cardIndex();
		const total = this.totalCards();
		const midIndex = (total - 1) / 2;
		return total - this.Math.abs(index - midIndex);
	});
}
