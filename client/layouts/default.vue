<template>
  <div class="container mx-auto">
    <nuxt />
    <cookie-footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
const CookieFooter = () => import('~/components/layout/CookieFooter.vue')

@Component({
    components: {
        CookieFooter
    }
})
export default class Default extends Vue {}
</script>

<style>
html {
  font-family: Futura, "Trebuchet MS", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
