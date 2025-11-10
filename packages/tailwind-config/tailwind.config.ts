import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
    "../../apps/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      screens: {
        "2xl": { max: "1535px" },
        xl: { max: "1279px" },
        lg: { max: "1023px" },
        md: { max: "767px" },
        sm: { max: "639px" },
        xs: { max: "479px" },
      },
      fontFamily: {
        sans: ["Balsamiq Sans", "sans-serif"],
      },
      colors: {
        primary_bg: "var(--primary-bg)",
        secondary_bg: "var(--secondary-bg)",
        primary_text: "var(--primary-text)",
        secondary_text: "var(--secondary-text)",
        primary_border: "var(--primary-border)",
        secondary_border: "var(--secondary-border)",
        neutral_glow: "var(--neutral-glow)",
        neutral: "var(--neutral)",
        ghost: "var(--ghost)",
        accent_dark: "var(--accent_dark)",
        accent_light: "var(--accent_light)",
        error_light: "var(--error_light)",
        error_dark: "var(--error_dark)",
        warn_light: "var(--warn_light)",
        warn_dark: "var(--warn_dark)",
      },
      boxShadow: {
        uniform: "0 0 5px 0 rgba(0,0,0,0.25)",
        uniform_hover: "0 0 15px 0 rgba(0,0,0,0.25)",
      },
      backgroundImage: {
        accent_dark_gradient:
          "linear-gradient(to right, var(--ghost), var(--accent_dark), var(--accent_light), var(--accent_dark), var(--ghost))",

        accent_light_gradient:
          "linear-gradient(to right, color-mix(in srgb, var(--primary-bg) 90%, transparent), var(--accent_light), var(--accent_dark), var(--accent_light), color-mix(in srgb, var(--primary-bg) 90%, transparent))",

        error_gradient:
          "linear-gradient(to right, var(--ghost), var(--error_dark), var(--error_light), var(--error_dark), var(--ghost))",

        vertical_neutral_gradient:
          "linear-gradient(to bottom, var(--ghost), color-mix(in srgb, var(--neutral) 50%, transparent), var(--neutral), color-mix(in srgb, var(--neutral) 50%, transparent), var(--ghost))",

        horizontal_neutral_gradient:
          "linear-gradient(to right, var(--ghost), color-mix(in srgb, var(--neutral) 50%, transparent), var(--neutral), color-mix(in srgb, var(--neutral) 50%, transparent), var(--ghost))",
      },
      animation: {
        "meteor-effect": "meteor 5s linear infinite",
        "spin-smooth":
          "spinSmooth 1.4s cubic-bezier(0.45, 0, 0.55, 1) infinite",
        "caret-blink": "caret-blink 1.2s step-end infinite",
        "accordion-down": "accordion-down 0.3s ease-out",
        "accordion-up": "accordion-up 0.3s ease-out",
      },
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
        spinSmooth: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "caret-blink": {
          "0%, 70%, 100%": { opacity: "1" },
          "20%, 50%": { opacity: "0" },
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
      spacing: {
        default: "12rem",
      },
      fontSize: {
        xxs: "10px",
      },
    },
  },
  plugins: [],
};

export default config;
