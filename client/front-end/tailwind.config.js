/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      fredoka: ["Fredoka", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
      airstrike: ["Airstrike"],
    },
    colors: {
      transparent: "transparent",
      gray: {
        1: "#141414",
        2: "#3E3E3E",
        3: "#AFAFAF",
        4: "#828282",
        5: "#383838",
        6: "#494949",
        7: "#E4E4E4",
      },
      white: "#ffffff",
      dark: "#1E1E1E",
      light: "#F3F3F3",
      orange: "#F79F1A",
      dark_green: "#046E1B",
      light_blue: "#75B8EE",
      light_orange: "#FFC170",
      black: "#000000",
      transparent_black: "rgba(0, 0, 0, 0.8)",
      light_blue: "#2d8cfe",

    },
    },
  },
  plugins: [],
}

