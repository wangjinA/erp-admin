import svgrPlugin from '@arco-plugins/vite-plugin-svgr'
import vitePluginForArco from '@arco-plugins/vite-react'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import setting from './src/settings.json'

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
        target: 'https://logistics.suyunbaoo.com',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/prod-admin/, '')
      },
      '/prod-user': {
        target: 'https://logistics.suyunbaoo.com',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/client/, '')
      },
    },
  },
})
