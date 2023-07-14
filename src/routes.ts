import AppHome from '@/components/app-home/App-Home.vue';
import AppAuth from '@/components/app-auth/App-Auth.vue';

export const routes = [
  {
    path: '/',
    name: 'home',
    component: AppHome,
  },
  {
    path: '/auth',
    name: 'auth',
    component: AppAuth,
  },
];
