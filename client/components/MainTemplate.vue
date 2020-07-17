<template>
  <div>
    <div v-if="userStatus" class="flex justify-between items-center">
      <j-select :options="menus" :values="menu" @handleSelect="selectMenu" />
      <j-button text="ログアウト" @handleClick="logout" />
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import UserComposable from '~/composables/user'
import LayoutComposable from '~/composables/layout'

import { MENU_LIST } from '~/utils/layout'

export default defineComponent({
  setup(props: {}, ctx: SetupContext) {
    const menus = MENU_LIST
    const userModule = UserComposable(props, ctx)
    const layoutModule = LayoutComposable(props, ctx)
    return { menus, ...userModule, ...layoutModule }
  }
})
</script>
