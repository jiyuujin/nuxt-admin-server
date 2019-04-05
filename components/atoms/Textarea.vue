<template>
  <div class="j-textarea">
    <div class="j-textarea-body">
      <el-input
        :placeholder="placeholder"
        :rows="rows"
        type="textarea"
        @input="updateInput"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: String,
    rows: {
      type: Number,
      required: false,
      default: 3
    }
  },
  methods: {
    updateInput (value) {
      this.$emit('input', value)
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/main';

.j-textarea {
  display: flex;
  flex-direction: column;
}

.j-textarea-body {
  width: 583px;
}

/deep/ textarea {
  width: 100%;
  min-height: 88px;
  padding: 12px;
  border: 1px solid $ui-color;
  border-radius: 4px;
  box-shadow: inset 0 2px 5px 0 rgba(0,0,0,0.20);
  font-size: 0.875rem;
  color: $textgray-color;
  letter-spacing: 0;
  outline: none;
  line-height: 1.25rem;
  transition: all 0.2s ease-out;

  &:hover {
    border: 1px solid #8B94A5;
  }

  &:focus {
    border: 1px solid $brand-color;
  }
}

::placeholder {
  color: $textgray-color;
}

.flexbox {
  display: flex;
  line-height: 1.2;
}
</style>
