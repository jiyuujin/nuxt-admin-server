<template>
  <MainTemplate
    :loading="loading"
  >
    <Status
      :list="images"
    />
    <NewImage />
    <ImageList
      :list="images"
    />
  </MainTemplate>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import MainTemplate from '~/components/templates/MainTemplate';
import ImageList from '~/components/organisms/upload/List'
import NewImage from '~/components/organisms/upload/New'
import Status from '~/components/organisms/upload/Status'
export default {
  middleware: 'auth',
  components: {
    MainTemplate,
    ImageList,
    NewImage,
    Status
  },
  async mounted () {
    this.images.length ? Promise.resolve() : this.$store.dispatch('initImages')
  },
  computed: {
    ...mapGetters(['userStatus', 'images']),
    ...mapState(['loading'])
  }
}
</script>

<style scoped>

</style>
