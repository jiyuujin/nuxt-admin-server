<template>
    <input
        :type="inputType"
        :placeholder="placeholder"
        :value="value"
        :style="`background-color: ${bgColor || `#fff`}; color: ${color || `#000`};`"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
        @input="update"
    >
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: {
        placeholder: {
            type: String
        },
        value: {
            type: String
        },
        inputType: {
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
        update(event) {
            this.$emit('input', event.target.value)
        }
    }
})
</script>
