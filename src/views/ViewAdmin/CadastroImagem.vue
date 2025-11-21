<template>
  <div class="h-screen w-full flex overflow-hidden">

    <!-- NAV LATERAL -->
    <NavLateralAdmin />

    <!-- CONTEÚDO PRINCIPAL -->
    <div class="flex-1 h-full overflow-y-auto p-6 flex">

      <div class="w-full h-full bg-white rounded-2xl p-10">

        <h1 class="text-3xl font-bold mb-2">Cadastrar Imagens</h1>
        <p class="text-gray-600 mb-8">Envie até 4 imagens relacionadas ao item.</p>

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
import { useRoute, useRouter } from "vue-router";
import { NavLateralAdmin } from "@/components/index";

const route = useRoute();
const router = useRouter();

const itemId = route.params.id;

/* ARMAZENAMENTO */
const files = ref([]);
const previews = ref([]);

/* FILE HANDLING */
const handleFileSelect = (event) => {
  const selected = Array.from(event.target.files);
  processFiles(selected);
};

const handleDrop = (event) => {
  const dropped = Array.from(event.dataTransfer.files);
  processFiles(dropped);
};

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

/* CADASTRAR */
const cadastrar = async () => {
  if (files.value.length === 0) {
    alert("Envie ao menos uma imagem!");
    return;
  }

  try {
    for (const file of files.value) {
      const formData = new FormData();
      formData.append("imagem", file);

      const url = `http://localhost:19003/api/itens-acervo/${itemId}/imagens-itens/`;
      console.log("Enviando para:", url);

      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text(); // <-- evita quebrar com JSON inválido
        console.error("Resposta do servidor:", text);
        alert("Erro ao cadastrar imagem. Verifique a URL no backend.");
        return;
      }
    }

    alert("Imagens cadastradas com sucesso!");
    router.push("/dashboard/itens");

  } catch (error) {
    console.error("Erro inesperado:", error);
    alert("Erro interno ao enviar imagens.");
  }
};
</script>
