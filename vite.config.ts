import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { imagetools } from 'vite-imagetools';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  base: '/portfolio/',
  plugins: [
    react(),
    tailwindcss(),
    imagetools({
      defaultDirectives: (url) => {
        if (url.searchParams.has('optimize')) {
          return new URLSearchParams({
            format: 'webp',
            quality: '80',
          });
        }
        return new URLSearchParams();
      },
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          icons: ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    minify: 'esbuild',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
});
