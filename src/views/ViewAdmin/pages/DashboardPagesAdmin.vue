<script setup>
import { defineProps, ref, onMounted, watch, computed } from "vue";
import { storeToRefs } from "pinia";

/* Components */
import {
  NavLateralAdmin,
  TitleAdmin,
  ButtonActionAdmin,
  InfoCardAdmin,
  TablePagesAdmin,
} from "@/components/index";

/* Stores */
import { useItemAcervoStore } from "@/stores/useItemAcervoStore";
import { useColecaoStore } from "@/stores/useColecaoStore";
import { useMovimentacaoItemStore } from "@/stores/useMovimentacaoItemStore";
import { useSubtipoMateriaPrimaStore } from "@/stores/useSubtipoMateriaPrimaStore";
import { useDashboardTitleStore } from "@/stores";

/* Props */
const props = defineProps({
  resource: String,
  pageTitle: String,
  actions: Object,
  columns: { type: Array, default: () => [] },
});

/* UI fallback */
const addLabelFallback = "Cadastrar";
const dropdownOptions = [];
const imageEstatisca = null;

/* Titles */
const dashboardTitleStore = useDashboardTitleStore();

/* Map de stores permitidos */
const storesMap = {
  itens: useItemAcervoStore,
  colecoes: useColecaoStore,
  movimentacoes: useMovimentacaoItemStore,
  subtipo: useSubtipoMateriaPrimaStore,
};

/* Instância atual do store */
const store = ref(null);
const storeRefs = ref(null);

/* InfoCard dinâmico */
const infoCardTitle = computed(() => props.pageTitle || "");
const infoCardValue = ref("—");
const infoCardSubtitle = ref("");

/* Carrega store correto conforme resource */
function loadStore(resource) {
  const factory = storesMap[resource];

  if (!factory) {
    console.error(`[DashboardPagesAdmin] Store não encontrado para resource: ${resource}`);
    store.value = null;
    storeRefs.value = null;
    infoCardValue.value = "—";
    infoCardSubtitle.value = "";
    return;
  }

  store.value = factory();
  storeRefs.value = storeToRefs(store.value);
}

/* Recarrega dados do store com proteção contra falhas e countItems() */
async function loadData() {
  try {
    if (store.value?.fetchAll) {
      await store.value.fetchAll().catch(err => {
        console.error(`[DashboardPagesAdmin] fetchAll error for ${props.resource}:`, err);
      });

      // usa countItems() seguro
      const count = typeof store.value.countItems === "function" ? store.value.countItems() : 0;
      infoCardValue.value = `${count} ${props.pageTitle || "Itens"}`;
      infoCardSubtitle.value = new Date().toISOString();
    } else {
      infoCardValue.value = "—";
      infoCardSubtitle.value = "";
    }
  } catch (err) {
    console.error("[DashboardPagesAdmin] Erro ao carregar dados:", err);
    infoCardValue.value = "—";
    infoCardSubtitle.value = "";
  }
}

/* Inicialização */
loadStore(props.resource);
onMounted(loadData);

/* Quando resource trocar → troca store e recarrega */
watch(
  () => props.resource,
  async (newRes, oldRes) => {
    if (newRes === oldRes) return;
    loadStore(newRes);
    await loadData();
  }
);

/* Atualiza InfoCard sempre que items mudar */
watch(
  () => storeRefs.value?.items?.value,
  () => {
    const count = typeof store.value?.countItems === "function" ? store.value.countItems() : 0;
    infoCardValue.value = `${count} ${props.pageTitle || "Itens"}`;
    infoCardSubtitle.value = new Date().toISOString();
  }
);

/* Handlers da tabela */
const onEdit = (item) => store.value?.editItem?.(item);
const onSave = async (item) => store.value?.saveItem ? await store.value.saveItem(item) : null;
const onDelete = async (item) => store.value?.deleteItem ? await store.value.deleteItem(item?.id) : null;
const onPageChange = async (page) => store.value?.setCurrentPage?.(page) ?? store.value?.fetchAll?.(page);

/* Botão de adicionar */
function handleAddClick() {
  const addRoute = props.actions?.addRoute;
  if (addRoute) window.location.href = addRoute;
}
</script>

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
            :subtitle="infoCardSubtitle
              ? `Atualizado às ${new Date(infoCardSubtitle).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
              : 'Atualizando...'"
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
