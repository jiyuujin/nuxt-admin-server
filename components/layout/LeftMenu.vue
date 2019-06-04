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
          decoding="async"
        >
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { MENU_LIST } from '~/utils/index'

@Component({})
export default class LeftMenu extends Vue {
  menu = MENU_LIST;
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
