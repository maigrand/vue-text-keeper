<template>
  <div class="app-auth__wrapper">
    <div class="app-auth__container">
      <span style="margin-bottom: 16px">(root root)</span>
      <label class="app-auth__label">Email</label>
      <input v-model="emailData" @keydown.enter="handleLogin" type="text" class="app-auth__input">
      <label class="app-auth__label">Password</label>
      <input v-model="passwordData" @keydown.enter="handleLogin" type="password" class="app-auth__input">
      <div class="app-auth__buttons">
        <button class="app-auth__button" @click="handleLogin" type="submit">Login</button>
        <!--        <button class="app-auth__button" @click="handleRegister" type="submit">Register (W.I.P.)</button>-->
      </div>
    </div>
    <AppError v-if="store.storeApiError" :error="store.storeApiError" />
  </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/useUserStore';
import AppError from '@/components/app-error/App-Error.vue';

const store = useUserStore();
const router = useRouter();

const emailData = ref<string>('');
const passwordData = ref<string>('');

const handleLogin = async () => {
  await store.signin(emailData.value, passwordData.value);
  await router.push({ name: 'home' });
};

// // @TODO: try catch
// const handleRegister = async () => {
//   const res = await useRequest<AuthRes>('/api/auth/signup', {
//     email: emailData.value,
//     password: passwordData.value,
//   }, 'POST');
//
//   if (res.data.value) {
//     localStorage.setItem('KEEPER_TOKEN', res.data.value.token);
//     await router.push({ name: 'home' });
//   }
// };

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
