<script setup>
import { ref, computed, onMounted } from 'vue'

// componentes
import { NavLateralAdmin, TitleAdmin } from '@/components/index'
import FormField from '@/components/admin/form/FormField.vue'
import SelectField from '@/components/admin/form/SelectField.vue'

// stores
import { useItemAcervoStore } from '@/stores/useItemAcervoStore'
import { useMateriaPrimaStore } from '@/stores/useMateriaPrimaStore'
import { useSubtipoMateriaPrimaStore } from '@/stores/useSubtipoMateriaPrimaStore'
import { useColecaoStore } from '@/stores/useColecaoStore'
import { useLocalizacaoStore } from '@/stores/useLocalizacaoStore'

import { useRouter } from 'vue-router'

const router = useRouter()

// stores
const itemStore = useItemAcervoStore()
const materiaStore = useMateriaPrimaStore()
const subtipoStore = useSubtipoMateriaPrimaStore()
const colecaoStore = useColecaoStore()
const localizacaoStore = useLocalizacaoStore()

// carregar listas do backend
onMounted(async () => {
  await materiaStore.fetchAll()
  await subtipoStore.fetchAll()
  await colecaoStore.fetchAll()
  await localizacaoStore.fetchAll()
})

// opções fixas de estado de conservação (corrigido)
const estadoConservacaoOptions = [
  { nome: "Ótimo", id: "otimo" },
  { nome: "Bom", id: "bom" },
  { nome: "Regular", id: "regular" },
  { nome: "Ruim", id: "ruim" }
]

// form com campos do BACKEND
const form = ref({
  numero_acervo: '',
  titulo: '',
  colecao: null,
  materia_prima: null,
  subtipo_materia_prima: null,
  procedencia_origem: '',
  datacao_de: '',
  datacao_ate: '',
  estado_conservacao: null,
  localizacao_fisica: null,
  descricao: '',
  observacoes: '',
})

// filtrar subtipos pela matéria-prima
const subtiposFiltrados = computed(() =>
  subtipoStore.items.filter(
    (s) => s.materia_prima.id === form.value.materia_prima
  )
)

const salvarItem = async () => {
  try {
    console.log("===== DADOS ENVIADOS =====")
    console.log(JSON.stringify(form.value, null, 2))

    const novoItem = await itemStore.create(form.value)
    console.log('Item cadastrado:', novoItem)

    router.push('/dashboard/cadastro-imagem')
  } catch (error) {
    console.error("===== ERRO COMPLETO =====")
    console.log(error.response?.data)
    console.log(error)

    alert('Erro ao cadastrar o item.')
  }
}
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <NavLateralAdmin />

    <main class="bg-white flex-1 p-10 overflow-auto">
      <TitleAdmin title="Cadastro de Acervo" subtitle="Preencha as informações do item" />

      <div class="w-full h-px bg-gray-300 my-6"></div>

      <!-- FORM GRID -->
      <form class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-8">
        
        <FormField label="Número do acervo" v-model="form.numero_acervo" />

        <FormField label="Título / nome" v-model="form.titulo" />

        <SelectField
          label="Coleção"
          :items="colecaoStore.items"
          item-label="nome"
          item-value="id"
          v-model="form.colecao"
        />

        <SelectField
          label="Matéria-prima"
          :items="materiaStore.items"
          item-label="nome"
          item-value="id"
          v-model="form.materia_prima"
        />

        <SelectField
          label="Subtipo"
          :items="subtiposFiltrados"
          item-label="nome"
          item-value="id"
          v-model="form.subtipo_materia_prima"
        />

        <FormField label="Procedência / origem" v-model="form.procedencia_origem" />

        <FormField label="Datação (início)" type="date" v-model="form.datacao_de" />

        <FormField label="Datação (fim)" type="date" v-model="form.datacao_ate" />

        <SelectField
          label="Estado de conservação"
          :items="estadoConservacaoOptions"
          item-label="nome"
          item-value="id"
          v-model="form.estado_conservacao"
        />

        <SelectField
          label="Localização física"
          :items="localizacaoStore.items"
          item-label="nome"
          item-value="id"
          v-model="form.localizacao_fisica"
        />
      </form>

      <div class="w-full h-px bg-gray-300 my-10"></div>

      <!-- DESCRIÇÃO -->
      <div class="mb-8">
        <label class="text-sm font-medium">Descrição</label>
        <textarea
          v-model="form.descricao"
          rows="4"
          class="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        ></textarea>
      </div>

      <!-- OBSERVAÇÕES -->
      <div class="mb-10">
        <label class="text-sm font-medium">Observações</label>
        <textarea
          v-model="form.observacoes"
          rows="3"
          class="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        ></textarea>
      </div>

      <button
        @click="salvarItem"
        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
      >
        Cadastrar
      </button>
    </main>
  </div>
</template>

<style scoped>
main::-webkit-scrollbar {
  width: 10px;
}
main::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
</style>
