<script setup>
import FooterComponent from '../../components/ComponentesVisitante/FooterComponent.vue'
import HeaderComponent from '../../components/ComponentesVisitante/HeaderComponent.vue'
import { ref, computed, watch } from 'vue'

const acervo = ref([
  {
    id: 1,
    nome: "Ponta de Flecha",
    colecao: "Ferramentas",
    materiaPrima: "Animal",
    subtipo: "Osso",
    localizacao: "Sala 1",
    estado: "Bom",
    descricao: "Ponta de flecha feita a partir de osso de animal.",
    data: "1000-800 a.C.",
    imagem: "https://picsum.photos/id/1011/150/100"
  },
  {
    id: 2,
    nome: "Vasilha Cerâmica",
    colecao: "Cerâmica",
    materiaPrima: "Mineral",
    subtipo: "Cerâmica",
    localizacao: "Sala 2",
    estado: "Excelente",
    descricao: "Vasilha bem conservada da época sambaqui.",
    data: "500-300 a.C.",
    imagem: "https://picsum.photos/id/1012/150/100"
  },
])

const colecoes = ["Ferramentas", "Cerâmica", "Ossos", "Artefatos"]
const localizacoes = ["Sala 1", "Sala 2", "Depósito", "Exposição Principal"]
const todosSubtipos = {
  animal: ["Osso", "Dente", "Concha"],
  vegetacao: ["Fibra", "Madeira"],
  mineral: ["Pedra", "Metal", "Cerâmica"],
  outro: ["Outros"]
}

const filtros = ref({
  texto: "",
  colecao: "",
  materiaPrima: "",
  subtipo: "",
  localizacao: "",
  estado: ""
})

const ordenacao = ref("nome_asc")
const paginaAtual = ref(1)
const itensPorPagina = 5
const subtipos = ref([])

watch(()=> filtros.value.materiaPrima, (novo) => {
  if(novo && todosSubtipos[novo]){
    subtipos.value = todosSubtipos[novo]
  } else {
    subtipos.value = []
  }
  filtros.value.subtipo = ""
  filtrarResultados()
})

const resultadosFiltrados = ref([...acervo.value])

function filtrarResultados() {
  let res = acervo.value.filter(item => {
    // filtro texto
    if(filtros.value.texto){
      const textoLower = filtros.value.texto.toLowerCase()
      if(!(
        item.nome.toLowerCase().includes(textoLower) ||
        item.descricao.toLowerCase().includes(textoLower)
      )){
        return false
      }
    }
    if(filtros.value.colecao && item.colecao !== filtros.value.colecao)
      return false
    if(filtros.value.materiaPrima && item.materiaPrima.toLowerCase() !== filtros.value.materiaPrima.toLowerCase())
      return false
    if(filtros.value.subtipo && item.subtipo !== filtros.value.subtipo)
      return false
    if(filtros.value.localizacao && item.localizacao !== filtros.value.localizacao)
      return false
    if(filtros.value.estado && item.estado !== filtros.value.estado)
      return false
    return true
  })

  // ordenar
  switch(ordenacao.value){
    case "nome_asc": res.sort((a,b)=> a.nome.localeCompare(b.nome)); break;
    case "nome_desc": res.sort((a,b)=> b.nome.localeCompare(a.nome)); break;
    case "data_asc":
      res.sort((a,b) => new Date(a.data) - new Date(b.data));
      break;
    case "data_desc":
      res.sort((a,b) => new Date(b.data) - new Date(a.data));
      break;
  }
  resultadosFiltrados.value = res
  paginaAtual.value = 1
}

function limparFiltros(){
  filtros.value = {
    texto: "",
    colecao: "",
    materiaPrima: "",
    subtipo: "",
    localizacao: "",
    estado: ""
  }
  subtipos.value = []
  ordenacao.value = "nome_asc"
  filtrarResultados()
}

const totalPaginas = computed(() => Math.ceil(resultadosFiltrados.value.length / itensPorPagina))

const paginatedResultados = computed(() => {
  const start = (paginaAtual.value - 1) * itensPorPagina
  return resultadosFiltrados.value.slice(start, start + itensPorPagina)
})

// Atualiza os resultados iniciais
filtrarResultados()

// Atualiza resultado ao mudar página (página atual com watcher)
watch(paginaAtual, (novaPagina) => {
  if(novaPagina < 1) paginaAtual.value = 1
  if(novaPagina > totalPaginas.value) paginaAtual.value = totalPaginas.value
})
</script>

<template>
  <header>
    <HeaderComponent />
  </header>
  <main>
  <div class="consultas-page container">

    <h1 class="title">Consulta ao Acervo</h1>


    <section class="filters-section">
      <input
        v-model="filtros.texto"
        type="search"
        placeholder="Buscar por nome, descrição..."
        class="input-texto"
        @input="filtrarResultados"
      />

      <select v-model="filtros.colecao" @change="filtrarResultados">
        <option value="">Todas as Coleções</option>
        <option v-for="c in colecoes" :key="c" :value="c">{{ c }}</option>
      </select>

      <select v-model="filtros.materiaPrima" @change="onMateriaPrimaChange">
        <option value="">Todas as Matérias-Primas</option>
        <option value="animal">Animal</option>
        <option value="vegetacao">Vegetação</option>
        <option value="mineral">Mineral</option>
        <option value="outro">Outro</option>
      </select>

      <select v-model="filtros.subtipo" :disabled="subtipos.length === 0" @change="filtrarResultados">
        <option value="">Todos os Subtipos</option>
        <option v-for="s in subtipos" :key="s" :value="s">{{ s }}</option>
      </select>

      <select v-model="filtros.localizacao" @change="filtrarResultados">
        <option value="">Todas as Localizações</option>
        <option v-for="l in localizacoes" :key="l" :value="l">{{ l }}</option>
      </select>

      <select v-model="filtros.estado" @change="filtrarResultados">
        <option value="">Todos os Estados de Conservação</option>
        <option value="Excelente">Excelente</option>
        <option value="Bom">Bom</option>
        <option value="Regular">Regular</option>
        <option value="Precário">Precário</option>
      </select>

      <select v-model="ordenacao" @change="filtrarResultados">
        <option value="nome_asc">Nome (A-Z)</option>
        <option value="nome_desc">Nome (Z-A)</option>
        <option value="data_asc">Data da Peça (mais antiga)</option>
        <option value="data_desc">Data da Peça (mais recente)</option>
      </select>

      <button @click="limparFiltros" class="btn-limpar">Limpar Filtros</button>
    </section>

    <section class="resultados-section" v-if="paginatedResultados.length">
      <ul class="lista-resultados">
    <router-link
      v-for="item in paginatedResultados"
      :key="item.id"
      :to="`/visitante/item/${item.id}`"
      class="resultado-item-link"
    >
      <li class="resultado-item">
        <img :src="item.imagem" alt="Imagem da peça" class="imagem-peca" />
        <div class="info-peca">
          <h3>{{ item.nome }}</h3>
          <p><strong>Coleção:</strong> {{ item.colecao }}</p>
          <p><strong>Matéria-prima:</strong> {{ item.materiaPrima }} - {{ item.subtipo }}</p>
          <p><strong>Localização:</strong> {{ item.localizacao }}</p>
          <p><strong>Estado de Conservação:</strong> {{ item.estado }}</p>
          <p><strong>Descrição:</strong> {{ item.descricao }}</p>
        </div>
      </li>
    </router-link>
  </ul>

      <div class="paginacao">
        <button @click="paginaAtual--" :disabled="paginaAtual === 1">Anterior</button>
        <span>Página {{ paginaAtual }} de {{ totalPaginas }}</span>
        <button @click="paginaAtual++" :disabled="paginaAtual === totalPaginas">Próxima</button>
      </div>
    </section>

    <section v-else class="sem-resultados">
      Nenhum resultado encontrado.
    </section>
  </div>
  </main>
  <footer>
    <FooterComponent />
  </footer>

</template>

<style scoped>

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.title {
  font-size: 2rem;
  color: #b77f46;
  margin-bottom: 20px;
  font-weight: 700;
}

.filters-section {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 25px;
  align-items: center;
}

.filters-section input[type="search"],
.filters-section select {
  padding: 8px 10px;
  font-size: 1rem;
  border-radius: 6px;
  border: 1.5px solid #ccc;
  min-width: 160px;
}

.btn-limpar {
  padding: 8px 15px;
  background-color: #b77f46;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.btn-limpar:hover {
  background-color: #926a36;
}

.resultados-section ul {
  list-style: none;
  padding: 0;
}

.resultado-item {
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}

.imagem-peca {
  width: 150px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.info-peca h3 {
  margin: 0 0 5px 0;
  color: #b77f46;
}

.info-peca p {
  margin: 3px 0;
  color: #4a3c2b;
  font-size: 0.95rem;
}

.paginacao {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
}

.paginacao button {
  padding: 8px 16px;
  background: #b77f46;
  border: none;
  color: white;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
}

.paginacao button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.sem-resultados {
  font-size: 1.2rem;
  color: #926a36;
  text-align: center;
  margin-top: 60px;
}

/* Responsivo */

@media (max-width: 768px) {
  .filters-section {
    flex-direction: column;
  }
  .resultado-item {
    flex-direction: column;
    align-items: center;
  }
  .imagem-peca {
    width: 100%;
    max-width: 300px;
    height: auto;
  }
  .info-peca {
    text-align: center;
  }
}
</style>
