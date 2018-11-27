<template>
  <h3>
    Tip <span v-if="list">{{ list.length }} 件登録中</span>
  </h3>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
