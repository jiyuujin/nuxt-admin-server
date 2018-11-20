<template>
  <v-pagination
    v-model="pagination.page"
    :length="pages"
  />
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      pagination: {
        page: this.currentPage
      }
    }
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) return 0;
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
    }
  },
  watch: {
    'pagination.page'(newVal) {
      this.pagination.page = newVal
      this.$emit('form-data', newVal)
    }
  }
}
</script>

<style scoped>

</style>
