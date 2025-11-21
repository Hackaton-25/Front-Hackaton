<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <img src="@/assets/img/logo.png" alt="Museu Arqueológico de Santarém" />
      </div>
    <nav class="nav-links">
  <router-link
    to="/visitante/home"
    class="nav-item"
    active-class="active" >
    Página Inicial
  </router-link>

  <router-link
    to="/visitante/colecoes"
    class="nav-item"
    active-class="active"
  >
    Coleções
  </router-link>

  <router-link
    to="/visitante/consulta"
    class="nav-item"
    active-class="active"
  >
    Consultas
  </router-link>
</nav>

      <button class="menu-button" @click="toggleMenu">
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
      // Lógica para abrir/fechar menu responsivo pode ser adicionada aqui
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

.nav-links {
  display: flex;
  gap: 24px;
  font-family: Arial, sans-serif;
  font-weight: 500;
  font-size: 16px;
}

.nav-item {
  color:rgba(110, 76, 38, 1);
  text-decoration: none;
  padding-bottom: 4px;
  border-bottom: 3px solid transparent;
  transition: border-color 0.3s;
}

.nav-item:hover,
.nav-item.active {
  border-bottom: 3px solid rgba(160, 125, 86, 1);
}

.menu-button {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.bar {
  width: 24px;
  height: 2.5px;
  background-color: #c3bfbf;
  border-radius: 2px;
}

/* Responsivo exemplo */
@media (max-width: 768px) {
  .nav-links {
    display: none; /* pode ser toggled pelo menu */
  }
  .menu-button {
    display: flex;
  }
}
</style>