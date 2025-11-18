/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            FontFamily: {
                sans: ['Poppins', 'sans-serif'],
                pixel: ['"Press Start 2P"', 'cursive'],
            },
        },
    },
    plugins: [],
}