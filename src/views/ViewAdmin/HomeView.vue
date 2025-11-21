<script setup>
import { onMounted, computed } from 'vue'

import {
  NavLateralAdmin,
  TitleAdmin,
  InfoCardAdmin
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
              <div class="flex overflow-x-auto hide-scrollbar">
          <div class="flex  gap-6 w-full px-2" style="scroll-snap-type: x mandatory">
            <div
              v-for="card in [
                {
                  title: 'Usuários',
                  value: `20 Clientes`,
                  subtitle: '30 minutos atrás',
                  icon: imageUser,
                  link: '/itens',
                },
                {
                  title: 'Serviços',
                  value: `15 Serviços`,
                  subtitle: '1 hora atrás',
                  icon: imageServices,
                  link: '/movimentacoes',
                },
                {
                  title: 'Pedidos',
                  value: `45 Pedidos`,
                  subtitle: '15 minutos atrás',
                  icon: imageOrders,
                  link: '/colecoes',
                },
              ]"
              :key="card.title"
              class="py-2 flex-shrink-0 flex-1 scroll-snap-align-start"
            >
              <InfoCardAdmin
                :title="card.title"
                :value="card.value"
                :subtitle="card.subtitle
                  ? `Atualizado às ${new Date(card.subtitle).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                  : 'Atualizando...'"
                :icon="card.icon"
                :color="card.color"
                :link="card.link"
              />
            </div>
          </div>
        </div>
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