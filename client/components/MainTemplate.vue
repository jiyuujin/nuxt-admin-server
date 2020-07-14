<template>
  <div>
    <div v-if="userStatus" class="flex justify-between items-center">
      <div v-for="menu in menus" :key="menu.title">
        <nuxt-link :to="menu.url">
          {{ menu.url }}
        </nuxt-link>
      </div>
      <j-button text="ログアウト" @handleClick="logout" />
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import UserComposable from '~/composables/user'

import { MENU_LIST } from '~/utils/layout'

export default defineComponent({
  props: {
    userStatus: {
      type: Boolean
    }
  },
  setup(props, ctx: SetupContext) {
    const menus = MENU_LIST
    const userModule = UserComposable(props, ctx)
    return { menus, ...userModule }
  }
})
</script>
