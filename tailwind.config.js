// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Definimos tu color "Stitch" aquí
        'primary': '#0f1829', 
      },
      letterSpacing: {
        // Un extra: el espaciado ultra ancho que usa la marca
        'ultra': '0.3em',
      }
    },
  },
  plugins: [],
}