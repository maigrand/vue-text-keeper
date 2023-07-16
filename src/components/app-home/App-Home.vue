<template>
  <div class="app-home__wrapper">

    <div class="app-home__header">
      <span v-if="userStore.currentUserEmail">
        Current user:
        <router-link to="user">{{ userStore.currentUserEmail }}</router-link>
      </span>
    </div>

    <div class="app-home__body">

      <div class="app-home__left-menu">
        <span>Notes</span>
        <input
          v-model="newNoteTitle"
          @keydown.enter="handleAddNote"
          type="text"
        />
        //@TODO: search by name
        <AppNoteList />
      </div>

      <div v-if="noteStore.selectedNoteId" class="app-home__content">
        <AppNote />
      </div>

    </div>

    <AppError v-if="noteStore.storeApiError" :error="noteStore.storeApiError" />
    <AppError v-if="userStore.storeApiError" :error="userStore.storeApiError" />

  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import AppError from '@/components/app-error/App-Error.vue';
import AppNoteList from '@/components/app-note-list/App-Note-List.vue';
import AppNote from '@/components/app-note/App-Note.vue';
import { useNoteStore } from '@/stores/useNoteStore';
import { useUserStore } from '@/stores/useUserStore';

const noteStore = useNoteStore();
const userStore = useUserStore();
const newNoteTitle = ref<string | null>(null);

const handleAddNote = () => {
  noteStore.addNote(newNoteTitle.value);
  newNoteTitle.value = null;
};

onMounted(async () => {
  await userStore.fetchUser();
});
</script>

<style lang="scss" scoped>
.app-home {
  &__wrapper {
    display: flex;
    flex-direction: column;
  }
  &__header {
    width: 100%;
    height: 5vh;
    background-color: #424242;
  }
  &__body {
    width: 100%;
    height: 95vh;
    background-color: #424232;
    display: grid;
    grid-template-columns: 1fr 12fr;
  }
  &__left-menu {
    background-color: #121212;
  }
  &left-menu__item {

  }
}
</style>
