<template>
  <div>
    <MainTemplate
      :loading="loading"
    />
    <v-container
      class="site"
    >
      <h3>秘密</h3>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import MainTemplate from '~/components/templates/MainTemplate';
export default {
  middleware: 'auth',
  components: {
    MainTemplate
  },
  computed: {
    ...mapGetters(['userStatus']),
    ...mapState(['loading'])
  }
}
</script>

<style scoped>
.site {
  width: 95%;
}
</style>
