<template>
  <div>
    <div
      v-for="item in list"
      :key="item.id"
    >
      <h2
        v-if="item.page === number"
      >
        <span>
          {{ item.data.category.text }}
        </span>
        ・
        {{ item.data.title }}
      </h2>

      <div class="description">
        {{ item.data.description }}
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
  }
}
</script>

<style scoped>
h2 {
  font-size: 18px;
}

.description {
  margin-bottom: 20px;
  font-size: 12px;
  color: #8b0000;
}
</style>
