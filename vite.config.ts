
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite'

  export default defineConfig({
    plugins: [react(),tailwindcss(),],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      
    },
    build: {
      target: 'esnext',
      outDir: 'dist',
    },
    server: {
      port: 3000,
      open: true,
    },
  });