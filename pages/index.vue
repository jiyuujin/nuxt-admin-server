<template>
  <v-layout column>
    <Header />
    <TopPageMenu />
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '~/components/molecules/layout/Header'
import TopPageMenu from '~/components/molecules/layout/TopPageMenu'
export default {
  middleware: 'auth',
  components: {
    Header,
    TopPageMenu
  },
  computed: {
    ...mapGetters(['userStatus'])
  }
}
</script>

<style scoped>
</style>
