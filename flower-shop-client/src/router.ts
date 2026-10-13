// src/router.ts
import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import FlowerManager from './components/FlowerManager.vue';

const routes = [
  { path: '/login', component: Login },
  { path: '/', component: FlowerManager },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Protect the root route if not logged in
router.beforeEach((to, _from, next) => {
  const isAuthenticated = !!localStorage.getItem('access_token');
  if (to.path !== '/login' && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;