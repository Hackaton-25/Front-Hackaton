import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import HomeVisitanteView from '@/views/ViewVisitante/HomeVisitanteView.vue'
import ColecoesVisitanteView from '@/views/ViewVisitante/ColecoesVisitanteView.vue'
import ConsultaVisitanteView from '@/views/ViewVisitante/ConsultaVisitanteView.vue'
import ItemView from '@/views/ViewVisitante/ItemView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   { path: '/visitante/homevisitante', component: HomeVisitanteView },
    { path: '/visitante/colecoes' , component: ColecoesVisitanteView },
    { path: '/visitante/consulta', component: ConsultaVisitanteView },
    { path: '/visitante/item/:id', component: ItemView },
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
      ]
    }
  ],
})

export default router
