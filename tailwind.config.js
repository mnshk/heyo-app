/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
		fontSize: {
			base: "16px",
		},
		fontFamily: {
			Inter: ["Inter", "sans-serif"], // Needs to be imported
			DMSans: ["DM Sans", "sans-serif"], // Needs to be imported
			Poppins: ["Poppins", "sans-serif"], // Needs to be imported
			Nunito: ["Nunito", "sans-serif"], // Needs to be imported
			Averta: ["Averta"], // Local
			RobotoMono: ["Roboto Mono"], // Google Fonts
		},
	},
	plugins: [],
}
