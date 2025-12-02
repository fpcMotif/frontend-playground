export interface AddToCartButtonProps {
  label?: string;
  onAddComplete?: () => void;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

export interface AnimationConfig {
  slideDuration: number;
  rotateDuration: number;
  fadeDuration: number;
  exitDuration: number;
  ease: string;
}

export interface AnimationRefs {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  textRef: React.RefObject<HTMLSpanElement | null>;
  cartRef: React.RefObject<HTMLSpanElement | null>;
  cartItemRef: React.RefObject<SVGRectElement | null>;
  animatedBorderRef: React.RefObject<HTMLSpanElement | null>;
  staticBorderRef: React.RefObject<HTMLSpanElement | null>;
  completeBorderRef: React.RefObject<HTMLSpanElement | null>;
  dummyCartRef: React.RefObject<HTMLSpanElement | null>;
  checkIconRef: React.RefObject<HTMLSpanElement | null>;
}

export type ThemeMode = 'system' | 'light' | 'dark';
