<template>
  <div class="app-error__wrapper">
    <p class="app-error__title">{{ error.statusCode }}</p>
    <p class="app-error__text">{{ error.message }}</p>
  </div>
</template>

<script lang="ts" setup>

import { ApiException } from '@/types/note';

defineProps<{error: ApiException}>();

</script>

<style lang="scss" scoped>
.app-error {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &__title {

  }
  &__text {

  }
}
</style>
