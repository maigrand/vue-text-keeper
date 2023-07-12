import { ref } from 'vue';
import axios from 'axios';
import { ApiException } from '@/types/commonTypes';

const BACKEND_URL = 'http://localhost:8082';

export async function useRequest<T>(url: string, body?: any, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET') {
  const data = ref<T>();
  const error = ref<ApiException>();

  try {
    const res = await axios.request({
      url: `${BACKEND_URL}${url}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('KEEPER_TOKEN')}`,
      },
      method,
      data: body || undefined,
    });

    data.value = res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      error.value = e.response?.data as ApiException;
    } else {
      // @TODO: переделать на нормальный тип ошибки
      error.value = e as ApiException;
    }
  }

  return {
    data,
    error,
  };
}
