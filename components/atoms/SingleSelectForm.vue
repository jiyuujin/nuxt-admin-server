<template>
  <v-flex xs12>
    <v-select
      :items="option"
      v-model="newVal"
      label=""
      single-line
      :hint="column + '選択してください'"
      persistent-hint
    ></v-select>
  </v-flex>
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
