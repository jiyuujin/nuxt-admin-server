<template>
  <footer>
    <client-only>
      <cookie-law theme="dark-lime" button-text="受け入れる" @accept="accept">
        <div slot="message">
          {{ message }}
        </div>
      </cookie-law>
    </client-only>
  </footer>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'

import CookieComposable from '~/composables/cookie'

export default defineComponent({
  setup(props: {}, ctx: SetupContext) {
    const cookieModule = CookieComposable(props, ctx)
    return { ...cookieModule }
  }
})
</script>
