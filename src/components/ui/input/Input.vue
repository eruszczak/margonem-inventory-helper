<template>
  <input class="input" v-model="newValue" :type="type" :name="name" :disabled="disabled" :placeholder="placeholder"/>
</template>

<script>
  export default {
    name: 'Input',
    props: {
      value: [String, Number, Boolean, Function, Object, Array, Symbol],
      disabled: Boolean,
      type: String,
      name: String,
      size: String,
      placeholder: String
    },
    data () {
      return {
        newValue: this.value
      }
    },
    watch: {
      /**
       * When v-model change, set internal value.
       */
      value (value) {
        this.newValue = value
      },
      /**
       * Emit input event to update the user v-model.
       */
      newValue (value) {
        this.$emit('input', value)
      }
    }
  }
</script>
