<template>
  <select
    :name="name"
    :multiple="multiple"
    class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey"
    @input="updateInput"
  >
    <option
      v-for="(value, key) in options"
      :key="String(key)"
      :value="String(key)"
    >
      {{ String(value) }}
    </option>
  </select>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class Select extends Vue {
  @Prop() name: string;
  @Prop() value: string;
  @Prop() options: string[];
  @Prop() multiple: boolean;

  updateInput (event) {
    this.$emit('input', event.target.selectedIndex)
  }
}
</script>

<style scoped>

</style>
