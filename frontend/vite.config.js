import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite automatically loads environment variables from .env files
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.VITE_PORT) || 3000, // Use the port defined in the .env file or default to 3000
  },
});
