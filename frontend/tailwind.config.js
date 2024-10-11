/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				'cloud': '#F0F4F8',
				'coffee': '#6F4C3E'
			},
			fontFamily: {
				yuGothic: ['"Yu Gothic UI"', 'sans-serif'],
			  },
		},
	},
	plugins: [],
};