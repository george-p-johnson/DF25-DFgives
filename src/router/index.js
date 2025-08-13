import { createRouter, createWebHistory } from 'vue-router';
import Leaderboard from '../components/Leaderboard.vue';
import Admin from '../components/Admin.vue';

const routes = [
  { path: '/', component: Leaderboard },
  { path: '/admin', component: Admin }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

