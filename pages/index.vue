<template>
  <div>
    <MainTemplate
      :loading="loading"
    />
    <v-container
      class="site"
    >
      <Header />
      <List
        :list="videos"
      />
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import MainTemplate from '~/components/templates/MainTemplate'
import List from '~/components/organisms/video/List'
import Header from '~/components/molecules/Header'
export default {
  middleware: 'auth',
  components: {
    MainTemplate,
    List,
    Header
  },
  computed: {
    ...mapGetters(['userStatus', 'videos']),
    ...mapState(['loading'])
  },
  async mounted() {
    await this.$store.dispatch('initVideos')
  }
}
</script>

<style scoped>
.site {
  width: 95%;
}
</style>
