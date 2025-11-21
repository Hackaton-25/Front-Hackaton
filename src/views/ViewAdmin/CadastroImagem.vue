<template>
  <div class="h-screen w-full flex overflow-hidden">

    <!-- NAV LATERAL -->
    <NavLateralAdmin />

    <!-- CONTEÚDO PRINCIPAL -->
    <div class="flex-1 h-full overflow-y-auto p-6 flex">
      <div class="w-full h-full bg-white rounded-2xl p-10">

        <h1 class="text-3xl font-bold mb-2">Cadastrar Imagens</h1>
        <p class="text-gray-600 mb-8">Envie até 4 imagens relacionadas ao item.</p>

        <!-- SEARCH ITEM -->
        <div class="mb-6 relative">
          <input
            type="text"
            v-model="search"
            placeholder="Pesquise pelo item..."
            @input="debouncedSearch"
            class="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <ul
            v-if="results.length"
            class="absolute z-10 bg-white border border-gray-300 w-full mt-1 max-h-40 overflow-y-auto rounded shadow-md"
          >
            <li
              v-for="item in results"
              :key="item.id"
              @click="selectItem(item)"
              class="px-3 py-2 cursor-pointer hover:bg-gray-100"
            >
              {{ item.numero_acervo }} - {{ item.titulo }}
            </li>
          </ul>
          <p v-if="selectedItem" class="mt-1 text-gray-600">
            Selecionado: {{ selectedItem.numero_acervo }} - {{ selectedItem.titulo }}
          </p>
        </div>

        <!-- UPLOAD -->
        <label
          class="border-2 border-dashed border-gray-400 rounded-xl flex flex-col justify-center items-center py-20 cursor-pointer hover:border-gray-600 transition"
          @dragover.prevent
          @drop.prevent="handleDrop"
        >
          <input type="file" multiple accept="image/*" class="hidden" @change="handleFileSelect" />
          <div class="text-center">
            <img src="/src/assets/img/icons/image.png" class="w-14 opacity-70 mx-auto mb-3" />
            <p class="font-semibold">Escolha arquivos ou arraste & solte aqui</p>
            <p class="text-xs text-gray-500 mt-1">JPG, PNG, JPEG, WEBP</p>
          </div>
        </label>

        <!-- PREVIEWS -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div
            v-for="(img, index) in previews"
            :key="index"
            class="relative group"
          >
            <img :src="img" class="w-full h-32 object-cover rounded-xl shadow-md" />
            <button
              @click="removeImage(index)"
              class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex justify-center items-center opacity-0 group-hover:opacity-100 transition"
            >
              ×
            </button>
          </div>
        </div>

        <!-- BOTÃO SALVAR -->
        <div class="flex justify-center mt-10 pb-5">
          <button
            @click="cadastrar"
            class="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-xl text-lg shadow-lg transition"
          >
            Cadastrar Imagens
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { NavLateralAdmin } from "@/components/index";
import { useImagemItemStore } from "@/stores/useImagemItemStore";
import { useItemAcervoStore } from "@/stores/useItemAcervoStore";
import debounce from 'lodash.debounce';

const router = useRouter();
const store = useImagemItemStore();
const itemAcervo = useItemAcervoStore();

/* Search item */
const search = ref("");
const results = ref([]);
const selectedItem = ref(null);
const selectedItemId = ref(null);
const loading = ref(false);

/* Arquivos */
const files = ref([]);
const previews = ref([]);

/* SEARCH DEBOUNCED */
const searchItems = async () => {
  loading.value = true;
  if (!search.value) {
    results.value = [];
    loading.value = false;
    return;
  }

  if (!itemAcervo.items.length) await itemAcervo.fetchAll();

  const searchValue = search.value.toLowerCase();
  results.value = itemAcervo.items.filter(i =>
    (i?.titulo?.toLowerCase().includes(searchValue)) ||
    (i?.numero_acervo?.toLowerCase().includes(searchValue))
  );

  loading.value = false;
};
const debouncedSearch = debounce(searchItems, 300);

/* Select item */
const selectItem = (item) => {
  selectedItem.value = item;
  selectedItemId.value = item.id;
  results.value = [];
};

/* FILE HANDLING */
const handleFileSelect = (event) => processFiles(Array.from(event.target.files));
const handleDrop = (event) => processFiles(Array.from(event.dataTransfer.files));

const processFiles = (newFiles) => {
  for (let file of newFiles) {
    if (files.value.length >= 4) break;
    if (!file.type.startsWith("image/")) continue;

    files.value.push(file);

    const reader = new FileReader();
    reader.onload = e => previews.value.push(e.target.result);
    reader.readAsDataURL(file);
  }
};

const removeImage = (index) => {
  files.value.splice(index, 1);
  previews.value.splice(index, 1);
};

/* CADASTRAR USANDO STORE */
const cadastrar = async () => {
  if (!selectedItemId.value) {
    alert("Selecione um item do acervo!");
    return;
  }
  if (files.value.length === 0) {
    alert("Envie ao menos uma imagem!");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("item", selectedItemId.value.toString());
    files.value.forEach(file => formData.append("imagem", file));

    // Debug: mostrar todos os pares
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const res = await store.create(formData); 
    console.log("Resposta backend:", res);

    alert("Imagens cadastradas com sucesso!");
    router.push("/dashboard/itens");
  } catch (error) {
    console.error("Erro inesperado:", error);
    alert("Erro interno ao enviar imagens.");
  }
};
</script>
