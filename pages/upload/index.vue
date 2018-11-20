<template>
  <div>
    <LeftMenu />
    <v-container
      class="site"
    >
      <StatusList
        :list="images"
      />
      <Loading />
      <NewImage />
      <ImageList
        :list="images"
      />
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ImageList from '~/components/molecules/upload/List'
import NewImage from '~/components/molecules/upload/New'
import StatusList from '~/components/molecules/upload/StatusList'
import LeftMenu from '~/components/molecules/layout/LeftMenu'
import Loading from '~/components/organisms/Loading'
export default {
  middleware: 'auth',
  components: {
    ImageList,
    NewImage,
    StatusList,
    LeftMenu,
    Loading
  },
  async mounted () {
    this.images.length ? Promise.resolve() : this.$store.dispatch('initImages')
  },
  computed: {
    ...mapGetters(['userStatus', 'images'])
  }
}
</script>

<style scoped>
.site {
  width: 95%;
}
</style>
