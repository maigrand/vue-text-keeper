import AppHome from '@/components/app-home/App-Home.vue';
import AppAuth from '@/components/app-auth/App-Auth.vue';
import AppUser from '@/components/app-user/App-User.vue';

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
  {
    path: '/user',
    name: 'user',
    component: AppUser,
  },
];
