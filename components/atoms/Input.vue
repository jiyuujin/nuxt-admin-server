<template>
  <input
    :type="inputType"
    :name="name"
    :placeholder="placeholder"
    :value="value"
    class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
    @input="updateInput"
  >
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
      console.log(event.target.value)
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style scoped>

</style>
