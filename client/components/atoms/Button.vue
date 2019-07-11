<template>
  <button
    :style="`background-color: ${bgColor}; color: ${color};`"
    class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
    @click="handleClick"
  >
    {{ text }}
  </button>
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
  },
  methods: {
    handleClick (event) {
      this.$emit('click', event)
    }
  }
})
</script>

<style lang="scss" scoped>
button {
  @apply bg-blue-500 text-white font-bold py-2 px-4 rounded;
}

button:hover {
  @apply bg-blue-700;
}
</style>
