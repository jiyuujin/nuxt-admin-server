<template>
  <MainTemplate
    :loading="loading"
  >
    <Header />
    <Status
      :list="sites"
    />
    <List
      v-if="videos"
      :list="videos.item"
    />
    <Pagination
      v-if="videos"
      :page="params.page"
      :max="Math.ceil(videos.item.length / 20)"
      @form-data="applyPage"
    />
  </MainTemplate>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import MainTemplate from '~/components/templates/MainTemplate'
import List from '~/components/organisms/video/List'
import Status from '~/components/organisms/netlify/Status'
import Header from '~/components/molecules/Header'
import Pagination from '~/components/atoms/Pagination'
export default {
  middleware: 'auth',
  components: {
    MainTemplate,
    List,
    Status,
    Header,
    Pagination
  },
  data() {
    return {
      params: {
        page: 1
      }
    }
  },
  computed: {
    ...mapGetters(['userStatus', 'videos', 'sites']),
    ...mapState(['loading'])
  },
  async mounted() {
    Promise.all([
      await this.$store.dispatch('initVideos'),
      await this.$store.dispatch('initSites')
    ])
  },
  methods: {
    applyPage(value) {
      this.params.page = value
    }
  }
}
</script>

<style scoped>

</style>
