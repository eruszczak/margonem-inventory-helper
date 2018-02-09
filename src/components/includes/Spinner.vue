<template>
  <div class="loader" :style="{'width': sizeValue, 'height': sizeValue}"></div>
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
  /*https://codepen.io/zesda/pen/VyWERr*/
  .loader {
    -webkit-animation: spin 1.5s linear infinite;
    animation: spin 1.5s linear infinite;
    border: 3px solid #ddd;
    border-radius: 50%;
    height: 45px;
    width: 45px;
    margin: 0px auto;
  }

  @-webkit-keyframes spin {
    0% {
      border-top-color:#42a5f5;
    }
    50% {
      border-top-color: #ec407a;
    }
    100% {
      border-top-color:#42a5f5;
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      border-top-color:#42a5f5;
    }
    50% {
      border-top-color: #ec407a;
    }
    100% {
      border-top-color:#42a5f5;
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

</style>
