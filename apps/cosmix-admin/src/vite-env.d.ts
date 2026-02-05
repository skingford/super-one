/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // biome-ignore lint/complexity/noBannedTypes: Vue component type
  // biome-ignore lint/suspicious/noExplicitAny: Vue component type
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
