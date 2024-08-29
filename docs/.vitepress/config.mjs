// .vitepress/config.js
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'NoCoder',
  description: 'Directory of no-code tools',
  themeConfig: {
    // Your existing theme config
  },
  vite: {
    plugins: [
      // Your existing Vite plugins
    ]
  },
  // Add custom CSS to override default layout
  head: [
    ['style', {}, `
      :root {
        --vp-layout-max-width: 1200px;
      }
      .VPDoc.has-aside .content-container {
        max-width: 100% !important;
      }
      .VPDoc:not(.has-sidebar) .content {
        max-width: var(--vp-layout-max-width) !important;
      }
    `]
  ],
})