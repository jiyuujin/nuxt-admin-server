<template>
  <label
    :style="`background-color:${bgColor}; color:${color};`"
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

label {
  border: 0;
  border-radius: 24px;
  box-shadow: inset 0 2px 5px 0 rgba(0,0,0,0.20);
  overflow: hidden;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-out;
  letter-spacing: 0;
  line-height: 0;
  font-size: 0.75rem;
  padding: 0.4rem 0.8rem;
  height: 32px;
}
</style>
