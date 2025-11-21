<script setup>
import {
  NavLateralAdmin,
  TitleAdmin,
  InfoCardAdmin
} from '@/components/index'

// novos imports dos componentes de gráfico
import ItensMateriaPrimaChart from '@/components/admin/graficos/ItensMateriaPrimaChart.vue'
import ItensPorColecaoChart from '@/components/admin/graficos/ItensPorColecaoChart.vue'
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
                title: 'Itens',
                value: `20 Itens`,
                subtitle: '30 minutos atrás',
                icon: imageUser,
                link: '/itens',
              },
              {
                title: 'Coleções',
                value: `15 Coleções`,
                subtitle: '1 hora atrás',
                icon: imageServices,
                link: '/colecoes',
              },
              {
                title: 'movimentacoes',
                value: `45 Pedidos`,
                subtitle: '15 minutos atrás',
                icon: imageOrders,
                link: '/movimentacoes',
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

      <!-- ====== BLOCOS DOS GRÁFICOS ====== -->
      <section>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white p-4 rounded-xl shadow">
            <h3 class="text-sm font-medium mb-3">Itens por Matéria-Prima</h3>
            <ItensMateriaPrimaChart />
          </div>

          <div class="bg-white p-4 rounded-xl shadow">
            <h3 class="text-sm font-medium mb-3">Itens por Coleção</h3>
            <ItensPorColecaoChart />
          </div>
        </div>
      </section>
      <!-- ====== FIM DOS GRÁFICOS ====== -->

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
