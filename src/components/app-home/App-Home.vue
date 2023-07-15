<template>
  <div class="app-home__wrapper">

    <div class="app-home__header">
      <span v-if="profileState.data">Current user: {{ profileState.data.email }}</span>
    </div>

    <div class="app-home__body">

      <div class="app-home__left-menu">
        <input
          v-model="newNoteTitle"
          @keydown.enter="handleAddNote"
          type="text"
        />
        //@TODO: search by name
        <AppNoteList />
      </div>

      <div v-if="store.selectedNoteId" class="app-home__content">
        <AppNote />
      </div>

    </div>

    <AppError v-if="profileState.error" :error="profileState.error" />
    <AppError v-if="store.storeApiError" :error="store.storeApiError" />

  </div>
</template>

<script lang="ts" setup>
import {
  onMounted, reactive, ref,
} from 'vue';
import { Profile, ProfileState } from '@/components/app-home/types';
import { useRequest } from '@/hooks/useRequest';
import AppError from '@/components/app-error/App-Error.vue';
import AppNoteList from '@/components/app-note-list/App-Note-List.vue';
import AppNote from '@/components/app-note/App-Note.vue';
import { useNoteStore } from '@/stores/useNoteStore';

const profileState: ProfileState = reactive({
  data: null,
  error: null,
});

const store = useNoteStore();
const newNoteTitle = ref<string | null>(null);

const handleAddNote = () => {
  store.addNote(newNoteTitle.value);
  newNoteTitle.value = null;
};

onMounted(async () => {
  const { data, error } = await useRequest<Profile>('/api/profile');
  if (data.value) {
    profileState.data = data.value;
  } else if (error.value) {
    profileState.error = error.value;
  }
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
