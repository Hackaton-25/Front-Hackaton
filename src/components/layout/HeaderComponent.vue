<template>
  <header
    class="w-full px-16 py-10 shadow-lg flex items-center justify-between bg-gray-100"
  >
    <!-- Logo + Nome -->
    <div class="flex items-center space-x-3">
      <div class="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
        <span class="text-black font-bold text-lg">E</span>
      </div>
      <div class="text-black">
        <h1 class="text-xl font-semibold leading-none">EduTech</h1>
        <p class="text-xs opacity-80 leading-none">Sistema Escolar</p>
      </div>
    </div>

    <!-- Menu -->
    <nav class="hidden md:flex items-center space-x-8 text-black/90">
      <a href="#" class="nav-item">Início</a>
      <a href="#" class="nav-item">Alunos</a>
      <a href="#" class="nav-item">Professores</a>
      <a href="#" class="nav-item">Turmas</a>
      <a href="#" class="nav-item">Relatórios</a>
    </nav>

    <!-- Menu mobile (hambúrguer animado) -->
    <button
      @click="toggleMenu"
      class="text-black focus:outline-none rounded-lg p-2"
    >
      <svg
        :class="{ open: isOpen }"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Linha maior -->
        <line x1="4" y1="7" x2="20" y2="7" class="line top" />

        <!-- Linha menor -->
        <line x1="4" y1="15" x2="14" y2="15" class="line bottom" />
      </svg>
    </button>
  </header>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}
</script>

<style scoped>
/* ------------------------ */
/* NAV ITEM ANIMATION (underline) */
/* ------------------------ */

.nav-item {
  position: relative;
  display: inline-block;
  color: #000;
  text-decoration: none;
  transition: color 0.3s ease;
  font-weight: bold;
  letter-spacing: 1.5px;
  font-size: 1.1rem;
}

.nav-item:hover {
  color: #1d4ed8;
}

.nav-item::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  height: 3px;
  width: 0;
  background: #1d4ed8;
  transition: width 0.3s ease;
}

.nav-item:hover::after {
  width: 100%;
}

/* ------------------------ */
/* MENU HAMBÚRGUER ANIMADO */
/* ------------------------ */

.line {
  stroke: black;
  stroke-width: 3;
  stroke-linecap: round;
  transform-origin: left;
  transition: transform 0.3s ease;
}

/* Linha menor começa com scale menor */
.bottom {
  transform: scaleX(0.55);
}

/* Pivôs para formar um X perfeito */
.top {
  transform-origin: 4px 7px;
}

.bottom {
  transform-origin: 4px 15px;
}

/* Quando abre → vira X e cresce */
.open .top {
  transform: translateY(-2px) translateX(-1px) rotate(45deg);
}

.open .bottom {
  transform: rotate(-45deg) scaleX(1.4);
}

</style>
