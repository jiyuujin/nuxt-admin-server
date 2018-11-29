<template>
  <a
    :href="baseVideoUrl + id"
    target="_blank"
  >
    <img
      :src="baseImageUrl + id + '/0.jpg'"
      :alt="id"
    >
  </a>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      baseImageUrl: 'https://img.youtube.com/vi/',
      baseVideoUrl: 'https://www.youtube.com/watch?v='
    }
  }
}
</script>

<style scoped>
img {
  width: 30%;
  margin: 10px;
}
</style>
