<template>
  <div class="app-home__wrapper">
    <router-link class="app-home__link" to="/notes">notes</router-link>
    <div v-if="profileState.data" class="app-home__profile">
      <p>Current user: {{ profileState.data.email }}</p>
    </div>
    <div v-if="profileState.error">
      <AppError :error="profileState.error" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { Profile, ProfileState } from '@/components/app-home/types';
import { useRequest } from '@/hooks/useRequest';
import AppError from '@/components/app-error/App-Error.vue';

const profileState = reactive<ProfileState>({
  data: null,
  error: null,
});

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
    align-items: center;
    justify-content: center;
  }
  &__link {
    margin-bottom: 20px;
  }
}
</style>
