<template>
  <main-template
    v-if="contacts"
    :user-status="userStatus"
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
  </main-template>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import gql from 'graphql-tag'
import { CONTACT_CATEGORIES } from '~/utils/index'
const MainTemplate = () => import('~/components/templates/MainTemplate.vue')
const FormTemplate = () => import('~/components/templates/FormTemplate.vue')
const ContactList = () => import('~/components/contact/List.vue')
const Pagination = () => import('~/components/layout/Pagination.vue')
const StorySelect = () => import('~/components/atoms/Select.vue')

const getQuery = gql`
  query {
    allWorks(orderBy: startAt_DESC) {
      id
      company
      startAt
      endAt
      title
      description
    }
    allProducts {
      id
      title
      url
      tag
    }
    allActivities(orderBy: time_DESC) {
      id
      title
      description
      url
    }
  }
`

@Component({
  middleware: 'auth',
  components: {
    MainTemplate,
    FormTemplate,
    ContactList,
    Pagination,
    StorySelect
  },
  async asyncData({ store }) {
    await store.dispatch('product/fetchContacts')
  },
  computed: {
    contactCategoryOptions (this: PageIndex) {
      let array: string[] = []
      CONTACT_CATEGORIES.forEach(category => {
        array.push(category.text)
      })
      return array
    }
  },
})
export default class PageIndex extends Vue {
  event: number = 0;
  contact: number = 1;
  contactCategory: number = 0;

  get userStatus () {
    return this.$store.state.product.userStatus
  }

  get contacts () {
    return this.$store.state.product.contacts
  }

  get works () {
    return this.$store.state.profile.works
  }

  get products () {
    return this.$store.state.profile.products
  }

  get activities () {
    return this.$store.state.profile.activities
  }

  get apollo () {
    return {
      allWorks: getQuery,
      allProducts: getQuery,
      allActivities: getQuery
    }
  }

  async created() {
    await this.$store.dispatch('profile/fetchWorks', this.apollo.allWorks)
    await this.$store.dispatch('profile/fetchProducts', this.apollo.allProducts)
    await this.$store.dispatch('profile/fetchActivities', this.apollo.allActivities)
  }

  applyPageInContact(value) {
    this.contact = value
  }
}
</script>

<style scoped>

</style>
