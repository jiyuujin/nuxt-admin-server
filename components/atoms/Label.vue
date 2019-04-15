<template>
  <label
    :style="`background-color:${bgColor || `#fff`}; color:${color || `#000`};`"
    class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2"
  >
    {{ text }}
  </label>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class Label extends Vue {
  @Prop() text: string;
  @Prop() bgColor: string;
  @Prop() color: string;
}
</script>

<style scoped>

</style>
