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
import gql from 'graphql-tag'
const MainTemplate = () => import('~/components/templates/MainTemplate.vue')

const getQuery = gql`
  query {
    allWorks(orderBy: startAt_DESC) {
      id
      company
      startAt
      endAt
      title
      description
    }
    allProducts {
      id
      title
      url
      tag
    }
    allActivities(orderBy: time_DESC) {
      id
      title
      description
      url
    }
  }
`;

@Component({
  middleware: 'auth',
  components: {
    MainTemplate
  },
  computed: {
    ...mapState({
      userStatus: state => state.product.userStatus,
      loading: state => state.product.loading,
      works: state => state.profile.works,
      products: state => state.profile.products,
      activities: state => state.profile.activities
    })
  },
  apollo: {
    allWorks: getQuery,
    allProducts: getQuery,
    allActivities: getQuery
  },
  async created() {
    Promise.all([
      await this.$store.dispatch('profile/fetchWorks', this.allWorks),
      await this.$store.dispatch('profile/fetchProducts', this.allProducts),
      await this.$store.dispatch('profile/fetchActivities', this.allActivities)
    ])
  }
})
export default class IndexPage extends Vue {}
</script>

<style scoped>

</style>
