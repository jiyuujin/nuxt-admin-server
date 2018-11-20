<template>
  <h3>
    Qiita <span v-if="list">[{{ tag }}] {{ list.length }} 件登録中</span>
  </h3>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    tag: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
