<template>
  <div class="form">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class FormTemplate extends Vue {}
</script>

<style scoped>
.form {
  margin: 0 auto;
  padding-bottom: 10px;
}
</style>
