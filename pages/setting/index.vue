<template>
  <div>
    <LeftMenu />
    <v-container
      class="site"
    >
      <Status />
      <Loading />
      <List
        :list="sites"
      />
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import List from '~/components/molecules/setting/List'
import Status from '~/components/molecules/setting/Status'
import LeftMenu from '~/components/molecules/layout/LeftMenu'
import Loading from '~/components/organisms/Loading'
export default {
  middleware: 'auth',
  components: {
    List,
    Status,
    LeftMenu,
    Loading
  },
  computed: {
    ...mapGetters(['userStatus', 'sites'])
  },
  async mounted() {
    this.$store.dispatch('initSites')
  }
}
</script>

<style scoped>
.site {
  width: 95%;
}
</style>
