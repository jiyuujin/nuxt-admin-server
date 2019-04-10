<template>
  <label
    :style="`background-color:${bgColor}; color:${color};`"
    class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2"
  >
    {{ text }}
  </label>
</template>

<script>
export default {
  props: {
    text: String,
    bgColor: {
      type: String,
      default: '#fff'
    },
    color: {
      type: String,
      default: '#000'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/main';
</style>
