<script setup>
import { useNavBarAdminStore } from '@/stores/index'
import { NavbarDropdown } from '@/components/index'

const store = useNavBarAdminStore()

</script>

<template>
  <div class="relative flex items-center p-4 gap-1.5 bg-white rounded-xl shadow-md w-full">
    <img src="@/assets/img/user.png" alt="Avatar" class="rounded-full object-cover w-8 h-auto"/>
    <div class="flex flex-col flex-1 text-left">
      <h2 class="text-sm font-semibold">{{ 'Usuário sem nome' }}</h2>
      <p class="text-xs text-gray-500">{{ 'Usuário sem email' }}</p>
    </div>
    <button @click="store.toggleDropdown" class="text-gray-400 hover:text-gray-600 focus:outline-none" aria-label="Abrir menu do usuário">
      ⋮
    </button>
    <NavbarDropdown :open="store.isDropdownOpen" :width="'100%'" @close="store.closeDropdown"/>
  </div>
</template>