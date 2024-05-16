import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: "AFTAAI",
        short_name: "AFTAAI",
        description: "A trusted trading platform",
        theme_color: "#f9fafb",
        background_color: "#ffffff",
        id: "AFTAAI",
        dir: "auto",
        orientation: "any",
        display: "standalone",
        lang: "en",
        start_url: "/",
        scope: "/",
        display_override: [
          "window-controls-overlay",
          "standalone",
          "fullscreen",
          "browser",
          "minimal-ui",
        ],
        categories: ["business", "finance"],
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
  envDir: "../",
});
