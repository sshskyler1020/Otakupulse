/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#05040C",
        surface: "#0E0B1C",
        "surface-2": "#161227",
        edge: "#241E3D",
        violet: {
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
        },
        cyan: {
          300: "#67E8F9",
          400: "#2DD4EE",
          500: "#06B6D4",
        },
        paper: "#F4F2FF",
        muted: "#9C96B8",
      },
      fontFamily: {
        display: ["'Chakra Petch'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "pulse-gradient":
          "linear-gradient(135deg, #7C3AED 0%, #2DD4EE 100%)",
        "void-radial":
          "radial-gradient(circle at 50% 0%, rgba(124,58,237,0.25), transparent 60%)",
      },
      boxShadow: {
        glow: "0 0 24px rgba(139,92,246,0.35)",
        "glow-cyan": "0 0 24px rgba(45,212,238,0.35)",
      },
      animation: {
        pulseline: "pulseline 2.4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out both",
      },
      keyframes: {
        pulseline: {
          "0%, 100%": { transform: "scaleY(0.4)", opacity: "0.5" },
          "50%": { transform: "scaleY(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
