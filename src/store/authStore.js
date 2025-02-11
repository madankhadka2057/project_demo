import { create } from 'zustand';
import api from '../lib/api';

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,
  
  setUser: (user) => set({ user }),
  
  login: async (credentials) => {
    try {
      set({ loading: true, error: null });
      const { data } = await api.post('/auth/login', credentials);
      localStorage.setItem('token', data.token);
      set({ user: data.user, loading: false });
      return data;
    } catch (error) {
      set({ error: error.response?.data?.error || 'Login failed', loading: false });
      throw error;
    }
  },

  register: async (userData) => {
    try {
      set({ loading: true, error: null });
      const { data } = await api.post('/auth/register', userData);
      localStorage.setItem('token', data.token);
      set({ user: data.user, loading: false });
      return data;
    } catch (error) {
      set({ error: error.response?.data?.error || 'Registration failed', loading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null });
  },

  updateProfile: async (userData) => {
    try {
      set({ loading: true, error: null });
      const { data } = await api.put(`/users/profile`, userData);
      set({ user: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.response?.data?.error || 'Update failed', loading: false });
      throw error;
    }
  }
}));