<template>
  <div v-if="!noteListError" class="app-home__wrapper">
    <AppNoteList v-if="noteListData.length > 0" :noteList="noteListData" />
    <input v-model="inputData" type="text">
    <button @click="handleNoteCreate" type="submit">Add note</button>
  </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import AppNoteList from '@/components/app-note-list/App-Note-List.vue';
import { useRequest } from '@/hooks/useRequest';
import { Note } from '@/types/note';

const inputData = ref<string>('');

const { data: noteListData, error: noteListError } = await useRequest<Note[]>(`http://localhost:8082/api/note`);

const handleNoteCreate = async () => {
  const body = {
    title: inputData.value,
  };
  const { data } = await useRequest<Note>(`http://localhost:8082/api/note`, body, 'POST');
  if (data.value) {
    if (!noteListData.value) {
      noteListData.value = [];
    }
    noteListData.value = [...noteListData.value, data.value];
  }
};

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
