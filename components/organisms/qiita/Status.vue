<template>
  <h3>
    Qiita <span v-if="list">[{{ categoryText }}] {{ list.length }} 件登録中</span>
  </h3>
</template>

<script>
import { CATEGORIES } from '../../../utils/categories'
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    tag: {
      type: Number,
      required: true
    }
  },
  computed: {
    categoryText() {
      return CATEGORIES.find(category => {
        if (category.value === this.tag) {
          return category
        }
      }).text
    }
  }
}
</script>

<style scoped>

</style>
