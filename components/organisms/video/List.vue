<template>
  <div>
    <span
      v-for="item in list"
      :key="item.data.videoID"
    >
      <Video
        :id="item.data.videoID"
      />
    </span>
  </div>
</template>

<script>
import Video from '~/components/atoms/Video'
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  components: {
    Video
  }
}
</script>

<style scoped>

</style>
