import { Loader2 } from "lucide-react";
import type React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  isLoading,
  icon,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg) disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";

  const variants = {
    primary:
      "bg-(--color-text-primary) text-(--color-text-inverted) shadow-lg hover:opacity-90",
    secondary:
      "bg-(--color-bg-muted) text-(--color-text-primary) border border-(--color-border-subtle) hover:bg-(--color-bg-elevated) hover:border-(--color-border-strong)",
    ghost:
      "bg-transparent text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-bg-muted)",
    danger:
      "bg-(--color-error-soft) text-(--color-error) hover:bg-(--color-error)/20 border border-(--color-error)/20",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {!isLoading && icon}
      {children}
    </button>
  );
};
