<template>
  <main-template
    v-if="videos && sites"
    :loading="loading"
    :status="userStatus"
  >
    <story-button
      text="logout"
      @click="logout"
    />
    <list
      :list="videos.item"
    />
    <pagination
      :page="params.page"
      :max="Math.ceil(videos.item.length / 20)"
      @form-data="applyPage"
    />
  </main-template>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import MainTemplate from '~/components/templates/MainTemplate'

import List from '~/components/video/List'
import Pagination from '~/components/layout/Pagination'

import StoryButton from '~/components/atoms/Button'

export default {
  middleware: 'auth',
  components: {
    MainTemplate,
    List,
    StoryButton,
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
