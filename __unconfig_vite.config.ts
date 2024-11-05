
let __unconfig_data;
let __unconfig_stub = function (data = {}) { __unconfig_data = data };
__unconfig_stub.default = (data = {}) => { __unconfig_data = data };
import svgrPlugin from '@arco-plugins/vite-plugin-svgr'
import vitePluginForArco from '@arco-plugins/vite-react'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import setting from './src/settings.json'

// https://vitejs.dev/config/
const __unconfig_default =  defineConfig({
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

if (typeof __unconfig_default === "function") __unconfig_default(...[{"command":"serve","mode":"development"}]);export default __unconfig_data;