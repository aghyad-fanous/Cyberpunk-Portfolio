import React from "react"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: "cyan" | "red" | "magenta" | "purple"
}
export const GlassCard = ({
  children,
  className = "",
  glowColor = "cyan",
}: GlassCardProps) => {
  const glowStyles = {
    cyan: "border-(--accent-cyan) shadow-[0_0_20px_rgba(43,243,248,0.2),inset_0_0_20px_rgba(43,243,248,0.05)]",
    red: "border-(--accent-red) shadow-[0_0_20px_rgba(173,43,46,0.2),inset_0_0_20px_rgba(173,43,46,0.05)]",
    magenta:
      "border-(--accent-magenta) shadow-[0_0_20px_rgba(255,0,255,0.2),inset_0_0_20px_rgba(255,0,255,0.05)]",
    purple:
      "border-(--accent-purple) shadow-[0_0_20px_rgba(123,0,255,0.2),inset_0_0_20px_rgba(123,0,255,0.05)]",
  }

  return (
    <div
      className={`relative overflow-hidden  rounded-lg border ${glowStyles[glowColor]} ${className}`}
    >
      {/* طبقة البلور والخلفية */}
      <div className="absolute inset-0 backdrop-blur-md bg-[rgba(0,31,63,0.3)]" />
      {/* المحتوى */}
      <div className="relative  p-6">{children}</div>
    </div>
  )
}
