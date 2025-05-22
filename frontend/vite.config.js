import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  theme: {
    extend: {
      fontFamily: {
        cursive: ["Cedarville Cursive", "cursive"], // Adding Cedarville Cursive font
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [react(), tailwindcss(),],
})
