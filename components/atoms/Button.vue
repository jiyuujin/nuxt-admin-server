<template>
  <button
    class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
    @click="handleClick"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: String
  },
  methods: {
    handleClick (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-blue {
  @apply bg-blue text-white font-bold py-2 px-4 rounded;
}

.btn-blue:hover {
  @apply bg-blue-dark;
}
</style>
