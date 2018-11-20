<template>
  <v-flex xs12>
    <v-layout row wrap>
      <v-flex
        v-for="value in menu"
        v-bind="{ [`xs${value.flex}`]: true }"
        :key="value.title"
      >
        <v-card
          :to="value.url"
        >
          <v-card-media
            :src="'/' + value.src"
            height="200px"
            contain
          >
          </v-card-media>
        </v-card>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import { MENU_LIST } from '~/utils/menu'
export default {
  data () {
    return {
      menu: MENU_LIST
    }
  }
}
</script>

<style scoped>
</style>
