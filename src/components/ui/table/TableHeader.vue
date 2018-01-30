<template>
  <th>
    <div class="th-wrap" :class="{ 'is-centered': centered }">
      <slot/>
    </div>
  </th>
</template>

<script>
  export default {
    name: 'TableHeader',
    props: {
      centered: Boolean
    },
    data () {
      return {
      }
    }
  }
</script>
