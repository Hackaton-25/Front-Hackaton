// stores/useUserStore.js
import { defineStore } from 'pinia'
import { fetchUsers } from '@/services/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    items: [],
    loading: false,
  }),
  actions: {
    async fetchAll() {
      this.loading = true
      try {
        this.items = await fetchUsers()
      } catch (err) {
        console.error('Erro ao buscar usuários', err)
      } finally {
        this.loading = false
      }
    }
  }
})
