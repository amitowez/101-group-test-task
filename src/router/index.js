import { createRouter, createWebHistory } from 'vue-router'

// Компоненты для маршрутов (замени на свои)
import tablesPage from '@/pages/tablesPage.vue'


// Определение маршрутов
const routes = [
  { path: '/', redirect: '/transactions' }, 
  {
    path: '/:entityType',
    name: 'EntityTable',
    component: tablesPage,
    props: true,
  },
  { path: '/:pathMatch(.*)*', redirect: '/transactions' },
];

// Создание экземпляра маршрутизатора
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;