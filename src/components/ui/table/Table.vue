<template>
  <div class="b-table" :class="{ 'is-loading': loading }">
    <div class="table-wrapper">
      <table class="table is-striped is-narrow" :class="tableClasses">
        <thead>
          <slot name="header"/>
        </thead>
        <slot name="tbody"/>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Table',
    props: {
      data: {
        type: Array,
        default: () => []
      },
      bordered: Boolean,
      striped: Boolean,
      narrowed: Boolean,
      hoverable: Boolean,
      loading: Boolean,
      detailed: Boolean,
      checkable: Boolean,
      selected: Object,
      focusable: Boolean,
      customIsChecked: Function
    },
    computed: {
      tableClasses () {
        return {
          'is-bordered': this.bordered,
          'is-striped': this.striped,
          'is-narrow': this.narrowed,
          'has-mobile-cards': this.mobileCards,
          'is-hoverable': (
            (this.hoverable || this.focusable) &&
            this.visibleData.length
          )
        }
      }
    }
  }
</script>
