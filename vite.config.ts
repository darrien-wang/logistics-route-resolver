import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron/simple';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const port = parseInt(process.env.PORT || process.env.VITE_PORT || '3000');

  return {
    base: './',
    server: {
      port: port,
      host: '0.0.0.0',
      strictPort: false, // Allow auto port increment if port is busy
      proxy: {
        '/api-remote': {
          target: 'https://dms.wpglb.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-remote/, ''),
        },
        '/api-pda': {
          target: 'https://pda.wpglb.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-pda/, ''),
        },
      },
    },
    plugins: [
      react(),
      electron({
        main: {
          entry: 'electron/main.ts',
        },
        preload: {
          input: path.join(__dirname, 'electron/preload.ts'),
        },
        renderer: {},
      }),
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
