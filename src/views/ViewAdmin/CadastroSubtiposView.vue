<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Componentes
import { NavLateralAdmin, TitleAdmin } from '@/components/index'
import FormField from '@/components/admin/form/FormField.vue'
import SelectField from '@/components/admin/form/SelectField.vue'

// Stores
import { useMateriaPrimaStore } from '@/stores/useMateriaPrimaStore'
import { useSubtipoMateriaPrimaStore } from '@/stores/useSubtipoMateriaPrimaStore'

const router = useRouter()
const materiaStore = useMateriaPrimaStore()
const subtipoStore = useSubtipoMateriaPrimaStore()

// Formulário reativo
const form = ref({
  nome: '',
  materia_prima: null
})

// Carregar listas no mounted
onMounted(async () => {
  try {
    await materiaStore.fetchAll()
    await subtipoStore.fetchAll()
  } catch (err) {
    console.error('Erro ao carregar listas:', err)
    alert('Erro ao carregar dados do formulário.')
  }
})

// Validação do formulário
const validar = () => {
  const erros = []
  if (!form.value.nome?.trim()) erros.push('Nome é obrigatório.')
  if (!form.value.materia_prima || isNaN(form.value.materia_prima)) erros.push('Selecione uma matéria-prima válida.')
  return erros
}

// Função de salvar subtipo
const salvarSubtipo = async () => {
  const erros = validar()
  if (erros.length) return alert(erros.join('\n'))

  const payload = {
    nome: form.value.nome.trim(),
    materia_prima: form.value.materia_prima // ID numérico já seguro
  }

  try {
    console.log('Payload antes de enviar:', payload)
    await subtipoStore.create(payload)
    router.push('/dashboard/subtipos')
  } catch (error) {
    console.error('Erro ao criar subtipo:', error.response?.data ?? error)
    alert('Erro ao cadastrar subtipo.')
  }
}
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <NavLateralAdmin />

    <main class="bg-white flex-1 p-10 overflow-auto">
      <TitleAdmin
        title="Cadastro de Subtipo"
        subtitle="Adicionar novo subtipo de matéria-prima"
      />

      <div class="w-full h-px bg-gray-300 my-6"></div>

      <form
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-8"
        @submit.prevent="salvarSubtipo"
      >
        <FormField label="Nome" v-model="form.nome" />

<SelectField
  label="Matéria-prima"
  :items="materiaStore.items"
  item-label="nome"
  item-value="id"
  v-model="form.materia_prima"
/>

      </form>

      <div class="w-full h-px bg-gray-300 my-10"></div>

      <div class="flex items-center gap-4">
        <button
          @click="salvarSubtipo"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
        >
          Cadastrar Subtipo
        </button>

        <button
          type="button"
          @click="router.push('/dashboard/subtipo')"
          class="px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
        >
          Voltar à lista
        </button>
      </div>
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
