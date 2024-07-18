import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from '@arco-plugins/vite-plugin-svgr';
import vitePluginForArco from '@arco-plugins/vite-react';
import setting from './src/settings.json';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  plugins: [
    react(),
    svgrPlugin({
      svgrOptions: {},
    }),
    vitePluginForArco({
      theme: '@arco-themes/react-arco-pro',
      modifyVars: {
        'arcoblue-6': setting.themeColor,
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  server: {
    proxy: {
      '/prod-admin': {
        target: 'https://logistics.drcstudio.cn/prod-admin',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/admin/, '')
      },
      '/prod-user': {
        target: 'https://logistics.drcstudio.cn/prod-user',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/user/, '')
      },
    },
  },
});
