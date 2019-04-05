<template>
  <main-template
    v-if="tips && videos && events"
    :loading="loading"
    :status="userStatus"
  >
    <form-template>
      <story-input
        v-model="search"
        placeholder="タイトル"
      />
    </form-template>
    <form-template>
      <story-select
        :options="eventOptions"
        v-model="params.event"
        name="イベント"
      />
    </form-template>
    <tip-list
      :list="tips.item"
      :number="params.page"
      :search="search"
      @form-data="applyEditedForm"
    />
    <pagination
      :page="params.page"
      :max="Math.ceil(tips.item.length / 20)"
      @form-data="applyPage"
    />
    <new-tip />
    <edit-tip
      :edited-form="editedForm"
      :data-key="dataKey"
    />
    <NewVideo />
  </main-template>
</template>

<script>
import moment from 'moment'
import { mapGetters, mapState } from 'vuex'
import MainTemplate from '~/components/templates/MainTemplate'
import FormTemplate from '~/components/templates/FormTemplate'

import TipList from '~/components/tip/List'
import NewTip from '~/components/tip/New'
import EditTip from '~/components/tip/Edit'
import NewVideo from '~/components/video/New'

import Pagination from '~/components/layout/Pagination'

import StoryInput from '~/components/atoms/Input'
import StorySelect from '~/components/atoms/Select'

export default {
  middleware: 'auth',
  components: {
    MainTemplate,
    FormTemplate,
    TipList,
    NewTip,
    EditTip,
    NewVideo,
    Pagination,
    StoryInput,
    StorySelect
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
    eventOptions() {
      let array = []
      this.$store.getters.events.item.forEach((item) => {
        array.push(item.text)
      })
      return array
    },
    ...mapGetters(['tips', 'videos', 'events']),
    ...mapState(['userStatus', 'dialog', 'loading'])
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
