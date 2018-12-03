<template>
  <div>
    <h3>
      Setting
    </h3>
    <div
      v-for="item in list"
      :key="item.name"
    >
      <div
        :style="item.error_message !== null ? 'background-color: #CC0000; color: #fff;' : null"
      >
        <p class="netlify__name">
          {{ item.name }} - {{ item.build_settings.dir }} / {{ item.build_settings.cmd }}
          <span
            v-if="item.error_message"
            class="netlify_error_message"
          >
            {{ item.error_message }}
          </span>
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
.netlify__name {
  font-size: 12px;
}
.netlify_error_message {
  font-size: 8px;
}
</style>
