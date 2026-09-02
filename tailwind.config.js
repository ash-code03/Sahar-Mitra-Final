/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#071A33",
        navyDeep: "#04101F",
        ocean: "#0E3A63",
        oceanLight: "#155A8A",
        teal: "#1B8F94",
        tealBright: "#22A6A0",
        aqua: "#8FE3D6",
        aquaSoft: "#D8F3ED",
        ice: "#EAF3F6",
        danger: "#E4572E",
        dangerDeep: "#B33A1E",
        amber: "#E8A33D",
        slate: "#5B7386",
        slateLight: "#9AB0BE",
        line: "rgba(255,255,255,0.14)",
      },
      fontFamily: {
        tamil: ["'Noto Sans Tamil'", "'Noto Sans'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        inter: ["'Inter'", "-apple-system", "sans-serif"],
      },
      animation: {
        'sm-pulse': 'sm-pulse 1.8s ease-out infinite',
        'sm-breathe': 'sm-breathe 1.6s ease-in-out infinite',
      },
      keyframes: {
        'sm-pulse': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.8)', opacity: '0' },
          '100%': { opacity: '0' },
        },
        'sm-breathe': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.06)' },
        }
      }
    },
  },
  plugins: [],
}
