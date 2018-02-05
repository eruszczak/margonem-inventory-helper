<template>
  <div class="vue-simple-spinner" :style="{'width': sizeValue, 'height': sizeValue}"></div>
</template>

<script>
  export default {
    name: 'spinner',
    props: {
      size: {
        type: String,
        default: '42'
      }
    },
    data () {
      return {
        sizeValue: `${this.size}px`
      }
    }
  }
</script>

<style scoped>
  .vue-simple-spinner {
    transition: all .3s linear;
    margin: 0px auto;
    border-radius: 100%;
    border: 3px solid rgb(238, 238, 238);
    border-top-color: rgb(33, 150, 243);
    border-image: initial;
    animation: vue-simple-spinner-spin 0.8s linear infinite;
  }
  @keyframes vue-simple-spinner-spin {
    0% {
      transform: rotate(0deg)
    }
    to {
      transform: rotate(1turn)
    }
  }
</style>
