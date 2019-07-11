<template>
  <label
    :style="`background-color:${bgColor || `#fff`}; color:${color || `#000`};`"
    class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2"
  >
    {{ text }}
  </label>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    text: {
      type: String
    },
    bgColor: {
      type: String
    },
    color: {
      type: String
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
