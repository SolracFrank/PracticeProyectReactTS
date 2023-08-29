/** @type {import('tailwindcss').Config} */
export default {
  content: [    "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
				blue: {
					1000: '#79b0d5',
					1100: '#033e81',
				},
				green: {
					1100: '#809c3f',
				},
				red: {
					1100: '#9c483e',
				},
				yellow: {
					1100: '#f1c40f',
				},
			},
    },
  },
  plugins: [],
}

