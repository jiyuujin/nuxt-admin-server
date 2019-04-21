<template>
  <main-template
    v-if="tips && events"
    :loading="loading"
    :user-status="userStatus"
  >
    <form-template>
      <story-input
        v-model="inputSearch"
        placeholder="タイトル"
      />
    </form-template>
    <form-template>
      <story-select
        :options="eventOptions"
        v-model="selectedEvent"
        name="イベント"
      />
    </form-template>
    <tip-list
      :list="tips.item"
      :number="page"
      :search="inputSearch"
      @form-data="applyEditedForm"
    />
    <pagination
      :page="page"
      :max="Math.ceil(tips.item.length / 20)"
      @form-data="applyPage"
    />
    <new-tip />
    <edit-tip
      :edited-form="editedForm"
      :data-key="dataKey"
    />
  </main-template>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapState } from 'vuex'
const MainTemplate = () => import('~/components/templates/MainTemplate.vue')
const FormTemplate = () => import('~/components/templates/FormTemplate.vue')
const TipList = () => import('~/components/tip/List.vue')
const NewTip = () => import('~/components/tip/New.vue')
const EditTip = () => import('~/components/tip/Edit.vue')
const Pagination = () => import('~/components/layout/Pagination.vue')
const StoryInput = () => import('~/components/atoms/Input.vue')
const StorySelect = () => import('~/components/atoms/Select.vue')

@Component({
  middleware: 'auth',
  components: {
    MainTemplate,
    FormTemplate,
    TipList,
    NewTip,
    EditTip,
    Pagination,
    StoryInput,
    StorySelect
  },
  async fetch({ store }) {
    await store.dispatch('product/fetchTips', null)
    await store.dispatch('product/fetchEvents')
  },
  computed: {
    eventOptions() {
      let array = []
      this.$store.state.product.events.item.forEach((item) => {
        array.push(item.data.name)
      })
      return array
    },
    ...mapState({
      userStatus: state => state.product.userStatus,
      loading: state => state.product.loading,
      dialog: state => state.product.dialog,
      tips: state => state.product.tips,
      events: state => state.product.events
    })
  },
})
export default class TipPage extends Vue {
  editedForm = {
    title : '',
    url: '',
    description: '',
    tags: [],
    event: 0,
    time: ''
  };
  dataKey: string = '';
  page: number = 1;
  inputSearch: string = '';
  selectedEvent: number = 0;

  async startEdited() {
    await this.$store.dispatch('product/addDialog')
  }

  applyEditedForm(value) {
    this.editedForm = value.data
    this.dataKey = value.id
    this.startEdited()
  }

  applyPage(value) {
    this.page = value
  }
}
</script>

<style scoped>

</style>
