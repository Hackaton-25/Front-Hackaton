import api from '@/plugins/axios';

const endpoint = 'imagens-itens';

export default {
  list: async () => {
    const { data } = await api.get(`${endpoint}/`);
    return data;
  },

  get: async (id) => {
    const { data } = await api.get(`${endpoint}/${id}/`);
    return data;
  },

  create: async (payload) => {
    // payload deve ser FormData
    const { data } = await api.post(`${endpoint}/`, payload, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  },

  update: async (id, payload) => {
    const { data } = await api.patch(`${endpoint}/${id}/`, payload, {
      headers: payload instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'application/json' }
    });
    return data;
  },

  delete: async (id) => {
    const { data } = await api.delete(`${endpoint}/${id}/`);
    return data;
  },
};
