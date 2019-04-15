<template>
  <div>
    <LeftMenu v-if="status" />
    <Loading
      v-if="status"
      :loading="loading"
    />
    <div class="main">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
const LeftMenu = () => import('~/components/layout/LeftMenu.vue')
const Loading = () => import('~/components/layout/Loading.vue')

@Component({
  components: {
    LeftMenu,
    Loading
  }
})
export default class MainTemplate extends Vue {
  @Prop() loading: boolean;
  @Prop() status: boolean;
}
</script>

<style scoped>
.main {
  margin: 0 10%;
}
</style>
