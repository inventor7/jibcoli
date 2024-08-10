//assts
import "@/styles/main.css";
import "@/styles/custom.css";

import { createApp } from "vue";
import { setupI18n } from "@/plugins/i18n";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";

async function initializeApp() {
  const i18n = await setupI18n();
  const pinia = createPinia();
  const app = createApp(App);

  app.use(router);
  app.use(i18n);
  pinia.use(piniaPluginPersistedstate);
  app.use(pinia);

  app.mount("#app");
}

initializeApp();
