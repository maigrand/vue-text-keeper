import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
  const email = ref<string>('');

  return {
    email,
  };
});
