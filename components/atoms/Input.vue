<template>
  <v-flex xs12>
    <v-text-field
      v-model="newVal"
      :label="column + '入力してください'"
      required
    ></v-text-field>
  </v-flex>
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

</style>
