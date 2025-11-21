import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import CadastroImagem from '@/views/ViewAdmin/CadastroImagem.vue'

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
    {
    path: '/cadastro-imagem',
    name: 'CadastroImagem',
    component: CadastroImagem
  }
  ],
})

export default router
