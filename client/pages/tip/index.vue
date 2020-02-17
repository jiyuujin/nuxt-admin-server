<template>
  <main-template
    v-if="tips"
    :user-status="userStatus"
  >
    <j-modal
      title="Tipを追加"
      style="margin: 20px 0;"
      :handle-cancel-click-callback="cancel"
      :handle-submit-click-callback="submit"
    >
      <div
        v-if="events"
        style="width: 100%;"
      >
        <j-form title="タイトル">
          <j-input @handleInput="applyTitle" />
        </j-form>
        <j-form title="URL">
          <j-input @handleInput="applyUrl" />
        </j-form>
        <j-form title="詳細">
          <j-input @handleInput="applyDescription" />
        </j-form>
        <j-form title="カテゴリー">
          <j-select
            :options="categoryOptions"
            :selected-values="form.tags"
            @handleSelect="applyTags"
          />
        </j-form>
        <j-form title="イベント">
          <j-select
            :options="eventOptions"
            :selected-values="form.event"
            @handleSelect="applyEvent"
          />
        </j-form>
      </div>
    </j-modal>

    <new-photo />

    <tip-list
      :list="tips.item"
      :number="page"
    />
    <pagination
      :page="page"
      :max="Math.ceil(tips.item.length / 20)"
      @form-data="applyPage"
    />
  </main-template>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { fetchTips, addTip } from '~/services/tipService'
import { fetchEvents } from '~/services/eventService'
import { CATEGORIES } from '~/utils/tip'

const MainTemplate = () => import('~/components/layout/MainTemplate.vue')
const TipList = () => import('~/components/tip/List.vue')
const NewPhoto = () => import('~/components/photo/New.vue')
const Pagination = () => import('~/components/layout/Pagination.vue')

@Component({
    middleware: 'auth',
    components: {
        MainTemplate,
        TipList,
        NewPhoto,
        Pagination
    },
    computed: {
        categoryOptions() {
            return CATEGORIES
        },
        eventOptions() {
            let array: object[] = [];
            (this as any).events.item.forEach((item) => {
                array.push({
                    value: item.data.id,
                    text: item.data.name
                })
            })
            return array
        }
    },
    async mounted() {
        (this as any).tips = await fetchTips();
        (this as any).events = await fetchEvents()
    }
})
export default class TipPage extends Vue {
    page: number = 1
    tips = null
    events = null
    form = {
        title: '' as string,
        url: '' as string,
        description: '' as string,
        tags: [] as number[],
        event: 0 as number
    }

    get userStatus () {
        return this.$store.state.product.userStatus
    }

    applyPage(value: number) {
        this.page = value
    }

    applyTitle(value: string) {
        this.form.title = value
    }

    applyUrl(value: string) {
        this.form.url = value
    }

    applyDescription(value: string) {
        this.form.description = value
    }

    applyEvent(value: number) {
        this.form.event = value
    }

    applyTags(value: number) {
        let isSame: boolean = false
        this.form.tags.map(tag => {
            if (tag === value) {
                isSame = true
            }
        })
        if (!isSame) {
            this.form.tags.push(value)
        }
    }

    reset() {
        this.form.title = ''
        this.form.url = ''
        this.form.description = ''
        this.form.tags = [0]
        this.form.event = 0
    }

    cancel() {
        this.reset()
    }

    async submit() {
        await addTip(this.form)
        this.reset()
    }
}
</script>
