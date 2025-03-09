import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import ProductList from '../views/ProductList.vue';
import ProductForm from '../views/ProductForm.vue';
import Login from '../views/Login.vue';

const routes = [
  { path: '/', component: Home, meta: { requiresAuth: true } },
  { path: '/products', component: ProductList, meta: { requiresAuth: true } },
  { path: '/product/:id?', component: ProductForm, meta: { requiresAuth: true } },
  { path: '/login', component: Login }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
