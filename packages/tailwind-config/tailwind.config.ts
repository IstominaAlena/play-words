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
        accent_dark: "#104F55", // rgba(16, 79, 85, 1)
        accent_light: "#06D6A0", // rgba(6, 214, 160, 1)
        primary_dark: "#0a0a0a", // rgba(10, 10, 10, 1)
        primary_light: "#ebebeb", // rgba(235, 235, 235, 1)
        secondary_dark: "#1f1f1f", // rgba(31, 31, 31, 1)
        secondary_light: "#b3b3b3", // rgba(179, 179, 179, 1)
        neutral: "#707070", // rgba(112, 112, 112, 1)
        error: "#E60A0C", // rgba(230, 10, 12, 1)
      },
      backgroundImage: {
        accent_dark_gradient:
          "linear-gradient(to right, rgba(235, 235, 235, 0.1), rgba(16, 79, 85, 1), rgba(6, 214, 160, 1), rgba(16, 79, 85, 1), rgba(235, 235, 235, 0.1))",
        accent_light_gradient:
          "linear-gradient(to right, rgba(10, 10, 10, 0.1), rgba(6, 214, 160, 1), rgba(16, 79, 85, 1), rgba(6, 214, 160, 1), rgba(10, 10, 10, 0.1))",
        error_gradient:
          "linear-gradient(to right, rgba(10, 10, 10, 0.1), rgba(230, 10, 12, 1), rgba(10, 10, 10, 0.1))",
      },
      animation: {
        "meteor-effect": "meteor 5s linear infinite",
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
      },
    },
  },
  plugins: [],
};

export default config;
