<template>
  <main-template
    v-if="events && contacts"
    :loading="loading"
    :status="userStatus"
  >
    <form-template>
      <story-select
        :options="contactCategoryOptions"
        v-model="contactCategory"
        name="カテゴリー"
      />
    </form-template>
    <contact-list
      :list="contacts.item"
      :number="contact"
    />
    <pagination
      :page="contact"
      :max="Math.ceil(contacts.item.length / 20)"
      @form-data="applyPageInContact"
    />
    <NewEvent />
  </main-template>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapState } from 'vuex'
import { CONTACT_CATEGORIES } from '~/utils/index'
const MainTemplate = () => import('~/components/templates/MainTemplate.vue')
const FormTemplate = () => import('~/components/templates/FormTemplate.vue')
const ContactList = () => import('~/components/contact/List.vue')
const NewEvent = () => import('~/components/event/New.vue')
const Pagination = () => import('~/components/layout/Pagination.vue')
const StorySelect = () => import('~/components/atoms/Select.vue')

@Component({
  middleware: 'auth',
  components: {
    MainTemplate,
    FormTemplate,
    NewEvent,
    ContactList,
    Pagination,
    StorySelect
  },
  async fetch({ store }) {
    await store.dispatch('product/initEvents', null)
    await store.dispatch('product/initContacts')
  },
  computed: {
    contactCategoryOptions () {
      let array = []
      CONTACT_CATEGORIES.forEach(category => {
        array.push(category.text)
      })
      return array
    },
    ...mapState({
      userStatus: state => state.product.userStatus,
      loading: state => state.product.loading,
      events: state => state.product.events,
      contacts: state => state.product.contacts
    })
  },
})
export default class EventPage extends Vue {
  event: number = 0;
  contact: number = 1;
  contactCategory: number = 0;

  applyPageInContact(value) {
    this.contact = value
  }
}
</script>

<style scoped>

</style>
