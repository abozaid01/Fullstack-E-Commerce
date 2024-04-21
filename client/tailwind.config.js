/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	darkMode: 'class',
	theme: {
		screens: {
			sm: '480px',
			md: '570px',
			lg: '768px',
			xl: '1024px',
			'2xl': '1200px',
			'3xl': '1400px'
		},
		extend: {
			colors: {
				primary: {
					50: '#eff6ff',
					100: '#dbeafe',
					200: '#bfdbfe',
					300: '#93c5fd',
					400: '#60a5fa',
					500: '#3b82f6',
					600: '#2563eb',
					700: '#1d4ed8',
					800: '#1e40af',
					900: '#1e3a8a',
					950: '#172554'
				}
				// pink: {
				// 	200: 'hsl(353, 100%, 78%)',
				// 	400: 'hsl(0, 100%, 70%)'
				// },
				// gray: {
				// 	100: 'hsl(0, 0%, 93%)',
				// 	200: 'hsl(0, 0%, 60%)',
				// 	300: 'hsl(0, 0%, 47%)',
				// 	400: 'hsl(0, 0%, 33%)',
				// 	500: 'hsl(0, 0%, 27%)',
				// 	600: 'hsl(0, 0%, 13%)'
				// },
				// brown: 'hsl(29, 90%, 65%)'
				// green: 'hsl(152, 51%, 52%)'
			}
		},
		fontFamily: {
			body: [
				'Inter',
				'ui-sans-serif',
				'system-ui',
				'-apple-system',
				'system-ui',
				'Segoe UI',
				'Roboto',
				'Helvetica Neue',
				'Arial',
				'Noto Sans',
				'sans-serif',
				'Apple Color Emoji',
				'Segoe UI Emoji',
				'Segoe UI Symbol',
				'Noto Color Emoji'
			],
			sans: [
				'Inter',
				'ui-sans-serif',
				'system-ui',
				'-apple-system',
				'system-ui',
				'Segoe UI',
				'Roboto',
				'Helvetica Neue',
				'Arial',
				'Noto Sans',
				'sans-serif',
				'Apple Color Emoji',
				'Segoe UI Emoji',
				'Segoe UI Symbol',
				'Noto Color Emoji'
			]
		}
	},
	plugins: [require('flowbite/plugin'), require('tailwind-scrollbar')]
};
