<template>
    <main-template v-if="tips && events" :user-status="userStatus">
        <main-template :is-form="isForm">
            <j-input
                placeholder="タイトル"
                input-type="text"
                @handleInput="applyTitle"
            ></j-input>
        </main-template>
        <main-template>
            <tip-list
                :list="tips.item"
                :number="page"
                :search="inputSearch"
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
const MainTemplate = () => import('../../components/layout/MainTemplate.vue')
const TipList = () => import('../../components/tip/List.vue')
const NewTip = () => import('../../components/tip/New.vue')
const NewEvent = () => import('../../components/event/New.vue')
const NewPhoto = () => import('../../components/photo/New.vue')
const Pagination = () => import('../../components/layout/Pagination.vue')

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
    async fetch({ store }) {
        await store.dispatch('product/fetchTips', null)
        await store.dispatch('product/fetchEvents')
    },
    computed: {
        eventOptions (this: TipPage) {
            let array: string[] = []
            this.$store.state.product.events.item.forEach((item) => {
                array.push(item.data.name)
            })
            return array
        }
    }
})
export default class TipPage extends Vue {
    page: number = 1;
    inputSearch: string = '';
    isForm: boolean = true;

    get userStatus () {
        return this.$store.state.product.userStatus
    }

    get tips () {
        return this.$store.state.product.tips
    }

    get events () {
        return this.$store.state.product.events
    }

    applyTitle(value) {
        this.inputSearch = value
    }

    applyPage(value) {
        this.page = value
    }
}
</script>
