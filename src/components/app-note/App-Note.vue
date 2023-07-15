<template>
  <div class="app-note__wrapper">

    <div v-if="isLoading">Loading...</div>

    <div
      v-else-if="store.selectedNote"
      class="app-note__content"
    >
      <input v-model="title" type="text" class="app-note__content--title">
      <input v-model="content" type="text" class="app-note__content--content">
      <AppButton
        @click="handleDeleteNote"
        class="app-note__content--button"
      >
        Delete note
      </AppButton>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {
  onMounted, ref, watch, computed,
} from 'vue';
import { useNoteStore } from '@/stores/useNoteStore';
import AppButton from '@/components/app-button/App-Button.vue';

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
.app-note {
  &__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__content {
    margin: 20px;
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 16px;
  }
  &__content--title {
    border: none;
    outline: none;
    background-color: #232323;
    color: white;
    height: 20px;
  }
  &__content--content {
    border: none;
    outline: none;
    background-color: #232323;
    color: white;
  }
  &__content--button {
    margin: 0;
    width: 140px;
  }
}
</style>
