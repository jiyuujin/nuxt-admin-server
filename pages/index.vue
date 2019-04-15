<template>
  <main-template
    :loading="loading"
    :status="userStatus"
  >
    <story-button
      text="logout"
      @click="logout"
    />
  </main-template>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapState } from 'vuex'
const MainTemplate = () => import('~/components/templates/MainTemplate.vue')
const Pagination = () => import('~/components/layout/Pagination.vue')
const StoryButton = () => import('~/components/atoms/Button.vue')

@Component({
  middleware: 'auth',
  components: {
    MainTemplate,
    StoryButton,
    Pagination
  },
  computed: {
    ...mapState({
      userStatus: state => state.product.userStatus,
      loading: state => state.product.loading
    })
  },
})
export default class IndexPage extends Vue {
  async logout() {
    await this.$store.dispatch('product/signOut')

    if (!this.$store.state.product.userStatus) {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>
