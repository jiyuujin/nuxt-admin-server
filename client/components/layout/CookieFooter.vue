<template>
  <footer>
    <client-only>
      <cookie-law
        theme="dark-lime"
        button-text="受け入れる"
        @accept="$store.commit('acceptCookie')"
      >
        <div slot="message">
          {{ message }}
        </div>
      </cookie-law>
    </client-only>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import CookieLaw from 'vue-cookie-law'

@Component({
    components: {
        CookieLaw
    },
})
export default class CookieFooter extends Vue {
    message: string = 'Nuxt Adminを利用すると、Cookieの使用に同意したことになります。jiyuujin LAB.とそのパートナーは、アナリティクス、カスタマイズ、広告目的も含めて、世界中でサービスを提供しCookieを使用します。'
}
</script>
