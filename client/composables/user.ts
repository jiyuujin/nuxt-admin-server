import { computed, SetupContext, reactive } from '@vue/composition-api'

export default (props: {}, ctx: SetupContext) => {
  const state = reactive({
    email: '',
    password: '',
    isForm: true
  })

  const userStatus = computed(() => {
    return ctx.root.$store.state.product.userStatus
  })

  const login = async () => {
    await ctx.root.$store.dispatch('product/signIn', {
      email: state.email,
      password: state.password
    })

    if (ctx.root.$store.state.product.userStatus) {
      await ctx.root.$router.push('/')
    }
  }

  const logout = async () => {
    await ctx.root.$store.dispatch('product/signOut')
    if (!ctx.root.$store.state.product.userStatus) {
      ctx.root.$router.push('/login')
    }
  }

  const applyEmail = (value) => {
    state.email = value
  }

  const applyPassword = (value) => {
    state.password = value
  }

  return {
    state,
    userStatus,
    login,
    logout,
    applyEmail,
    applyPassword
  }
}
