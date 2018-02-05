<template>
  <button class="button" :class="[type, size]" v-clipboard:copy="content" v-clipboard:success="onCopy">{{ value }}</button>
</template>

<script>
  export default {
    name: 'clipboard',
    props: {
      content: String,
      value: String,
      message: {
        type: String,
        default: 'Skopiowano do schowka'
      },
      type: String,
      size: String
    },
    methods: {
      onCopy (e) {
        this.$toast.info(this.message)
      }
    }
  }
</script>

<style scoped>

</style>
