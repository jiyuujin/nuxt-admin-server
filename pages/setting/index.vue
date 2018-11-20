<template>
  <div>
    <LeftMenu />
    <v-container
      class="site"
    >
      <StatusList />
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
import StatusList from '~/components/molecules/setting/StatusList'
import LeftMenu from '~/components/molecules/layout/LeftMenu'
import Loading from '~/components/organisms/Loading'
export default {
  middleware: 'auth',
  components: {
    List,
    StatusList,
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
