/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Roboto Mono, monospace",
    },
    extend: {
      height: {
        screen: "100dvh",
      },
      boxShadow: {
        cardShadow: "0px 0px 13px 0px #00000040",
      },
    },
  },
  plugins: [],
};
