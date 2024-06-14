import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    token: localStorage.getItem('token') || '',
    files: []
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearToken(state) {
      state.token = '';
      localStorage.removeItem('token');
    },
    setFiles(state, files) {
      state.files = files;
    }
  },
  actions: {
    async login({ commit }, user) {
      const response = await axios.post('/users/login', user);
      commit('setToken', response.data);
    },
    async fetchFiles({ commit }) {
      try {
        const response = await axios.get('/files', {
          headers: {
            'Authorization': `Bearer ${this.state.token}`
          }
        });
        commit('setFiles', response.data);
      } catch (error) {
        console.error('Failed to fetch files', error);
        commit('setFiles', []); // API 호출 실패 시 파일 목록을 빈 배열로 설정
      }
    },
    async uploadFiles({ commit }, formData) {
      await axios.post('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${this.state.token}`
        }
      });
    }
  }
});
