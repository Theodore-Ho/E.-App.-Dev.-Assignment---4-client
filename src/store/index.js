import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedstate from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    page: 1, // default page 1
    limit: 12, // default 12 items a page
    filter: [], // default empty filter
  },
  getters: {
  },
  mutations: {
    setPage(state, payload) {
      state.page = payload;
    },
    setLimit(state, payload) {
      state.limit = payload;
    },
    setFilter(state, payload) {
      state.filter = payload;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedstate({
      key: 'Assignment4',
      paths: ['page', 'limit', 'filter']
    })
  ]
})
