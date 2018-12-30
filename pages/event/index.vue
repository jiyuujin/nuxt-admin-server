<template>
  <MainTemplate
    v-if="events && surveys && contacts"
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
      :number="params.page.survey"
    />
    <Pagination
      :page="params.page.survey"
      :max="Math.ceil(surveys.item.length / 20)"
      @form-data="applyPageInSurvey"
    />
    <SingleSelectForm
      :option="contactCategories"
      :number="params.contactCategory"
      column="カテゴリー"
      @form-data="applyContactCategory"
    />
    <ContactList
      :list="contacts.item"
      :number="params.page.contact"
    />
    <Pagination
      :page="params.page.contact"
      :max="Math.ceil(contacts.item.length / 20)"
      @form-data="applyPageInContact"
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
import ContactList from '~/components/organisms/contact/List'
import SingleSelectForm from '~/components/atoms/SingleSelectForm'
import Pagination from '~/components/atoms/Pagination'
import { CONTACT_CATEGORIES } from '~/utils/index'
export default {
  middleware: 'auth',
  components: {
    MainTemplate,
    EventStatus,
    NewEvent,
    SurveyList,
    ContactList,
    SingleSelectForm,
    Pagination
  },
  data() {
    return {
      params: {
        page: {
          survey: 1,
          contact: 1
        },
        event: 0,
        contactCategory: 0
      },
      contactCategories: CONTACT_CATEGORIES
    }
  },
  computed: {
    ...mapGetters(['userStatus', 'events', 'surveys', 'contacts']),
    ...mapState(['loading'])
  },
  async created() {
    Promise.all([
      await this.$store.dispatch('initEvents', null),
      await this.$store.dispatch('initSurveys'),
      await this.$store.dispatch('initContacts')
    ])
  },
  methods: {
    applyPageInSurvey(value) {
      this.params.page.survey = value
    },
    applyPageInContact(value) {
      this.params.page.contact = value
    },
    async applyEvent(value) {
      this.params.event = value
      await this.$store.dispatch('initSurveys', {
        event: this.params.event
      })
    },
    async applyContactCategory(value) {
      this.params.contactCategory = value
      await this.$store.dispatch('initContacts', {
        contactCategory: this.params.contactCategory
      })
    }
  }
}
</script>

<style scoped>

</style>
