<template>
  <MainTemplate
    v-if="qiitas"
    :loading="loading"
    :status="userStatus"
  >
    <SingleSelectForm
      :option="categories"
      :number="params.tag"
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
      :tag="params.tag"
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
import InputForm from '~/components/atoms/InputForm'
import SingleSelectForm from '~/components/atoms/SingleSelectForm'
import Pagination from '~/components/atoms/Pagination'
import { CATEGORIES } from '~/utils/index'
export default {
  middleware: 'auth',
  components: {
    MainTemplate,
    QiitaList,
    InputForm,
    SingleSelectForm,
    Pagination
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
    categories () {
      return CATEGORIES.map(category => {
        return category
      })
    },
    ...mapGetters(['qiitas']),
    ...mapState(['userStatus', 'loading'])
  },
  methods: {
    getQiitaByTag () {
      this.$store.dispatch('initQiitas', {
        'tag': this.params.tag,
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
    await this.getQiitaByTag()
  }
}
</script>

<style scoped>

</style>
