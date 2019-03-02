export default {
  state: {
    modalActive: false
  },
  getters: {
    modalActive: state => state.modalActive
  },
  mutations: {
    closeModal: state => {
      state.modalActive = false
    },
    toggleModal: state => {
      state.modalActive = !state.modalActive
    }
  }
}
