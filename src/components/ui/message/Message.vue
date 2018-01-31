<template>
  <transition name="fade">
    <article class="message" :class="type">
      <div v-if="header" class="message-header">
        <p>{{ header }}</p>
      </div>
      <div class="message-body">
        <div class="media-content">
          <slot></slot>
        </div>
      </div>
    </article>
  </transition>
</template>

<script>
  export default {
    name: 'message',
    props: ['header', 'type']
  }
</script>

<style scoped>
  .media-content {
    margin-top: -15px;
  }
</style>
