/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./src/**/*.{html,js,jsx,ts,tsx}",
      "./public/index.html",
    ], // Paths to your template files
    theme: {
      extend: {
        colors: {
          primary: "#1E40AF", // Custom primary color
        },
      },
    },
    plugins: [], // Add any Tailwind plugins here
  };