import { fileURLToPath, URL } from "node:url";

import path from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

import AutoImport from "unplugin-auto-import/vite";

import Components from "unplugin-vue-components/vite";

import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
    AutoImport({
      imports: ["vue", "vue-router", "pinia"],
      dts: "src/auto-imports.d.ts",
      eslintrc: {
        enabled: true,
      },
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      resolvers: [
        IconsResolver({
          prefix: "i",
        }),
      ],
    }),
    Components({
      dirs: ["src/components", "src/layouts", "src/modules"],
      deep: true,
      dts: true,
      resolvers: [
        IconsResolver({
          customCollections: ["app"],
        }),
      ],
    }),

    Icons({
      compiler: "vue3",
      customCollections: {
        app: FileSystemIconLoader("./src/assets/icons", (svg) =>
          svg.replace(/^<svg /, '<svg stroke="currentColor"')
        ),
      },
      autoInstall: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
