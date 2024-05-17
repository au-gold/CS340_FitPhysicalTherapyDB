import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    port: parseInt(process.env.VITE_PORT, 10) || 5172
  },
  plugins: [react()],
  esbuild: {
    loader: "jsx"
 },
})
