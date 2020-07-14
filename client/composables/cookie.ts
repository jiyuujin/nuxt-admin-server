import { SetupContext } from '@vue/composition-api'

export default (props: {}, ctx: SetupContext) => {
  const message =
    'Nuxt Adminを利用すると、Cookieの使用に同意したことになります。jiyuujin LAB.とそのパートナーは、アナリティクス、カスタマイズ、広告目的も含めて、世界中でサービスを提供しCookieを使用します。'

  const accept = () => {
    ctx.root.$store.dispatch('cookie/accept')
  }

  return { message, accept }
}
