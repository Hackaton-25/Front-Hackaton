import { defineStore } from 'pinia'
import coletorService from '@/services/coletor'

export const useColetorStore = defineStore('coletor', {
  state: () => ({ items: [], selected: null, loading: false }),

  actions: {
    async fetchAll() { this.items = await coletorService.list() },
    async fetch(id) { this.selected = await coletorService.get(id) },
    async create(p) { const c = await coletorService.create(p); this.items.push(c); return c },
    async update(id,p){ const u=await coletorService.update(id,p); this.items=this.items.map(i=>i.id===id?u:i); return u },
    async remove(id){ await coletorService.delete(id); this.items=this.items.filter(i=>i.id!==id) }
  }
})
