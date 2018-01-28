<template>
  <transition :name="transitionName">
    <div v-show="isActive" class="tab-item">
      <slot/>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'TabItem',
    props: {
      label: String,
      icon: String,
      iconPack: String,
      disabled: Boolean
    },
    data () {
      return {
        isActive: false,
        transitionName: null
      }
    },
    methods: {
      activate (oldIndex, index) {
        this.transitionName = index < oldIndex ? 'slide-next' : 'slide-prev'
        this.isActive = true
      },
      deactivate (oldIndex, index) {
        this.transitionName = index < oldIndex ? 'slide-next' : 'slide-prev'
        this.isActive = false
      }
    },
    created () {
      this.$parent.tabItems.push(this)
    },
    beforeDestroy () {
      const index = this.$parent.tabItems.indexOf(this)
      if (index >= 0) {
        this.$parent.tabItems.splice(index, 1)
      }
    }
  }
</script>
