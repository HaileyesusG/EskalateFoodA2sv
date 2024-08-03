/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "scale-down": "scale-down 1s linear",
      },
      keyframes: {
        "scale-down": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0)" },
        },
      },
    },
  },
  plugins: [],
};
