import {
  reactive, ref, Ref, toRefs,
} from 'vue';
import axios from 'axios';

type RequestArgs = {
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: any,
}

type RequestData = {
    isLoading: Ref<boolean>,
    error: Ref<any>,
    data: Ref<any>,
}

async function useRequestAsync(data: RequestArgs): Promise<RequestData> {
  console.log('data', data);
  const state = reactive({
    isLoading: false,
    error: null,
    data: null,
  });

  console.log('state', state);

  const res = await axios.request({
    url: data.url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('KEEPER_TOKEN')}`,
    },
    method: data.method,
    data: data.body,
  });

  console.log('asdasda', { ...toRefs(state) });
  state.data = res.data();

  return {
    ...toRefs(state),
  };
}

export function useRequest<T>(url: string, body?: any, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET') {
  const data = ref<T>();
  const isLoading = ref(true);
  const error = ref(null);

  axios.request({
    url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('KEEPER_TOKEN')}`,
    },
    method,
    data: body || undefined,
  })
    .then((res) => {
      data.value = res.data;
    })
    .catch((err) => {
      error.value = err;
    })
    .finally(() => {
      isLoading.value = false;
    });

  return { data, isLoading, error };
}
