<template>
  <div class="flex">
    <NavLateralAdmin />

    <main class="flex-1 p-6 space-y-6 overflow-hidden">
      <!-- Título e subtítulo do dashboard -->
      <TitleAdmin :title="dashboardTitleStore.title" :subtitle="dashboardTitleStore.subtitle" />

      <!-- Cards e ações -->
      <div class="flex w-full justify-center items-center">
        <div class="flex flex-[0.9] gap-6 justify-between items-center">
          <ButtonActionAdmin
            :acao="props.actions.addLabel"
            :showDropdown="!!props.actions.dropdown"
            :options="dropdownOptions"
            @click="handleAddClick"
          />

          <InfoCardAdmin class="min-w-[400px] "
            :icon="imageEstatisca"
            :title="infoCardTitle"
            :value="infoCardValue"
            :subtitle="infoCardSubtitle"
          />
        </div>
      </div>

      <!-- Tabela de itens -->
      <div class="flex w-full justify-center items-center">
        <div class="flex-[0.9]">
          <TablePagesAdmin
            :title="dashboardTitleStore.tableTitle"
            :items="items"
            :currentPage="store.currentPage"
            :totalPages="store.totalPages"
            :itemsPerPage="store.itemsPerPage"
            :loading="loading"
            @page-change="store.setCurrentPage"
            :columns="props.columns"
                        :dataKey="props.dataKey"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import {
  NavLateralAdmin,
  TitleAdmin,
  ButtonActionAdmin,
  InfoCardAdmin,
  TablePagesAdmin,
} from '@/components/index'
import { useDashboardTitleStore } from '@/stores';

</script>