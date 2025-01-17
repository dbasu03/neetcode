import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const fetchProblems = () => API.get('/problems');
export const fetchProblem = (id) => API.get(`/problems/${id}`);
export const addProblem = (data, token) =>
  API.post('/problems', data, { headers: { Authorization: `Bearer ${token}` } });
