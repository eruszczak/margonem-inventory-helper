<template>
  <td :class="{ 'has-text-right': !centered, 'has-text-centered': centered }" :data-label="label">
    <span>
      <slot></slot>
    </span>
  </td>
</template>

<script>
  export default {
    name: 'TableColumn',
    props: {
      label: String,
      customKey: [String, Number],
      field: String,
      meta: {},
      width: [Number, String],
      numeric: Boolean,
      centered: Boolean,
      sortable: Boolean,
      visible: {
        type: Boolean,
        default: true
      },
      customSort: Function
    },
    data () {
      return {
      }
    }
  }
</script>
