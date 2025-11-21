import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'

const dashboardPage = (resource) => ({
  path: resource,
  name: resource,
  component: () => import('@/views/ViewAdmin/pages/DashboardPagesAdmin.vue'),
  props: (route) => ({
    resource, // “itens”, “colecoes”, “movimentacoes”
    pageTitle: resource.charAt(0).toUpperCase() + resource.slice(1),
    actions: {
      addRoute: `/dashboard/${resource}/cadastrar`,
      addLabel: `Cadastrar Novo ${resource.slice(0, -1)}`,
    },
    // você pode gerar automaticamente colunas depois
  }),
})

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
          component: () => import('@/views/ViewAdmin/HomeView.vue')
        },

        // ---- ROTAS ADMIN DINÂMICAS ---- //
        dashboardPage('itens'),
        dashboardPage('colecoes'),
        dashboardPage('movimentacoes'),
      ]
    }
  ],
})

export default router
