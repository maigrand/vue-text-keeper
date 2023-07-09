<template>
  <div class="app-note-list__wrapper">
    <div class="app-note-list__list">
      <button v-for="note in noteList" class="app-note-list__item" :key="note.id" @click="handleClick(note)" type="submit">
        <div class="app-note-list__title">{{ note.title }}</div>
      </button>
    </div>
  </div>
</template>

<script setup>

import { useRouter } from 'vue-router';

defineProps({
  noteList: {
    type: Array,
    required: true,
  },
});

const router = useRouter();

const handleClick = async (note) => {
  await router.push({
    name: 'note',
    params: {
      id: note.id,
    },
  });
};

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
