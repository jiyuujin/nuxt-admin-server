<template>
  <div>
    <div
      v-for="item in list"
      :key="item.title"
    >
      <h2>
        <a
          :href="item.url"
          target="_blank"
        >
          {{ item.title }}
        </a>
        <span>
          {{ date.getDiffTime(item.updated_at) }}
        </span>
      </h2>

      <div
        v-if="item.user"
        class="user"
      >
        <img
          v-if="item.user['profile_image_url']"
          :src="item.user['profile_image_url']"
        >
        {{ item.user['id'] }}
        <span v-if="item.user['location']">
          @{{ item.user['location'] }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Date from '~/utils/date'
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    search: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      date: Date,
    }
  }
}
</script>

<style scoped>
h2 {
  font-size: 18px;
}

h2 a {
  color: #808080;
  text-decoration: none;
}

h2 span {
  float: right;
}

.user {
  font-size: 14px;
  margin-bottom: 20px;
}

.user img {
  width: 12px;
}
</style>
