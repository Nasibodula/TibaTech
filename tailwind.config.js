/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./src/**/*.{html,js,jsx,ts,tsx}",
      "./public/index.html",
    ], // Paths to your template files
    theme: {
      extend: {}, // Use this to extend Tailwind’s default styles
    },
    plugins: [], // Add any Tailwind plugins here
  };