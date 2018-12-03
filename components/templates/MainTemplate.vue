<template>
  <div>
    <LeftMenu />
    <Loading
      :loading="loading"
    />
    <v-container
      class="site"
    >
      <slot />
    </v-container>
  </div>
</template>

<script>
import LeftMenu from '~/components/molecules/LeftMenu'
import Loading from '~/components/molecules/Loading'
export default {
  props: {
    loading: {
      type: Boolean
    }
  },
  components: {
    LeftMenu,
    Loading
  }
}
</script>

<style scoped>
.site {
  width: 95%;
}
</style>
