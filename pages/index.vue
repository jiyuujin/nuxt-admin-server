<template>
  <main-template
    :loading="loading"
    :user-status="userStatus"
  >
  </main-template>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapState } from 'vuex'
const MainTemplate = () => import('~/components/templates/MainTemplate.vue')

@Component({
  middleware: 'auth',
  components: {
    MainTemplate
  },
  computed: {
    ...mapState({
      userStatus: state => state.product.userStatus,
      loading: state => state.product.loading
    })
  },
})
export default class IndexPage extends Vue {}
</script>

<style scoped>

</style>
