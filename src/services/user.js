import api from '@/plugins/axios' // supondo que api.js esteja na pasta services

// Função para listar usuários (requer que backend esteja configurado para permitir)
export const fetchUsers = async () => {
  try {
    const response = await api.get('usuarios/')
    return response.data
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    throw error
  }
}

// Função para criar usuário (cadastro)
export const createUser = async (userData) => {
  try {
    const response = await api.post('usuarios/', userData)
    return response.data
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    throw error
  }
}

// Função para obter dados do próprio usuário
export const fetchMe = async () => {
  try {
    const response = await api.get('usuarios/me/')
    return response.data
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error)
    throw error
  }
}

// Função para atualizar usuário
export const updateUser = async (id, userData) => {
  try {
    const response = await api.patch(`usuarios/${id}/`, userData)
    return response.data
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    throw error
  }
}

// user.js
export const loginUser = async (email, password) => {
  const payload = { email, password };
  console.log("Payload enviado para backend:", payload);
  const { data } = await api.post('/login-hack/', payload);
  return data;
};

