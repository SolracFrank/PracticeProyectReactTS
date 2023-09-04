/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "530px",
        // => @media (min-width: 530px) { ... }

        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
      colors: {
        blue: {
          1000: "#79b0d5",
          1100: "#033e81",
        },
        green: {
          1100: "#809c3f",
        },
        red: {
          1100: "#9c483e",
        },
        yellow: {
          1100: "#f1c40f",
        },
      },
    },
  },
  plugins: [],
};
