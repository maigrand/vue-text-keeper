<template>
  <div v-if="!noteListState.error" class="app-home__wrapper">
    <AppNoteList v-if="noteListState.data.length > 0" :noteList="noteListState.data" />
    <input v-model="inputData" type="text">
    <button @click="handleNoteCreate" type="submit">Add note</button>
  </div>
</template>

<script lang="ts" setup>

import { onMounted, reactive, ref } from 'vue';
import AppNoteList from '@/components/app-note-list/App-Note-List.vue';
import { useRequest } from '@/hooks/useRequest';
import { Note } from '@/types/note';

const inputData = ref<string>('');
const noteListState = reactive<{
  data: Note[],
  error: string,
}>({
  data: [],
  error: '',
});

const handleNoteCreate = async () => {
  const body = {
    title: inputData.value,
  };
  const { data } = await useRequest<Note>(`http://localhost:8082/api/note`, body, 'POST');
  if (data.value) {
    if (noteListState.data.length === 0) {
      noteListState.data = [];
    }
    noteListState.data = [...noteListState.data, data.value];
  }
};

onMounted(async () => {
  const { data, error } = await useRequest<Note[]>(`http://localhost:8082/api/note`);
  if (data.value) {
    noteListState.data = data.value;
  } else if (error) {
    noteListState.error = error.value;
  }
});

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
