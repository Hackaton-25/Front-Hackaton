<script setup>
import FooterComponent from '../../components/ComponentesVisitante/FooterComponent.vue'
import HeaderComponent from '../../components/ComponentesVisitante/HeaderComponent.vue'
import { ref, computed, watch } from 'vue'

const colecoes = ref([
  {
    id: 1,
    nome: "Coleção Cerâmica Pré-Colonial",
    descricao:
      "Peças de cerâmica obtidas em sítios arqueológicos da região, datadas do período pré-colonial.",
    imagem: "https://picsum.photos/id/1040/300/180",
    destaque: true,
  },
  {
    id: 2,
    nome: "Coleção Ferramentas de Pedra",
    descricao: "Ferramentas feitas em pedra polida e lascada usadas pelos antigos povos sambaqui.",
    imagem: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    destaque: false,
  },
  {
    id: 3,
    nome: "Acervo de Ossos Marinhos",
    descricao: "Restos ósseos encontrados em sambaquis próximos ao litoral.",
    imagem: "https://picsum.photos/id/1050/300/180",
    destaque: true,
  },
])

// Estado reativo da busca e paginação
const termoBusca = ref("")
const paginaAtual = ref(1)
const itensPorPagina = 6

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

// Pagination logic
const totalPaginas = computed(() =>
  Math.ceil(colecoesFiltradas.value.length / itensPorPagina)
)

const colecoesPaginadas = computed(() => {
  const start = (paginaAtual.value - 1) * itensPorPagina
  const end = start + itensPorPagina
  return colecoesFiltradas.value.slice(start, end)
})

// Reseta página ao mudar o termo de busca
watch(termoBusca, () => {
  paginaAtual.value = 1
})

// Controle para não exceder página
watch(paginaAtual, (pagina) => {
  if (pagina < 1) paginaAtual.value = 1
  if (pagina > totalPaginas.value) paginaAtual.value = totalPaginas.value
})

function filtrarColecoes() {
  // Computed já filtra automaticamente com reactive ref.
  // Só tem q reseta pagina atual para 1
  paginaAtual.value = 1
}
</script>

<template>
  <div class = "header-comp">
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
        @input="filtrarColecoes"
        class="input-busca"
      />
    </section>

    <!-- Coleções em Destaque -->
    <section class="destaque-section" v-if="colecoesDestaque.length">
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
      <ul class="lista-colecoes" v-if="colecoesFiltradas.length">
        <li
          v-for="col in colecoesPaginadas"
          :key="col.id"
          class="item-colecao"
        >
          <img :src="col.imagem" :alt="col.nome" />
          <div class="info-colecao">
            <h3>{{ col.nome }}</h3>
            <p>{{ col.descricao }}</p>
          </div>
        </li>
      </ul>

      <p class="sem-resultados" v-else>Nenhuma coleção encontrada.</p>

      <!-- Paginação -->
      <div class="paginacao" v-if="totalPaginas > 1">
        <button
          @click="paginaAtual--"
          :disabled="paginaAtual === 1"
          aria-label="Página anterior"
        >
          ‹ Anterior
        </button>
        <span>Página {{ paginaAtual }} de {{ totalPaginas }}</span>
        <button
          @click="paginaAtual++"
          :disabled="paginaAtual === totalPaginas"
          aria-label="Próxima página"
        >
          Próxima ›
        </button>
      </div>
    </section>

    
  </div>
  <div class = "footer-comp">
    <FooterComponent />
  </div>

</template>
<style scoped>
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
}
</style>
