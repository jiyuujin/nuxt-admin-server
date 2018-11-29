<template>
  <div>
    <LeftMenu />
    <Loading
      :loading="loading"
    />
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

</style>
