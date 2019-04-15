<template>
  <main-template
    v-if="qiitas"
    :loading="loading"
    :status="userStatus"
  >
    <form-template>
      <story-select
        :options="categoryOptions"
        v-model="tag"
        name="カテゴリー"
      />
    </form-template>
    <form-template>
      <story-input
        v-model="search"
        placeholder="タイトル"
      />
    </form-template>
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
import { mapState } from 'vuex'
import { CATEGORIES } from '~/utils/index'
const MainTemplate = () => import('~/components/templates/MainTemplate.vue')
const FormTemplate = () => import('~/components/templates/FormTemplate.vue')
const QiitaList = () => import('~/components/qiita/List.vue')
const Pagination = () => import('~/components/layout/Pagination.vue')
const StoryInput = () => import('~/components/atoms/Input.vue')
const StorySelect = () => import('~/components/atoms/Select.vue')

@Component({
  middleware: 'auth',
  components: {
    MainTemplate,
    FormTemplate,
    QiitaList,
    Pagination,
    StoryInput,
    StorySelect
  },
  computed: {
    categoryOptions () {
      let array = []
      CATEGORIES.forEach(category => {
        array.push(category.text)
      })
      return array
    },
    ...mapState({
      userStatus: state => state.product.userStatus,
      loading: state => state.product.loading,
      qiitas: state =>state.product.qiitas
    })
  },
  async mounted() {
    await this.getQiitaByTag()
  }
})
export default class Index extends Vue {
  tag: number = 1;
  search: string = '';
  page: number = 1;

  async getQiitaByTag () {
    await this.$store.dispatch('product/initQiitas', {
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

<style scoped>

</style>
