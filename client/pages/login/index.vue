<template>
  <main-template :user-status="userStatus" class="login">
    <div style="margin: 20px;">
      <j-input
        placeholder="メールアドレス"
        :text="state.email"
        @handleInput="applyEmail"
      />
    </div>
    <div style="margin: 20px;">
      <j-input
        placeholder="パスワード"
        input-type="password"
        :text="state.password"
        password
        @handleInput="applyPassword"
      />
    </div>
    <div style="margin: 20px;">
      <j-button text="ログイン" fill="text" @handleClick="login" />
    </div>
  </main-template>
</template>

<script lang="ts">
import {
  createComponent,
  SetupContext,
  reactive,
  computed
} from '@vue/composition-api'

const MainTemplate = () => import('~/components/MainTemplate.vue')

export default createComponent({
  components: {
    MainTemplate
  },
  setup(props: {}, ctx: SetupContext) {
    const state = reactive({
      email: '',
      password: '',
      isForm: true
    })

    const userStatus = computed(() => ctx.root.$store.state.product.userStatus)

    return {
      state,
      userStatus,
      applyEmail(value) {
        state.email = value
      },
      applyPassword(value) {
        state.password = value
      },
      async login() {
        await ctx.root.$store.dispatch('product/signIn', {
          email: state.email,
          password: state.password
        })

        if (ctx.root.$store.state.product.userStatus) {
          await ctx.root.$router.push('/')
        }
      }
    }
  }
})
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
