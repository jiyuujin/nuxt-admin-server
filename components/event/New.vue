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
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { mapState } from 'vuex'
import { LOCALES } from '~/utils/index'
const FormTemplate = () => import('~/components/templates/FormTemplate.vue')
const StoryInput = () => import('~/components/atoms/Input.vue')
const StorySelect = () => import('~/components/atoms/Select.vue')
const StoryButton = () => import('~/components/atoms/Button.vue')

interface EventForm {
  name: string,
  url: string;
  locale: number
}

@Component({
  components: {
    FormTemplate,
    StoryInput,
    StorySelect,
    StoryButton
  },
  computed: {
    localeOptions () {
      let array = []
      LOCALES.forEach(category => {
        array.push(category.text)
      })
      return array
    },
    ...mapState({
      events: state => state.product.events
    })
  },
})
export default class EventNew extends Vue {
  form: EventForm = {
    name: '',
    url: '',
    locale: 0
  };

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
