import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css';

const Menu = { template: '<div>Home</div>' };
const Stoklar = { template: '<div>Stoklar</div>' };
const test = { template: '<div>Menu</div>' };
const test2 = { template: '<div>test2</div>' };
const test3 = { template: '<div>test3</div>' };
const test4 = { template: '<div>test4</div>' };

const routes = [
  { path: '/', component: Menu },
  { path: '/Stoklar', component: Stoklar },
  { path: '/a/b', component: test },
  { path: '/a/b/c', component: test2 },
  { path: '/a/b/c/d', component: test3 },
  { path: '/k', component: test4 },
];

const app = createApp(App);
app.use(router);
routes;
app.mount('#app');
