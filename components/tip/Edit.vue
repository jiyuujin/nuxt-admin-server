<template>
  <dialog v-if="events && dialog">
    <div>
      <form-template>
        <story-input
          v-model="editedForm.title"
          placeholder="タイトル"
        />
      </form-template>
      <form-template>
        <story-input
          v-model="editedForm.url"
          placeholder="URL"
        />
      </form-template>
      <form-template>
        <story-input
          v-model="editedForm.description"
          placeholder="タイトル"
        />
      </form-template>
      <form-template>
        <story-select
          :options="categoryOptions"
          :multiple="Boolean(true)"
          v-model="editedForm.tags"
          name="タグ"
          @form-data="applyTags"
        />
      </form-template>
      <form-template>
        <story-select
          :options="eventOptions"
          v-model="editedForm.event"
          name="イベント"
        />
      </form-template>
      <form-template>
        <story-button
          text="削除する"
          @click="close"
        />
        <story-button
          text="保存する"
          @click="save"
        />
      </form-template>
    </div>
  </dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { CATEGORIES } from '~/utils/index'
import { TipForm } from '~/types/database.types'
const FormTemplate = () => import('~/components/templates/FormTemplate.vue')
const StoryInput = () => import('~/components/atoms/Input.vue')
const StorySelect = () => import('~/components/atoms/Select.vue')
const StoryButton = () => import('~/components/atoms/Button.vue')

@Component({
  components: {
    FormTemplate,
    StoryInput,
    StorySelect,
    StoryButton
  },
  computed: {
    categoryOptions (this: EditTip) {
      let array: string[] = []
      CATEGORIES.forEach((item) => {
        array.push(item.text)
      })
      return array
    },
    eventOptions (this: EditTip) {
      let array: string[] = []
      this.$store.state.product.events.item.forEach((item) => {
        array.push(item.data.name)
      })
      return array
    }
  },
  async created () {
    await this.$store.dispatch('product/fetchEvents')
  },
})
export default class EditTip extends Vue {
  @Prop() editedForm: TipForm;
  @Prop() dataKey: string;

  get dialog () {
    return this.$store.state.product.dialog
  }

  get events () {
    return this.$store.state.product.events
  }

  applyTags (value) {
    this.editedForm.tags = value
  }

  async close () {
    await this.$store.dispatch('product/removeDialog')
  }

  async save () {
    await this.$store.dispatch('product/updateTip', {
      'key': this.dataKey,
      'data': this.editedForm
    })
    this.close()
  }
}
</script>

<style scoped>

</style>
