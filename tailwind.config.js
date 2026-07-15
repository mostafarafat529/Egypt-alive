/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // ألوان مستوحاة من هوية Egypt Alive (دهبي + أسود)
        primary: {
          DEFAULT: "#C9A227", // الدهبي الأساسي (زرار Book Now)
          light: "#E6C766",
          dark: "#9C7D1A",
        },
        dark: {
          DEFAULT: "#0D0D0D", // خلفية الهيدر/الفوتر
          soft: "#1A1A1A",
        },
        cream: "#F5F1E8",
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
