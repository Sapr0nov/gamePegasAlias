import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import * as path from 'path'
import { VitePWA } from 'vite-plugin-pwa'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
    host: true,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  ssr: {
    target: 'node',
    format: 'cjs',
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      workbox: {
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg,ttf,eot,woff,woff2,json,mp3}',
        ],
      },
      manifest: {
        name: 'Pegas Alias',
        short_name: 'Pegas Alias',
        description: 'Отгадывай слова по-новому',
        theme_color: '#cdddff',
        background_color: '#cdddff',
        display: 'fullscreen',
        start_url: '/',
        orientation: 'portrait',
        icons: [
          {
            src: 'apple-touch-icon-114x114.png',
            sizes: '114x114',
            type: 'image/png',
          },
          {
            src: 'apple-touch-icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png',
          },
          {
            src: 'favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            src: 'favicon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: 'favicon-128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'favicon-196x196.png',
            sizes: '196x196',
            type: 'image/png',
          },
          {
            src: 'apple-touch-icon-57x57.png',
            sizes: '57x57',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
