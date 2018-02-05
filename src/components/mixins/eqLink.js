import { getEqUrl } from '../../utils/helpers'

export const eqLink = {
  methods: {
    getEqLink: function (eqItems) {
      return getEqUrl(this.$router, eqItems)
    }
  }
}
