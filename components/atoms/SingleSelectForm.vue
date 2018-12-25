<template>
  <div>
    <div>
      <label>
        {{ column }}選択してください
      </label>
    </div>
    <div>
      <select
        v-model="newVal"
      >
        <option
          v-for="item in option"
          :key="item.value"
          :value="item.value"
        >
          {{ item.text }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    option: {
      type: Array,
      required: true
    },
    text: {
      type: String
    },
    number: {
      type: Number
    },
    column: {
      type: String,
      required: true
    }
  },
  computed: {
    newVal: {
      get () {
        if (this.text) return this.text
        else return this.number
      },
      set (value) {
        this.$emit('form-data', value)
      }
    }
  }
}
</script>

<style scoped>
select {
  width: 50%;
  font-size: 14px;
  font-weight: bold;
  border: solid 1px;
  border-radius: 5px;
  margin: 5px 10px 5px 0;
  padding: 2px 6px 3px;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-out;
  -webkit-font-smoothing: antialiased;
}
</style>
