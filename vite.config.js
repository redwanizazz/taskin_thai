import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Code-split chunks over 500KB
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react')) {
            return 'vendor';
          }
        },
      },
    },
    // Enable source maps for debugging
    sourcemap: false,
    // Minify with oxc (Vite 8 default)
    minify: true,
  },
  // Dev server config
  server: {
    port: 3000,
    open: true,
  },
});
