/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
		fontSize: {
			base: '14px',
		},
		fontFamily: {
			inter: ['Inter', 'sans-serif'],
			SFProText: ['SF Pro Text'],
			SFProDisplay: ['SF Pro Display'],
		},
	},
	plugins: [],
}
