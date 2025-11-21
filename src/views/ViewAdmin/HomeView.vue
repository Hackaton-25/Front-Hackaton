<script setup>
import { onMounted, computed } from 'vue'

import {
  NavLateralAdmin,
  TitleAdmin,
} from '@/components/index'
</script>

<template>
  <div class="flex">
    <NavLateralAdmin />

    <main class="flex-1 p-6 space-y-6 overflow-hidden">
      <TitleAdmin
        title="Painel Administrativo"
        subtitle="Veja um resumo do que há cadastrado no Sistema"
      />
    </main>
  </div>
</template>

<style scoped>
.hide-scrollbar {
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>