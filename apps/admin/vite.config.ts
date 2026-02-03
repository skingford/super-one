import { defineConfig, type ConfigEnv, type UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
// Using rolldown-vite for faster builds (10-30x faster than Rollup)
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const isDev = mode === "development";
  const isProd = mode === "production";

  return {
    plugins: [
      vue({
        script: {
          defineModel: true,
          propsDestructure: true,
        },
      }),
      AutoImport({
        imports: [
          "vue",
          "vue-router",
          "pinia",
          "@vueuse/core",
          {
            "vue-router": ["useRoute", "useRouter", "onBeforeRouteLeave", "onBeforeRouteUpdate"],
          },
        ],
        resolvers: [ElementPlusResolver()],
        dts: "types/auto-imports.d.ts",
        vueTemplate: true,
        dirs: ["src/composables/**", "src/stores/**"],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: "types/components.d.ts",
        dirs: ["src/components"],
        extensions: ["vue"],
        deep: true,
      }),
    ],

    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "#types": fileURLToPath(new URL("./types", import.meta.url)),
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/variables.scss" as *;',
        },
      },
      devSourcemap: isDev,
    },

    server: {
      port: 3001,
      open: false,
      cors: true,
      hmr: {
        overlay: true,
      },
    },

    build: {
      target: "esnext",
      sourcemap: !isProd,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          // Rolldown uses advancedChunks instead of manualChunks
          advancedChunks: {
            groups: [
              {
                name: "vue-vendor",
                test: /[\\/]node_modules[\\/](vue|vue-router|pinia)[\\/]/,
                priority: 20,
              },
              {
                name: "element-plus",
                test: /[\\/]node_modules[\\/](@element-plus|element-plus)[\\/]/,
                priority: 15,
              },
              {
                name: "vueuse",
                test: /[\\/]node_modules[\\/]@vueuse[\\/]/,
                priority: 10,
              },
            ],
          },
        },
      },
    },

    optimizeDeps: {
      include: ["vue", "vue-router", "pinia", "@vueuse/core", "element-plus"],
    },

    // Use define to drop console in production (works with both esbuild and oxc)
    define: isProd
      ? {
          "globalThis.console.log": "(() => {})",
          "globalThis.console.debug": "(() => {})",
        }
      : undefined,
  };
});
