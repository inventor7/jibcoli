/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { createPinia } from "pinia";
import router from "../router";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { setupI18n } from "./i18n";

// Types
import type { App } from "vue";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export const i18n = await setupI18n();

export function registerPlugins(app: App) {
  app.use(i18n).use(router).use(pinia);
}
