<script setup>
import { computed, ref } from 'vue'
import { ViewModalAdmin, ConfirmDeleteModal } from '@/components/index'

const props = defineProps({
  resource: { type: String, required: true },
  title: { type: String, default: '' },
  columns: { type: Array, default: () => [] },
  items: { type: Array, default: () => [] },
  colecoes: { type: Array, default: () => [] },
  itens: { type: Array, default: () => [] },
  responsaveis: { type: Array, default: () => [] },
  localizacoes: { type: Array, default: () => [] },
  currentPage: { type: Number, default: 1 },
  totalPages: { type: Number, default: 1 },
})

const emit = defineEmits(['page-change', 'edit', 'view', 'delete', 'save'])

// filtros e estado de modais
const filtro = ref('')
const selectedItem = ref(null)
const showEditModal = ref(false)
const showViewModal = ref(false)
const showDeleteModal = ref(false)
const itemToDelete = ref(null)

// Utils
const generateKey = (item) => item?.id ?? `k_${Math.random().toString(36).slice(2)}_${Date.now()}`

// Função genérica para exibir valores, tratando objetos e datas ISO
const displayValue = (item, key) => {
  if (!item) return '—'
  const value = item[key]
  if (value === null || value === undefined) return '—'

  if (typeof value === 'object') return value.nome ?? value.titulo ?? '—'
  if (typeof value === 'string' && value.includes('T')) return value.split('T')[0]
  return String(value)
}

// Lista filtrada
const itemsList = computed(() => {
  const base = Array.isArray(props.items) ? props.items.filter(Boolean) : []
  if (!filtro.value) return base
  const needle = filtro.value.toLowerCase()
  return base.filter(item =>
    props.columns.some(col =>
      displayValue(item, col.key).toLowerCase().includes(needle)
    )
  )
})

// Ações
const openEdit = (item) => {
  selectedItem.value = item
  showEditModal.value = true
  emit('edit', item)
}
const openView = (item) => {
  selectedItem.value = item
  showViewModal.value = true
  emit('view', item)
}
const openDeleteModal = (item) => {
  itemToDelete.value = item
  showDeleteModal.value = true
}
const confirmDelete = () => {
  emit('delete', itemToDelete.value)
  showDeleteModal.value = false
}

// Títulos dos modais
const resourceNames = {
  colecoes: 'Coleções',
  itens: 'Itens',
  movimentacoes: 'Movimentações',
  subtipo: 'Subtipos'
}
const modalTitle = computed(() => resourceNames[props.resource] ?? props.resource)

</script>

<template>
  <div class="bg-white rounded-2xl shadow-md p-5 w-full min-h-[475px]">

    <!-- Filtro e título -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold text-gray-800">{{ title }}</h2>
      <input v-model="filtro" placeholder="Filtrar..." class="border rounded px-3 py-1 text-sm" />
    </div>

    <!-- Tabela -->
    <div class="overflow-x-auto">
      <table class="w-full text-sm border-separate min-w-[600px]" style="border-spacing: 0 6px">
        <thead>
          <tr class="text-gray-500 border-b border-gray-200">
            <th class="py-2 px-3 text-center font-semibold w-[60px]">#</th>
            <th v-for="col in props.columns" :key="col.key" class="py-2 px-3 text-center font-semibold">{{ col.label }}</th>
            <th class="py-2 px-3 text-center font-semibold w-[140px]">Administração</th>
          </tr>
        </thead>
        <transition-group tag="tbody" name="fade-slide">
          <tr v-for="item in itemsList" :key="generateKey(item)" class="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg">
            <td class="py-2 text-center text-gray-700 rounded-l-lg">{{ item?.id ?? '—' }}</td>
            <td v-for="col in props.columns" :key="col.key" class="py-2 text-center text-gray-800">
              {{ displayValue(item, col.key) }}
            </td>
            <td class="py-2 text-center rounded-r-lg">
              <div class="flex justify-center items-center gap-3">
                <button @click="openEdit(item)">
                  <img class="p-1 bg-yellow-400 w-7 rounded" src="@/assets/img/icons/edit.svg" />
                </button>
                <button @click="openDeleteModal(item)">
                  <img class="p-1 bg-red-600 w-7 rounded" src="@/assets/img/icons/delete.svg" />
                </button>
                <button @click="openView(item)">
                  <img class="p-1 bg-teal-500 w-7 rounded" src="@/assets/img/icons/view.svg" />
                </button>
              </div>
            </td>
          </tr>
        </transition-group>
      </table>
    </div>

    <div v-if="itemsList.length === 0" class="text-center text-gray-400 mt-4 italic">Nenhum registro encontrado.</div>

    <!-- Paginação -->
    <div v-if="props.totalPages > 1" class="flex justify-center items-center mt-6 space-x-2">
      <button @click="emit('page-change', props.currentPage - 1)" :disabled="props.currentPage === 1" class="px-3 py-1 rounded-lg border">Anterior</button>
      <span class="px-3 py-1 text-gray-800">Página {{ props.currentPage }} de {{ props.totalPages }}</span>
      <button @click="emit('page-change', props.currentPage + 1)" :disabled="props.currentPage === props.totalPages" class="px-3 py-1 rounded-lg border">Próxima</button>
    </div>

    <!-- Modais -->
    <ViewModalAdmin
      :show="showViewModal"
      :item="selectedItem"
      :dataKey="props.resource"
      :modalTitle="modalTitle"
      :colecoes="colecoes"
      :itens="itens"
      :responsaveis="responsaveis"
      :localizacoes="localizacoes"
      @close="showViewModal = false"
      @save="emit('save', $event)"
    />
    <ViewModalAdmin
      :show="showEditModal"
      :item="selectedItem"
      :dataKey="props.resource"
      :modalTitle="modalTitle"
      :startEditing="true"
      :colecoes="colecoes"
      :itens="itens"
      :responsaveis="responsaveis"
      :localizacoes="localizacoes"
      @close="showEditModal = false"
      @save="emit('save', $event)"
    />
    <ConfirmDeleteModal
      :show="showDeleteModal"
      :item="itemToDelete"
      :title="`Excluir ${modalTitle}`"
      @close="showDeleteModal = false"
      @confirm="confirmDelete"
    />
  </div>
</template>

<style>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
