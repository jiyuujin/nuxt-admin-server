<template>
  <main-template
    :user-status="userStatus"
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
        input-type="password"
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

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapState } from 'vuex'
const MainTemplate = () => import('~/components/templates/MainTemplate.vue')
const FormTemplate = () => import('~/components/templates/FormTemplate.vue')
const StoryInput = () => import('~/components/atoms/Input.vue')
const StoryButton = () => import('~/components/atoms/Button.vue')

@Component({
  components: {
    MainTemplate,
    FormTemplate,
    StoryInput,
    StoryButton
  },
  computed: {
    ...mapState({
      userStatus: state => state.product.userStatus
    })
  },
})
export default class LoginPage extends Vue {
  email: string = '';
  password: string = '';

  async login () {
    await this.$store.dispatch('product/signIn', {
      email: this.email,
      password: this.password
    })

    if (this.$store.state.product.userStatus) {
      await this.$router.push('/')
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
