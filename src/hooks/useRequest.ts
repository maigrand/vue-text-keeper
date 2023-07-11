import { ref } from 'vue';
import axios from 'axios';

export async function useRequest<T>(url: string, body?: any, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET') {
  const data = ref<T>();
  const isLoading = ref<boolean>(true);
  const error = ref<string>('');

  try {
    const res = await axios.request({
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('KEEPER_TOKEN')}`,
      },
      method,
      data: body || undefined,
    });

    data.value = res.data;
  } catch (e: unknown) {
    error.value = JSON.stringify(e);
  } finally {
    isLoading.value = false;
  }

  return {
    data,
    isLoading,
    error,
  };
}
