/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		colors: {
			transparent: "transparent",
			current: "currentColor",
			white: {
				100: "#f8fafc",
				200: "#f1f5f9",
				300: "#cbd5e1",
				400: "#94a3b8",
				900: "#ffffff",
			},
			primary: {
				50: "#f0fdf4",
				100: "#dcfce7",
				200: "#bbf7d0",
				300: "#86efac",
				400: "#4ade80",
				500: "#22c55e",
				600: "#16a34a",
				700: "#15803d",
				800: "#166534",
				900: "#14532d",
			},
			secondary: {
				50: "#f8fafc",
				100: "#f1f5f9",
				200: "#e2e8f0",
				300: "#cbd5e1",
				400: "#94a3b8",
				500: "#64748b",
				600: "#475569",
				700: "#334155",
				800: "#1e293b",
				900: "#0f172a",
			},
			black: "#020617",
			blood: "#dc2626",
			error: "#ef4444",
			warning: "#f59e0b",
			success: "#10b981",
			gray: {
				bg: "#0f172a",
				darkest: "#1e293b",
				dark: "#334155",
				DEFAULT: "#475569",
				light: "#94a3b8",
				lightest: "#f1f5f9",
			},
		},

		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				display: ['Outfit', 'sans-serif'],
			},
			dropShadow: {
				"premium": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
				"glow": "0 0 15px rgba(34, 197, 94, 0.3)",
			},
			boxShadow: {
				"glass": "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
			},
		},
	},
	plugins: [],
};
