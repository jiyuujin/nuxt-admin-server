<template>
  <div>
    <div
      v-for="item in list"
      :key="item.name"
    >
      <div
        :style="item.error_message !== null ? 'background-color: #CC0000; color: #fff;' : null"
      >
        <p
          v-if="item.error_message"
          class="error_message"
        >
          {{ item.name }} : {{ item.error_message }}
        </p>
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
    }
  }
}
</script>

<style scoped>
.error_message {
  font-size: 8px;
}
</style>
