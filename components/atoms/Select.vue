<template>
  <div class="j-select">
    <el-select
      :name="name"
      :value="value ? String(value) : `選択してください`"
      :multiple="multiple"
      @input="updateInput"
    >
      <el-option
        v-for="(value, key) in options"
        :key="String(key)"
        :label="String(value)"
        :value="String(key)"
      />
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    value: {
      validator () {
        return true
      }
    },
    options: {
      required: true,
      validator () {
        return true
      }
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    updateInput (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/main';

.j-select /deep/ .el-input__inner {
  height: 40px;
  background: $white-color;
  border: 1px solid $ui-color;
  box-shadow: inset 0 2px 5px 0 rgba(0,0,0,0.20);
  border-radius: 4px;

  &:focus {
   border: 1px solid $brand-color;
  }
}

.el-input__inner {
  border: 1px solid $brand-color;
}

.el-select-dropdown__item {
  color: $textgray-color;
}

.el-select-dropdown__item.hover {
  background-color: $ui-color;
}

.el-select-dropdown__item.selected.hover,
.el-select-dropdown__item.selected {
  color: $white-color;
  background-color: $brand-color;
}

.flexbox {
  display: flex;
  line-height: 1.5;
}
</style>
