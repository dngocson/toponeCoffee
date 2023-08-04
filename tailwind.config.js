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
        cardShadow2: "1px 1px 2px 2px rgba(227,11,11,0.5)",
      },
      gridTemplateColumns: {
        settingTable: "1fr 2fr 1fr 1fr 1fr 1fr ",
      },
    },
  },
  plugins: [],
};
