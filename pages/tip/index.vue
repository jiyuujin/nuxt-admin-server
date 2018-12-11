<template>
  <MainTemplate
    :loading="loading"
  >
    <TipStatus
      v-if="tips"
      :size="tips.item.length"
    />
    <InputForm
      :data="search"
      column="タイトル"
      @form-data="applyTitle"
    />
    <TipList
      v-if="tips"
      :list="tips.item"
      :number="params.page"
      :search="search"
      @form-data="applyEditedForm"
    />
    <Pagination
      v-if="tips"
      :page="params.page"
      :max="Math.ceil(tips.item.length / 20)"
      @form-data="applyPage"
    />
    <NewTip />
    <EditTip
      :edited-form="editedForm"
      :data-key="dataKey"
    />
    <VideoStatus
      v-if="videos"
      :size="videos.item.length"
    />
    <NewVideo />
  </MainTemplate>
</template>

<script>
import moment from 'moment'
import { mapGetters, mapState } from 'vuex'
import MainTemplate from '~/components/templates/MainTemplate';
import TipList from '~/components/organisms/tip/List'
import TipStatus from '~/components/organisms/tip/Status'
import NewTip from '~/components/organisms/tip/New'
import EditTip from '~/components/organisms/tip/Edit'
import VideoStatus from '~/components/organisms/video/Status'
import NewVideo from '~/components/organisms/video/New'
import InputForm from '~/components/atoms/InputForm'
import Pagination from '~/components/atoms/Pagination'
export default {
  middleware: 'auth',
  components: {
    MainTemplate,
    TipList,
    TipStatus,
    NewTip,
    EditTip,
    VideoStatus,
    NewVideo,
    InputForm,
    Pagination
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
      dataKey: '',
      params: {
        page: 1
      }
    }
  },
  computed: {
    ...mapGetters(['userStatus', 'tips', 'videos', 'events']),
    ...mapState(['dialog', 'loading'])
  },
  async created() {
    Promise.all([
      this.tips ? Promise.resolve() : this.$store.dispatch('initTips'),
      this.videos ? Promise.resolve() : this.$store.dispatch('initVideos')
    ])
  },
  methods: {
    async startEdited() {
      await this.$store.dispatch('addDialog')
    },
    applyEditedForm(value) {
      this.editedForm = value.data
      this.dataKey = value.id
      this.startEdited()
    },
    applyTitle(value) {
      this.search = value
    },
    applyPage(value) {
      this.params.page = value
    }
  }
}
</script>

<style scoped>

</style>
