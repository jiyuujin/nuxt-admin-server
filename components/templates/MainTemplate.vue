<template>
  <div>
    <LeftMenu
      v-if="status"
    />
    <Loading
      :loading="loading"
      v-if="status"
    />
    <div
      class="site"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import LeftMenu from '~/components/organisms/layout/LeftMenu'
import Loading from '~/components/organisms/layout/Loading'
export default {
  props: {
    loading: {
      type: Boolean
    },
    status: {
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
  width: 80%;
  margin: 0 auto;
}
</style>
