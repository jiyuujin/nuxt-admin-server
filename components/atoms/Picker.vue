<template>
  <div class="j-picker">
    <div class="j-picker-body">
      <el-date-picker
        :name="name"
        :placeholder="placeholder"
        type="date"
        format="yyyy / MM / dd"
        value-format="yyyy-MM-dd"
        @input="handleInputChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    placeholder: String,
    // value: String
  },
  methods: {
    handleInputChange(val) {
      this.$emit('input', val);
    }
  }
}
</script>

<style scoped>
.j-picker {
  display: flex;
  flex-direction: column;
}

.j-picker-body {
  width: 260px;
  height: 40px;
  position: relative;
}

/deep/ .el-date-editor.el-input {
  width: 260px;
}

/deep/ .el-input__inner {
  box-shadow: inset 0 2px 5px 0 rgba(0, 0, 0, 0.20);
}
</style>
