<template>
  <transition :enter-active-class="transition.enter" :leave-active-class="transition.leave">
    <div v-show="isActive" class="toast" :class="[type, position]">
      <div v-html="message"></div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'is-warning'
      },
      message: String,
      duration: {
        type: Number,
        default: 1000
      },
      position: {
        type: String,
        default: 'is-bottom-right' // is-top/bottom-left/right
      },
      container: {
        type: String,
        default: '#content'
      }
    },
    data () {
      return {
        newDuration: this.duration,
        isActive: false,
        parentTop: null,
        parentBottom: null,
        newContainer: this.container,
        isTop: this.position.indexOf('is-top') > -1
      }
    },
    computed: {
      correctParent () {
        if (this.isTop) {
          return this.parentTop
        }
        return this.parentBottom
      },
      transition () {
        if (this.isTop) {
          return {
            enter: 'fadeInDown',
            leave: 'fadeOut'
          }
        }
        return {
          enter: 'fadeInUp',
          leave: 'fadeOut'
        }
      }
    },
    methods: {
      close () {
        clearTimeout(this.timer)
        this.isActive = false
        setTimeout(() => {
          this.$destroy()
          // removeElement(this.$el)
        }, 150)
      },

      showNotice () {
        this.correctParent.insertAdjacentElement('afterbegin', this.$el)
        this.isActive = true
        this.timer = setTimeout(() => this.close(), this.newDuration)
      },
      setupContainer () {
        this.parentTop = document.querySelector('.notices.is-top')
        this.parentBottom = document.querySelector('.notices.is-bottom')

        if (this.parentTop && this.parentBottom) return

        if (!this.parentTop) {
          this.parentTop = document.createElement('div')
          this.parentTop.className = 'notices is-top'
        }

        if (!this.parentBottom) {
          this.parentBottom = document.createElement('div')
          this.parentBottom.className = 'notices is-bottom'
        }

        const container = document.querySelector(this.newContainer) || document.body

        container.appendChild(this.parentTop)
        container.appendChild(this.parentBottom)
      }
    },
    beforeMount () {
      this.setupContainer()
    },
    mounted () {
      this.showNotice()
    }
  }
</script>
