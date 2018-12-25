<template>
  <MainTemplate
    v-if="events && surveys"
    :loading="loading"
    :status="userStatus"
  >
    <SingleSelectForm
      :option="events.item"
      :number="params.event"
      column="イベント"
      @form-data="applyEvent"
    />
    <SurveyList
      :list="surveys.item"
      :number="params.page"
    />
    <Pagination
      :page="params.page"
      :max="Math.ceil(surveys.item.length / 20)"
      @form-data="applyPage"
    />
    <EventStatus
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
import SurveyList from '~/components/organisms/survey/List'
import SingleSelectForm from '~/components/atoms/SingleSelectForm'
import Pagination from '~/components/atoms/Pagination'
export default {
  middleware: 'auth',
  components: {
    MainTemplate,
    EventStatus,
    NewEvent,
    SurveyList,
    SingleSelectForm,
    Pagination
  },
  data() {
    return {
      params: {
        page: 1,
        event: 0
      }
    }
  },
  computed: {
    ...mapGetters(['userStatus', 'events', 'surveys']),
    ...mapState(['loading'])
  },
  async created() {
    Promise.all([
      await this.$store.dispatch('initEvents', null),
      await this.$store.dispatch('initSurveys')
    ])
  },
  methods: {
    applyPage(value) {
      this.params.page = value
    },
    async applyEvent(value) {
      this.params.event = value
      await this.$store.dispatch('initSurveys', {
        event: this.params.event
      })
    }
  }
}
</script>

<style scoped>

</style>
