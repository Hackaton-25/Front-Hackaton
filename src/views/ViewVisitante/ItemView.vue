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
    descricao: "Ponta de flecha feita a partir de osso de animal.",
    data: "1000-800 a.C.",
    imagem: new URL('@/assets/img/pedralascada.jpg', import.meta.url).href
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
    imagem: new URL('@/assets/img/ceramicasambaqui.jpg', import.meta.url).href
  },
  {
    id: 3,
    nome: "Dente de Tubarão",
    colecao: "Ossos",
    materiaPrima: "Animal",
    subtipo: "Dente",
    localizacao: "Depósito",
    estado: "Regular",
    descricao: "Dente de tubarão fossilizado encontrado em sambaquis.",
    data: "1200-1000 a.C.",
    imagem: new URL('@/assets/img/dentedetubarao.jpg', import.meta.url).href
  },
  {
    id: 4,
    nome: "Artefato de Fibra Vegetal",
    colecao: "Artefatos",
    materiaPrima: "Vegetação",
    subtipo: "Fibra",
    localizacao: "Exposição Principal",
    estado: "Bom",
    descricao: "Peça feita de fibra vegetal utilizada por povos pré-históricos.",
    data: "800-600 a.C.",
    imagem: new URL('@/assets/img/fibravegetal.jpg', import.meta.url).href
  },
  {
    id: 5,
    nome: "Osso de Mamífero com Marcas de Corte",
    colecao: "Ossos",
    materiaPrima: "Animal",
    subtipo: "Osso",
    localizacao: "Sala 2",
    estado: "Bom",
    descricao: "Osso de mamífero com incisões, sugerindo processamento para extração de medula.",
    data: "1500-1000 a.C.",
    imagem: new URL('@/assets/img/ossoscorte.jpg', import.meta.url).href,
    contexto: "Restos ósseos revelam hábitos alimentares e técnicas de caça das populações sambaqui."
  },
  {
    id: 6,
    nome: "Colar de Dentes de Peixe",
    colecao: "Artefatos",
    materiaPrima: "Animal",
    subtipo: "Dente",
    localizacao: "Exposição Principal",
    estado: "Excelente",
    descricao: "Colar feito de dentes de peixe, usado como adorno pessoal.",
    data: "500-1 a.C.",
    imagem: new URL('@/assets/img/colar.jpg', import.meta.url).href,
    contexto: "Artefatos ornamentais mostram aspectos culturais e simbólicos das sociedades pré-coloniais."
  },
 {
    id: 7,
    nome: "Pote Cerâmico com Alça",
    colecao: "Cerâmica",
    materiaPrima: "Mineral",
    subtipo: "Cerâmica",
    localizacao: "Sala 1",
    estado: "Bom",
    descricao: "Pote cerâmico com alça para transporte, encontrado em camadas profundas do sambaqui.",
    data: "2000-1500 a.C.",
    imagem: new URL('@/assets/img/ceramicaalca.jpg', import.meta.url).href,
    contexto: "A cerâmica indica sedentarismo e organização social em comunidades costeiras."
  },
  {
    id: 8,
    nome: "Fibra Vegetal Trançada",
    colecao: "Artefatos",
    materiaPrima: "Vegetação",
    subtipo: "Fibra",
    localizacao: "Depósito",
    estado: "Regular",
    descricao: "Fragmento de fibra vegetal trançada, possivelmente parte de uma rede ou cesta.",
    data: "3000-2500 a.C.",
    imagem: new URL('@/assets/img/fibravegetal2.jpg', import.meta.url).href,
    contexto: "Materiais vegetais evidenciam o uso de recursos florestais próximos aos sambaquis."
  },
  {
    id: 9,
    nome: "Lâmina de Pedra Polida",
    colecao: "Ferramentas",
    materiaPrima: "Mineral",
    subtipo: "Pedra",
    localizacao: "Sala 2",
    estado: "Excelente",
    descricao: "Lâmina de pedra polida, usada para corte preciso em atividades diárias.",
    data: "1000-500 a.C.",
    imagem: "@/assets/img/pedralascada.jpg",
    contexto: "A polimento de pedra marca avanços tecnológicos nas ferramentas pré-históricas."
  },
   {
    id: 10,
    nome: "Concha",
    colecao: "Artefatos",
    materiaPrima: "Animal",
    subtipo: "Concha",
    localizacao: "Exposição Principal",
    estado: "Precário",
    descricao: "Os sambaquianos usavam conchas como ferramentas.",
    data: "4000-3500 a.C.",
    imagem: new URL('@/assets/img/conchasambaqui.jpg', import.meta.url).href,
    contexto: "Os sambaquianos usavam conchas como ferramentas."
  },
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
            <div class="detalhe">
              <strong>Contexto:</strong> {{ item.contexto }}
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