interface MaterialIconProps {
  name: string
  className?: string
  filled?: boolean
}

export function MaterialIcon({ name, className = "", filled = false }: MaterialIconProps) {
  return (
    <span
      className={`material-symbols-outlined ${filled ? "material-symbols-filled" : ""} ${className}`}
      style={{
        fontFamily: "Material Symbols Outlined",
        fontWeight: "normal",
        fontStyle: "normal",
        fontSize: "24px",
        lineHeight: 1,
        letterSpacing: "normal",
        textTransform: "none",
        display: "inline-block",
        whiteSpace: "nowrap",
        wordWrap: "normal",
        direction: "ltr",
        fontFeatureSettings: "'liga'",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {name}
    </span>
  )
}
