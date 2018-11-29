<template>
  <v-container
    align-center
    justify-center
    row
    fill-height
  >
    <v-card>
      <v-card-text>
        <InputForm
          :data="email"
          column="Email"
          @form-data="applyEmail"
        />
        <InputForm
          :data="password"
          column="Password"
          @form-data="applyPassword"
        />
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
import InputForm from '~/components/atoms/InputForm'
export default {
  components: {
    InputForm
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    applyEmail(val) {
      this.email = val
    },
    applyPassword(val) {
      this.password = val
    },
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
