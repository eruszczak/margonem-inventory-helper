export default {
  state: {
    searchQuery: ''
  },
  getters: {
    searchQuery: state => state.searchQuery
  },
  mutations: {
    setSearchQuery: (state, query) => {
      state.searchQuery = query
    }
  }
}
