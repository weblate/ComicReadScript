/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import type { ManifestOptions } from 'vite-plugin-pwa';
import { VitePWA } from 'vite-plugin-pwa';
import solidPlugin from 'vite-plugin-solid';
import markdown from '@jackfranklin/rollup-plugin-markdown';
import { solidSvg } from '../rollup-solid-svg';

const manifest: Partial<ManifestOptions> = {
  id: 'ComicRead',
  name: 'ComicRead',
  short_name: 'ComicRead',
  description: '双页阅读漫画',
  theme_color: '#607d8b',
  background_color: '#ffffff',
  display: 'standalone',
  icons: [
    {
      src: '/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'maskable',
    },
    {
      src: '/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
    {
      src: '/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: '/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable',
    },
  ],

  file_handlers: [
    {
      action: '/',
      accept: {
        'application/zip': ['.zip'],
        'application/x-rar-compressed': ['.rar'],
        'application/x-7z-compressed': ['.7z'],
      },
    },
  ],
};

export default defineConfig({
  server: { host: '0.0.0.0' },
  build: { rollupOptions: { external: ['/unarchiver.min.js'] } },
  css: { modules: { globalModulePaths: [/^#/] } },
  plugins: [
    {
      name: 'selfPlugin',
      enforce: 'pre',
      transform(code, id): null | string {
        if (id.includes('node_modules')) return null;
        let newCode = code;
        // 将 vite 不支持的 rollup-plugin-styles 相关 css 导出代码删除
        newCode = newCode.replace(', { css as style }', '');
        newCode = newCode.replace(/\n.+?Style = style;\n/, '');
        return newCode;
      },
    },
    markdown({ parseFrontMatterAsMarkdown: true }),
    solidSvg(),
    solidPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { suppressWarnings: true },
      manifest,
      includeAssets: ['/libarchive.js/wasm-gen/libarchive.wasm', '/libunrar/*'],
      workbox: {
        // 清理过期缓存
        cleanupOutdatedCaches: true,
      },
    }),
  ],
});
