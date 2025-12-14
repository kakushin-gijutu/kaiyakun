/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all files that contain Nativewind classes.
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				base: "#fffbf6",
				black: "#32322e",
				red: "#f3b5b0",
				green: "#cbdaab",
				orange: "#edcbb1",
				gray: "#a6a4a2",
			},
		},
	},
	plugins: [],
};
