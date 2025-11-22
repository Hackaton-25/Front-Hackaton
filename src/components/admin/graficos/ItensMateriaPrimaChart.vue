<template>
  <div class="w-full  p-4 rounded-xl ">
    <apexchart
      width="100%"
      height="320"
      type="bar"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

// Exemplo — substitua pelos dados reais depois
const series = ref([
  {
    name: "Quantidade",
    data: [1, 1, 1, 1],
  },
]);

const chartOptions = ref({
  chart: { id: "materia-prima" },
  xaxis: {
    categories: ["Animal", "Vegetal", "Mineral", "Outro"],
  },
  plotOptions: {
    bar: { horizontal: true },
  },
  colors: [
    "#1D4ED8", // Azul principal (bg-blue-700)
  ],
  fill: {
    colors: [
      "#1D4ED8", // Garante que todas as barras fiquem no mesmo tom
    ],
  },
});
</script>
