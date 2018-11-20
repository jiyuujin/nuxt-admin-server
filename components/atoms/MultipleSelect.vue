<template>
  <v-flex xs12>
    <v-select
      :items="option"
      v-model="newVal"
      label=""
      multiple
      chips
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
    data: {
      type: Array,
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

</style>
