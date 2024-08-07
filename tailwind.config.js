import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: 'Ubuntu',
        signika: 'Signika',
        'fira-sans-condensed': 'Fira Sans Condensed',
        'chakra-petch': 'Chakra Petch'
      }
    }
  },
  plugins: [nextui()]
}
