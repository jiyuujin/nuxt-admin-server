<template>
    <main-template v-if="state.contacts" :user-status="userStatus">
        <template v-if="state.contacts">
            <div v-for="item in state.contacts.item" :key="item.id">
                <h3>
                    <j-label
                        :tag-text="item.data.category.text"
                        style="margin-right: 2px;"
                    />
                    {{ item.data.title }}
                </h3>
                <div style="margin-bottom: 12px;">
                    {{ item.data.description }}
                </div>
            </div>
            <!--
            <pagination
                :page="state.page"
                :max="Math.ceil(state.contacts.item.length / 20)"
                @form-data="applyPage"
            />
            -->
        </template>
    </main-template>
</template>

<script lang="ts">
import { createComponent, SetupContext, onMounted, reactive, computed } from '@vue/composition-api'
import { fetchContacts } from '~/services/contactService'

const MainTemplate = () => import('~/components/layout/MainTemplate.vue')
const Pagination = () => import('~/components/layout/Pagination.vue')

export default createComponent({
    middleware: 'auth',
    components: {
        MainTemplate,
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
