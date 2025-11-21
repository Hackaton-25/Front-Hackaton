<template>
  <header class="w-full bg-white shadow-md fixed top-0 left-0 z-50">
    <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

      <!-- LOGO -->
      <div class="flex items-center gap-3">
        <img src="/logo.png" alt="Logo" class="h-10 w-auto">
        <h1 class="text-xl font-bold">Museu</h1>
      </div>

      <!-- NAV -->
      <nav class="hidden md:flex gap-8 text-lg font-medium">
        <router-link to="/" class="hover:text-blue-600 transition">Home</router-link>
        <router-link to="/acervo" class="hover:text-blue-600 transition">Acervo</router-link>
        <router-link to="/exposicoes" class="hover:text-blue-600 transition">Exposições</router-link>
        <router-link to="/visite" class="hover:text-blue-600 transition">Visite</router-link>
      </nav>

      <!-- MENU MOBILE -->
      <div class="md:hidden">
        <button class="text-3xl">&#9776;</button>
      </div>
    </div>
  </header>

  <!-- Espaço para o header fixo não sobrepor o conteúdo -->
  <div class="h-20"></div>
</template>

<style scoped>
/* Caso precise de ajustes extras */
</style>
