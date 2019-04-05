<template>
  <main-template
    v-if="events && surveys && contacts"
    :loading="loading"
    :status="userStatus"
  >
    <form-template>
      <story-select
        :options="contactCategoryOptions"
        v-model="params.contactCategory"
        name="カテゴリー"
      />
    </form-template>
    <contact-list
      :list="contacts.item"
      :number="params.page.contact"
    />
    <pagination
      :page="params.page.contact"
      :max="Math.ceil(contacts.item.length / 20)"
      @form-data="applyPageInContact"
    />
    <NewEvent />
  </main-template>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { CONTACT_CATEGORIES } from '~/utils/index'

import MainTemplate from '~/components/templates/MainTemplate'
import FormTemplate from '~/components/templates/FormTemplate'

import ContactList from '~/components/contact/List'
import NewEvent from '~/components/event/New'
import Pagination from '~/components/layout/Pagination'

import StorySelect from '~/components/atoms/Select'

export default {
  middleware: 'auth',
  components: {
    MainTemplate,
    FormTemplate,
    NewEvent,
    ContactList,
    Pagination,
    StorySelect
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
    contactCategoryOptions () {
      let array = []
      CONTACT_CATEGORIES.forEach(category => {
        array.push(category.text)
      })
      return array
    },
    ...mapGetters(['events', 'surveys', 'contacts']),
    ...mapState(['userStatus', 'loading'])
  },
  async created() {
    Promise.all([
      await this.$store.dispatch('initEvents', null),
      await this.$store.dispatch('initSurveys'),
      await this.$store.dispatch('initContacts')
    ])
  },
  methods: {
    applyPageInContact(value) {
      this.params.page.contact = value
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
