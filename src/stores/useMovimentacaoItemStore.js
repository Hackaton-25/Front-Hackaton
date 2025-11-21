import { defineStore } from 'pinia'
import itemService from '@/services/movimentacaoItem'

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
        // data can be array or { results: [], count:.. }
        const arr = Array.isArray(data) ? data : (data.results ?? data)
        // normalize: remove falsy and ensure objects
        this.items = (arr || []).filter(Boolean).map(i => i || null)
        // pagination fields if available
        if (data && typeof data === 'object') {
          this.totalPages = data.total_pages ?? data.totalPages ?? Math.max(1, Math.ceil((data.count ?? arr.length) / 10))
        } else {
          this.totalPages = 1
        }
        // debug
        // console.debug('[movimentacao] fetchAll result:', this.items)
      } catch (err) {
        this.error = 'Falha ao carregar movimentações'
        console.error('[useMovimentacaoItemStore] fetchAll error:', err)
        this.items = []
        this.totalPages = 1
      } finally {
        this.loading = false
      }
    },

    async fetch(id) {
      this.loading = true
      try {
        const data = await itemService.get(id)
        this.selected = data ?? null
      } catch (err) {
        this.error = `Falha ao carregar movimentação ${id}`
        console.error('[useMovimentacaoItemStore] fetch error:', err)
      } finally {
        this.loading = false
      }
    },

    async create(payload) {
      this.loading = true
      try {
        const created = await itemService.create(payload)
        if (created) this.items.unshift(created)
        return created
      } catch (err) {
        this.error = 'Falha ao criar movimentação'
        console.error('[useMovimentacaoItemStore] create error:', err)
      } finally {
        this.loading = false
      }
    },

    async update(id, payload) {
      this.loading = true
      try {
        const updated = await itemService.update(id, payload)
        this.items = this.items.map(i => (i && i.id === id ? updated : i))
        return updated
      } catch (err) {
        this.error = `Falha ao atualizar movimentação ${id}`
        console.error('[useMovimentacaoItemStore] update error:', err)
      } finally {
        this.loading = false
      }
    },

    async remove(id) {
      this.loading = true
      try {
        await itemService.delete(id)
        this.items = this.items.filter(i => i && i.id !== id)
      } catch (err) {
        this.error = `Falha ao remover movimentação ${id}`
        console.error('[useMovimentacaoItemStore] remove error:', err)
      } finally {
        this.loading = false
      }
    },

    // convenience methods expected by the table/dashboard
    editItem(item) {
      this.selected = item ?? null
    },

    async saveItem(item) {
      if (!item) return
      if (item.id) {
        await this.update(item.id, item)
      } else {
        await this.create(item)
      }
    },

    async deleteItem(id) {
      if (!id) return
      await this.remove(id)
    },

    setCurrentPage(page) {
      if (!page || page < 1) page = 1
      this.fetchAll(page)
    }
  }
})
