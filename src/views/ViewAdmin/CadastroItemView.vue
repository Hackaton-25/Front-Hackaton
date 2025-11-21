<script setup>
import { ref, computed } from 'vue'

// componentes do admin
import { NavLateralAdmin, TitleAdmin } from '@/components/index'

// componentes do formulário
import FormField from '@/components/admin/form/FormField.vue'
import SelectField from '@/components/admin/form/SelectField.vue'

const colecoes = ['Coleção A', 'Coleção B', 'Coleção C']
const materias = ['Animal', 'Vegetal', 'Mineral', 'Outro']

const subtipos = {
  Animal: ['Couro', 'Pena', 'Osso'],
  Vegetal: ['Madeira', 'Fibra', 'Papel'],
  Mineral: ['Metal', 'Cerâmica', 'Pedra'],
  Outro: ['Outro']
}

const form = ref({
  numero: '',
  titulo: '',
  colecao: '',
  materia: '',
  subtipo: '',
  procedencia: '',
  datacao: '',
  estado: '',
  localizacao: '',
  descricao: '',
  observacoes: ''
})

const subtipoAtual = computed(() => {
  return subtipos[form.value.materia] || []
})
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">

    <NavLateralAdmin />

    <!-- MAIN OCUPANDO TELA INTEIRA -->
    <main class="bg-white flex-1 p-10 overflow-auto">

      <div class="w-full">

        <TitleAdmin
          title="Cadastro de Acervo"
          subtitle="Preencha as informações do item"
          class="mb-6"
        />

        <!-- divisor -->
        <div class="w-full h-px bg-gray-300 mb-10"></div>

        <!-- FORM EM GRID -->
        <form class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-8">

          <FormField label="Número do acervo" v-model="form.numero" />
          <FormField label="Título / nome" v-model="form.titulo" />
          <SelectField label="Coleção" :items="colecoes" v-model="form.colecao" />

          <SelectField label="Matéria-prima" :items="materias" v-model="form.materia" />
          <SelectField label="Subtipo" :items="subtipoAtual" v-model="form.subtipo" />
          <FormField label="Procedência / origem" v-model="form.procedencia" />

          <FormField label="Datação" type="date" v-model="form.datacao" />
          <FormField label="Localização física" v-model="form.localizacao" />
          <FormField label="Estado de conservação" v-model="form.estado" />

        </form>

        <!-- divisor -->
        <div class="w-full h-px bg-gray-300 my-10"></div>

        <!-- DESCRIÇÃO -->
        <div class="mb-8">
          <label class="text-sm font-medium text-gray-700">Descrição</label>
          <textarea
            v-model="form.descricao"
            rows="4"
            class="w-full border border-gray-300 rounded-xl px-4 py-3 mt-1 bg-gray-50 
            focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600 transition"
          ></textarea>
        </div>

        <!-- OBSERVAÇÕES -->
        <div class="mb-10">
          <label class="text-sm font-medium text-gray-700">Observações</label>
          <textarea
            v-model="form.observacoes"
            rows="3"
            class="w-full border border-gray-300 rounded-xl px-4 py-3 mt-1 bg-gray-50 
            focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600 transition"
          ></textarea>
        </div>

        <!-- BOTÃO CENTRALIZADO -->
        <div class="flex justify-center">
          <RouterLink
            to="/dashboard/cadastro-imagem"
            class="px-10 py-3 rounded-xl text-white font-semibold shadow-md 
            bg-blue-600 hover:bg-blue-700 transition-all active:scale-95"
          >
            Cadastrar
          </RouterLink>
        </div>

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
