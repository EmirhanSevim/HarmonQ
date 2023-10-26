import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Stoklar from '../views/Stoklar.vue';
import 'material-icons/iconfont/material-icons.css';

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Stoklar',
    name: 'Stoklar',
    component: Stoklar,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
