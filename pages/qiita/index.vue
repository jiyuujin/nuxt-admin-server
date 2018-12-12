<template>
  <MainTemplate
    v-if="qiitas"
    :loading="loading"
  >
    <Status
      :list="qiitas"
      :tag="params.tag"
    />
    <SingleSelectForm
      :option="categories"
      :text="params.tag"
      column="タグ"
      @form-data="applyTag"
    />
    <InputForm
      :data="params.search"
      column="タイトル"
      @form-data="applyTitle"
    />
    <QiitaList
      :list="qiitas"
      :search="params.search"
    />
    <Pagination
      :page="params.page"
      :max="Math.ceil(qiitas.length / 20)"
      @form-data="applyPage"
    />
  </MainTemplate>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import MainTemplate from '~/components/templates/MainTemplate';
import QiitaList from '~/components/organisms/qiita/List'
import Status from '~/components/organisms/qiita/Status'
import InputForm from '~/components/atoms/InputForm'
import SingleSelectForm from '~/components/atoms/SingleSelectForm'
import Pagination from '~/components/atoms/Pagination'
import { CATEGORIES } from '~/utils/categories'
export default {
  middleware: 'auth',
  components: {
    MainTemplate,
    QiitaList,
    Status,
    InputForm,
    SingleSelectForm,
    Pagination
  },
  data () {
    return {
      params: {
        tag: 'Web',
        search: '',
        page: 1
      }
    }
  },
  computed: {
    categories () {
      return CATEGORIES.map(category => { return category.name })
    },
    ...mapGetters(['userStatus', 'qiitas']),
    ...mapState(['loading'])
  },
  methods: {
    getQiitaByTag () {
      this.$store.dispatch('initQiitas', {
        'tag': this.params.tag.toLowerCase(),
        'search': this.params.search,
        'page': this.params.page
      })
    },
    applyTitle(value) {
      this.params.search = value
      this.getQiitaByTag()
    },
    applyTag(value) {
      this.params.tag = value
      this.getQiitaByTag()
    },
    applyPage(value) {
      this.params.page = value
      this.getQiitaByTag()
    }
  },
  async mounted() {
    this.getQiitaByTag()
  }
}
</script>

<style scoped>
button {
  position: relative;
  display: inline-block;
  font-weight: bold;
  padding: 0.25em 0;
  text-decoration: none;
  color: #67c5ff;
}
</style>
