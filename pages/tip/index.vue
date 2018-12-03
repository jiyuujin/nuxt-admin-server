<template>
  <MainTemplate
    :loading="loading"
  >
    <Status
      :list="tips"
    />
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
    <NewVideo />
  </MainTemplate>
</template>

<script>
import moment from 'moment'
import { mapGetters, mapState } from 'vuex'
import MainTemplate from '~/components/templates/MainTemplate';
import InputForm from '~/components/atoms/InputForm'
import TipList from '~/components/organisms/tip/List'
import NewTip from '~/components/organisms/tip/New'
import EditTip from '~/components/organisms/tip/Edit'
import Status from '~/components/organisms/tip/Status'
import NewVideo from '~/components/organisms/video/New'
export default {
  middleware: 'auth',
  components: {
    MainTemplate,
    InputForm,
    TipList,
    NewTip,
    EditTip,
    Status,
    NewVideo
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
    ...mapState(['dialog', 'loading'])
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

</style>
