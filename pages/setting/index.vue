<template>
  <MainTemplate
    :loading="loading"
  >
    <Status
      :list="sites"
    />
  </MainTemplate>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import MainTemplate from '~/components/templates/MainTemplate';
import Status from '~/components/organisms/setting/Status'
export default {
  middleware: 'auth',
  components: {
    MainTemplate,
    Status
  },
  computed: {
    ...mapGetters(['userStatus', 'sites']),
    ...mapState(['loading'])
  },
  async mounted() {
    this.$store.dispatch('initSites')
  }
}
</script>

<style scoped>

</style>
