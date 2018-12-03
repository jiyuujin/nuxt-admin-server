<template>
  <v-container
    align-center
    justify-center
    row
    fill-height
  >
    <slot />
  </v-container>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean
    }
  }
}
</script>

<style scoped>

</style>
