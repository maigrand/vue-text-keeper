<template>
  <div class="app-note-list__wrapper">
    <div v-if="viewMode === 'LIST'" class="app-note-list__list">
      <button
        type="submit"
        @click="toggleViewMode"
      >
        <span class="app-note-list__title">Add note</span>
      </button>
      <button
        v-for="note in noteListState.data"
        class="app-note-list__item"
        :key="note.id"
        @click="handleClick(note)"
        type="submit"
      >
        <span class="app-note-list__title">{{ note.title }}</span>
      </button>
    </div>
    <div v-else-if="viewMode === 'ADD'">
      <h1>test</h1>
    </div>
    <div v-if="noteListState.error">
      <AppError :error="noteListState.error" />
    </div>
  </div>
</template>

<script lang="ts" setup>

import { useRouter } from 'vue-router';
import { useRequest } from '@/hooks/useRequest';
import { onMounted, reactive, ref } from 'vue';
import { NoteListState } from '@/components/app-note-list/types';
import { Note } from '@/types/commonTypes';
import AppError from '@/components/app-error/App-Error.vue';

const router = useRouter();

const noteListState = reactive<NoteListState>({
  data: [],
  error: null,
});
const viewMode = ref<'LIST' | 'ADD'>('LIST');

const toggleViewMode = () => {
  if (viewMode.value === 'LIST') {
    viewMode.value = 'ADD';
  } else {
    viewMode.value = 'LIST';
  }
};

const handleClick = async (note: Note) => {
  await router.push({
    name: 'note',
    params: {
      id: note.id,
    },
  });
};

onMounted(async () => {
  const { data, error } = await useRequest<Note[]>('/api/note');
  if (data.value) {
    noteListState.data = data.value;
  } else if (error.value) {
    noteListState.error = error.value;
  }
});

</script>

<style lang="scss" scoped>
.app-note-list {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #D4D2DE;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-color: transparent;
    color: white;
  }

  &__title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }

}
</style>
