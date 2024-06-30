/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slider: {
           from: { transform: 'translateX(0)' },
           to: { transform: 'translateX(-100%)' },
         },
       },
      animation: {
        slider: 'slider 5s linear infinite'
      },
      colors: {
        white: "#FFFFFF",
        gray1: "#EEEEEE",
        gray2: "#DDDDDD",
        gray3: "#CCCCCC",
        gray4: "#BBBBBB",
        gray5: "#AAAAAA",
        gray6: "#999999",
        gray7: "#888888",
        gray8: "#777777",
        gray9: "#666666",
        gray10: "#555555",
        gray11: "#444444",
        gray12: "#333333",
        gray13: "#222222",
        gray14: "#111111",
        black: "#000000",
        red: "#CC2A17",
        green: "#0D6943"
      },
      fontFamily: {
        thin: ["thin"],
        light: ["light"],
        regular: ["regular"],
        medium: ["medium"],
        bold: ["bold"],
        extrabold: ["extrabold"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}

