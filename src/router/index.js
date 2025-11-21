import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/dashboard',
      name: 'admin',
      meta: { requiresAdmin: true },
      children: [
        {
          path: '',
          name: 'Painel Administrativo',
          component: () => import('@/views/ViewAdmin/HomeView.vue'),
        },
      ],
    },
    {
      path: '/cadastro-item',
      name: 'Cadastro de Itens (debug)',
      component: () => import('@/views/ViewAdmin/CadastroItemView.vue'),
    },
  ],
})

export default router
