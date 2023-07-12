<template>
  <div class="app-auth__wrapper">
    <div class="app-auth__container">
      <label class="app-auth__label">Email</label>
      <input v-model="emailData" type="text" class="app-auth__input">
      <label class="app-auth__label">Password</label>
      <input v-model="passwordData" type="password" class="app-auth__input">
      <div class="app-auth__buttons">
        <button class="app-auth__button" @click="handleLogin" type="submit">Login</button>
        <button class="app-auth__button" @click="handleRegister" type="submit">Register (W.I.P.)</button>
      </div>
    </div>
    <div v-if="error">
      <AppError :error="error" />
    </div>
  </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRequest } from '@/hooks/useRequest';
import { AuthRes } from '@/components/app-auth/types';
import { ApiException } from '@/types/commonTypes';
import AppError from '@/components/app-error/App-Error.vue';

const router = useRouter();

const emailData = ref<string>('');
const passwordData = ref<string>('');
const error = ref<ApiException | null>(null);

// @TODO: try catch
const handleLogin = async () => {
  const res = await useRequest<AuthRes>('/api/auth/signin', {
    email: emailData.value,
    password: passwordData.value,
  }, 'POST');

  if (res.data.value) {
    localStorage.setItem('KEEPER_TOKEN', res.data.value.token);
    await router.push({ name: 'home' });
  } else if (res.error.value) {
    error.value = res.error.value;
  }
};

// @TODO: try catch
const handleRegister = async () => {
  const res = await useRequest<AuthRes>('/api/auth/signup', {
    email: emailData.value,
    password: passwordData.value,
  }, 'POST');

  if (res.data.value) {
    localStorage.setItem('KEEPER_TOKEN', res.data.value.token);
    await router.push({ name: 'home' });
  }
};

</script>

<style lang="scss" scoped>
.app-auth {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__container {
    width: 280px;
    height: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #414345;
    border: 1px solid #414345;
    border-radius: 4px;
  }

  &__label {
    margin-bottom: 4px;
  }

  &__input {
    margin-bottom: 16px;
    padding: 8px;
    border: 1px solid #414345;
    border-radius: 4px;
    background: rgba(51, 6, 46, 0.4);
    width: 200px;
    outline: none;
    color: white;
  }

  &__button {
    margin-top: 44px;
    margin-left: 20px;
    padding: 8px;
    border: 1px solid #414345;
    border-radius: 4px;
    background: rgba(51, 6, 46, 0.4);
    color: white;
    width: 80px;
    cursor: pointer;
  }
}
</style>
