<template>
  <main-template
    v-if="qiitas"
    :loading="loading"
    :status="userStatus"
  >
    <form-template>
      <story-select
        :options="categoryOptions"
        v-model="params.tag"
        name="カテゴリー"
      />
    </form-template>
    <form-template>
      <story-input
        v-model="params.search"
        placeholder="タイトル"
      />
    </form-template>
    <qiita-list
      :list="qiitas"
      :search="params.search"
      :tag="params.tag"
    />
    <pagination
      :page="params.page"
      :max="Math.ceil(qiitas.length / 20)"
      @form-data="applyPage"
    />
  </main-template>
</template>

<script>
import { mapState } from 'vuex'
import { CATEGORIES } from '~/utils/index'

import MainTemplate from '~/components/templates/MainTemplate'
import FormTemplate from '~/components/templates/FormTemplate'

import QiitaList from '~/components/qiita/List'
import Pagination from '~/components/layout/Pagination'

import StoryInput from '~/components/atoms/Input'
import StorySelect from '~/components/atoms/Select'

export default {
  middleware: 'auth',
  components: {
    MainTemplate,
    FormTemplate,
    QiitaList,
    Pagination,
    StoryInput,
    StorySelect
  },
  data () {
    return {
      params: {
        tag: 1,
        search: '',
        page: 1
      }
    }
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
  methods: {
    getQiitaByTag () {
      this.$store.dispatch('product/initQiitas', {
        'tag': this.params.tag,
        'search': this.params.search,
        'page': this.params.page
      })
    },
    applyPage(value) {
      this.params.page = value
      this.getQiitaByTag()
    }
  },
  async mounted() {
    await this.getQiitaByTag()
  }
}
</script>

<style scoped>

</style>
