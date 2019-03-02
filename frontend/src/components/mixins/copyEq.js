import { mapActions } from 'vuex'

export const copyEq = {
  methods: {
    ...mapActions(['saveEqAsMine']),
    copyEq: function (eqItems) {
      this.saveEqAsMine(eqItems)
      this.$toast.info('Podmieniono zestaw')
    }
  }
}
