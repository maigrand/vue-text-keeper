<template>
  <div class="app-note__wrapper">

    <div v-if="isLoading">Loading...</div>

    <div v-else-if="store.selectedNote">
      <input v-model="title" type="text">
      <input v-model="content" type="text">
      <button @click="handleDeleteNote" type="submit">Delete note</button>
    </div>

    <div v-if="apiError">
      <AppError :error="apiError" />
    </div>

  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import {
  onMounted, ref, watch,
} from 'vue';
import { useRequest } from '@/hooks/useRequest';
import AppError from '@/components/app-error/App-Error.vue';
import { ApiException, Note } from '@/types/commonTypes';
import { useNoteStore } from '@/stores/useNoteStore';
import { NoteProps } from './types';

const store = useNoteStore();

const router = useRouter();

const props = defineProps<NoteProps>();

const apiError = ref<ApiException | null>(null);
const isLoading = ref<boolean>(false);
const title = ref<string>('');
const content = ref<string>('');

const handleUpdateNote = async () => {
  const body = {
    title: title.value,
    content: content.value,
  };
  const { data, error } = await useRequest<Note>(`/api/note/${props.id}`, body, 'PUT');
  if (data.value) {
    store.setSelectedNote(data.value);
  } else if (error.value) {
    apiError.value = error.value;
  }
};

const handleDeleteNote = async () => {
  const { error } = await useRequest<Note>(`/api/note/${props.id}`, {}, 'DELETE');
  if (error.value) {
    apiError.value = error.value;
  } else {
    store.deleteNote(props.id);
    await router.push({ name: 'home' });
  }
};

onMounted(async () => {
  const { data, error } = await useRequest<Note>(`/api/note/${props.id}`);
  if (data.value) {
    store.setSelectedNote(data.value);
    title.value = store.selectedNote?.title || '';
    content.value = store.selectedNote?.content || '';
  } else if (error.value) {
    apiError.value = error.value;
  }
});

watch(props, async (value) => {
  if (value.id) {
    isLoading.value = true;
    const { data, error } = await useRequest<Note>(`/api/note/${props.id}`);
    if (data.value) {
      store.setSelectedNote(data.value);
      title.value = store.selectedNote?.title || '';
      content.value = store.selectedNote?.content || '';
    } else if (error.value) {
      apiError.value = error.value;
    }
    isLoading.value = false;
  }
});

watch(title, async (value) => {
  if (value) {
    await handleUpdateNote();
  }
});

watch(content, async (value) => {
  if (value) {
    await handleUpdateNote();
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
