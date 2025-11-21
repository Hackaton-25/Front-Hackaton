import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'

/* --- META DE RESOURCES (para títulos e labels) --- */
const resourceMetaMap = {
  itens: {
    singular: "Item",
    plural: "Itens",
    acaoSingular: "Item do Acervo",
    columns: [
      { key: "titulo", label: "Título" },
      { key: "procedencia_origem", label: "Procedência" },
    ],
  },
  colecoes: {
    singular: "Coleção",
    plural: "Coleções",
    acaoSingular: "Coleção",
    columns: [
      { key: "nome", label: "Nome" },
      { key: "descricao", label: "Descrição" },
    ],
  },
  movimentacoes: {
    singular: "Movimentação",
    plural: "Movimentações",
    acaoSingular: "Movimentação",
    columns: [
      { key: "tipo", label: "Tipo" },
      { key: "motivo", label: "Motivo" },
    ],
  },
}

/* ---- FACTORY DE ROTA DO DASHBOARD ---- */
const dashboardPage = (resource) => ({
  path: resource,
  name: resource,
  component: () => import('@/views/ViewAdmin/pages/DashboardPagesAdmin.vue'),
  props: () => {
    const meta = resourceMetaMap[resource]

    return {
      resource,
      pageTitle: meta.plural,
      columns: meta.columns,   // <<<<<< AQUI AS COLUMNS FINAIS
      actions: {
        addRoute: `/dashboard/${resource}/cadastrar`,
        addLabel: `Cadastrar Nova ${meta.acaoSingular}`,
      },
    }
  },
})

/* ---- ROTAS ---- */
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

        // --- Páginas dinâmicas --- //
        dashboardPage('itens'),
        dashboardPage('colecoes'),
        dashboardPage('movimentacoes'),
      ]
    }
  ],
})

export default router
