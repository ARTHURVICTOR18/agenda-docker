// src/api.js

import axios from 'axios';

// Cria uma instância do Axios apontando para o back-end NestJS
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000', // ajuste se necessário
  headers: {
    'Content-Type': 'application/json',
  },
});

// ----------------------
// Rotas do ContatoController
// ----------------------

// 1) GET /contatos      → lista todos os contatos
export const getAllContatos = async () => {
  const response = await api.get('/contatos');
  return response.data; // retorna um array de objetos { id, nome, email, telefone, observacoes, criadoEm }
};

// 2) GET /contatos/:id  → busca um contato pelo ID
export const getContatoById = async (id) => {
  const response = await api.get(`/contatos/${id}`);
  return response.data; // retorna o objeto do contato
};

// 3) POST /contatos     → cria um novo contato
//    recebe um objeto { nome, email, telefone?, observacoes? }
export const createContato = async (contatoData) => {
  const response = await api.post('/contatos', contatoData);
  return response.data; // retorna o contato criado (com id e criadoEm)
};

// 4) PUT /contatos/:id  → atualiza campos de um contato existente
//    recebe um objeto parcial { nome?, email?, telefone?, observacoes? }
export const updateContato = async (id, updatedData) => {
  const response = await api.put(`/contatos/${id}`, updatedData);
  return response.data; // retorna o contato atualizado
};

// 5) DELETE /contatos/:id → remove um contato pelo ID
export const deleteContato = async (id) => {
  // Nota: o back-end responde com status 204 e body vazio
  await api.delete(`/contatos/${id}`);
  return; // não retorna dado específico
};

// Exporta a própria instância do Axios, caso precise de outras chamadas genéricas
export default api;
