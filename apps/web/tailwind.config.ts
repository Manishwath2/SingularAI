import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neural Glass Theme - Midnight Neon
        background: {
          DEFAULT: "#050510", // Deep Midnight Blue
          secondary: "#0a0a1a",
          tertiary: "#0f0f20",
        },
        foreground: {
          DEFAULT: "#ffffff",
          secondary: "#e0e0e0",
          muted: "#a0a0a0",
        },
        primary: {
          DEFAULT: "#00F0FF", // Electric Cyan
          50: "#e6feff",
          100: "#ccfdff",
          200: "#99fbff",
          300: "#66f8ff",
          400: "#33f4ff",
          500: "#00F0FF",
          600: "#00c0cc",
          700: "#009099",
          800: "#006066",
          900: "#003033",
        },
        secondary: {
          DEFAULT: "#7B2CBF", // Neon Purple
          50: "#f3e5ff",
          100: "#e7ccff",
          200: "#cf99ff",
          300: "#b766ff",
          400: "#9f33ff",
          500: "#7B2CBF",
          600: "#622399",
          700: "#4a1a73",
          800: "#31124d",
          900: "#190926",
        },
        accent: {
          DEFAULT: "#FF00FF", // Magenta accent
          cyan: "#00F0FF",
          purple: "#7B2CBF",
          pink: "#FF1493",
        },
        glass: {
          DEFAULT: "rgba(255, 255, 255, 0.05)",
          light: "rgba(255, 255, 255, 0.1)",
          dark: "rgba(0, 0, 0, 0.3)",
        },
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "sans-serif"],
        display: ["system-ui", "sans-serif"],
        mono: ["Courier New", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "neon-gradient": "linear-gradient(135deg, #00F0FF 0%, #7B2CBF 100%)",
      },
      boxShadow: {
        "neon-cyan": "0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(0, 240, 255, 0.3)",
        "neon-purple": "0 0 20px rgba(123, 44, 191, 0.5), 0 0 40px rgba(123, 44, 191, 0.3)",
        "neon-pink": "0 0 20px rgba(255, 20, 147, 0.5), 0 0 40px rgba(255, 20, 147, 0.3)",
        glass: "0 8px 32px 0 rgba(0, 240, 255, 0.1)",
        "glass-hover": "0 8px 32px 0 rgba(0, 240, 255, 0.2)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(0, 240, 255, 0.5)" },
          "100%": { boxShadow: "0 0 40px rgba(0, 240, 255, 0.8), 0 0 60px rgba(123, 44, 191, 0.5)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
