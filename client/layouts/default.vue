<template>
  <div class="container mx-auto">
    <mode-change />
    <nuxt />
    <cookie-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import { provideLayout } from '~/composables/layout'

const ModeChange = () => import('~/components/ModeChange.vue')
const CookieFooter = () => import('~/components/CookieFooter.vue')

export default defineComponent({
  components: {
    ModeChange,
    CookieFooter
  },
  setup(props: {}, ctx: SetupContext) {
    provideLayout()
  }
})
</script>

<style lang="scss">
html {
  font-family: Futura, 'Trebuchet MS', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  background-color: #fff;
  color: #000;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
