<script setup>
import { ref, onMounted } from 'vue'

// stores
import { useMovimentacaoItemStore } from '@/stores/useMovimentacaoItemStore'
import { useItemAcervoStore } from '@/stores/useItemAcervoStore'
import { useLocalizacaoStore } from '@/stores/useLocalizacaoStore'

// componentes
import { NavLateralAdmin, TitleAdmin } from '@/components/index'

import SelectField from '@/components/admin/form/SelectField.vue'

// stores
const movimentacaoStore = useMovimentacaoItemStore()
const itemStore = useItemAcervoStore()
const localStore = useLocalizacaoStore()

// tipos fixos
const tipos = [
  { label: "Entrada", value: "entrada" },
  { label: "Saída", value: "saida" },
  { label: "Realocação", value: "realocacao" },
  { label: "Retorno", value: "retorno" }
]

// formulário
const form = ref({
  tipo: "",
  item: null,
  localAnterior: null,
  localNovo: null,
  motivo: "",
})

// buscar dados do backend
onMounted(async () => {
  await Promise.all([
    itemStore.fetchAll(),
    localStore.fetchAll()
  ])
})

// função de envio
const registrarMovimentacao = async () => {
  if (!form.value.tipo || !form.value.item) {
    alert("Preencha tipo e item obrigatórios")
    return
  }

  const payload = {
    tipo: form.value.tipo,
    item: form.value.item,
    localizacao_anterior: form.value.localAnterior,
    localizacao_nova: form.value.localNovo,
    motivo: form.value.motivo,
  }

  try {
    await movimentacaoStore.create(payload)
    alert("Movimentação registrada com sucesso!")
    form.value = { tipo: "", item: null, localAnterior: null, localNovo: null, motivo: "" }
  } catch (err) {
    alert("Erro ao registrar movimentação")
    console.error(err)
  }
}
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <NavLateralAdmin />

    <main class="bg-white flex-1 p-10 overflow-auto">
      <div class="w-full max-w-7xl mx-auto">
        <TitleAdmin
          title="Cadastro de Movimentação"
          subtitle="Preencha as informações da movimentação"
          class="mb-6"
        />

        <div class="w-full h-px bg-gray-300 mb-10"></div>

        <form class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">

          <!-- Tipo e Item -->
          <SelectField
            label="Tipo de Movimentação"
            :items="tipos"
            v-model="form.tipo"
            item-value="value"
            item-label="label"
          />

          <SelectField
            label="Item"
            :items="itemStore.items"
            v-model="form.item"
            item-value="id"
            item-label="numero_acervo"
          />

          <!-- Localizações -->
          <SelectField
            label="Localização Anterior"
            :items="localStore.items"
            v-model="form.localAnterior"
            item-value="id"
            item-label="nome"
          />

          <SelectField
            label="Localização Nova"
            :items="localStore.items"
            v-model="form.localNovo"
            item-value="id"
            item-label="nome"
          />

        </form>

        <div class="w-full h-px bg-gray-300 my-10"></div>

        <div class="mb-10">
          <label class="text-sm font-medium text-gray-700">Motivo</label>
          <textarea
            v-model="form.motivo"
            rows="4"
            class="w-full border border-gray-300 rounded-xl px-4 py-3 mt-1 bg-gray-50
            focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600 transition"
          ></textarea>
        </div>

        <div class="flex justify-center mt-8">
          <button
            type="button"
            @click="registrarMovimentacao"
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
