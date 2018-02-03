<template>
  <transition :name="animation">
    <div v-if="isActive" class="modal is-active">
      <div class="modal-background" @click="close"/>
      <div class="animation-content" :class="{ 'modal-content': !hasModalCard }" :style="{ maxWidth: newWidth }">
        <slot/>
      </div>
      <button class="modal-close is-large" @click="close"/>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Modal',
    props: {
      active: Boolean,
      component: [Object, Function],
      content: String,
      hasModalCard: Boolean,
      animation: {
        type: String,
        default: 'zoom-out'
      },
      onCancel: {
        type: Function,
        default: () => {}
      },
      scroll: {
        type: String,
        default: 'clip'
      }
    },
    data () {
      return {
        isActive: this.active || false,
        savedScrollTop: null,
        newWidth: typeof this.width === 'number' ? this.width + 'px' : this.width
      }
    },
    watch: {
      active (value) {
        this.isActive = value
      },
      isActive () {
        this.handleScroll()
      }
    },
    methods: {
      handleScroll () {
        if (typeof window === 'undefined') return
        if (this.scroll === 'clip') {
          document.documentElement.classList.toggle('is-clipped', this.isActive)
          return
        }
        this.savedScrollTop = !this.savedScrollTop
          ? document.documentElement.scrollTop
          : this.savedScrollTop
        document.body.classList.toggle('is-noscroll', this.isActive)
        if (this.isActive) {
          document.body.style.top = `-${this.savedScrollTop}px`
          return
        }
        document.documentElement.scrollTop = this.savedScrollTop
        document.body.style.top = null
        this.savedScrollTop = null
      },
      close () {
        this.onCancel.apply(null, arguments)
      },
      /**
       * Keypress event that is bound to the document.
       */
      keyPress (event) {
        const ESC_KEY = 27
        if (event.keyCode === ESC_KEY) {
          this.close()
        }
      }
    },
    created () {
      if (typeof window !== 'undefined') {
        document.addEventListener('keyup', this.keyPress)
      }
    },
    mounted () {
      if (this.isActive) {
        this.handleScroll()
      }
    },
    beforeDestroy () {
      if (typeof window !== 'undefined') {
        document.removeEventListener('keyup', this.keyPress)
      }
    }
  }
</script>
