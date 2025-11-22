<script setup>
const props = defineProps({
  label: String,
  items: { type: Array, default: () => [] },
  itemLabel: { type: String, default: "nome" },
  itemValue: { type: String, default: "id" }
})

const model = defineModel()
</script>

<template>
  <div class="flex flex-col gap-1 w-full">
    <label class="text-sm font-medium text-gray-700">
      {{ props.label }}
    </label>

    <select
      v-model="model"
      class="border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
    >
      <!-- VALOR NULO PRA NÃO QUEBRAR O DRF -->
      <option disabled :value="null">Selecione...</option>

      <option
        v-for="item in props.items"
        :key="item[props.itemValue]"
        :value="item[props.itemValue]"
      >
        {{ item[props.itemLabel] }}
      </option>
    </select>
  </div>
</template>
