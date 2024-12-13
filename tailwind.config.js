/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        unbounded: 'Unbounded',
        attack: 'Attack Type',
      },
      colors: {
        myPurple: 'var(--color-purple)',
        myPurpleLight: 'var(--color-purple-light)',
        myGreen: 'var(--color-green)',
        myDark: 'var(--color-dark)',
        myGrey: 'var(--color-grey)',
        myGreyLight: 'var(--color-grey-light)',
        myGreyLightBg: 'var(--color-grey-light-bg)',
        myRed: 'var(--color-red)',
      },
      borderRadius: {
        mySm: '10px',
        myMd: '20px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
