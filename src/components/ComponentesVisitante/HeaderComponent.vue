<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <img src="@/assets/img/logo.png" alt="Museu Arqueológico de Santarém" />
      </div>

      <!-- Nav links -->
      <nav :class="['nav-links', { 'nav-open': isMenuOpen }]">
        <router-link
          to="/visitante/homevisitante"
          class="nav-item"
          active-class="active"
          @click="closeMenu"
        >
          Página Inicial
        </router-link>

        <router-link
          to="/visitante/colecoes"
          class="nav-item"
          active-class="active"
          @click="closeMenu"
        >
          Coleções
        </router-link>

        <router-link
          to="/visitante/consulta"
          class="nav-item"
          active-class="active"
          @click="closeMenu"
        >
          Consultas
        </router-link>
      </nav>

      <!-- Botão hambúrguer -->
      <button class="menu-button" @click="toggleMenu" aria-label="Menu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false; // fecha menu ao clicar em link (útil em mobile)
    },
  },
};
</script>

<style scoped>
.header {
  border-bottom: 1px solid #c3bfbf;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  justify-content: space-between;
}

.logo img {
  height: 70px;
  width: auto;
}

/* --- Navegação --- */
.nav-links {
  display: flex;
  gap: 24px;
  font-family: Arial, sans-serif;
  font-weight: 500;
  font-size: 16px;
  transition: max-height 0.3s ease;
}

.nav-item {
  color: rgba(110, 76, 38, 1);
  text-decoration: none;
  padding-bottom: 4px;
  border-bottom: 3px solid transparent;
  transition: border-color 0.3s;
}

.nav-item:hover,
.nav-item.active {
  border-bottom: 3px solid rgba(160, 125, 86, 1);
}

/* --- Botão menu --- */
.menu-button {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 101; /* para ficar acima do menu */
}

.bar {
  width: 24px;
  height: 2.5px;
  background-color: #c3bfbf;
  border-radius: 2px;
}

/* Responsivo */
@media (max-width: 768px) {
  .nav-links {
    position: absolute;
    top: 70px;
    right: 0;
    background: white;
    width: 80vw;
    max-width: 250px;
    flex-direction: column;
    gap: 0;
    padding: 10px 0;
    border-radius: 0 0 0 8px;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  .nav-links.nav-open {
    max-height: 300px; /* altura suficiente para mostrar os links */
  }

  .nav-item {
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
  }

  .nav-item:last-child {
    border-bottom: none;
  }

  .menu-button {
    display: flex;
  }
}
</style>