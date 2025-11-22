import { defineStore } from 'pinia';
import colecaoService from '@/services/colecao';

export const useColecaoStore = defineStore('colecao', {
  state: () => ({
    items: [],
    selected: null,
    loading: false,
  }),

  actions: {
    async fetchAll() {
      this.loading = true
      try {
        this.items = await colecaoService.list() || []
      } finally {
        this.loading = false
      }
    },
    async fetch(id) { this.selected = await colecaoService.get(id) },
    async create(payload) { const created = await colecaoService.create(payload); this.items.push(created); return created },
    async update(id, payload) { const updated = await colecaoService.update(id, payload); this.items = this.items.map(i => i.id === id ? updated : i); return updated },
    async remove(id) { await colecaoService.delete(id); this.items = this.items.filter(i => i.id !== id) },

    // ✅ nova função de contagem
    countItems() { return this.items?.length ?? 0 }
  }
})
