<script setup>
import FooterComponent from '../../components/ComponentesVisitante/FooterComponent.vue'
import HeaderComponent from '../../components/ComponentesVisitante/HeaderComponent.vue'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const colecaoNome = ref('')
const itensColecao = ref([])
const loading = ref(true)
const error = ref(null)
const paginaAtual = ref(1)
const itensPorPagina = 5

// Dados simulados (substitua por API)
const acervoSimulado = [
  { id: 1, nome: "Ponta de Flecha", colecao: "Ferramentas", materiaPrima: "Animal", subtipo: "Osso", localizacao: "Sala 1", estado: "Bom", descricao: "Ponta de flecha feita a partir de osso de animal.", data: "1000-800 a.C.", imagem: "https://picsum.photos/id/1011/150/100" },
  { id: 2, nome: "Vasilha Cerâmica", colecao: "Cerâmica", materiaPrima: "Mineral", subtipo: "Cerâmica", localizacao: "Sala 2", estado: "Excelente", descricao: "Vasilha bem conservada da época sambaqui.", data: "500-300 a.C.", imagem: "https://picsum.photos/id/1012/150/100" },
  { id: 3, nome: "Dente de Tubarão", colecao: "Ossos", materiaPrima: "Animal", subtipo: "Dente", localizacao: "Depósito", estado: "Regular", descricao: "Dente de tubarão fossilizado encontrado em sambaquis.", data: "1200-1000 a.C.", imagem: "https://picsum.photos/id/1013/150/100" },
  { id: 4, nome: "Artefato de Fibra Vegetal", colecao: "Artefatos", materiaPrima: "Vegetação", subtipo: "Fibra", localizacao: "Exposição Principal", estado: "Bom", descricao: "Peça feita de fibra vegetal utilizada por povos pré-históricos.", data: "800-600 a.C.", imagem: "https://picsum.photos/id/1014/150/100" },
  { id: 5, nome: "Osso de Mamífero com Marcas de Corte", colecao: "Ossos", materiaPrima: "Animal", subtipo: "Osso", localizacao: "Sala 2", estado: "Bom", descricao: "Osso de mamífero com incisões.", data: "1500-1000 a.C.", imagem: "https://picsum.photos/id/1015/150/100" },
  { id: 6, nome: "Colar de Dentes de Peixe", colecao: "Artefatos", materiaPrima: "Animal", subtipo: "Dente", localizacao: "Exposição Principal", estado: "Excelente", descricao: "Colar feito de dentes de peixe.", data: "500-1 a.C.", imagem: "https://picsum.photos/id/1016/150/100" },
  { id: 7, nome: "Pote Cerâmico com Alça", colecao: "Cerâmica", materiaPrima: "Mineral", subtipo: "Cerâmica", localizacao: "Sala 1", estado: "Bom", descricao: "Pote cerâmico com alça.", data: "2000-1500 a.C.", imagem: "https://picsum.photos/id/1017/150/100" },
  { id: 8, nome: "Fibra Vegetal Trançada", colecao: "Artefatos", materiaPrima: "Vegetação", subtipo: "Fibra", localizacao: "Depósito", estado: "Regular", descricao: "Fragmento de fibra vegetal trançada.", data: "3000-2500 a.C.", imagem: "https://picsum.photos/id/1018/150/100" },
  { id: 9, nome: "Lâmina de Pedra Polida", colecao: "Ferramentas", materiaPrima: "Mineral", subtipo: "Pedra", localizacao: "Sala 2", estado: "Excelente", descricao: "Lâmina de pedra polida.", data: "1000-500 a.C.", imagem: "https://picsum.photos/id/1019/150/100" },
  { id: 10, nome: "Concha", colecao: "Artefatos", materiaPrima: "Animal", subtipo: "Concha", localizacao: "Exposição Principal", estado: "Precário", descricao: "Concha usada como ferramenta.", data: "4000-3500 a.C.", imagem: "https://picsum.photos/id/1020/150/100" }
]

async function buscarItensColecao(colecaoParam) {
  console.log('Buscando itens da coleção:', colecaoParam)
  try {
    // Filtra itens da coleção diretamente pelo nome
    itensColecao.value = acervoSimulado.filter(item => item.colecao === colecaoParam)
    if (itensColecao.value.length === 0) throw new Error('Nenhum item encontrado nesta coleção')
    colecaoNome.value = colecaoParam
    console.log('Itens encontrados:', itensColecao.value)
  } catch (err) {
    error.value = err.message
    console.error('Erro:', err)
  } finally {
    loading.value = false
  }
}

const totalPaginas = computed(() => Math.ceil(itensColecao.value.length / itensPorPagina))
const itensPaginados = computed(() => {
  const start = (paginaAtual.value - 1) * itensPorPagina
  return itensColecao.value.slice(start, start + itensPorPagina)
})

const voltarColecoes = () => {
  router.push('/visitante/colecoes')
}

onMounted(() => {
  const colecaoParam = decodeURIComponent(route.params.colecao)
  console.log('Parâmetro da rota:', colecaoParam)
  if (colecaoParam) {
    buscarItensColecao(colecaoParam)
  } else {
    error.value = 'Coleção não especificada'
    loading.value = false
  }
})
</script>

<template>
  <header>
    <HeaderComponent />
  </header>
  <main>
    <div class="colecao-itens container">
      <button @click="voltarColecoes" class="btn-voltar">← Voltar às Coleções</button>

      <div v-if="loading">Carregando itens da coleção...</div>

      <div v-else-if="error" class="erro-colecao">
        {{ error }} <button @click="voltarColecoes">Voltar</button>
      </div>

      <div v-else>
        <h1 class="titulo-colecao">Itens da {{ colecaoNome }}</h1>

        <section class="itens-section" v-if="itensPaginados.length">
          <ul class="lista-itens">
            <router-link
              v-for="item in itensPaginados"
              :key="item.id"
              :to="`/visitante/item/${item.id}`"
              class="item-link"
            >
              <li class="resultado-item">
                <img :src="item.imagem" alt="Imagem da peça" class="imagem-peca" />
                <div class="info-peca">
                  <h3>{{ item.nome }}</h3>
                  <p><strong>Matéria-prima:</strong> {{ item.materiaPrima }} - {{ item.subtipo }}</p>
                  <p><strong>Localização:</strong> {{ item.localizacao }}</p>
                  <p><strong>Estado de Conservação:</strong> {{ item.estado }}</p>
                  <p><strong>Descrição:</strong> {{ item.descricao }}</p>
                </div>
              </li>
            </router-link>
          </ul>

          <div class="paginacao" v-if="totalPaginas > 1">
            <button @click="paginaAtual--" :disabled="paginaAtual === 1">Anterior</button>
            <span>Página {{ paginaAtual }} de {{ totalPaginas }}</span>
            <button @click="paginaAtual++" :disabled="paginaAtual === totalPaginas">Próxima</button>
          </div>
        </section>

        <p v-else class="sem-itens">Nenhum item encontrado nesta coleção.</p>
      </div>
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

.btn-voltar {
  background-color: #b77f46;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 20px;
  transition: background-color 0.3s;
}

.btn-voltar:hover {
  background-color: #926a36;
}

.titulo-colecao {
  font-size: 2.2rem;
  color: #b77f46;
  margin-bottom: 24px;
  font-weight: 700;
}

.itens-section ul {
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
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
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

.item-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.item-link:hover .resultado-item {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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

.sem-itens {
  text-align: center;
  font-size: 1.2rem;
  color: #926a36;
  margin-top: 60px;
}

.erro-colecao {
  text-align: center;
  font-size: 1.2rem;
  color: #926a36;
  margin-top: 60px;
}

@media (max-width: 768px) {
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