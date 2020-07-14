<template>
  <j-form title="名前">
    <input type="file" @change="onFileChange" />
    <j-button text="Photoを追加" @handleClick="postPhoto" />
    <div v-if="state.content" style="margin-top: 12px;">
      アップロード結果:
      <div class="preview">
        <img :src="state.content" :alt="state.name" decoding="async" />
      </div>
    </div>
  </j-form>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import PhotoComposable from '~/composables/photo'

export default defineComponent({
  setup(props: {}, ctx: SetupContext) {
    const photoModule = PhotoComposable(props, ctx)
    return { ...photoModule }
  }
})
</script>

<style scoped>
.preview img {
  width: 60px;
}
</style>
