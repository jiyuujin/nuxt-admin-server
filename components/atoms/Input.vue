<template>
  <div class="j-input">
    <div class="j-input-body">
      <input
        :type="inputType"
        :name="name"
        :placeholder="placeholder"
        :value="value"
        @input="updateInput"
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    placeholder: String,
    value: String,
    inputType: {
      type: String,
      required: false,
      default: 'text'
    }
  },
  methods: {
    updateInput (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/main';

.j-input {
  display: flex;
  flex-direction: column;
}

.j-input-body {
  width: 260px;
  height: 40px;
  position: relative;
}

input {
  width: 100%;
  height: 40px;
  padding: 13px;
  background: $white-color;
  border: 1px solid $ui-color;
  box-shadow: inset 0 2px 5px 0 rgba(0,0,0,0.20);
  border-radius: 4px;
  font-size: 0.875rem;
  color: $textgray-color;
  letter-spacing: 0;
  outline: none;
  transition: all 0.2s ease-out;
}

input:hover {
  border: 1px solid #8B94A5;
}

input:focus {
  border: 1px solid $brand-color;
}

::placeholder {
  color: $textgray-color;
}

.flexbox {
  display: flex;
  line-height: 1.5;
}
</style>
