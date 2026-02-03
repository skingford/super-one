import { defineConfig, type ConfigEnv, type UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
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
        dts: "auto-imports.d.ts",
        vueTemplate: true,
        dirs: ["src/composables/**", "src/stores/**"],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: "components.d.ts",
        dirs: ["src/components"],
        extensions: ["vue"],
        deep: true,
      }),
    ],

    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
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
      minify: "esbuild",
      sourcemap: !isProd,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks: {
            "vue-vendor": ["vue", "vue-router", "pinia"],
            "element-plus": ["element-plus", "@element-plus/icons-vue"],
            vueuse: ["@vueuse/core"],
          },
        },
      },
    },

    optimizeDeps: {
      include: ["vue", "vue-router", "pinia", "@vueuse/core", "element-plus"],
    },

    esbuild: {
      drop: isProd ? ["console", "debugger"] : [],
    },
  };
});
