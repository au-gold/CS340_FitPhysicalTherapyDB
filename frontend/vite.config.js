import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.VITE_PORT || 58889, // Use the port defined in the .env file or default to 3000
  },
});

