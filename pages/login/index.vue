<template>
  <main-template
    :status="userStatus"
    class="login"
  >
    <form-template>
      <story-input
        v-model="email"
        placeholder="Email"
      />
    </form-template>
    <form-template>
      <story-input
        v-model="password"
        placeholder="Password"
      />
    </form-template>
    <form-template>
      <story-button
        text="login"
        @click="login"
      />
    </form-template>
  </main-template>
</template>

<script>
import { mapState } from 'vuex'
import MainTemplate from '~/components/templates/MainTemplate'
import FormTemplate from '~/components/templates/FormTemplate'

import StoryInput from '~/components/atoms/Input'
import StoryButton from '~/components/atoms/Button.vue'

export default {
  components: {
    MainTemplate,
    FormTemplate,
    StoryInput,
    StoryButton
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState(['userStatus'])
  },
  methods: {
    applyEmail(val) {
      this.email = val
    },
    applyPassword(val) {
      this.password = val
    },
    async login () {
      await this.$store.dispatch('signIn', {
        email: this.email,
        password: this.password
      })

      if (this.$store.state.userStatus) {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
.login {
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
