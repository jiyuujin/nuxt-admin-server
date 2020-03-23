<template>
  <div>
    <div v-if="userStatus" class="menu">
      <div v-for="menu in menus" :key="menu.title">
        <nuxt-link :to="menu.url">
          {{ menu.url }}
        </nuxt-link>
      </div>
    </div>
    <div v-if="userStatus" class="logout">
      <j-button text="ログアウト" fill="text" @handleClick="logout" />
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

<style lang="scss" scoped>
.logout {
  text-align: right;
  margin-bottom: 15px;
}

.main {
  margin: 0 2%;
  width: 96%;
}

.menu {
  display: flex;
  align-items: left;
  justify-content: left;
  margin-top: 2em;
  margin-left: 1.6em;
  vertical-align: center;

  @media screen and (prefers-reduced-motion: reduce) {
    a {
      margin-right: 16px;
      overflow: hidden;
      -webkit-transition: all 0.3s ease-in-out;
      -o-transition: all 0.3s ease-in-out;
      transition: none;

      &::before {
        position: absolute;
        top: 0;
        left: -100%;
        z-index: -1;
        width: 100%;
        height: 100%;
        content: '';
        -webkit-transition: all 0.3s ease-in-out;
        -o-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
      }

      &:hover,
      &:focus {
        color: #42b883;
      }
    }
  }

  a {
    margin-right: 16px;
    overflow: hidden;
    -webkit-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;

    @media screen and (prefers-reduced-motion: reduce) {
      &::before {
        position: absolute;
        top: 0;
        left: -100%;
        z-index: -1;
        width: 100%;
        height: 100%;
        content: '';
        -webkit-transition: all 0.3s ease-in-out;
        -o-transition: all 0.3s ease-in-out;
        transition: none;
      }
    }

    &::before {
      position: absolute;
      top: 0;
      left: -100%;
      z-index: -1;
      width: 100%;
      height: 100%;
      content: '';
      -webkit-transition: all 0.3s ease-in-out;
      -o-transition: all 0.3s ease-in-out;
      transition: all 0.3s ease-in-out;
    }

    &:hover,
    &:focus {
      padding: 8px;
      height: 100%;
      background: #42b883;
      box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1), 0 5px 11px rgba(0, 0, 0, 0.25);
      margin-left: -8px;
      margin-bottom: -8px;
      border-radius: 3px;
    }
  }
}
</style>
