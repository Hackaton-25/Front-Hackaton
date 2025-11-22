<template>
  <div class="w-full  p-4 ">
    <apexchart
      width="100%"
      height="320"
      type="pie"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const series = ref([1, 1, 0, 1, 1, 0]);

const chartOptions = ref({
  labels: ["Coleção Arqueológica", "aaaaaaa", "aaaaaaa", "asasasa", "sasasasa", "teste"],
  colors: [
    "#DBEAFE", // Azul bem claro (equivalente ao blue-100)
    "#93C5FD", // Azul claro (blue-300)
    "#3B82F6", // Azul médio (blue-500)
    "#1D4ED8", // Azul base — blue-700 (o que você pediu)
    "#1E40AF", // Azul escuro (blue-800)
  ],
});
</script>
