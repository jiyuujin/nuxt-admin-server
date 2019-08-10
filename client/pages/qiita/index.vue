<template>
    <main-template
        v-if="qiitas"
        :user-status="userStatus"
    >
        <main-template :is-form="isForm">
            <story-select
                :options="categoryOptions"
                v-model="tag"
                name="カテゴリー"
            />
        </main-template>
        <main-template :is-form="isForm">
            <story-input
                v-model="search"
                placeholder="タイトル"
            />
        </main-template>
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
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { CATEGORIES } from '../../utils'
const MainTemplate = () => import('../../components/layout/MainTemplate.vue')
const QiitaList = () => import('../../components/qiita/List.vue')
const Pagination = () => import('../../components/layout/Pagination.vue')
const StoryInput = () => import('../../components/atoms/Input.vue')
const StorySelect = () => import('../../components/atoms/Select.vue')

@Component({
    middleware: 'auth',
    components: {
        MainTemplate,
        QiitaList,
        Pagination,
        StoryInput,
        StorySelect
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
