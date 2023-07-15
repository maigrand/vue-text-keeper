<template>
  <div class="app-note-list__wrapper">

    <div v-if="store.notes" class="app-note-list__notes">
      <AppButton
        v-for="note in store.notes"
        :key="note.id"
        @click="setSelected(note.id)"
      >
        <span
          class="app-note-list__note"
        >
          {{ note.title }}
        </span>
      </AppButton>
    </div>

  </div>
</template>

<script lang="ts" setup>

import { onMounted } from 'vue';
import { useNoteStore } from '@/stores/useNoteStore';
import AppButton from '@/components/app-button/App-Button.vue';

const store = useNoteStore();

const setSelected = (noteId: number) => {
  store.$patch({
    selectedNoteId: noteId,
  });
};

onMounted(async () => {
  await store.fetchNotes();
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
