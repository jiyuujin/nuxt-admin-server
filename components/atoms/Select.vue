<template>
  <select
    :name="name"
    :multiple="multiple"
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
    updateInput (event) {
      this.$emit('input', event.target.selectedIndex)
    }
  }
}
</script>

<style scoped>

</style>
