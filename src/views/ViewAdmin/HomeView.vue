<script setup>
import { ref, onMounted } from 'vue';
import { useItemAcervoStore } from '@/stores/useItemAcervoStore';
import { useColecaoStore } from '@/stores/useColecaoStore';
import { useMovimentacaoItemStore } from '@/stores/useMovimentacaoItemStore';

import { NavLateralAdmin, TitleAdmin, InfoCardAdmin } from '@/components/index';
import ItensMateriaPrimaChart from '@/components/admin/graficos/ItensMateriaPrimaChart.vue';
import ItensPorColecaoChart from '@/components/admin/graficos/ItensPorColecaoChart.vue';

// ícones
import Transfer from '@/assets/img/arrows.png'; // <- coloque sua imagem aqui
import Museum from '@/assets/img/bank.png'; // <- coloque sua imagem aqui
import Collection from '@/assets/img/collection.png'; // <- coloque sua imagem aqui

// stores
const itemStore = useItemAcervoStore();
const colecaoStore = useColecaoStore();
const movimentacaoStore = useMovimentacaoItemStore();

// Cards com ícones
const infoCards = ref([
  { title: 'Itens', value: '...', subtitle: '', link: '/itens', icon: Museum  },
  { title: 'Coleções', value: '...', subtitle: '', link: '/colecoes', icon: Collection },
  { title: 'Movimentações', value: '...', subtitle: '', link: '/movimentacoes', icon: Transfer },
]);

const fetchCounts = async () => {
  try {
    await Promise.all([
      itemStore.fetchAll(),
      colecaoStore.fetchAll(),
      movimentacaoStore.fetchAll()
    ]);

    infoCards.value[0].value = `${itemStore.items.length} Itens`;
    infoCards.value[1].value = `${colecaoStore.items.length} Coleções`;
    infoCards.value[2].value = `${movimentacaoStore.items.length} Movimentações`;

    const now = new Date().toISOString();
    infoCards.value.forEach(card => card.subtitle = now);
  } catch (err) {
    console.error('Erro ao buscar contagens:', err);
  }
};

onMounted(fetchCounts);
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
        <div class="flex gap-6 w-full px-2" style="scroll-snap-type: x mandatory">
          <div
            v-for="card in infoCards"
            :key="card.title"
            class="py-2 flex-shrink-0 flex-1 scroll-snap-align-start"
          >
            <InfoCardAdmin
              :title="card.title"
              :value="card.value"
              :subtitle="card.subtitle
                ? `Atualizado às ${new Date(card.subtitle).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                : 'Atualizando...'"
              :link="card.link"
              :icon="card.icon"
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
