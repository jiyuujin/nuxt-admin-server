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

<script>
import LeftMenu from '~/components/layout/LeftMenu'
import Loading from '~/components/layout/Loading'

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
.main {
  margin: 0 10%;
}
</style>
