import api from '@/plugins/axios'

export default {
  list: async () => {
    const { data } = await api.get('auditorias/')
    return data
  },
  get: async (id) => {
    const { data } = await api.get(`auditorias/${id}/`)
    return data
  }
}
