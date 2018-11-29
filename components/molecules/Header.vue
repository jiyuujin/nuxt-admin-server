<template>
  <v-card-media
    :src="'/' + headerImage"
    height="300px"
  >
    <v-layout
      column
      class="media"
    >
      <v-card-title>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="logout"
        >
          Logout
        </v-btn>
      </v-card-title>
      <v-spacer></v-spacer>
      <v-card-title class="white--text pl-5 pt-5">
        <div class="display-1 pl-5 pt-5">
          {{ headerTitle }}
        </div>
      </v-card-title>
    </v-layout>
  </v-card-media>
</template>

<script>
import firebase from 'firebase'
export default {
  data () {
    return {
      headerImage: 'kuroneko.png',
      headerTitle: 'Welcome to Nuxt Admin Server'
    }
  },
  methods: {
    async logout () {
      await firebase.auth()
        .signOut()
        .then(response => {
          this.$store.dispatch('setUserStatus', false)
          this.$router.push('/login')
        })
        .catch(error => {
          // console.log(error)
        })
    }
  }
}
</script>

<style scoped>
</style>
