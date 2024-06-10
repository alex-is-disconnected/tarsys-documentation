// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        commandments: resolve(__dirname, "commandments.html"),
        diy: resolve(__dirname, "diy.html"),
        overview: resolve(__dirname, "overview.html"),
        refusal: resolve(__dirname, "refusal.html"),
      },
    },
  },
});
