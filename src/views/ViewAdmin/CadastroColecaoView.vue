<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Componentes Admin
import { NavLateralAdmin, TitleAdmin } from '@/components/index'

// Componentes de formulário
import FormField from '@/components/admin/form/FormField.vue'
import SelectField from '@/components/admin/form/SelectField.vue'

// Stores
import { useColecaoStore } from '@/stores/useColecaoStore'
import { useColetorStore } from '@/stores/useColetorStore'

const router = useRouter()
const colecaoStore = useColecaoStore()
const coletorStore = useColetorStore()

const form = ref({
  nome: '',
  descricao: '',
  coletor: null,
})

// Carregar coletores ao montar o componente
onMounted(() => {
  coletorStore.fetchAll()
})

async function cadastrar() {
  try {
    // Garantir que coletor seja enviado como ID
    const payload = {
      ...form.value,
      coletor_id: Number(form.value.coletor)  // <-- enviar coletor_id
    }

    console.log('Payload enviado:', payload)
    await colecaoStore.create(payload)

    router.push('/dashboard')
  } catch (e) {
    console.error('Erro ao cadastrar coleção:', e)
  }
}
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <NavLateralAdmin />

    <main class="bg-white flex-1 p-10 overflow-auto">
      <div class="w-full">
        <TitleAdmin
          title="Cadastro de Coleção"
          subtitle="Preencha as informações da coleção"
          class="mb-6"
        />

        <div class="w-full h-px bg-gray-300 mb-10"></div>

        <form class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-8" @submit.prevent="cadastrar">

          <FormField label="Nome da coleção" v-model="form.nome" />

          <SelectField
            label="Coletor / Colecionador"
            :items="coletorStore.items"
            itemLabel="nome"
            itemValue="id"
            v-model="form.coletor"
          />

        </form>

        <div class="w-full h-px bg-gray-300 my-10"></div>

        <div class="mb-10">
          <label class="text-sm font-medium text-gray-700">Descrição</label>
          <textarea
            v-model="form.descricao"
            rows="4"
            class="w-full border border-gray-300 rounded-xl px-4 py-3 mt-1 bg-gray-50
            focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600 transition"
          ></textarea>
        </div>

        <div class="flex justify-center">
          <button
            type="button"
            @click="cadastrar"
            class="px-10 py-3 rounded-xl text-white font-semibold shadow-md
              bg-blue-600 hover:bg-blue-700 transition-all active:scale-95"
          >
            Cadastrar
          </button>
        </div>

      </div>
    </main>
  </div>
</template>
