<template>
  <MainTemplate
    v-if="videos && sites"
    :loading="loading"
    :status="userStatus"
  >
    <Button
      action-name="logout"
      style="text-align: right;"
      @click="logout"
    />
    <Status
      :list="sites"
    />
    <List
      :list="videos.item"
    />
    <Pagination
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
import Button from '~/components/atoms/Button'
import Pagination from '~/components/atoms/Pagination'
export default {
  middleware: 'auth',
  components: {
    MainTemplate,
    List,
    Status,
    Button,
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
    ...mapGetters(['videos', 'sites']),
    ...mapState(['userStatus', 'loading'])
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
    },
    async logout() {
      await this.$store.dispatch('signOut')

      if (!this.$store.state.userStatus) {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>

</style>
