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
        cardShadow2: "1px 1px 2px 2px rgba(227,11,11,0.5)",
      },
      gridTemplateColumns: {
        settingTable: "1fr 2fr 1fr 1fr 1fr 1fr ",
        orderDetailTable: "1fr 2fr 1fr 1fr 1fr",
        orderDetailTable_small: "2fr 0.9fr 0.8fr 1fr",
        adminOrderTable: "0.5fr 2fr 1fr 1.5fr 1fr 1fr",
        customerOrderTable: "0.5fr 2fr 1fr 1.5fr 1fr",
      },
      keyframes: {},
      animation: {},
      screens: {
        smallPhone: "320px",
        mediumPhone: "375px",
        largePhone: "425px",
      },
    },
  },
  plugins: [],
};
