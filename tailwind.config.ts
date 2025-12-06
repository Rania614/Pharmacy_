import type { Config } from "tailwindcss"
import animate from "tailwindcss-animate"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/data/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
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
        // Nutrinous Supplements Color Palette
        primary: {
          50: '#F2D5F2',   // Light purple/pink
          100: '#F2D5F2',
          200: '#E8B8E8',
          300: '#DE9BDE',
          400: '#D47ED4',
          500: '#CA61CA',
          600: '#B84AB8',
          700: '#A633A6',
          800: '#942C94',
          900: '#822582',
          DEFAULT: '#340B8C', // Main primary color
        },
        dark: {
          50: '#2F1B59',   // Light dark
          100: '#2F1B59',
          200: '#201240',
          300: '#1A0F35',
          400: '#140D2A',
          500: '#120426',   // Main dark color
          600: '#0F031F',
          700: '#0C0218',
          800: '#090211',
          900: '#06010A',
          DEFAULT: '#120426',
        },
        accent: {
          light: '#F2D5F2',    // Nutrinous-1
          dark: '#120426',     // Nutrinous-2
          primary: '#340B8C',  // Nutrinous-3
          secondary: '#201240', // Nutrinous-4
          tertiary: '#2F1B59',  // Nutrinous-5
        },
        // Keep brown for backward compatibility (optional)
        brown: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
        },
        // Medical Theme Colors
        medical: {
          blue: '#340B8C',      // Using primary color
          green: '#00A86B',     // Health green
          red: '#DC143C',        // Medical red
          white: '#FFFFFF',      // Clean white
          purple: '#F2D5F2',     // Light purple accent
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Nutrinous color palette shortcuts
        nutrinous: {
          light: "#F2D5F2",    // Nutrinous-1 (Light purple/pink)
          dark: "#120426",     // Nutrinous-2 (Dark purple)
          primary: "#340B8C",  // Nutrinous-3 (Main purple)
          secondary: "#201240", // Nutrinous-4 (Dark purple)
          tertiary: "#2F1B59",  // Nutrinous-5 (Medium purple)
        },
        // Shadcn/ui compatible colors
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-in",
        "slide-up": "slide-up 0.3s ease-out",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      boxShadow: {
        'medical': '0 4px 6px -1px rgba(52, 11, 140, 0.1), 0 2px 4px -1px rgba(52, 11, 140, 0.06)',
        'medical-lg': '0 10px 15px -3px rgba(52, 11, 140, 0.1), 0 4px 6px -2px rgba(52, 11, 140, 0.05)',
        'nutrinous': '0 4px 6px -1px rgba(52, 11, 140, 0.15), 0 2px 4px -1px rgba(52, 11, 140, 0.1)',
        'nutrinous-lg': '0 10px 15px -3px rgba(52, 11, 140, 0.15), 0 4px 6px -2px rgba(52, 11, 140, 0.1)',
      },
    },
  },
  plugins: [animate],
} satisfies Config

export default config
