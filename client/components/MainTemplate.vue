<template>
  <div>
    <div v-if="userStatus" class="menu">
      <div v-for="menu in menus" :key="menu.title">
        <nuxt-link :to="menu.url">
          <img :src="`/${menu.src}`" :alt="menu.src" decoding="async" />
        </nuxt-link>
      </div>
    </div>
    <div v-if="userStatus" class="logout">
      <j-button text="ログアウト" variant-style="text" @handleClick="logout" />
    </div>
    <div class="main">
      <slot />
    </div>
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

<style scoped>
.logout {
  text-align: right;
  margin-bottom: 15px;
}

.main {
  margin: 0 2%;
  width: 96%;
}

.menu {
  top: 5%;
  left: 5%;
  display: flex;
}

img {
  width: 25px;
  height: 25px;
  margin: 15px;
}
</style>
