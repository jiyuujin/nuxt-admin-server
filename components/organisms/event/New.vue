<template>
  <div>
    <FormTemplate>
      <InputForm
        :data="form.name"
        column="名前"
        @form-data="applyName"
      />
    </FormTemplate>
    <FormTemplate>
      <InputForm
        :data="form.url"
        column="URL"
        @form-data="applyUrl"
      />
    </FormTemplate>
    <FormTemplate>
      <SingleSelectForm
        :option="locales"
        :number="form.locale"
        column="地域"
        @form-data="applyLocale"
      />
    </FormTemplate>
    <FormTemplate>
      <Button
        action-name="Eventを追加"
        @click="postEvent"
      />
    </FormTemplate>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FormTemplate from '~/components/templates/FormTemplate'
import Button from '~/components/atoms/Button'
import InputForm from '~/components/atoms/InputForm'
import SingleSelectForm from '~/components/atoms/SingleSelectForm'
import { LOCALES } from '~/utils/index'
export default {
  components: {
    FormTemplate,
    Button,
    InputForm,
    SingleSelectForm
  },
  data () {
    return {
      locales: LOCALES,
      form: {
        name: '',
        url: '',
        locale: 0
      }
    }
  },
  computed: {
    ...mapGetters(['events'])
  },
  methods: {
    applyName (value) {
      this.form.name = value
    },
    applyUrl (value) {
      this.form.url = value
    },
    applyLocale (value) {
      this.form.locale = value
    },
    reset () {
      this.form.name = ''
      this.form.url = ''
      this.form.locale = 0
    },
    async postEvent () {
      await this.$store.dispatch('addEvent', {
        name: this.form.name,
        url: this.form.url,
        locale: this.form.locale
      })
      this.reset()
    }
  }
}
</script>

<style scoped>

</style>
