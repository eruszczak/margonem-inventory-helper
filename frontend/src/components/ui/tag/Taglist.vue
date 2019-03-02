<template>
  <div class="tags" :class="{ 'has-addons': attached, 'center-tags': centered }">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Taglist',
    props: {
      attached: Boolean,
      centered: Boolean
    }
  }
</script>

<style scoped>
  .center-tags {
    display: flex;
    justify-content: center;
  }
</style>
