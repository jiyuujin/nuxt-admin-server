<template>
  <div>
    <LeftMenu />
    <v-container
      class="site"
    >
      <Status
        :list="qiitas"
        :tag="params.tag"
      />
      <Loading />
      <SingleSelectForm
        :option="categories"
        :data="params.tag"
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
import { mapGetters } from 'vuex'
import QiitaList from '~/components/molecules/qiita/List'
import Status from '~/components/molecules/qiita/Status'
import InputForm from '~/components/atoms/Input'
import SingleSelectForm from '~/components/atoms/SingleStringSelect'
import LeftMenu from '~/components/molecules/layout/LeftMenu'
import Loading from '~/components/organisms/Loading'
import Pagination from '~/components/atoms/Pagination'
import { CATEGORIES } from '~/utils/categories'
export default {
  middleware: 'auth',
  components: {
    QiitaList,
    Status,
    InputForm,
    SingleSelectForm,
    LeftMenu,
    Loading,
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
    ...mapGetters(['userStatus', 'qiitas'])
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
