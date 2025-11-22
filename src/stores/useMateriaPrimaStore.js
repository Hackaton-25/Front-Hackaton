import { defineStore } from 'pinia'
import itemService from '@/services/materiaPrima'

export const useMateriaPrimaStore = defineStore('materiaPrima', {
  state: () => ({ items: [], selected: null }),

  actions: {
    async fetchAll() { this.items = await itemService.list() },
    async fetch(id) { this.selected = await itemService.get(id) },
    async create(p) { const c = await itemService.create(p); this.items.push(c); return c },
    async update(id,p){ const u = await itemService.update(id,p); this.items = this.items.map(i=>i.id===id?u:i); return u },
    async remove(id){ await itemService.delete(id); this.items = this.items.filter(i=>i.id!==id) }
  }
})
