import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from 'vite';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: ['**/*.tsx', '**/*.ts'],
    }),
  ],
  // define: {
  //   API_KEY: process.env.VITE_API_KEY,
  //   API_URL: process.env.VITE_API_URL,
  // },
  server: {
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['js-big-decimal'],
  },
});
