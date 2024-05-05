/** @type {import('tailwindcss').Config} */
module.exports ={
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          crimson: "#FF345E",
          darkGray: "#31363F",
          border: "#3E4550",
          primaryText: "#EEEEEE",
          gray: {
            100: "#EEEEEE",
            200: "#E6E6E6",
            700: "#3E4550",
            800: "#31363F",
            900: "#222831"
          }
        },
        fontFamily: {
          sans: ["Inter", "Helvetica", "Arial", "sans-serif"]
          // You can add more font families for different styles if needed
      }
      },
    },
    plugins: [],
  }