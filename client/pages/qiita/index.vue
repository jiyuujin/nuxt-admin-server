<template>
    <main-template v-if="qiitas" :user-status="userStatus">
        <main-template :is-form="isForm">
            <j-input
                placeholder="タイトル"
                input-type="text"
                @handleInput="applyTitle"
            ></j-input>
        </main-template>
        <main-template>
            <qiita-list
                :list="qiitas"
                :search="search"
                :tag="tag"
            />
            <pagination
                :page="page"
                :max="Math.ceil(qiitas.length / 20)"
                @form-data="applyPage"
            />
        </main-template>
    </main-template>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { CATEGORIES } from '~/utils/tip'
const MainTemplate = () => import('../../components/layout/MainTemplate.vue')
const QiitaList = () => import('../../components/qiita/List.vue')
const Pagination = () => import('../../components/layout/Pagination.vue')

@Component({
    middleware: 'auth',
    components: {
        MainTemplate,
        QiitaList,
        Pagination
    },
    computed: {
        categoryOptions (this: QiitaPage) {
            let array: string[] = []
            CATEGORIES.forEach(category => {
                array.push(category.text)
            })
            return array
        }
    },
    async mounted() {
        await this.$store.dispatch('qiita/fetchQiitas', {
            'tag': 1,
            'search': '',
            'page': 1
        })
    }
})
export default class QiitaPage extends Vue {
    tag: number = 1;
    search: string = '';
    page: number = 1;
    isForm: boolean = true;

    get userStatus () {
        return this.$store.state.product.userStatus
    }

    get qiitas () {
        return this.$store.state.qiita.qiitas
    }

    applyTitle(value) {
        this.search = value
    }

    async getQiitaByTag () {
        await this.$store.dispatch('qiita/fetchQiitas', {
            'tag': this.tag,
            'search': this.search,
            'page': this.page
        })
    }

    async applyPage(value) {
        this.page = value
        await this.getQiitaByTag()
    }
}
</script>
