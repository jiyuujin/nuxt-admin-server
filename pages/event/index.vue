<template>
  <div>
    <LeftMenu />
    <v-container
      class="site"
    >
      <h3>家計簿 (予定)</h3>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LeftMenu from '~/components/molecules/layout/LeftMenu'
export default {
  middleware: 'auth',
  components: {
    LeftMenu
  },
  computed: {
    ...mapGetters(['userStatus'])
  }
}
</script>

<style scoped>
.site {
  width: 95%;
}
</style>
