import api from '@/plugins/axios'

export const crudService = (endpoint) => ({
  list: async () => {
    const { data } = await api.get(`${endpoint}/`)
    return data
  },

  get: async (id) => {
    const { data } = await api.get(`${endpoint}/${id}/`)
    return data
  },

  create: async (payload) => {
    const { data } = await api.post(`${endpoint}/`, payload)
    return data
  },

  update: async (id, payload) => {
    const { data } = await api.patch(`${endpoint}/${id}/`, payload)
    return data
  },

  delete: async (id) => {
    const { data } = await api.delete(`${endpoint}/${id}/`)
    return data
  },
})
