<template>
  <div class="menu">
    <div
      v-for="value in menu"
      :key="value.title"
    >
      <nuxt-link
        :to="value.url"
      >
        <img
          :src="'/' + value.src"
          :alt="value.src"
        >
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { MENU_LIST } from '~/utils/index'
export default {
  data () {
    return {
      menu: MENU_LIST,
      iconImage: '/bakeneko.png'
    }
  }
}
</script>

<style scoped>
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
