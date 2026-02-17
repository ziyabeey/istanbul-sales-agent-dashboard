import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  // Cloud Run/Deployment platforms inject PORT env variable
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  return {
    // Vercel/root deployment: absolute paths so assets load on all SPA routes (e.g. /leads)
    base: mode === 'production' ? '/' : './',
    plugins: [
      react(),
      visualizer({
        filename: 'dist/bundle-stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    define: {
      // Polyfill process.env for existing code compatibility
      'process.env': {
        API_KEY: env.API_KEY || ''
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-charts': ['recharts'],
            'vendor-icons': ['lucide-react'],
            'vendor-firebase': ['firebase/app', 'firebase/firestore'],
            'vendor-pdf': ['jspdf', 'html2canvas'],
          }
        }
      },
      chunkSizeWarningLimit: 600,
    },
    server: {
      port: 3000,
      host: 'localhost'
    },
    preview: {
      port: port, // Use container port
      host: true, // Listen on all addresses (0.0.0.0)
      allowedHosts: true // Allow cloud hosts
    }
  };
});