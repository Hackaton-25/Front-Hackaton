<script setup>
import { ref } from 'vue'
import { loginUser } from '@/services/user'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''
  try {
    const user = await loginUser(email.value, password.value)
    console.log('Usuário logado:', user)
    localStorage.setItem('user', JSON.stringify(user))
    window.location.href = '/home'
  } catch (error) {
    console.error(error)
    errorMessage.value = 'E-mail ou senha inválidos.'
  }
}
</script>

<template>
  <main class="min-h-[100vh] flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row">

      <!-- Lado esquerdo -->
      <div class="md:w-1/2 bg-blue-700 text-white p-16 flex flex-col justify-center">
        <h1 class="text-4xl font-bold mb-6">Bem-vindo ao Sistema</h1>
        <p class="text-gray-100 text-lg">
          Acesse sua conta institucional de forma segura e prática.
        </p>
      </div>

      <!-- Lado direito: Formulário -->
      <div class="md:w-1/2 p-16 flex flex-col justify-center bg-gray-50">
        <h2 class="text-3xl font-semibold text-gray-800 mb-8">Login / Registrar-se</h2>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-gray-700 mb-2 text-lg" for="email">E-mail</label>
            <input
              v-model="email"
              id="email"
              type="email"
              placeholder="seu@email.com"
              class="w-full px-6 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              required
            />
          </div>

          <div>
            <label class="block text-gray-700 mb-2 text-lg" for="password">Senha</label>
            <input
              v-model="password"
              id="password"
              type="password"
              placeholder="••••••••"
              class="w-full px-6 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              required
            />
          </div>

          <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>

          <div class="flex justify-between text-base">
            <a href="#" class="text-blue-600 nav-item">Esqueci a senha?</a>
            <a href="#" class="text-blue-600 nav-item">Registrar-se</a>
          </div>

          <button
            type="submit"
            class="w-full py-3 px-6 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors text-lg"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  </main>
</template>

<style scoped>
.nav-item {
  position: relative;
  transition: color 0.3s ease;
  letter-spacing: 1px;
}

.nav-item:hover {
  color: #1D4ED8;
}

.nav-item::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  height: 1.5px;
  width: 0;
  background: #1D4ED8;
  transition: width 0.3s ease;
}

.nav-item:hover::after {
  width: 100%;
}
</style>
