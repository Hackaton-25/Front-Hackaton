<template>
  <div class="flex flex-col gap-1 w-full">
    <label class="text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      :type="type"
      v-model="model"
      class="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
    />
  </div>
</template>

<script setup>

import { computed } from 'vue'

const props = defineProps({
  label: String,
  type: { type: String, default: "text" },
  modelValue: String
});

const emit = defineEmits(["update:modelValue"]);
const model = computed({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v)
});
</script>
