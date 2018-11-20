<template>
  <div>
    <span
      v-for="(item, index) in list"
      :key="index"
      :style="'background-color: ' + getBackgroundColor(item) + '; color: ' + getColor(item) + ';'"
      class="tag-text"
    >
      {{ item }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  methods: {
    getBackgroundColor(name) {
      return this.categories.find((category) => {
        if (category.name === name) return category
      }).backgroundColor
    },
    getColor(name) {
      return this.categories.find((category) => {
        if (category.name === name) return category
      }).color
    }
  }
}
</script>

<style scoped>
.tag-text{
  margin: 5px;
  padding: 5px;
  line-height: 2;
  box-shadow: 0 2px 10px rgba(0,0,0,.5);
  /* 角丸 */
  -webkit-border-radius: 10px; /* Safari, Chrome */
  -moz-border-radius: 10px; /* Firefox */
  border-radius: 10px;
}
</style>
