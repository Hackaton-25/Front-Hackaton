import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import HomeVisitanteView from '@/views/ViewVisitante/HomeVisitanteView.vue'
import ColecoesVisitanteView from '@/views/ViewVisitante/ColecoesVisitanteView.vue'
import ConsultaVisitanteView from '@/views/ViewVisitante/ConsultaVisitanteView.vue'

/* --- META DE RESOURCES (para títulos e labels) --- */
const resourceMetaMap = {
  itens: {
    singular: "Item",
    plural: "Itens",
    acaoSingular: "Item do Acervo",
    columns: [
      { key: "titulo", label: "Título" },
      { key: "procedencia_origem", label: "Procedência" },
      { key: "estado_conservacao", label: "Estado de Conservação" },
      { key: "colecao", label: "Coleção" } // sem format
    ],
    cadastroRoute: "cadastro-item"
  },
  colecoes: {
    singular: "Coleção",
    plural: "Coleções",
    acaoSingular: "Coleção",
    columns: [
      { key: "nome", label: "Nome" },
      { key: "descricao", label: "Descrição" },
      { key: "coletor", label: "Coletor" } // sem format
    ],
    cadastroRoute: "cadastro-colecao"
  },
  movimentacoes: {
    singular: "Movimentação",
    plural: "Movimentações",
    acaoSingular: "Movimentação",
    columns: [
      { key: "tipo", label: "Tipo" },
      { key: "motivo", label: "Motivo" },
      { key: "data_movimentacao", label: "Data da Movimentação" },
      { key: "item", label: "Item do Acervo" } // sem format
    ],
  },
  subtipo: {
    singular: "subtipo",
    plural: "Subtipos",
    acaoSingular: "Subtipo",
    columns: [
      { key: "nome", label: "Nome" },
      { key: "materia_prima", label: "Matéria Prima" } // sem format
    ],
    cadastroRoute: "cadastro-movimentacao"
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
      columns: meta.columns,

      actions: {
        addRoute: `/dashboard/${meta.cadastroRoute}`,
        addLabel: `Cadastrar Nova ${meta.acaoSingular}`,
      },
    }
  },
})

/* ---- ROTAS ---- */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
     { path: '/visitante/homevisitante', component: HomeVisitanteView },
    { path: '/visitante/colecoes' , component: ColecoesVisitanteView },
    { path: '/visitante/consulta', component: ConsultaVisitanteView },
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

    /* --- DASHBOARD ADMIN --- */
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
        dashboardPage('subtipo'),
        dashboardPage('itens'),
        dashboardPage('colecoes'),
        dashboardPage('movimentacoes'),

        /* CADASTROS DIRETOS */
        {
          path: 'cadastro-item',
          name: 'cadastro-item',
          component: () => import('@/views/ViewAdmin/CadastroItemView.vue'),
        },
        {
          path: 'cadastro-colecao',
          name: 'cadastro-colecao',
          component: () => import('@/views/ViewAdmin/CadastroColecaoView.vue'),
        },
        {
          path: 'cadastro-movimentacao',
          name: 'cadastro-movimentacao',
          component: () => import('@/views/ViewAdmin/CadastroMovimentacaoView.vue'),
        },

        /* --- ROTA NOVA COM ID DO ITEM --- */
        {
          path: 'cadastro-imagem/:id',
          name: 'cadastro-imagem-id',
          component: () => import('@/views/ViewAdmin/CadastroImagem.vue'),
          props: true,
        },

        /* (opcional) rota antiga — pode remover depois */
        {
          path: 'cadastro-imagem',
          name: 'cadastro-imagem',
          component: () => import('@/views/ViewAdmin/CadastroImagem.vue'),
        },
      ]
    },
  ],
})

export default router
