<template>
  <MainTemplate
    v-if="tips && videos && events"
    :loading="loading"
    :status="userStatus"
  >
    <TipStatus
      :size="tips.item.length"
    />
    <InputForm
      :data="search"
      column="タイトル"
      @form-data="applyTitle"
    />
    <SingleSelectForm
      :option="events.item"
      :number="params.event"
      column="イベント"
      @form-data="applyEvent"
    />
    <TipList
      :list="tips.item"
      :number="params.page"
      :search="search"
      @form-data="applyEditedForm"
    />
    <Pagination
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
      :size="videos.item.length"
    />
    <NewVideo />
  </MainTemplate>
</template>

<script>
import moment from 'moment'
import { mapGetters, mapState } from 'vuex'
import MainTemplate from '~/components/templates/MainTemplate'
import TipList from '~/components/organisms/tip/List'
import TipStatus from '~/components/organisms/tip/Status'
import NewTip from '~/components/organisms/tip/New'
import EditTip from '~/components/organisms/tip/Edit'
import VideoStatus from '~/components/organisms/video/Status'
import NewVideo from '~/components/organisms/video/New'
import InputForm from '~/components/atoms/InputForm'
import SingleSelectForm from '~/components/atoms/SingleSelectForm'
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
    SingleSelectForm,
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
        page: 1,
        event: 0
      }
    }
  },
  computed: {
    ...mapGetters(['userStatus', 'tips', 'videos', 'events']),
    ...mapState(['dialog', 'loading'])
  },
  async created() {
    Promise.all([
      this.tips ? Promise.resolve() : this.$store.dispatch('initTips', null),
      this.videos ? Promise.resolve() : this.$store.dispatch('initVideos'),
      this.events ? Promise.resolve() : this.$store.dispatch('initEvents')
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
    },
    async applyEvent(value) {
      this.params.event = value
      if (this.params.event !== 0) {
        await this.$store.dispatch('initTips', {
          event: this.params.event
        })
      } else {
        await this.$store.dispatch('initTips')
      }
    }
  }
}
</script>

<style scoped>

</style>
