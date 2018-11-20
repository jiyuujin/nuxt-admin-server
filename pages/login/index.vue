<template>
  <v-container>
    <v-card>
      <v-toolbar
        dark
        color="primary"
      >
        <v-toolbar-title>
          Login
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
            prepend-icon="email"
            label="Email"
            type="text"
            v-model="email"
          />
          <v-text-field
            prepend-icon="lock"
            label="Password"
            type="password"
            v-model="password"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="login"
        >
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import firebase from 'firebase'
export default {
  data () {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    async login () {
      await firebase.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(res => {
          this.$store.dispatch('setUserStatus', true)
          this.$router.push('/')
        })
        .catch(err => {
          // console.log('error')
        })
    }
  }
}
</script>
