<template>
  <main-template
    v-if="videos"
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
import { mapState } from 'vuex'

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
    ...mapState({
      userStatus: state => state.product.userStatus,
      loading: state => state.product.loading,
      videos: state => state.product.videos
    })
  },
  async created() {
    await this.$store.dispatch('product/initVideos')
  },
  methods: {
    applyPage(value) {
      this.params.page = value
    },
    async logout() {
      await this.$store.dispatch('product/signOut')

      if (!this.$store.state.product.userStatus) {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>

</style>
