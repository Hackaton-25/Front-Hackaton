import { defineStore } from 'pinia';
import itemService from '@/services/movimentacaoItem';

export const useMovimentacaoItemStore = defineStore('movimentacaoItem', {
  state: () => ({
    items: [],
    selected: null,
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1
  }),

  actions: {
    async fetchAll(page = 1) {
      this.loading = true
      this.error = null
      this.currentPage = page
      try {
        const data = await itemService.list(page)
        const arr = Array.isArray(data) ? data : (data.results ?? data)
        this.items = (arr || []).filter(Boolean)
        this.totalPages = data?.total_pages ?? data?.totalPages ?? Math.max(1, Math.ceil((data?.count ?? arr.length)/10))
      } catch (err) {
        this.error = 'Falha ao carregar movimentações'
        this.items = []
        this.totalPages = 1
        console.error('[useMovimentacaoItemStore] fetchAll error:', err)
      } finally {
        this.loading = false
      }
    },

    async fetch(id) { try { this.selected = await itemService.get(id) } catch(err) { this.error = `Falha ao carregar movimentação ${id}`; console.error(err) } },

    async create(payload) { const created = await itemService.create(payload); if(created) this.items.unshift(created); return created },
    async update(id, payload) { const updated = await itemService.update(id, payload); this.items = this.items.map(i => i?.id===id?updated:i); return updated },
    async remove(id) { await itemService.delete(id); this.items = this.items.filter(i=>i?.id!==id) },

    editItem(item) { this.selected = item ?? null },
    async saveItem(item) { if(!item) return; item.id ? await this.update(item.id,item) : await this.create(item) },
    async deleteItem(id) { if(!id) return; await this.remove(id) },
    setCurrentPage(page) { if(!page || page<1) page=1; this.fetchAll(page) },

    // ✅ nova função de contagem
    countItems() { return this.items?.length ?? 0 }
  }
})
