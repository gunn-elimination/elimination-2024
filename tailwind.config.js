/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			animation: {
				text: 'text 5s ease infinite'
			},
			keyframes: {
				text: {
					'0%, 100%': {
						'background-size': '200% 200%',
						'background-position': 'left center'
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right center'
					}
				}
			},
			fontFamily: {
				nunito: ['"Nunito"', 'sans-serif'],
				saira: ['"Saira"', 'sans-serif'],
				dosis: ['"Dosis"', 'sans-serif'],
				advent: ['"Advent Pro"', 'sans-serif'],
				tenor: ['"Tenor Sans"', 'sans-serif'],
				poiret: ['"Poiret One"', 'sans-serif'],
				raleway: ['"Raleway"', 'sans-serif'],
				garamond: ['"EB Garamond"', 'sans-serif']
			},
			skeletonScreen: {
				color: '#525252',
				borderRadius: '4px'
			}
		}
	},
	plugins: [require('tailwindcss-skeleton-screen'), require('tailwindcss-safe-area')]
};
