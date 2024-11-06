
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        muted: '#f5f5f5', 
        foreground: '#333333',
        'muted-foreground': '#999999',
      },
    },
  },
  plugins: [],
}

