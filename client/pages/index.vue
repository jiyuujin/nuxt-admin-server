<template>
    <main-template v-if="contacts" :user-status="userStatus">
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
import { fetchContacts } from '~/services/contactService'

const MainTemplate = () => import('~/components/layout/MainTemplate.vue')
const ContactList = () => import('~/components/contact/List.vue')
const Pagination = () => import('~/components/layout/Pagination.vue')

@Component({
    middleware: 'auth',
    components: {
        MainTemplate,
        ContactList,
        Pagination
    },
    async mounted() {
        (this as any).contacts = await fetchContacts()
    }
})
export default class PageIndex extends Vue {
    contact: number = 1
    contacts = null

    get userStatus () {
        return this.$store.state.product.userStatus
    }

    applyPageInContact(value) {
        this.contact = value
    }
}
</script>
