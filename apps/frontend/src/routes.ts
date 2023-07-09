// @TODO: как роутов будет больше, разнести их по папкам

import AppHome from '@/components/app-home/App-Home.vue';
import AppAuth from '@/components/app-auth/App-Auth.vue';
import AppNote from '@/components/app-note/App-Note.vue';

export const routes = [
  { path: '/', name: 'home', component: AppHome },
  { path: '/:id', name: 'note', component: AppNote },
  { path: '/auth', name: 'auth', component: AppAuth },
];
