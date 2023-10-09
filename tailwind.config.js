/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
		fontSize: {
			base: '14px',
		},
		fontFamily: {
			Inter: ['Inter', 'sans-serif'],
			SFProText: ['SF Pro Text', 'sans-serif'],
			SFProDisplay: ['SF Pro Display', 'sans-serif'],
			DMSans: ['DM Sans', 'sans-serif'],
		},
	},
	plugins: [],
}
