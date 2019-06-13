<template>
  <input
    :type="inputType"
    :name="name"
    :placeholder="placeholder"
    :value="value"
    :style="`background-color: ${bgColor || `#fff`}; color: ${color || `#000`};`"
    class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
    @input="updateInput"
  >
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class Input extends Vue {
  @Prop() name: string;
  @Prop() placeholder: string;
  @Prop() value: string;
  @Prop() inputType: string;
  @Prop() bgColor: string;
  @Prop() color: string;

  updateInput (event) {
    this.$emit('input', event.target.value)
  }
}
</script>

<style lang="scss" scoped>

</style>
