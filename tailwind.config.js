/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
		fontSize: {
			base: "16px",
		},
		fontFamily: {
			Inter: ["Inter", "sans-serif"],
			DMSans: ["DM Sans", "sans-serif"],
			Poppins: ["Poppins", "sans-serif"],
			Nunito: ["Nunito", "sans-serif"],
			Averta: ["Averta"],
			RobotoMono: ["Roboto Mono"],
		},
	},
	plugins: [],
}
