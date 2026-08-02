import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        brand: {
          50: "#f2f0ff",
          100: "#e9e5ff",
          200: "#d6ceff",
          300: "#b7a6ff",
          400: "#9373ff",
          500: "#7c4dff",
          600: "#6d28f7",
          700: "#5c1fd4",
          800: "#4c1aac",
          900: "#3f188a",
          950: "#260c5e",
        },
        accent: {
          50: "#eef4ff",
          100: "#d9e6ff",
          200: "#bcd3ff",
          300: "#8eb6ff",
          400: "#598eff",
          500: "#3366ff",
          600: "#1f47f5",
          700: "#1735e1",
          800: "#192db6",
          900: "#1a2c8f",
          950: "#151d57",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #7c4dff 0%, #6d28f7 40%, #3366ff 100%)",
        "brand-gradient-soft":
          "linear-gradient(135deg, rgba(124,77,255,0.12) 0%, rgba(51,102,255,0.12) 100%)",
        "hero-radial":
          "radial-gradient(60% 60% at 50% 0%, rgba(124,77,255,0.18) 0%, rgba(255,255,255,0) 70%)",
        "mesh":
          "radial-gradient(at 0% 0%, rgba(124,77,255,0.14) 0px, transparent 50%), radial-gradient(at 98% 10%, rgba(51,102,255,0.14) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(147,115,255,0.10) 0px, transparent 50%)",
      },
      boxShadow: {
        glass:
          "0 8px 32px rgba(31,41,55,0.10), inset 0 1px 0 rgba(255,255,255,0.55)",
        "glass-lg":
          "0 24px 70px rgba(76,26,172,0.18), 0 8px 24px rgba(16,24,40,0.08), inset 0 1px 0 rgba(255,255,255,0.5)",
        glow: "0 0 40px rgba(124, 77, 255, 0.35)",
        soft: "0 1px 2px rgba(16,24,40,0.04), 0 6px 16px rgba(16,24,40,0.06), 0 18px 40px rgba(16,24,40,0.05)",
        elevated:
          "0 2px 4px rgba(16,24,40,0.04), 0 14px 28px rgba(16,24,40,0.09), 0 36px 68px rgba(76,26,172,0.12)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(3deg)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
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
        "fade-up": "fade-up 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        "gradient-x": "gradient-x 8s ease infinite",
        marquee: "marquee 40s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;
