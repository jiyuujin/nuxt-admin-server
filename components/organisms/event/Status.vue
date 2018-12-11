<template>
  <h3>
    Event <span v-if="size">{{ size }} 件登録中</span>
  </h3>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
