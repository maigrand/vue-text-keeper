<template>
  <div class="app-note-list__wrapper">

    <div v-if="store.notes" class="app-note-list__notes">
      <button
        v-for="note in store.notes"
        :key="note.id"
        @click="setSelected(note.id)"
        class="app-note-list__button"
        type="button"
      >
        <span
          class="app-note-list__note"
        >
          {{ note.title }}
        </span>
      </button>
    </div>

    <AppError
      v-if="error"
      :error="error"
    />

  </div>
</template>

<script lang="ts" setup>

import { useRequest } from '@/hooks/useRequest';
import { onMounted, ref } from 'vue';
import { NoteListEmits } from '@/components/app-note-list/types';
import { ApiException, Note } from '@/types/commonTypes';
import AppError from '@/components/app-error/App-Error.vue';
import { useNoteStore } from '@/stores/useNoteStore';

const store = useNoteStore();

const error = ref<ApiException | null>(null);

const emit = defineEmits<NoteListEmits>();

const setSelected = (noteId: number) => emit('set-selected', noteId);

onMounted(async () => {
  const { data, error: apiError } = await useRequest<Note[]>('/api/note');
  if (data.value) {
    store.$patch({
      notes: data.value,
    });
  } else if (apiError.value) {
    error.value = apiError.value;
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

  &__notes {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__button {
    border: 8px solid transparent;
    border-radius: 4px;
    background-color: #323232;
    color: white;
    margin: 8px;
    cursor: pointer;
  }

  &__note {
    margin-top: 8px;
  }

}
</style>
