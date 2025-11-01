import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        'share-tech': ['"Share Tech Mono"', 'monospace'],
        'jetbrains': ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        // Map CSS variables to color tokens (flattened cyberpunk palette)
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': {
          start: 'var(--bg-secondary-start)',
          end: 'var(--bg-secondary-end)',
        },
        // Flattened cyberpunk color tokens (use these in classes: text-c-cyan, border-c-cyan)
        'c-cyan': 'var(--accent-cyan)',
        'c-red': 'var(--accent-red)',
        'c-blue': 'var(--accent-blue)',
        'c-magenta': 'var(--accent-magenta)',
        'c-purple': 'var(--accent-purple)',
        // Keep old nested accent for backward compatibility
        accent: {
          cyan: 'var(--accent-cyan)',
          red: 'var(--accent-red)',
          blue: 'var(--accent-blue)',
          magenta: 'var(--accent-magenta)',
          purple: 'var(--accent-purple)',
        },
      },
      boxShadow: {
        // New tokenized shadows (use as shadow-c-cyan, hover:shadow-c-cyan-hover)
        'c-cyan': '0 0 20px rgba(43,243,248,0.3), inset 0 0 15px rgba(43,243,248,0.05)',
        'c-cyan-hover': '0 0 30px rgba(43,243,248,0.5), inset 0 0 25px rgba(43,243,248,0.1)',
        'c-red': '0 0 20px rgba(173,43,46,0.3), inset 0 0 15px rgba(173,43,46,0.05)',
        'c-red-hover': '0 0 30px rgba(173,43,46,0.5), inset 0 0 25px rgba(173,43,46,0.1)',
        'glow-cyan': '0 0 40px rgba(43,243,248,0.4)',
        'glow-red': '0 0 40px rgba(173,43,46,0.4)',
        // Keep previous names for backward compatibility
        'neon-cyan': '0 0 20px rgba(43,243,248,0.3), inset 0 0 15px rgba(43,243,248,0.05)',
        'neon-cyan-hover': '0 0 30px rgba(43,243,248,0.5), inset 0 0 25px rgba(43,243,248,0.1)',
        'neon-red': '0 0 20px rgba(173,43,46,0.3), inset 0 0 15px rgba(173,43,46,0.05)',
        'neon-red-hover': '0 0 30px rgba(173,43,46,0.5), inset 0 0 25px rgba(173,43,46,0.1)',
      },
      backgroundImage: {
        'linear-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'linear-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
        'radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      // Add custom animations if needed
      keyframes: {
        'scan-line': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'scan-line': 'scan-line 20s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;