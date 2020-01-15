<template>
    <main-template v-if="state.contacts" :user-status="userStatus">
        <contact-list
            :list="state.contacts.item"
            :number="state.page"
        />
        <!--
        <pagination
            :page="state.page"
            :max="Math.ceil(state.contacts.item.length / 20)"
            @form-data="applyPage"
        />
        -->
    </main-template>
</template>

<script lang="ts">
import { createComponent, SetupContext, onMounted, reactive, computed } from '@vue/composition-api'
import { fetchContacts } from '~/services/contactService'

const MainTemplate = () => import('~/components/layout/MainTemplate.vue')
const ContactList = () => import('~/components/contact/List.vue')
const Pagination = () => import('~/components/layout/Pagination.vue')

export default createComponent({
    middleware: 'auth',
    components: {
        MainTemplate,
        ContactList,
        Pagination
    },
    setup(props: {}, ctx: SetupContext) {
        const state = reactive({
            contacts: {},
            page: 1
        })

        const userStatus = computed(() => ctx.root.$store.state.product.userStatus)

        onMounted(async () => {
            state.contacts = await fetchContacts()
        })

        return {
            state,
            userStatus,
            applyPage(value) {
                return value
            }
        }
    }
})
</script>
