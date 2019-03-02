<template>
  <div v-if="attached && closable" class="tags has-addons">
      <span class="tag" :class="[type, size, { 'is-rounded': rounded }]">
        <slot></slot>
      </span>
    <a class="tag is-delete"
       role="button"
       :tabindex="tabstop ? 0 : false"
       :disabled="disabled"
       :class="[size, { 'is-rounded': rounded }]">
    </a>
  </div>
  <span v-else class="tag" :class="[type, size, { 'is-rounded': rounded }]">
    <slot></slot>
  </span>
</template>

<script>
  export default {
    name: 'Tag',
    props: {
      attached: Boolean,
      closable: Boolean,
      type: String,
      size: String,
      rounded: Boolean,
      disabled: Boolean,
      tabstop: {
        type: Boolean,
        default: true
      }
    }
  }
</script>
