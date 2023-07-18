import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/router/routes';

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const keeperToken = localStorage.getItem("KEEPER_TOKEN");
  if (!keeperToken && to.path !== '/auth') {
    next({
      name: 'auth',
    });
  } else {
    next();
  }
});
