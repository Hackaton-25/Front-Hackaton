import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import HomeVisitanteView from '@/views/ViewVisitante/HomeVisitanteView.vue'
import ColecoesVisitanteView from '@/views/ViewVisitante/ColecoesVisitanteView.vue'
import ConsultaVisitanteView from '@/views/ViewVisitante/ConsultaVisitanteView.vue'
import ItemView from '@/views/ViewVisitante/ItemView.vue'
import ColecaoDetalheView from '@/views/ViewVisitante/ColecaoDetalheView.vue'

/* --- META DE RESOURCES (para títulos e labels) --- */
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
      { key: "colecao.nome", label: "Coleção" } // Nested support
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
      { key: "coletor.nome", label: "Coletor" } // Nested support
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
      { key: "item.titulo", label: "Item do Acervo" } // Nested support
    ],
    cadastroRoute: "cadastro-movimentacao"
  },
  subtipo: {
    singular: "Subtipo",
    plural: "Subtipos",
    acaoSingular: "Subtipo",
    columns: [
      { key: "nome", label: "Nome" },
      { key: "materia_prima.nome", label: "Matéria Prima" } // Nested key now
    ],
    cadastroRoute: "cadastro-subtipo"
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
    { path: '/visitante/item/:id', component: ItemView },
    { path: '/visitante/colecao/:id', component: ColecaoDetalheView },
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

        /* ROTA COM ID DO ITEM PARA IMAGENS */
        {
          path: 'cadastro-imagem/:id',
          name: 'cadastro-imagem-id',
          component: () => import('@/views/ViewAdmin/CadastroImagem.vue'),
          props: true,
        },

        /* ROTA ANTIGA SEM ID (opcional) */
        {
          path: 'cadastro-imagem',
          name: 'cadastro-imagem',
          component: () => import('@/views/ViewAdmin/CadastroImagem.vue'),
        },
           {
          path: 'cadastro-subtipo',
          name: 'cadastro-subtipo',
          component: () => import('@/views/ViewAdmin/CadastroSubtiposView.vue'),
        },
      ]
    },
  ],
})

export default router
