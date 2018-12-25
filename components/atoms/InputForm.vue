<template>
  <input
    v-model="newVal"
    :placeholder="column + '入力してください'"
    :type="column === 'Password' ? 'password': ''"
    required
  >
</template>

<script>
export default {
  props: {
    data: {
      type: String,
      required: true
    },
    column: {
      type: String,
      required: true
    }
  },
  computed: {
    newVal: {
      get () {
        return this.data
      },
      set (value) {
        this.$emit('form-data', value)
      }
    }
  }
}
</script>

<style scoped>
input {
  width: 50%;
  font-size: 14px;
  font-weight: bold;
  border: solid 1px;
  border-radius: 5px;
  margin: 10px 10px 10px 0;
  padding: 2px 6px 3px;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-out;
  -webkit-font-smoothing: antialiased;
}
</style>
