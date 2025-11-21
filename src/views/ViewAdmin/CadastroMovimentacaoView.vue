<script setup>
import { ref } from 'vue'

// componentes do admin
import { NavLateralAdmin, TitleAdmin } from '@/components/index'

// componentes do formulário
import FormField from '@/components/admin/form/FormField.vue'
import SelectField from '@/components/admin/form/SelectField.vue'

// opções
const tipos = ["Entrada", "Saída", "Realocação", "Retorno"]
const itens = ["Item A", "Item B", "Item C"] // Você trocará pelos itens reais

const form = ref({
  tipo: "",
  item: "",
  localAnterior: "",
  localNovo: "",
  motivo: "",
})
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">

    <NavLateralAdmin />

    <!-- MAIN -->
    <main class="bg-white flex-1 p-10 overflow-auto">

      <div class="w-full max-w-7xl mx-auto">

        <!-- TÍTULO -->
        <TitleAdmin
          title="Cadastro de Movimentação"
          subtitle="Preencha as informações da movimentação"
          class="mb-6"
        />

        <!-- divisor -->
        <div class="w-full h-px bg-gray-300 mb-10"></div>

        <!-- FORM EM GRID -->
        <form class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">

          <!-- LINHA 1 -->
          <SelectField label="Tipo de Movimentação" :items="tipos" v-model="form.tipo" />
          <SelectField label="Item" :items="itens" v-model="form.item" />

          <!-- LINHA 2 -->
          <FormField label="Localização Anterior" v-model="form.localAnterior" />
          <FormField label="Localização Nova" v-model="form.localNovo" />

        </form>

        <!-- divisor -->
        <div class="w-full h-px bg-gray-300 my-10"></div>

        <!-- MOTIVO (linha inteira) -->
        <div class="mb-10">
          <label class="text-sm font-medium text-gray-700">Motivo</label>
          <textarea
            v-model="form.motivo"
            rows="4"
            class="w-full border border-gray-300 rounded-xl px-4 py-3 mt-1 bg-gray-50
            focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600 transition"
          ></textarea>
        </div>

        <!-- BOTÃO -->
        <div class="flex justify-center mt-8">
          <button
            class="px-10 py-3 rounded-xl text-white font-semibold shadow-md
            bg-blue-600 hover:bg-blue-700 transition-all active:scale-95"
          >
            Registrar Movimentação
          </button>
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
