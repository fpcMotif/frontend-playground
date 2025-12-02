import * as React from 'react';
import { useAnimate } from 'motion/react';
import { cn } from './ui/utils';

interface AddToCartButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onAddToCart?: () => void;
}

export function AddToCartButton({ className, onAddToCart, ...props }: AddToCartButtonProps) {
  const [scope, animate] = useAnimate();
  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddToCart = async () => {
    if (isAdding) return;
    setIsAdding(true);
    if (onAddToCart) onAddToCart();

    // 1. Cart moves right, Text fades out
    const moveCart = animate('.atc-cart', { x: 20 }, { duration: 0.22, ease: 'easeOut' });
    const tiltCart = animate('.atc-cart', { rotate: -20 }, { duration: 0.11, repeat: 1, repeatType: 'reverse', ease: 'linear' });
    const fadeText = animate('.atc-text', { opacity: 0, x: 20, filter: 'blur(4px)' }, { duration: 0.22, ease: 'easeOut' });
    
    await Promise.all([moveCart, tiltCart, fadeText]);

    // 2. Item drops in
    await animate('.atc-item', { y: 0 }, { duration: 0.1, delay: 0.1, ease: 'easeOut' });

    // 3. Show static border
    animate('.atc-border-static', { opacity: 1 }, { duration: 0.1 });

    // 4. Reset animated border (if it was visible)
    animate('.atc-border-animated', { opacity: 0 }, { duration: 0 });

    // 5. Cart shoots off to right
    const shootCart = animate('.atc-cart', { x: 100 }, { duration: 0.6, delay: 0.1, ease: 'easeOut' });
    const rotateCartMore = animate('.atc-cart', { rotate: -30 }, { duration: 0.1, delay: 0.1, ease: 'linear' });
    
    // 6. Fill the animated border
    // We animate a CSS variable '--complete' on the scope element
    const fillBorder = animate(scope.current, { '--complete': 1 } as any, { duration: 1, ease: 'linear' });

    // 7. Show complete state (border green, checkmark)
    const showCompleteBorder = animate('.atc-border-complete', { opacity: 1 }, { duration: 0.22, delay: 0.1 });
    
    await Promise.all([shootCart, rotateCartMore, showCompleteBorder]);

    // 8. Checkmark appears
    await animate('.atc-check', { opacity: 1, scale: [0.5, 1.5, 1] }, { duration: 0.25, ease: 'easeOut' });

    // Wait a bit
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 9. Reset
    // Hide borders
    animate('.atc-border-static', { opacity: 0 }, { duration: 0.5 });
    animate('.atc-border-complete', { opacity: 0 }, { duration: 0.5 });
    animate('.atc-check', { opacity: 0 }, { duration: 0.2 });
    
    // Reset Cart and Text
    await animate('.atc-text', { x: 0, opacity: 1, filter: 'blur(0px)' }, { duration: 0.22, delay: 0.1 });
    
    // Reset Cart position (silently)
    animate('.atc-cart', { x: -100, rotate: 0 }, { duration: 0 });
    await animate('.atc-cart', { x: 0 }, { duration: 0.3, ease: 'easeOut' });

    // Reset Item position
    animate('.atc-item', { y: -24 }, { duration: 0 });

    // Reset border variable
    scope.current.style.setProperty('--complete', '0');
    
    setIsAdding(false);
  };

  return (
    <button
      ref={scope}
      onClick={handleAddToCart}
      className={cn(
        "relative group cursor-pointer select-none rounded-full border-0 bg-white text-zinc-900 dark:bg-black dark:text-white transition-transform active:scale-95 outline-none",
        className
      )}
      aria-label="Add to cart"
      style={{ 
        width: 'fit-content',
        '--complete': 0 
      } as React.CSSProperties}
      {...props}
    >
      {/* Borders */}
      <div className="absolute inset-[-2px] rounded-full overflow-hidden pointer-events-none">
        {/* Static Border (appears when item drops) */}
        <div className="atc-border-static absolute inset-0 border-2 border-zinc-300 dark:border-zinc-700 rounded-full opacity-0" />

        {/* Animated Border (Conic Gradient) */}
        <div 
            className="atc-border-animated absolute inset-0 rounded-full opacity-0"
            style={{
                mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0) border-box',
                maskComposite: 'exclude',
                WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0) border-box',
                WebkitMaskComposite: 'xor'
            }}
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] animate-spin [animation-duration:2s] linear"
                 style={{
                     background: `conic-gradient(
                        from calc(var(--complete, 0) * 180deg) in hsl increasing hue,
                        #0000 0 calc((1 - var(--complete, 0)) * 20%),
                        hsl(0 100% 65%) calc((1 - var(--complete, 0)) * 30%),
                        hsl(339 100% 65%) calc(100% - ((1 - var(--complete, 0)) * 30%)),
                        #0000 calc(100% - ((1 - var(--complete, 0)) * 20%)) 100%
                     )`
                 }}
            />
        </div>

        {/* Complete Border (Green) */}
        <div className="atc-border-complete absolute inset-0 border-2 border-green-500 rounded-full opacity-0" />
        
        {/* Initial/Base Border */}
        <div className="absolute inset-0 border-2 border-zinc-200 dark:border-zinc-800 rounded-full" />
      </div>

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2 px-6 py-3 overflow-hidden rounded-full bg-white dark:bg-black">
        <span className="relative flex items-center justify-center w-5 h-5">
            {/* Cart Icon */}
            <span className="atc-cart relative block w-5 h-5 origin-bottom">
                <svg className="w-full h-full text-current overflow-visible" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    {/* Item (Green Square) */}
                    <rect 
                        className="atc-item text-green-500"
                        x="9" y="-1" width="10" height="10" rx="2" fill="currentColor"
                        style={{ transform: 'translateY(-24px)' }}
                    />
                    <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                </svg>
            </span>

            {/* Checkmark (initially hidden) */}
            <span className="atc-check absolute inset-0 flex items-center justify-center text-green-500 opacity-0">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
            </span>
        </span>

        <span className="atc-text font-medium text-sm">Add to cart</span>
      </span>
    </button>
  );
}
