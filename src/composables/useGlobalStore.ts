export const useGlobalStore = defineStore("global", () => {
  const regh = ref(0);

  const increment = () => {
    regh.value++;
  };

  const decrement = () => {
    regh.value--;
  };

  return {
    regh,
    increment,
    decrement,
  };
});
