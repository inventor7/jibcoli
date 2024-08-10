import { createI18n } from "vue-i18n";
import { watch } from "vue";
import { parse, stringify } from "zipson";

const CACHE_PREFIX = "i18n-cache-";

export async function setupI18n() {
  const storedLocale = localStorage.getItem("locale");
  const browserLocale =
    navigator.language.slice(0, 2) || navigator.languages[0]?.slice(0, 2);
  const locale = storedLocale || browserLocale || "en";

  const messages = await loadLocaleWithCache(locale);

  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: locale,
    fallbackLocale: "en",
    messages: {
      [locale]: messages,
    },
    missingWarn: false,
    fallbackWarn: false,
  });

  watch(
    () => i18n.global.locale.value,
    async (newLocale) => {
      localStorage.setItem("locale", newLocale);
      const newMessages = await loadLocaleWithCache(newLocale);
      i18n.global.setLocaleMessage(newLocale, newMessages);
    }
  );

  return i18n;
}

async function loadLocaleWithCache(locale: string) {
  const cacheKey = `${CACHE_PREFIX}${locale}`;

  try {
    // Try to get cached data from localStorage
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      return parse(cachedData);
    }
  } catch (error) {
    console.warn("Error reading from localStorage:", error);
  }

  // If not in cache or error occurred, load from file
  const url = `/locales/${locale}.json`;
  try {
    const response = await fetch(url);
    console.log(response);
    const messages = await response.json();
    console.log(response);

    // Try to cache the new data
    try {
      localStorage.setItem(cacheKey, stringify(messages));
    } catch (error) {
      console.warn("Error writing to localStorage:", error);
    }

    return messages;
  } catch (error) {
    console.error("Failed to load locale:", locale, error);
    return {};
  }
}
