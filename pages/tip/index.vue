<template>
  <div>
    <LeftMenu />
    <v-container
      class="site"
    >
      <Status
        :list="tips"
      />
      <Loading />
      <InputForm
        :data="search"
        column="タイトル"
        @form-data="applyTitle"
      />
      <TipList
        :list="tips"
        :search="search"
        @form-data="applyEditedForm"
      />
      <NewTip />
      <EditTip
        :edited-form="editedForm"
        :data-key="dataKey"
      />
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import moment from 'moment'
import InputForm from '~/components/atoms/InputForm'
import TipList from '~/components/molecules/tip/List'
import NewTip from '~/components/molecules/tip/New'
import EditTip from '~/components/molecules/tip/Edit'
import Status from '~/components/molecules/tip/Status'
import LeftMenu from '~/components/molecules/layout/LeftMenu'
import Loading from '~/components/organisms/Loading'
export default {
  middleware: 'auth',
  components: {
    InputForm,
    TipList,
    NewTip,
    EditTip,
    Status,
    LeftMenu,
    Loading
  },
  async mounted () {
    this.tips.length ? Promise.resolve() : this.$store.dispatch('initTips')
  },
  data () {
    return {
      search: '',
      editedForm: {
        title: '',
        url: '',
        description: '',
        tags: [],
        event: 0,
        time: moment()
      },
      dataKey: ''
    }
  },
  computed: {
    ...mapGetters(['userStatus', 'tips']),
    ...mapState(['dialog'])
  },
  methods: {
    async startEdited() {
      await this.$store.dispatch('addDialog')
    },
    applyEditedForm(value) {
      this.editedForm = value
      this.dataKey = value['.key']
      this.startEdited()
    },
    applyTitle(value) {
      this.search = value
    }
  }
}
</script>

<style scoped>
.site {
  width: 95%;
}
</style>
