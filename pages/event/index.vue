<template>
  <MainTemplate
    :loading="loading"
  >
    <EventStatus
      v-if="events"
      :size="events.item.length"
    />
    <NewEvent />
  </MainTemplate>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import MainTemplate from '~/components/templates/MainTemplate'
import EventStatus from '~/components/organisms/event/Status'
import NewEvent from '~/components/organisms/event/New'
export default {
  middleware: 'auth',
  components: {
    MainTemplate,
    EventStatus,
    NewEvent
  },
  computed: {
    ...mapGetters(['userStatus', 'events']),
    ...mapState(['loading'])
  },
  async mounted() {
    await this.$store.dispatch('initEvents')
  }
}
</script>

<style scoped>

</style>
