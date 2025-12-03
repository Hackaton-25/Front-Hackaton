<script setup>
defineProps({
  title: String,
  subtitle: String,
  value: [String, Number],
  percentage: String,
  color: { type: String, default: 'bg-emerald-500' },
  icon: String,
  link: String, // necessário para o botão
})
</script>

<template>
  <div
    class="bg-white rounded-2xl shadow-md border border-gray-100 p-5 flex flex-col justify-between transition min-w-[325px] hover:shadow-lg"
  >
    <!-- Topo -->
    <div class="flex items-center justify-between">
      <h3 class="font-semibold text-gray-700 text-base flex items-center gap-2">
        <img v-if="icon" :src="icon" :alt="title" class="w-6 h-6" />
        {{ title }}
      </h3>

      <button
        v-if="link"
        class="text-black-400 text-sm hover:text-black-800 flex items-center gap-1 transition"
        @click="$router.push(link)"
      >
        <span>Ver mais</span>
        <img src="@/assets/img/left-chevron.png" alt="Seta Esquerda" class="w-4 h-4 rotate-180" />
      </button>
    </div>

    <!-- Valor principal -->
    <p class="text-3xl font-bold text-gray-800 mt-3">
      {{ value }}
    </p>

    <!-- Subtítulo -->
    <p v-if="subtitle" class="text-sm text-gray-500 mt-1">{{ subtitle }}</p>
  </div>
</template>

<style scoped>
/* Você pode adicionar efeitos adicionais de hover ou responsividade aqui */
</style>
