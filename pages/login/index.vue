<template>
  <MainTemplate
    :status="userStatus"
    class="login"
  >
    <FormTemplate>
      <InputForm
        :data="email"
        column="Email"
        @form-data="applyEmail"
      />
    </FormTemplate>
    <FormTemplate>
      <InputForm
        :data="password"
        column="Password"
        @form-data="applyPassword"
      />
    </FormTemplate>
    <FormTemplate>
      <Button
        action-name="login"
        @click="login"
      />
    </FormTemplate>
  </MainTemplate>
</template>

<script>
import { mapState } from 'vuex'
import firebase from 'firebase'
import MainTemplate from '~/components/templates/MainTemplate'
import FormTemplate from '~/components/templates/FormTemplate'
import Button from '~/components/atoms/Button'
import InputForm from '~/components/atoms/InputForm'
export default {
  components: {
    MainTemplate,
    FormTemplate,
    Button,
    InputForm
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState(['userStatus'])
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

<style scoped>
.login {
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
