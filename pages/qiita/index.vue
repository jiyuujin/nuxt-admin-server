<template>
  <div>
    <MainTemplate
      :loading="loading"
    />
    <v-container
      class="site"
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
      <div class="text-xs-center pt-2">
        <Pagination
          :current-page="params.page"
          @form-data="applyPage"
          class="text-xs-center pt-2"
        />
      </div>
    </v-container>
  </div>
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
.site {
  width: 95%;
}
</style>
