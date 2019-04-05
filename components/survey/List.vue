<template>
  <div>
    <div
      v-for="item in list"
      :key="item.id"
    >
      <h2
        v-if="item.page === number"
      >
        {{ item.data.reason }}
        <span class="feeling">
          <img
            :src="getFeeling(item.data.feeling)"
            :alt="item.data.feeling"
          >
        </span>
      </h2>

      <div class="want">
        {{ item.data.want }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    number: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      //
    }
  },
  methods: {
    getFeeling(img) {
      switch(img) {
        case 1:
          return 'feel_good.png'
        case 2:
          return 'feel_normal.png'
        case 3:
          return 'feel_bad.png'
        default:
          return ''
      }
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

.feeling {
  float: right;
}

.feeling img {
  width: 25px;
}

.want {
  margin-bottom: 20px;
  font-size: 12px;
  color: #8b0000;
}
</style>
