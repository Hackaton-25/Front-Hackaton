<template>
  <div class="flex">
    <NavLateralAdmin />

    <main class="flex-1 p-6 space-y-6 overflow-hidden">
      <!-- Título da página -->
      <TitleAdmin
        :title="dashboardTitleStore.title"
        :subtitle="dashboardTitleStore.subtitle"
      />

      <!-- Ações + InfoCard -->
      <div class="flex w-full justify-center items-center">
        <div class="flex flex-[0.9] gap-6 justify-between items-center">
          <ButtonActionAdmin
            :acao="props.actions?.addLabel || addLabelFallback"
            :showDropdown="!!props.actions?.dropdown"
            :options="dropdownOptions"
            @click="handleAddClick"
          />

          <InfoCardAdmin
            class="min-w-[400px]"
            :icon="imageEstatisca"
            :title="infoCardTitle"
            :value="infoCardValue"
            :subtitle="infoCardSubtitle"
          />
        </div>
      </div>

      <!-- Tabela central -->
      <div class="flex w-full justify-center items-center">
        <div class="flex-[0.9]">
          <TablePagesAdmin
            v-if="store && storeRefs && storeRefs.items"
            :resource="props.resource"
            :columns="props.columns"
            :items="storeRefs.items"
            :title="dashboardTitleStore.tableTitle"
            :currentPage="storeRefs.currentPage"
            :totalPages="storeRefs.totalPages"
            :loading="storeRefs.loading"
            @edit="onEdit"
            @delete="onDelete"
            @save="onSave"
            @page-change="onPageChange"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
/* Vue / Pinia */
import { defineProps, ref, onMounted, watch } from "vue"
import { storeToRefs } from "pinia"

/* Components */
import {
  NavLateralAdmin,
  TitleAdmin,
  ButtonActionAdmin,
  InfoCardAdmin,
  TablePagesAdmin,
} from "@/components/index"

/* Stores */
import { useItemAcervoStore } from "@/stores/useItemAcervoStore"
import { useColecaoStore } from "@/stores/useColecaoStore"
import { useMovimentacaoItemStore } from "@/stores/useMovimentacaoItemStore"
import { useDashboardTitleStore } from "@/stores"

/* Props */
const props = defineProps({
  resource: String,
  pageTitle: String,
  actions: Object,
  columns: { type: Array, default: () => [] },
})

/* UI fallback */
const addLabelFallback = "Cadastrar"
const dropdownOptions = []
const imageEstatisca = null
const infoCardTitle = props.pageTitle || ""
const infoCardValue = "—"
const infoCardSubtitle = ""

/* Titles */
const dashboardTitleStore = useDashboardTitleStore()

/* Map de stores permitidos */
const storesMap = {
  itens: useItemAcervoStore,
  colecoes: useColecaoStore,
  movimentacoes: useMovimentacaoItemStore,
}

/* Instância atual do store */
const store = ref(null)
const storeRefs = ref(null)

/* Carrega store correto conforme resource */
function loadStore(resource) {
  const factory = storesMap[resource]

  if (!factory) {
    console.error(
      `[DashboardPagesAdmin] Store não encontrado para resource: ${resource}`
    )
    store.value = null
    storeRefs.value = null
    return
  }

  store.value = factory()
  storeRefs.value = storeToRefs(store.value)
}

/* Recarrega dados do store */
async function loadData() {
  try {
    if (store.value?.fetchAll) {
      await store.value.fetchAll()
    }
  } catch (err) {
    console.error("[DashboardPagesAdmin] Erro ao carregar dados:", err)
  }
}

/* Inicialização */
loadStore(props.resource)
onMounted(loadData)

/* Quando resource trocar → troca store e recarrega */
watch(
  () => props.resource,
  async (newRes, oldRes) => {
    if (newRes === oldRes) return
    loadStore(newRes)
    await loadData()
  }
)

/* Handlers da tabela */
const onEdit = (item) => {
  if (typeof store.value?.editItem === "function") {
    store.value.editItem(item)
  } else {
    console.debug("[DashboardPagesAdmin] editItem não implementado", item)
  }
}

const onSave = async (item) => {
  if (!store.value) return

  if (typeof store.value.saveItem === "function") {
    return await store.value.saveItem(item)
  }

  if (typeof store.value.update === "function" && item?.id) {
    return await store.value.update(item.id, item)
  }

  console.debug("[DashboardPagesAdmin] saveItem/update não implementado", item)
}

const onDelete = async (item) => {
  if (!store.value) return
  const id = item?.id
  if (!id) return

  if (typeof store.value.deleteItem === "function") {
    return await store.value.deleteItem(id)
  }

  if (typeof store.value.remove === "function") {
    return await store.value.remove(id)
  }

  console.debug("[DashboardPagesAdmin] deleteItem/remove não implementado", item)
}

const onPageChange = async (page) => {
  if (!store.value) return

  if (typeof store.value.setCurrentPage === "function") {
    store.value.setCurrentPage(page)
  } else {
    await store.value.fetchAll?.(page)
  }
}

/* Botão de adicionar */
function handleAddClick() {
  const addRoute = props.actions?.addRoute
  if (addRoute) {
    window.location.href = addRoute
  } else {
    console.debug("[DashboardPagesAdmin] Nenhuma addRoute definida")
  }
}
</script>
