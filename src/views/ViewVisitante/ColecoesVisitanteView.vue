<script setup>
import FooterComponent from '../../components/ComponentesVisitante/FooterComponent.vue'
import HeaderComponent from '../../components/ComponentesVisitante/HeaderComponent.vue'
import { ref, computed, watch } from 'vue'

const colecoes = ref([
  {
    id: 1,
    nome: "Coleção Artefatos",
    descricao: "Peças de cerâmica obtidas em sítios arqueológicos da região, datadas do período pré-colonial.",
    imagem: new URL('@/assets/img/conchasambaqui.jpg', import.meta.url).href,
    destaque: true,
  },
  {
    id: 2,
    nome: "Coleção Ferramentas",
    descricao: "Ferramentas feitas em pedra polida e lascada usadas pelos antigos povos sambaqui.",
    imagem: new URL('@/assets/img/pedralascada.jpg', import.meta.url).href,
    destaque: false,
  },
  {
    id: 3,
    nome: "Coleção de Ossos",
    descricao: "Restos ósseos encontrados em sambaquis próximos ao litoral.",
    imagem: new URL('@/assets/img/dentedetubarao.jpg', import.meta.url).href,
    destaque: true,
  },
  {
    id: 4,
    nome: "Coleção de Cerâmica",
    descricao: "Peças cerâmicas variadas, incluindo vasilhas e utensílios.",
    imagem: new URL('@/assets/img/ceramicasambaqui.jpg', import.meta.url).href,
    destaque: true,
  },
  // Adicione mais para testar
])

// Estado reativo da busca e visualização
const termoBusca = ref("")
const itensVisiveis = ref(3) // Mostra apenas 3 inicialmente (sem busca)

// Filtra coleções conforme a busca
const colecoesFiltradas = computed(() => {
  if (!termoBusca.value.trim()) return colecoes.value
  return colecoes.value.filter((col) =>
    col.nome.toLowerCase().includes(termoBusca.value.toLowerCase())
  )
})

// Coleções em destaque
const colecoesDestaque = computed(() =>
  colecoes.value.filter((col) => col.destaque)
)

// Coleções visíveis: se há busca, mostra todas filtradas; senão, primeiras N
const colecoesVisiveis = computed(() => {
  if (termoBusca.value.trim()) {
    return colecoesFiltradas.value // Mostra todas quando há busca
  }
  return colecoesFiltradas.value.slice(0, itensVisiveis.value) // Mostra primeiras 3 sem busca
})

// Verifica se há mais coleções para carregar (apenas sem busca)
const temMaisColecoes = computed(() => {
  return !termoBusca.value.trim() && colecoesFiltradas.value.length > itensVisiveis.value
})

// Função para carregar mais coleções (apenas sem busca)
function carregarMais() {
  itensVisiveis.value += 3
}

// Reseta itens visíveis ao mudar o termo de busca
watch(termoBusca, (novoTermo) => {
  if (novoTermo.trim()) {
    // Com busca, não limita
    itensVisiveis.value = colecoesFiltradas.value.length
  } else {
    // Sem busca, volta a 3
    itensVisiveis.value = 3
  }
})
</script>

<template>
  <div class="header-comp">
    <HeaderComponent />
  </div>
  <div class="colecoes-page container">
    <h1 class="title">Coleções</h1>

    <!-- Busca simples -->
    <section class="busca-section">
      <input
        v-model="termoBusca"
        type="search"
        placeholder="Buscar coleções pelo nome..."
        class="input-busca"
      />
    </section>

    <!-- Coleções em Destaque (só aparece sem busca) -->
    <section class="destaque-section" v-if="!termoBusca.trim() && colecoesDestaque.length">
      <h2>Coleções em Destaque</h2>
      <div class="grid-destaques">
        <article
          v-for="col in colecoesDestaque"
          :key="col.id"
          class="card-colecao destaque"
        >
          <img :src="col.imagem" :alt="col.nome" />
          <h3>{{ col.nome }}</h3>
          <p>{{ col.descricao }}</p>
        </article>
      </div>
    </section>

    <!-- Listagem geral -->
    <section class="lista-section">
      <h2>Todas as Coleções</h2>
     <ul class="lista-colecoes" v-if="colecoesVisiveis.length">
  <router-link
    v-for="col in colecoesVisiveis"
    :key="col.id"
    :to="`/visitante/colecao/${col.id}`"
    class="colecao-link"
  >
    <li class="item-colecao">
      <img :src="col.imagem" :alt="col.nome" />
      <div class="info-colecao">
        <h3>{{ col.nome }}</h3>
        <p>{{ col.descricao }}</p>
      </div>
    </li>
  </router-link>
</ul>


      <p class="sem-resultados" v-else>Nenhuma coleção encontrada.</p>

      <!-- Botão Ver Mais (apenas sem busca) -->
      <div class="ver-mais" v-if="temMaisColecoes">
        <button @click="carregarMais" class="btn-ver-mais">
          ↓ Ver Mais
        </button>
      </div>
    </section>
  </div>
  <div class="footer-comp">
    <FooterComponent />
  </div>
</template>
<style scoped>
.ver-mais {
  text-align: center;
  margin-top: 20px;
}

.btn-ver-mais {
  background-color: #b77f46;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.btn-ver-mais:hover {
  background-color: #926a36;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #42342e;
}

.title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #b77f46;
  margin-bottom: 24px;
  text-align: center;
}

.busca-section {
  margin-bottom: 30px;
  text-align: center;
}

.input-busca {
  width: 100%;
  max-width: 400px;
  padding: 10px 14px;
  font-size: 1.1rem;
  border-radius: 8px;
  border: 1.5px solid #b77f46;
  transition: border-color 0.3s;
}

.input-busca:focus {
  outline: none;
  border-color: #926a36;
}

.destaque-section h2,
.lista-section h2 {
  color: #b77f46;
  margin-bottom: 16px;
  font-weight: 700;
}

.grid-destaques {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.card-colecao {
  background: #fff8f0;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 3px 8px rgb(183 126 70 / 0.2);
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

.card-colecao:hover {
  box-shadow: 0 6px 15px rgb(183 126 70 / 0.4);
}

.card-colecao img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 12px;
  object-fit: cover;
  height: 160px;
}

.card-colecao h3 {
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: #926a36;
}

.card-colecao p {
  font-size: 1rem;
  color: #4a3c2b;
}

.lista-colecoes {
  list-style: none;
  padding: 0;
  margin: 0 0 30px 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  justify-items: start; /* Alinha itens à esquerda, evita esticamento */
  justify-content: start; /* Para o grid */
}

.item-colecao {
  display: flex;
  flex-direction: column;
  background: #fff8f0;
  border-radius: 10px;
  box-shadow: 0 3px 8px rgb(183 126 70 / 0.15);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  cursor: pointer;
  max-width: 280px; /* Limita largura para não esticar */
}

.item-colecao:hover {
  box-shadow: 0 6px 15px rgb(183 126 70 / 0.3);
}

.item-colecao img {
  width: 100%;
  height: 140px;
  object-fit: cover;
}

.info-colecao {
  padding: 12px 16px;
  color: #4a3c2b;
  flex-grow: 1;
}

.info-colecao h3 {
  margin: 0 0 8px 0;
  font-size: 1.1rem;
  color: #b77f46;
}

.info-colecao p {
  font-size: 0.95rem;
  line-height: 1.3;
}

.sem-resultados {
  text-align: center;
  font-size: 1.2rem;
  color: #926a36;
  margin: 60px 0;
}

.paginacao {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 50px;
  align-items: center;
}

.paginacao button {
  background-color: #b77f46;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.paginacao button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.paginacao button:hover:not(:disabled) {
  background-color: #926a36;
}

@media (max-width: 768px) {
  .grid-destaques,
  .lista-colecoes {
    grid-template-columns: 1fr;
  }
  .item-colecao {
    max-width: none; /* Em mobile, permite largura total */
  }
}
</style>
