import { defineStore } from "pinia";
import { ref } from "vue";
import { useRequest } from '@/hooks/useRequest';
import { ApiException } from '@/types/exception.type';
import { User, UserAuthRes } from '@/types/user.type';

export const useUserStore = defineStore('user', () => {
  const currentUserEmail = ref<string>('');
  const storeApiError = ref<ApiException | null>(null);

  const fetchUser = async () => {
    const { data, error } = await useRequest<User>('/api/user');

    if (error.value) {
      storeApiError.value = error.value;
      return;
    }

    if (data.value) {
      currentUserEmail.value = data.value.email;
    }
  };

  const signin = async (email: string, password: string) => {
    const body = {
      email,
      password,
    };
    const { data, error } = await useRequest<UserAuthRes>('/api/auth/signin', body, 'POST');

    if (error.value) {
      storeApiError.value = error.value;
      return;
    }

    if (data.value) {
      localStorage.setItem('KEEPER_TOKEN', data.value.token);
      await fetchUser();
    }
  };

  return {
    currentUserEmail,
    fetchUser,
    signin,
    storeApiError,
  };
});
