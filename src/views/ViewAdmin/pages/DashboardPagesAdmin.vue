<template>
  <div class="flex">
    <NavLateralAdmin />

    <main class="flex-1 p-6 space-y-6 overflow-hidden">
      <!-- Título e subtítulo do dashboard -->
      <TitleAdmin :title="dashboardTitleStore.title" :subtitle="dashboardTitleStore.subtitle" />

      <!-- Cards e ações -->
      <div class="flex w-full justify-center items-center">
        <div class="flex flex-[0.9] gap-6 justify-between items-center">
          <ButtonActionAdmin
            :acao="props.actions.addLabel"
            :showDropdown="!!props.actions.dropdown"
            :options="dropdownOptions"
            @click="handleAddClick"
          />

          <InfoCardAdmin class="min-w-[400px] "
            :icon="imageEstatisca"
            :title="infoCardTitle"
            :value="infoCardValue"
            :subtitle="infoCardSubtitle"
          />
        </div>
      </div>

      <!-- Tabela de itens -->
      <div class="flex w-full justify-center items-center">
        <div class="flex-[0.9]">
<TablePagesAdmin
  :resource="resource"
  :columns="props.columns"
  :items="store.items"
  :currentPage="store.currentPage"
  :totalPages="store.totalPages"
  :loading="loading"
  @edit="store.editItem"
  @delete="store.deleteItem"
  @save="store.saveItem"
  @page-change="store.setCurrentPage"
/>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { storeToRefs } from 'pinia'

// IMPORTA TODOS OS STORES
import { useItemAcervoStore } from '@/stores/useItemAcervoStore'
import { useColecaoStore } from '@/stores/useColecaoStore'
import { useMovimentacaoItemStore } from '@/stores/useMovimentacaoItemStore'

import {
  NavLateralAdmin,
  TitleAdmin,
  ButtonActionAdmin,
  InfoCardAdmin,
  TablePagesAdmin,
} from '@/components/index'

import { useDashboardTitleStore } from '@/stores'

const dashboardTitleStore = useDashboardTitleStore()


// ----- PROPS -----
const props = defineProps({
  resource: String,
  pageTitle: String,
  actions: Object,
})

// ----- MAPEAMENTO DO STORE PELO RESOURCE -----
const storesMap = {
  itens: useItemAcervoStore,
  colecoes: useColecaoStore,
  movimentacoes: useMovimentacaoItemStore,
}

const storeFactory = storesMap[props.resource]

if (!storeFactory) {
  console.error(`Store não encontrado para resource: ${props.resource}`)
}

const store = storeFactory()
const { items, currentPage, totalPages, loading } = storeToRefs(store)

</script>

