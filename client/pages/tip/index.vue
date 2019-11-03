<template>
    <main-template v-if="tips" :user-status="userStatus">
        <main-template>
            <tip-list
                :list="tips.item"
                :number="page"
            />
            <pagination
                :page="page"
                :max="Math.ceil(tips.item.length / 20)"
                @form-data="applyPage"
            />
        </main-template>
        <main-template :is-form="isForm">
            <new-tip />
        </main-template>
        <main-template :is-form="isForm">
            <new-event />
        </main-template>
        <main-template :is-form="isForm">
            <new-photo />
        </main-template>
    </main-template>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { fetchTips } from '~/services/tipService'

const MainTemplate = () => import('~/components/layout/MainTemplate.vue')
const TipList = () => import('~/components/tip/List.vue')
const NewTip = () => import('~/components/tip/New.vue')
const NewEvent = () => import('~/components/event/New.vue')
const NewPhoto = () => import('~/components/photo/New.vue')
const Pagination = () => import('~/components/layout/Pagination.vue')

@Component({
    middleware: 'auth',
    components: {
        MainTemplate,
        TipList,
        NewTip,
        NewEvent,
        NewPhoto,
        Pagination
    },
    async mounted() {
        (this as any).tips = await fetchTips()
    }
})
export default class TipPage extends Vue {
    page: number = 1
    isForm: boolean = true
    tips = null

    get userStatus () {
        return this.$store.state.product.userStatus
    }

    applyPage(value) {
        this.page = value
    }
}
</script>
