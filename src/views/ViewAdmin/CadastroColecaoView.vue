<script setup>
import { ref } from 'vue'

// componentes Admin
import { NavLateralAdmin, TitleAdmin } from '@/components/index'

// componentes de formulário
import FormField from '@/components/admin/form/FormField.vue'

const form = ref({
  nome: '',
  descricao: '',
  coletor: '',
})
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">

    <NavLateralAdmin />

    <!-- MAIN -->
    <main class="bg-white flex-1 p-10 overflow-auto">

      <div class="w-full">

        <TitleAdmin
          title="Cadastro de Coleção"
          subtitle="Preencha as informações da coleção"
          class="mb-6"
        />

        <!-- divisor -->
        <div class="w-full h-px bg-gray-300 mb-10"></div>

        <!-- FORM EM GRID -->
        <form class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-8">

          <FormField label="Nome da coleção" v-model="form.nome" />

          <FormField label="Coletor / Colecionador" v-model="form.coletor" />

        </form>

        <!-- divisor -->
        <div class="w-full h-px bg-gray-300 my-10"></div>

        <!-- DESCRIÇÃO -->
        <div class="mb-10">
          <label class="text-sm font-medium text-gray-700">Descrição</label>
          <textarea
            v-model="form.descricao"
            rows="4"
            class="w-full border border-gray-300 rounded-xl px-4 py-3 mt-1 bg-gray-50
            focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600 transition"
          ></textarea>
        </div>

        <!-- BOTÃO -->
        <div class="flex justify-center">
          <RouterLink
            to="/dashboard"
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
