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
      component: HomeView
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
        {
          path: 'itens',
          name: 'Itens',
          component: () => import('@/views/ViewAdmin/pages/DashboardPagesAdmin.vue'),
          props: {
            pageTitle: 'Itens',
            dataKey: 'itens',
            actions: {
              addRoute: '/dashboard/itens/cadastrar',
              addLabel: 'Cadastrar Novo Item',
              infoCardValue: '21 Itens Cadastrados',
              infoCardSubtitle: 'Total de itens disponíveis no sistema',
            },
            columns: [
              { key: 'titulo', label: 'Nome' },
              { key: 'estado_conservacao', label: 'Estado de Conservação' },
              { key: 'localizacao', label: 'Localização' },
            ],
          }
        },
      ]
    }
  ],
})

export default router
