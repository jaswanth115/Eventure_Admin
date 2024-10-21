/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				'cloud': '#F0F4F8',
				'coffee': '#6F4C3E',
				'indianred': '#CD5C5C',
				'lightcoral': '#F08080',
				'jam': '#6F2C91'
			},
			fontFamily: {
				bodoni: ['"Bodoni MT Condensed"', 'serif'],
				broadway: ['Broadway', 'sans-serif'],
				lucida: ['Lucida Bright', 'serif'],
				trebuchet: ['Trebuchet MS', 'sans-serif'],
				lucida_sans: ['"Lucida Sans"', 'sans-serif'],
			  },
		},
	},
	plugins: [],
};