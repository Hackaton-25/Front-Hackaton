<script setup>
import { computed, ref, watch } from 'vue'
import { ViewModalAdmin, ConfirmDeleteModal } from '@/components/index'

const props = defineProps({
  resource: { type: String, required: true },
  title: { type: String, default: '' },
  columns: { type: Array, default: () => [] },
  items: { type: Array, default: () => [] },
  currentPage: { type: Number, default: 1 },
  totalPages: { type: Number, default: 1 },
  itemsPerPage: { type: Number, default: 10 },
  loading: { type: Boolean, default: false },
})

const emit = defineEmits(['page-change', 'edit', 'view', 'delete', 'save'])

// state
const filtro = ref('')
const selectedItem = ref(null)
const showEditModal = ref(false)
const showViewModal = ref(false)
const showDeleteModal = ref(false)
const itemToDelete = ref(null)

// safe generate key
function generateKey(item) {
  return item?.id ?? `k_${Math.random().toString(36).slice(2)}_${Date.now()}`
}

// computed columns and data
const primaryColumn = computed(() => props.columns?.[0] ?? { key: 'id', label: 'ID' })
const otherColumns = computed(() => (props.columns?.length ? props.columns.slice(1) : []))

// computed filtered list (filters and removes falsy entries)
const itemsList = computed(() => {
  const base = Array.isArray(props.items) ? props.items.filter(Boolean) : []
  if (!filtro.value) return base
  const needle = filtro.value.toLowerCase()
  return base.filter((item) =>
    otherColumns.value.concat(primaryColumn.value).some((col) =>
      String(item?.[col.key] ?? '').toLowerCase().includes(needle)
    )
  )
})

// watch props.items for debug (optional)
watch(() => props.items, (v) => {
  // useful debug: uncomment if needed
  // console.debug('[TablePagesAdmin] items updated:', v)
})

// actions
const openEdit = (item) => {
  if (!item) return
  selectedItem.value = { ...item }
  showEditModal.value = true
  emit('edit', item)
}

const openView = (item) => {
  if (!item) return
  selectedItem.value = item
  showViewModal.value = true
  emit('view', item)
}

const openDeleteModal = (item) => {
  if (!item) return
  itemToDelete.value = item
  showDeleteModal.value = true
}

const confirmDelete = () => {
  if (!itemToDelete.value) return
  emit('delete', itemToDelete.value)
  showDeleteModal.value = false
}

const modalTitle = computed(() => props.resource?.charAt(0).toUpperCase() + props.resource?.slice(1))
</script>

<template>
  <div class="bg-white rounded-2xl shadow-md p-5 w-full min-h-[475px]">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold text-gray-800">{{ title }}</h2>
      <input v-model="filtro" type="text" placeholder="Filtrar..." class="border rounded px-3 py-1 text-sm" />
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-sm border-separate min-w-[600px]" style="border-spacing: 0 6px">
        <thead>
          <tr class="text-gray-500 border-b border-gray-200">
            <th class="py-2 px-3 text-center font-semibold w-[60px]">#</th>
            <th class="py-2 px-3 text-left font-semibold">{{ primaryColumn.label }}</th>

            <th v-for="col in otherColumns" :key="col.key" class="py-2 px-3 text-center font-semibold">
              {{ col.label }}
            </th>

            <th class="py-2 px-3 text-center font-semibold w-[140px]">Administração</th>
          </tr>
        </thead>

        <transition-group tag="tbody" name="fade-slide">
          <tr v-for="item in itemsList" :key="generateKey(item)" class="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg">
            <td class="py-2 text-center text-gray-700 rounded-l-lg">{{ item?.id ?? '—' }}</td>

            <td class="py-2 text-left font-medium text-gray-700">{{ item?.[primaryColumn.key] ?? '—' }}</td>

            <td v-for="col in otherColumns" :key="col.key" class="py-2 text-center text-gray-800">
              {{ item?.[col.key] ?? '—' }}
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

    <div v-if="totalPages > 1" class="flex justify-center items-center mt-6 space-x-2">
      <button @click="emit('page-change', currentPage - 1)" :disabled="currentPage === 1" class="px-3 py-1 rounded-lg border">Anterior</button>
      <span class="px-3 py-1 text-gray-800">Página {{ currentPage }} de {{ totalPages }}</span>
      <button @click="emit('page-change', currentPage + 1)" :disabled="currentPage === totalPages" class="px-3 py-1 rounded-lg border">Próxima</button>
    </div>

    <!-- Modais -->
    <ViewModalAdmin :show="showViewModal" :item="selectedItem" :dataKey="resource" :modalTitle="modalTitle" @close="showViewModal = false" />
    <ViewModalAdmin :show="showEditModal" :item="selectedItem" :dataKey="resource" :modalTitle="modalTitle" :startEditing="true" @close="showEditModal = false" @save="emit('save', $event)" />
    <ConfirmDeleteModal :show="showDeleteModal" :item="itemToDelete" :title="`Excluir ${modalTitle}`" @close="showDeleteModal = false" @confirm="confirmDelete" />
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
