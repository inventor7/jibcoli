//assts
import "@/styles/main.css";
import "@/styles/custom.css";

import { createApp } from "vue";
import { setupI18n } from "@/plugins/i18n";
import { createPinia } from "pinia";
import { createMetaManager } from "vue-meta";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";

async function initializeApp() {
  const i18n = await setupI18n();

  const pinia = createPinia().use(piniaPluginPersistedstate);

  const app = createApp(App)
    .use(router)
    .use(createMetaManager())
    .use(i18n)
    .use(pinia);

  app.mount("#app");
}

initializeApp();
