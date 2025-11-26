import { useMemo, forwardRef } from 'react';

interface CardProps {
    title: string;
    imageUrl: string;
    isLoaded: boolean;
    cardIndex: number;
    totalCards: number;
}

export const Card = forwardRef<HTMLElement, CardProps>(({ title, imageUrl, isLoaded, cardIndex, totalCards }, ref) => {
    const transformStyle = useMemo(() => {
        if (isLoaded) {
            return 'translateY(0) rotate(0deg) scale(1)';
        }

        // Initial state: create a fanned-out deck of cards stacked in one grid cell
        const midIndex = (totalCards - 1) / 2;
        const rotation = (cardIndex - midIndex) * 5;
        const yOffset = Math.abs(cardIndex - midIndex) * 6;

        return `scale(0.85) rotate(${rotation}deg) translateY(${yOffset}px)`;
    }, [isLoaded, cardIndex, totalCards]);

    const transitionDelay = useMemo(() => {
        return isLoaded ? `${cardIndex * 60}ms` : '0ms';
    }, [isLoaded, cardIndex]);

    const zIndex = useMemo(() => {
        if (isLoaded) {
            return undefined;
        }
        const midIndex = (totalCards - 1) / 2;
        return Math.floor(totalCards - Math.abs(cardIndex - midIndex));
    }, [isLoaded, cardIndex, totalCards]);

    return (
        <article
            ref={ref}
            className={`
        w-[280px] aspect-[4/3] relative rounded-xl cursor-pointer
        bg-neutral-900/50 outline outline-2 outline-neutral-800
        transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
        active:translate-y-px active:scale-[0.98] select-none
        ${!isLoaded ? 'opacity-0' : ''}
      `}
            style={{
                transform: transformStyle,
                transitionDelay: transitionDelay,
                gridArea: !isLoaded ? '1 / 1' : undefined,
                justifySelf: !isLoaded ? 'center' : undefined,
                alignSelf: !isLoaded ? 'center' : undefined,
                zIndex: zIndex,
                // Container query for icon movement
                containerType: 'inline-size',
            }}
        >
            {/* Card Content Container */}
            <div className="absolute inset-0 grid place-items-center gap-2 overflow-hidden rounded-xl">

                {/* Background blurred icon */}
                <div
                    className="absolute inset-0 grid place-items-center will-change-[transform,filter]"
                    style={{
                        filter: 'url(#blur) saturate(var(--icon-saturate)) brightness(var(--icon-brightness)) contrast(var(--icon-contrast))',
                        opacity: 'var(--icon-opacity)',
                        scale: 'var(--icon-scale)',
                        // Icon movement logic
                        translate: 'calc(var(--pointer-x, 0) * 40cqi) calc(var(--pointer-y, 0) * 40cqh)',
                    }}
                >
                    <img src={imageUrl} alt={title} className="w-[100px]" />
                </div>

                {/* Foreground Icon */}
                <img src={imageUrl} alt={title} className="w-[100px] relative z-10" />

                {/* Title */}
                <h2 className="relative z-20 font-semibold text-base text-neutral-100">{title}</h2>

                {/* Options Button */}
                <button
                    aria-label="More options"
                    className="absolute top-2 right-2 z-20 grid place-items-center w-8 h-8 rounded-lg bg-transparent text-neutral-400 opacity-40 hover:opacity-100 hover:bg-black/20 focus-visible:opacity-100 focus-visible:bg-black/20 transition-opacity"
                >
                    <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
                    </svg>
                </button>
            </div>

            {/* Frosted Glass Border Effect */}
            <div
                className="pointer-events-none absolute inset-0 rounded-xl"
                style={{
                    border: 'var(--border-width) solid transparent',
                    backdropFilter: 'blur(var(--border-blur)) saturate(var(--border-saturate)) brightness(var(--border-brightness)) contrast(var(--border-contrast))',
                    mask: 'linear-gradient(white 0 0) content-box, linear-gradient(white 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                }}
            ></div>
        </article>
    );
});

Card.displayName = 'Card';
