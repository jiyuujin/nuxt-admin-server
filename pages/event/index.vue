<template>
  <MainTemplate
    :loading="loading"
  >
    <h3>家計簿 (予定)</h3>
  </MainTemplate>
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

</style>
