<template>
  <div class="app-note__wrapper">
    <div v-if="!noteState.error">
      <input v-model="title" type="text">
      <input v-model="content" type="text">
      <button @click="handleUpdateNote" type="submit">Update note</button>
      <button @click="handleDeleteNote" type="submit">Delete note</button>
    </div>
    <div v-else>
      <AppError :error="noteState.error" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';
import { useRequest } from '@/hooks/useRequest';
import { Note, ApiException } from '@/types/note';
import AppError from '@/components/app-error/App-Error.vue';

const router = useRouter();
const route = useRoute();

const noteId = route.params.id;
const noteState = reactive<{
  note: Note | null,
  error: ApiException | null,
}>({
  note: null,
  error: null,
});
const title = ref<string>('');
const content = ref<string>('');

const handleUpdateNote = async () => {
  const body = {
    title: title.value,
    content: content.value,
  };
  const { data, error } = await useRequest<Note>(`http://localhost:8082/api/note/${noteId}`, body, 'PUT');
  if (data.value) {
    noteState.note = data.value;
  } else if (error.value) {
    noteState.error = error.value;
  }
};

const handleDeleteNote = async () => {
  const { error } = await useRequest<Note>(`http://localhost:8082/api/note/${noteId}`, {}, 'DELETE');
  if (error.value) {
    noteState.error = error.value;
  } else {
    await router.push({ name: 'home' });
  }
};

onMounted(async () => {
  const { data, error } = await useRequest<Note>(`http://localhost:8082/api/note/${noteId}`);
  if (data.value) {
    noteState.note = data.value;
    title.value = noteState.note.title;
    content.value = noteState.note.content || '';
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
