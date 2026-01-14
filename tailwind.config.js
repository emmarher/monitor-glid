/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  // CONFIGURACIÓN DE TEMAS DAISYUI
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "primary": "#3b82f6", // Azul Mission
          "base-100": "#f8fafc", // Slate 50 (Fondo que pediste)
          "base-200": "#f1f5f9", // Slate 100
          "base-300": "#e2e8f0", // Slate 200
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "primary": "#60a5fa",
          "base-100": "#0f172a", // Navy muy oscuro para modo científico
          "base-200": "#1e293b",
          "base-300": "#334155",
        },
      },
    ],
  },
}