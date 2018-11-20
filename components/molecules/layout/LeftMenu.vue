<template>
  <v-navigation-drawer
    mini-variant
    stateless
  >
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img :src="iconImage" width="25px" height="25px">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ siteTitle }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn
              icon
              @click.stop="shorten = !shorten"
            >
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>
      <v-list-tile
        v-for="value in menu"
        :key="value.title"
      >
        <v-card
          :to="value.url"
        >
          <v-list-tile-action>
            <img :src="'/' + value.src" width="25px" height="25px">
          </v-list-tile-action>
        </v-card>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { MENU_LIST } from '~/utils/menu'
export default {
  data () {
    return {
      shorten: true,
      menu: MENU_LIST,
      iconImage: '/bakeneko.png',
      siteTitle: 'Nuxt Admin Server'
    }
  }
}
</script>

<style scoped>
</style>
