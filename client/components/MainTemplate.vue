<template>
  <div>
    <div v-if="userStatus" class="flex justify-between items-center py-4">
      <ul class="flex border-b">
        <template v-for="menu in menus">
          <li class="mr-1">
            <nuxt-link
              :key="menu.value"
              :class="
                $route.path === menu.url
                  ? 'bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold'
                  : 'bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold'
              "
              :to="menu.url"
            >
              {{ menu.text }}
            </nuxt-link>
          </li>
        </template>
      </ul>
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
