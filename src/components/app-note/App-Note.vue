<template>
  <div class="app-note__wrapper">
    <div v-if="noteState.data">
      <input v-model="title" type="text">
      <input v-model="content" type="text">
      <button @click="handleUpdateNote" type="submit">Update note</button>
      <button @click="handleDeleteNote" type="submit">Delete note</button>
    </div>
    <div v-if="noteState.error">
      <AppError :error="noteState.error" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';
import { useRequest } from '@/hooks/useRequest';
import AppError from '@/components/app-error/App-Error.vue';
import { Note } from '@/types/commonTypes';
import { NoteState } from './types';

const router = useRouter();
const route = useRoute();

const noteId = route.params.id;
const noteState = reactive<NoteState>({
  data: null,
  error: null,
});
const title = ref<string>('');
const content = ref<string>('');

const handleUpdateNote = async () => {
  const body = {
    title: title.value,
    content: content.value,
  };
  const { data, error } = await useRequest<Note>(`/api/note/${noteId}`, body, 'PUT');
  if (data.value) {
    noteState.data = data.value;
  } else if (error.value) {
    noteState.error = error.value;
  }
};

const handleDeleteNote = async () => {
  const { error } = await useRequest<Note>(`/api/note/${noteId}`, {}, 'DELETE');
  if (error.value) {
    noteState.error = error.value;
  } else {
    await router.push({ name: 'home' });
  }
};

onMounted(async () => {
  const { data, error } = await useRequest<Note>(`/api/note/${noteId}`);
  if (data.value) {
    noteState.data = data.value;
    title.value = noteState.data.title;
    content.value = noteState.data.content || '';
  } else if (error.value) {
    noteState.error = error.value;
  }
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
