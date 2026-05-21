import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base:
    mode === 'production'
      ? '/design-system-starter-kit/color-palette-generator/'
      : '/',
  build: {
    outDir: 'dist',
  },
}));
