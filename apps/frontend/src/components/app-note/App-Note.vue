<template>
  <div v-if="!noteIsLoading" class="app-note__wrapper">
    <input v-model="title" type="text">
    <input v-model="content" type="text">
    <button @click="handleUpdateNote" type="submit">Update note</button>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import { useRequest } from '@/hooks/useRequest';

const route = useRoute();

const noteId = route.params.id;
const title = ref<string>('');
const content = ref<string>('');

const {
  data: noteData,
  isLoading: noteIsLoading,
  error: noteError,
} = useRequest<{
  id: string;
  title: string;
  content?: string;
  userId: number;
}>(`http://localhost:8082/api/note/${noteId}`);

const handleUpdateNote = async () => {
  const body = {
    title: title.value,
    content: content.value,
  };
  const { data } = useRequest<{
    id: string;
    title: string;
    content?: string;
    userId: number;
  }>(`http://localhost:8082/api/note/${noteId}`, body, 'PUT');
  noteData.value = data.value;
};

watch(noteData, (note) => {
  if (!note) {
    return;
  }
  title.value = note.title;
  content.value = note.content || '';
});

</script>

<style lang="scss" scoped>
.app-note__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
