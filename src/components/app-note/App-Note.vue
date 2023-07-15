<template>
  <div class="app-note__wrapper">

    <div v-if="isLoading">Loading...</div>

    <div v-else-if="store.selectedNote">
      <input v-model="title" type="text">
      <input v-model="content" type="text">
      <button @click="handleDeleteNote" type="submit">Delete note</button>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {
  onMounted, ref, watch, computed,
} from 'vue';
import { useNoteStore } from '@/stores/useNoteStore';

const store = useNoteStore();
const noteId = computed(() => store.selectedNoteId);
const isLoading = ref<boolean>(false);
const title = ref<string>('');
const content = ref<string>('');

const handleUpdateNote = async () => {
  if (!noteId.value) {
    return;
  }
  await store.updateNote(noteId.value, title.value, content.value);
};

const handleDeleteNote = async () => {
  if (!noteId.value) {
    return;
  }
  await store.deleteNote(noteId.value);
};

onMounted(async () => {
  title.value = store.selectedNote?.title || '';
  content.value = store.selectedNote?.content || '';
});

watch(noteId, async (value) => {
  if (value) {
    title.value = store.selectedNote?.title || '';
    content.value = store.selectedNote?.content || '';
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
