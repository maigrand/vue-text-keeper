import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/routes';
import App from './App.vue';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const keeperToken = localStorage.getItem("KEEPER_TOKEN");
  if (!keeperToken && to.path !== '/auth') {
    next({
      name: 'auth',
    });
    // next({
    //   path: '/auth',
    //   params: { nextUrl: to.fullPath },
    // });
  } else {
    next();
  }
});

createApp(App)
  .use(router)
  .mount('#app');
