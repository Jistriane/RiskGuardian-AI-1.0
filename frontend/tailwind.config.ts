import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Tema Aurora/Sunset - tons gradientes modernos
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#fb7185", // rose-400
          50: "#fff1f2",
          100: "#ffe4e6", 
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
          950: "#4c0519",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#9333ea", // purple-600
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7c2d12",
          800: "#6b21a8",
          900: "#581c87",
          950: "#3b0764",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "#f9a8d4", // pink-300
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843",
          950: "#500724",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Cores especiais para dashboard Aurora
        aurora: {
          purple: "#7c3aed",
          pink: "#ec4899",
          orange: "#fb923c",
          yellow: "#facc15",
          blue: "#3b82f6",
          green: "#22c55e",
          rose: "#fb7185",
          violet: "#8b5cf6"
        },
        chart: {
          1: "#7c3aed",
          2: "#ec4899", 
          3: "#fb923c",
          4: "#facc15",
          5: "#3b82f6"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem"
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'monospace'],
        cyber: ['Orbitron', 'monospace']
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }]
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem'
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-in": "slideIn 0.3s ease-out",
        "bounce-slow": "bounce 2s infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 3s linear infinite",
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
        "aurora-pulse": "auroraPulse 3s ease-in-out infinite",
        "aurora-flow": "auroraFlow 15s ease-in-out infinite",
        "aurora-text": "auroraText 4s ease-in-out infinite"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #ec4899' },
          '100%': { boxShadow: '0 0 20px #ec4899, 0 0 30px #7c3aed' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        auroraPulse: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(124, 58, 237, 0.3), 0 0 40px rgba(236, 72, 153, 0.2)',
            borderColor: '#7c3aed'
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(124, 58, 237, 0.5), 0 0 60px rgba(236, 72, 153, 0.3)',
            borderColor: '#ec4899'
          }
        },
        auroraFlow: {
          '0%, 100%': { 
            opacity: '1',
            transform: 'translateY(0px) scale(1)'
          },
          '33%': { 
            opacity: '0.8',
            transform: 'translateY(-10px) scale(1.05)'
          },
          '66%': { 
            opacity: '0.6',
            transform: 'translateY(10px) scale(0.95)'
          }
        },
        auroraText: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'aurora-grid': "linear-gradient(rgba(124, 58, 237, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(236, 72, 153, 0.1) 1px, transparent 1px)",
        'aurora-bg': 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(236, 72, 153, 0.1) 50%, rgba(251, 146, 60, 0.1) 100%)',
        'aurora-gradient': 'linear-gradient(135deg, #7c3aed 0%, #ec4899 25%, #fb923c 50%, #facc15 75%, #3b82f6 100%)'
      },
      backgroundSize: {
        'aurora-grid': '60px 60px'
      },
      boxShadow: {
        'aurora': '0 0 20px rgba(124, 58, 237, 0.5), 0 0 40px rgba(236, 72, 153, 0.3)',
        'aurora-glow': '0 0 30px rgba(124, 58, 237, 0.4), 0 0 60px rgba(236, 72, 153, 0.2), 0 0 90px rgba(251, 146, 60, 0.1)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 0 20px rgba(124, 58, 237, 0.1)',
        'glass-strong': '0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.2), 0 0 30px rgba(236, 72, 153, 0.2)'
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config; 