<template>
  <component :is="svg" style="width: 16px; height: 16px;" />
</template>

<script lang="ts">
import { defineComponent, SetupContext, computed } from '@vue/composition-api'

type SvgProps = {
  name: string
}

export default defineComponent({
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  setup(props: SvgProps, ctx: SetupContext) {
    const svg = computed(() => {
      return () => import(`~/assets/img/${props.name}.svg`)
    })
    return { svg }
  }
})
</script>
