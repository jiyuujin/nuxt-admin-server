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
import Vue from 'vue'
import { MENU_LIST } from '~/utils/layout'

export default Vue.extend({
  props: {
    userStatus: {
      type: Boolean
    }
  },
  data() {
    return {
      menus: MENU_LIST
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('product/signOut')
      if (!this.$store.state.product.userStatus) {
        this.$router.push('/login')
      }
    }
  }
})
</script>
