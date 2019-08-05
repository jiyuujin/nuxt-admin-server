<template>
  <select
    :multiple="multiple"
    :style="`background-color: ${bgColor || `#fff`}; color: ${color || `#000`};`"
    class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey"
    @input="updateInput"
  >
    <option
      v-for="(value, key) in options"
      :key="String(key)"
      :value="String(key)"
    >
      {{ String(value) }}
    </option>
  </select>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    options: {
      type: Array
    },
    multiple: {
      type: Boolean
    },
    bgColor: {
      type: String
    },
    color: {
      type: String
    }
  },
  methods: {
    updateInput (event) {
      this.$emit('input', event.target.selectedIndex)
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
