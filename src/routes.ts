import AppHome from '@/components/app-home/App-Home.vue';
import AppNoteList from '@/components/app-note-list/App-Note-List.vue';
import AppNote from '@/components/app-note/App-Note.vue';
import AppAuth from '@/components/app-auth/App-Auth.vue';
export const routes = [
  {
    path: '/',
    name: 'home',
    component: AppHome,
  },
  {
    path: '/notes',
    name: 'noteList',
    component: AppNoteList,
  },
  {
    path: '/notes/:id',
    name: 'note',
    component: AppNote,
  },
  {
    path: '/auth',
    name: 'auth',
    component: AppAuth,
  },
];
