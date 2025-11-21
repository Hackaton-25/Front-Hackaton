import { defineStore } from 'pinia';
import imagemItemService from '@/services/imagemItem';

export const useImagemItemStore = defineStore('imagemItem', {
  state: () => ({
    items: [],
    selected: null,
  }),

  actions: {
    async fetchAll() {
      this.items = await imagemItemService.list();
    },

    async fetch(id) {
      this.selected = await imagemItemService.get(id);
    },

    async create(formData) {
      const created = await imagemItemService.create(formData);
      this.items.push(created);
      return created;
    },

    async update(id, payload) {
      const updated = await imagemItemService.update(id, payload);
      this.items = this.items.map((i) => (i.id === id ? updated : i));
      return updated;
    },

    async remove(id) {
      await imagemItemService.delete(id);
      this.items = this.items.filter((i) => i.id !== id);
    },
  },
});
