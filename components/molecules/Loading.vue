<template>
  <div
    v-if="loading"
    class="loading-page"
  >
    <p>
      Loading...
    </p>
  </div>
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
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}
</style>
