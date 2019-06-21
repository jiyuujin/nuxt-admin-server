<template>
  <div>
    <form-template>
      <story-input
        v-model="form.name"
        placeholder="名前"
      />
    </form-template>
    <form-template>
      <story-input
        v-model="form.url"
        placeholder="URL"
      />
    </form-template>
    <form-template>
      <story-select
        :options="localeOptions"
        v-model="form.locale"
      />
    </form-template>
    <form-template>
      <story-button
        text="Eventを追加"
        @click="postEvent"
      />
    </form-template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { EventForm } from '~/types/database.types'
import { LOCALES } from '~/utils'
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
    localeOptions () {
      let array: string[] = []
      LOCALES.forEach(locale => {
        array.push(locale.text)
      })
      return array
    }
  },
})
export default class New extends Vue {
  form: EventForm = {
    id: 0,
    name: '',
    url: '',
    locale: 0
  };

  get events () {
    return this.$store.state.product.events
  }

  reset () {
    this.form.name = ''
    this.form.url = ''
    this.form.locale = 0
  }

  async postEvent () {
    await this.$store.dispatch('product/addEvent', {
      name: this.form.name,
      url: this.form.url,
      locale: this.form.locale
    })
    this.reset()
  }
}
</script>

<style scoped>

</style>
