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

const series = ref([45, 20, 13, 8, 5]);

const chartOptions = ref({
  labels: ["Coleção A", "Coleção B", "Coleção C", "Coleção D", "Coleção E"],
  colors: [
    "#DBEAFE", // Azul bem claro (equivalente ao blue-100)
    "#93C5FD", // Azul claro (blue-300)
    "#3B82F6", // Azul médio (blue-500)
    "#1D4ED8", // Azul base — blue-700 (o que você pediu)
    "#1E40AF", // Azul escuro (blue-800)
  ],
});
</script>
