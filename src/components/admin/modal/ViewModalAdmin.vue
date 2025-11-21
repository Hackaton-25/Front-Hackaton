<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  item: Object,
  dataKey: String, // colecoes | itens | movimentacoes
  modalTitle: String,
  startEditing: Boolean,
})

const emit = defineEmits(['close', 'save'])

const isEditing = ref(false)
const editedItem = ref({})

watch(
  () => props.show,
  (open) => {
    if (!open) {
      isEditing.value = false
      return
    }
    isEditing.value = props.startEditing
    editedItem.value = JSON.parse(JSON.stringify(props.item))
  }
)

const toggleEdit = () => {
  if (!isEditing.value) {
    editedItem.value = JSON.parse(JSON.stringify(props.item))
  } else {
    emit('save', editedItem.value)
  }
  isEditing.value = !isEditing.value
}

const cancelEdit = () => {
  editedItem.value = JSON.parse(JSON.stringify(props.item))
  isEditing.value = false
}
</script>

<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl p-8 w-[700px] max-h-[90vh] overflow-y-auto relative">

        <!-- Close button -->
        <button
          @click="$emit('close')"
          class="absolute top-3 right-3 bg-gray-300 hover:bg-gray-400 p-2 rounded-full"
        >
          ✕
        </button>

        <!-- Header -->
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">
            {{ modalTitle }}
          </h2>

          <div class="flex gap-3">
            <button
              v-if="isEditing"
              @click="cancelEdit"
              class="px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              Cancelar
            </button>

            <button
              @click="toggleEdit"
              class="px-4 py-2 rounded-lg text-white"
              :class="isEditing ? 'bg-green-600' : 'bg-blue-600'"
            >
              {{ isEditing ? 'Salvar' : 'Editar' }}
            </button>
          </div>
        </div>

        <!-- COLEÇÕES -->
        <template v-if="dataKey === 'colecoes'">
          <div class="space-y-4">

            <div>
              <span class="font-semibold">Nome: </span>
              <template v-if="!isEditing">{{ item.nome }}</template>
              <template v-else>
                <input v-model="editedItem.nome" class="border px-2 py-1 rounded w-full" />
              </template>
            </div>

            <div>
              <span class="font-semibold">Descrição: </span>
              <template v-if="!isEditing">{{ item.descricao }}</template>
              <template v-else>
                <textarea v-model="editedItem.descricao" class="border px-2 py-1 rounded w-full"></textarea>
              </template>
            </div>

            <div>
              <span class="font-semibold">Coletor: </span>
              <span v-if="!isEditing">{{ item.coletor?.nome ?? '—' }}</span>
              <input
                v-else
                v-model="editedItem.coletor"
                class="border px-2 py-1 rounded w-full"
                placeholder="ID do coletor"
              />
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
              <span v-if="!isEditing">{{ item.colecao?.nome ?? '—' }}</span>
              <input
                v-else
                v-model="editedItem.colecao"
                class="border px-2 py-1 rounded w-full"
                placeholder="ID da colecao"
              />
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
              <span v-if="!isEditing">{{ item.item?.titulo ?? '—' }}</span>
              <input
                v-else
                v-model="editedItem.item"
                class="border px-2 py-1 rounded w-full"
                placeholder="ID do item"
              />
            </div>

            <div>
              <span class="font-semibold">Localização anterior:</span>
              <span v-if="!isEditing">{{ item.localizacao_anterior?.nome ?? '—' }}</span>
              <input v-else v-model="editedItem.localizacao_anterior" class="border px-2 py-1 rounded w-full" />
            </div>

            <div>
              <span class="font-semibold">Localização nova:</span>
              <span v-if="!isEditing">{{ item.localizacao_nova?.nome ?? '—' }}</span>
              <input v-else v-model="editedItem.localizacao_nova" class="border px-2 py-1 rounded w-full" />
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
