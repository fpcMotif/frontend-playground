import { Component, ChangeDetectionStrategy, signal, HostListener, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { CardComponent } from './components/card/card.component';

interface Card {
  title: string;
  imageUrl: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent],
})
export class AppComponent implements AfterViewInit {
  @ViewChildren(CardComponent, { read: ElementRef })
  cardElements!: QueryList<ElementRef>;

  private cardsInitialized = false;
  loaded = signal(false);

  cards = signal<Card[]>([
    { title: 'Beeper', imageUrl: '/beeper.png' },
    { title: 'Discord', imageUrl: '/discord.png' },
    { title: 'Spotify', imageUrl: '/spotify.png' },
    { title: 'Photos', imageUrl: '/photos.png' },
    { title: 'GitHub', imageUrl: '/github-mark-white.png' },
    { title: 'Threads', imageUrl: '/threads.png' },
  ]);

  ngAfterViewInit() {
    // Defer initialization to ensure elements are ready
    requestAnimationFrame(() => {
      this.cardsInitialized = true;
      setTimeout(() => this.loaded.set(true), 100);
    });
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent) {
    if (!this.cardsInitialized) return;

    for (const cardRef of this.cardElements) {
      const cardEl = cardRef.nativeElement;
      const rect = cardEl.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const relativeX = event.clientX - centerX;
      const relativeY = event.clientY - centerY;

      const x = relativeX / (rect.width / 2);
      const y = relativeY / (rect.height / 2);

      cardEl.style.setProperty('--pointer-x', x.toFixed(3));
      cardEl.style.setProperty('--pointer-y', y.toFixed(3));
    }
  }
}