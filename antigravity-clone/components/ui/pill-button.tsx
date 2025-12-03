import { cn } from "@/lib/utils"
import { MaterialIcon } from "@/components/icons/material-icon"
import type { ReactNode, ButtonHTMLAttributes } from "react"

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
  icon?: string
  iconPosition?: "left" | "right"
  children: ReactNode
}

export function PillButton({
  variant = "primary",
  icon,
  iconPosition = "right",
  children,
  className,
  ...props
}: PillButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-normal cursor-pointer transition-colors duration-150"

  const variants = {
    primary: "bg-primary text-on-primary hover:bg-button-hover",
    secondary: "bg-button-secondary text-on-surface border border-outline-variant hover:bg-button-secondary-hover",
  }

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        icon && iconPosition === "right" && "pr-4",
        icon && iconPosition === "left" && "pl-4",
        className,
      )}
      {...props}
    >
      {icon && iconPosition === "left" && <MaterialIcon name={icon} className="!text-xl" />}
      <span>{children}</span>
      {icon && iconPosition === "right" && <MaterialIcon name={icon} className="!text-xl" />}
    </button>
  )
}
