<template>
  <div>
    <h3>
      Video
      <span>
        {{ list.length }} 件登録中
      </span>
    </h3>
    <div
      v-for="item in list"
      :key="item.data.videoID"
      class="box"
    >
      <Video
        :id="item.data.videoID"
        class="video"
      />
      <p>
        {{ item.data.title }}
      </p>
    </div>
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
.box {
  height: auto;
  /*margin: 0;*/
  display: flex;
  text-align: center;
  align-items: center;
}

.box .video {
  width: 25%;
  float: left;
  padding: 10px;
}

.box p {
  width: 75%;
  text-align: left;
  overflow: hidden;
  vertical-align: middle;
}</style>
