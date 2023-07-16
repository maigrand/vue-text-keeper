<template>
  <div>
    User Page
    {{ store.currentUserEmail }}
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/useUserStore';

const store = useUserStore();

onMounted(async () => {
  await store.fetchUser();
});
</script>
