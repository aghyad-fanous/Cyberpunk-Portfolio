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
    cyan: "border-cyan-400/50 shadow-[0_0_20px_rgba(43,243,248,0.2),inset_0_0_20px_rgba(43,243,248,0.05)]",
    red: "border-red-600/50 shadow-[0_0_20px_rgba(173,43,46,0.2),inset_0_0_20px_rgba(173,43,46,0.05)]",
    magenta:
      "border-fuchsia-500/50 shadow-[0_0_20px_rgba(255,0,255,0.2),inset_0_0_20px_rgba(255,0,255,0.05)]",
    purple:
      "border-purple-600/50 shadow-[0_0_20px_rgba(123,0,255,0.2),inset_0_0_20px_rgba(123,0,255,0.05)]",
  }

  return (
    <div
      className={`
        relative 
        rounded-lg 
        border 
        ${glowStyles[glowColor]} 
        ${className} 
        backdrop-blur-md 
        bg-(--bg-primary)/30
      `}
    >
      <div className="relative z-10 p-6 glass-morphism">{children}</div>
    </div>
  )
}