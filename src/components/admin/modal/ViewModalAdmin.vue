<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  show: Boolean,
  item: Object,
  dataKey: String,
  modalTitle: String,
  startEditing: Boolean,
  colecoes: Array,
  itens: Array,
  responsaveis: Array,
  localizacoes: Array,
})

const emit = defineEmits(['close', 'save'])

const isEditing = ref(false)
const editedItem = ref({})

// Computed para garantir que IDs estejam sempre mapeados corretamente
const mappedItem = computed(() => {
  if (!props.item) return {}
  return {
    ...props.item,
    coletorId: props.item.coletor?.id ?? null,
    colecaoId: props.item.colecao?.id ?? null,
    itemId: props.item.item?.id ?? null,
    localizacaoAnteriorId: props.item.localizacao_anterior?.id ?? null,
    localizacaoNovaId: props.item.localizacao_nova?.id ?? null,
  }
})

watch(
  () => props.show,
  (open) => {
    if (!open) {
      isEditing.value = false
      return
    }
    isEditing.value = props.startEditing
    editedItem.value = JSON.parse(JSON.stringify(mappedItem.value))
  }
)

const toggleEdit = () => {
  if (!isEditing.value) {
    editedItem.value = JSON.parse(JSON.stringify(mappedItem.value))
  } else {
    emit('save', { ...editedItem.value })
    emit('close')
  }
  isEditing.value = !isEditing.value
}

const cancelEdit = () => {
  editedItem.value = JSON.parse(JSON.stringify(mappedItem.value))
  isEditing.value = false
}
</script>

<template>
  <transition name="fade">
    <div v-if="show" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-8 w-[700px] max-h-[90vh] overflow-y-auto relative">

        <!-- Close button -->
        <button
          @click="$emit('close')"
          class="absolute top-3 right-3 bg-gray-300 hover:bg-gray-400 py-1 px-2 rounded-full"
        >✕</button>

        <!-- Header -->
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">{{ modalTitle }}</h2>
          <div class="flex gap-3 pr-4">
            <button
              v-if="isEditing"
              @click="cancelEdit"
              class="px-4 py-2 bg-red-600 text-white rounded-lg"
            >Cancelar</button>
            <button
              @click="toggleEdit"
              class="px-4 py-2 rounded-lg text-white"
              :class="isEditing ? 'bg-green-600' : 'bg-blue-600'"
            >{{ isEditing ? 'Salvar' : 'View' }}</button>
          </div>
        </div>

        <!-- COLEÇÕES -->
        <template v-if="dataKey === 'colecoes'">
          <div class="space-y-4">
            <div>
              <span class="font-semibold">Nome: </span>
              <template v-if="!isEditing">{{ item.nome }}</template>
              <input v-else v-model="editedItem.nome" class="border px-2 py-1 rounded w-full" />
            </div>
            <div>
              <span class="font-semibold">Descrição: </span>
              <template v-if="!isEditing">{{ item.descricao }}</template>
              <textarea v-else v-model="editedItem.descricao" class="border px-2 py-1 rounded w-full"></textarea>
            </div>
            <div>
              <span class="font-semibold">Coletor: </span>
              <template v-if="!isEditing">{{ item.coletor?.nome ?? '—' }}</template>
              <select v-else v-model="editedItem.coletorId" class="border px-2 py-1 rounded w-full">
                <option v-for="r in responsaveis" :key="r.id" :value="r.id">{{ r.nome }}</option>
              </select>
            </div>
          </div>
        </template>

        <!-- ITEM ACERVO -->
        <template v-if="dataKey === 'itens'">
          <div class="space-y-4">
            <div>
              <span class="font-semibold">Número de acervo:</span>
              <template v-if="!isEditing">{{ item.numero_acervo }}</template>
              <input v-else v-model="editedItem.numero_acervo" class="border px-2 py-1 rounded w-full" />
            </div>
            <div>
              <span class="font-semibold">Título:</span>
              <template v-if="!isEditing">{{ item.titulo }}</template>
              <input v-else v-model="editedItem.titulo" class="border px-2 py-1 rounded w-full" />
            </div>
            <div>
              <span class="font-semibold">Coleção:</span>
              <template v-if="!isEditing">{{ item.colecao?.nome ?? '—' }}</template>
              <select v-else v-model="editedItem.colecaoId" class="border px-2 py-1 rounded w-full">
                <option v-for="c in colecoes" :key="c.id" :value="c.id">{{ c.nome }}</option>
              </select>
            </div>
            <div>
              <span class="font-semibold">Procedência / Origem:</span>
              <template v-if="!isEditing">{{ item.procedencia_origem }}</template>
              <input v-else v-model="editedItem.procedencia_origem" class="border px-2 py-1 rounded w-full" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <span class="font-semibold">Datação de:</span>
                <template v-if="!isEditing">{{ item.datacao_de ?? '—' }}</template>
                <input type="date" v-else v-model="editedItem.datacao_de" class="border px-2 py-1 rounded w-full" />
              </div>
              <div>
                <span class="font-semibold">Datação até:</span>
                <template v-if="!isEditing">{{ item.datacao_ate ?? '—' }}</template>
                <input type="date" v-else v-model="editedItem.datacao_ate" class="border px-2 py-1 rounded w-full" />
              </div>
            </div>
            <div>
              <span class="font-semibold">Estado de Conservação:</span>
              <template v-if="!isEditing">{{ item.estado_conservacao }}</template>
              <select v-else v-model="editedItem.estado_conservacao" class="border px-2 py-1 rounded w-full">
                <option value="excelente">Excelente</option>
                <option value="bom">Bom</option>
                <option value="regular">Regular</option>
                <option value="ruim">Ruim</option>
                <option value="pessimo">Péssimo</option>
                <option value="restaurado">Restaurado</option>
              </select>
            </div>
          </div>
        </template>

        <!-- MOVIMENTAÇÃO -->
        <template v-if="dataKey === 'movimentacoes'">
          <div class="space-y-4">
            <div>
              <span class="font-semibold">Tipo:</span>
              <template v-if="!isEditing">{{ item.tipo }}</template>
              <select v-else v-model="editedItem.tipo" class="border px-2 py-1 rounded w-full">
                <option value="entrada">Entrada</option>
                <option value="saida">Saída</option>
                <option value="realocacao">Realocação</option>
                <option value="retorno">Retorno</option>
              </select>
            </div>
            <div>
              <span class="font-semibold">Item:</span>
              <template v-if="!isEditing">{{ item.item?.titulo ?? '—' }}</template>
              <select v-else v-model="editedItem.itemId" class="border px-2 py-1 rounded w-full">
                <option v-for="i in itens" :key="i.id" :value="i.id">{{ i.titulo }}</option>
              </select>
            </div>
            <div>
              <span class="font-semibold">Localização anterior:</span>
              <template v-if="!isEditing">{{ item.localizacao_anterior?.nome ?? '—' }}</template>
              <select v-else v-model="editedItem.localizacaoAnteriorId" class="border px-2 py-1 rounded w-full">
                <option v-for="l in localizacoes" :key="l.id" :value="l.id">{{ l.nome }}</option>
              </select>
            </div>
            <div>
              <span class="font-semibold">Localização nova:</span>
              <template v-if="!isEditing">{{ item.localizacao_nova?.nome ?? '—' }}</template>
              <select v-else v-model="editedItem.localizacaoNovaId" class="border px-2 py-1 rounded w-full">
                <option v-for="l in localizacoes" :key="l.id" :value="l.id">{{ l.nome }}</option>
              </select>
            </div>
            <div>
              <span class="font-semibold">Motivo:</span>
              <template v-if="!isEditing">{{ item.motivo }}</template>
              <textarea v-else v-model="editedItem.motivo" class="border px-2 py-1 rounded w-full"></textarea>
            </div>
          </div>
        </template>

      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
