<template>
  <button @click="handleClick">
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
@import '../../assets/main';

button {
  border-radius: 4px;
  overflow: hidden;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-out;
  letter-spacing: 0;
  line-height: 0;
  font-size: 0.875rem;
  padding: 0 1.5rem;
  height: 40px;
  color: $white-color;
  background: $brand-color;
  border-color: $brand-color;

  &:hover,
  &:focus {
    opacity: 0.8;
  }

  &:focus {
    box-shadow: 0 0 0 0.2em rgba($brand-color, 0.2);
    outline: none;
  }
}
</style>
