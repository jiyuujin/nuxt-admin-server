<template>
  <a
    href="#"
    :style="`background-color: ${bgColor}; color: ${color};`"
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    @click="click"
  >
    {{ text }}
  </a>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: {
        text: {
            type: String
        },
        bgColor: {
            type: String
        },
        color: {
            type: String
        }
    },
    methods: {
        click(event) {
            this.$emit('handleClick', event)
        }
    }
})
</script>
