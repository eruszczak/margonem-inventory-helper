<template>
  <td :class="{ 'has-text-centered': centered }">
    <span>
      <slot></slot>
    </span>
  </td>
</template>

<script>
  export default {
    name: 'TableColumn',
    props: {
      centered: Boolean
    }
  }
</script>
