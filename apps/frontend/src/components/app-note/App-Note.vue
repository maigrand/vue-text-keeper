<template>
  <div v-if="!noteError" class="app-note__wrapper">
    <input v-model="title" type="text">
    <input v-model="content" type="text">
    <button @click="handleUpdateNote" type="submit">Update note</button>
    <button @click="handleDeleteNote" type="submit">Delete note</button>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useRequest } from '@/hooks/useRequest';
import { Note } from '@/types/note';

const router = useRouter();
const route = useRoute();

const noteId = route.params.id;
const title = ref<string>('');
const content = ref<string>('');

const { data: noteData, error: noteError } = await useRequest<Note>(`http://localhost:8082/api/note/${noteId}`);

const handleUpdateNote = async () => {
  const body = {
    title: title.value,
    content: content.value,
  };
  const { data } = await useRequest<Note>(`http://localhost:8082/api/note/${noteId}`, body, 'PUT');
  if (data.value) {
    noteData.value = data.value;
  }
};

const handleDeleteNote = async () => {
  await useRequest<Note>(`http://localhost:8082/api/note/${noteId}`, {}, 'DELETE');
  await router.push({ name: 'home' });
};

onMounted(() => {
  if (!noteData.value) {
    return;
  }
  title.value = noteData.value.title;
  content.value = noteData.value.content || '';
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
