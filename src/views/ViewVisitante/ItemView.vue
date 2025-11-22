<script setup>
import FooterComponent from '../../components/ComponentesVisitante/FooterComponent.vue'
import HeaderComponent from '../../components/ComponentesVisitante/HeaderComponent.vue'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Dados simulados (mesmo da página de consultas; substitua por API ou store)
const acervo = ref([
  {
    id: 1,
    nome: "Ponta de Flecha",
    colecao: "Ferramentas",
    materiaPrima: "Animal",
    subtipo: "Osso",
    localizacao: "Sala 1",
    estado: "Bom",
    descricao: "Ponta de flecha feita a partir de osso de animal, encontrada em sambaquis da região. Representa ferramentas de caça usadas por povos pré-históricos.",
    data: "1000-800 a.C.",
    imagem: "https://picsum.photos/id/1011/400/300",
    contexto: "Este artefato é um exemplo de adaptação humana ao ambiente litorâneo, utilizando ossos de animais marinhos para fabricação de armas."
  },
  {
    id: 2,
    nome: "Vasilha Cerâmica",
    colecao: "Cerâmica",
    materiaPrima: "Mineral",
    subtipo: "Cerâmica",
    localizacao: "Sala 2",
    estado: "Excelente",
    descricao: "Vasilha bem conservada da época sambaqui, usada para armazenamento de alimentos ou rituais.",
    data: "500-300 a.C.",
    imagem: "https://picsum.photos/id/1012/400/300",
  },
  // Adicione mais itens conforme necessário
])

const route = useRoute()
const router = useRouter()

// Busca o item pelo ID da rota
const item = computed(() => {
  const id = parseInt(route.params.id)
  return acervo.value.find(i => i.id === id) || null
})

// Método para voltar à página de consultas
const voltarConsultas = () => {
  router.push('/visitante/consulta')
}

// Se o item não existir, redireciona
onMounted(() => {
  if (!item.value) {
    router.push('/visitante/consulta')
  }
})
</script>

<template>
  <header>
    <HeaderComponent />
  </header>
  <main>
    <div class="item-view container" v-if="item">
      <button @click="voltarConsultas" class="btn-voltar">← Voltar às Consultas</button>

      <div class="item-detalhes">
        <div class="imagem-principal">
          <img :src="item.imagem" :alt="item.nome" />
        </div>

        <div class="info-principal">
          <h1 class="titulo-item">{{ item.nome }}</h1>
          <p class="descricao-item">{{ item.descricao }}</p>

          <div class="detalhes-grid">
            <div class="detalhe">
              <strong>Coleção:</strong> {{ item.colecao }}
            </div>
            <div class="detalhe">
              <strong>Matéria-prima:</strong> {{ item.materiaPrima }} - {{ item.subtipo }}
            </div>
            <div class="detalhe">
              <strong>Localização no Museu:</strong> {{ item.localizacao }}
            </div>
            <div class="detalhe">
              <strong>Estado de Conservação:</strong> {{ item.estado }}
            </div>
            <div class="detalhe">
              <strong>Data Estimada:</strong> {{ item.data }}
            </div>
          </div>
        </div>
      </div>

      
    </div>

    <div v-else class="erro-item">
      Item não encontrado. <button @click="voltarConsultas">Voltar</button>
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

.item-detalhes {
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.imagem-principal img {
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  object-fit: cover;
}

.info-principal {
  flex: 1;
  min-width: 280px;
}

.titulo-item {
  font-size: 2.5rem;
  color: #b77f46;
  margin-bottom: 16px;
  font-weight: 700;
}

.descricao-item {
  font-size: 1.1rem;
  line-height: 1.5;
  color: #4a3c2b;
  margin-bottom: 24px;
}

.detalhes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.detalhe {
  background: #f9f5f0;
  padding: 12px;
  border-radius: 8px;
  border-left: 4px solid #b77f46;
}

.detalhe strong {
  color: #926a36;
}


.erro-item {
  text-align: center;
  font-size: 1.2rem;
  color: #926a36;
  margin-top: 60px;
}

/* Responsivo */
@media (max-width: 768px) {
  .item-detalhes {
    flex-direction: column;
    text-align: center;
  }
  .imagem-principal img {
    max-width: 100%;
  }
  .detalhes-grid {
    grid-template-columns: 1fr;
  }
}
</style>