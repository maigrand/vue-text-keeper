<template>
  <div v-if="!noteListIsLoading" class="app-home__wrapper">
    <AppNoteList v-if="noteListData.length > 0" :noteList="noteListData" />
    <input v-model="inputData" type="text">
    <button @click="handleNoteCreate" type="submit">Add note</button>
  </div>
</template>

<script lang="ts" setup>

import { onMounted, ref } from 'vue';
import axios from 'axios';
import AppNoteList from '@/components/app-note-list/App-Note-List.vue';
import {useRequest} from '@/hooks/useRequest'

const noteList = ref<
    {
      id: string;
      title: string;
      content?: string;
      userId: number;
    }[]
>([]);
const inputData = ref<string>('');

// const getNotes = async () => {
//   const response = await axios.get('http://localhost:8082/api/note', {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${localStorage.getItem('KEEPER_TOKEN')}`,
//     },
//   });
//   const { data } = response;
//   noteList.value = data;
// };

const {
  data: noteListData,
  isLoading: noteListIsLoading,
  error: noteListError,
} = useRequest<{
  id: string;
  title: string;
  content?: string;
  userId: number;
}[]>(`http://localhost:8082/api/note`);

const handleNoteCreate = async () => {
  // const res = await axios.post('http://localhost:8082/api/note', {
  //   title: inputData.value,
  // }, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${localStorage.getItem('KEEPER_TOKEN')}`,
  //   },
  // });
  // noteList.value = [...noteList.value, res.data];
  const body = {
    title: inputData.value,
  };
  const { data } = useRequest<{
    id: string;
    title: string;
    content?: string;
    userId: number;
  }>(`http://localhost:8082/api/note`, body, 'POST');
};

// onMounted(() => {
//   getNotes();
// });

</script>

<style lang="scss" scoped>
.app-home {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
