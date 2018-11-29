<template>
  <div>
    <MainTemplate
      :loading="loading"
    />
    <v-container
      class="site"
    >
      <Status />
      <List
        :list="sites"
      />
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import MainTemplate from '~/components/templates/MainTemplate';
import List from '~/components/organisms/setting/List'
import Status from '~/components/organisms/setting/Status'
export default {
  middleware: 'auth',
  components: {
    MainTemplate,
    List,
    Status
  },
  computed: {
    ...mapGetters(['userStatus', 'sites']),
    ...mapState(['loading'])
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
