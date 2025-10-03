import { createRouter, createWebHistory } from 'vue-router';
import Leaderboard from '../components/Leaderboard.vue';
import Admin from '../components/Admin.vue';
import CycleOne from '../components/CycleOne.vue';
import CycleTwo from '../components/CycleTwo.vue';


const routes = [
    { path: '/', name: 'Leaderboard', component: Leaderboard },
    { path: '/admin', name: 'Admin', component: Admin },
    { path: '/cycle1', name: 'CycleOne', component: CycleOne },
    { path: '/cycle2', name: 'CycleTwo', component: CycleTwo }

];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});



