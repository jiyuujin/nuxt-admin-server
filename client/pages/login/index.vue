<template>
    <main-template :user-status="userStatus" class="login">
        <main-template :is-form="isForm">
            <j-input
                placeholder="メールアドレス"
                input-type="text"
                @handleInput="applyEmail"
            />
        </main-template>
        <main-template :is-form="isForm">
            <j-input
                placeholder="パスワード"
                input-type="password"
                password
                @handleInput="applyPassword"
            />
        </main-template>
        <main-template :is-form="isForm">
            <j-button
                text="ログイン"
                variant-style="text"
                @handleClick="login"
            />
        </main-template>
    </main-template>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

const MainTemplate = () => import('~/components/layout/MainTemplate.vue')

@Component({
    components: {
        MainTemplate
    }
})
export default class LoginPage extends Vue {
    email: string = '';
    password: string = '';
    isForm: boolean = true;

    get userStatus () {
        return this.$store.state.product.userStatus
    }

    applyEmail(value) {
        this.email = value
    }

    applyPassword(value) {
        this.password = value
    }

    async login () {
        await this.$store.dispatch('product/signIn', {
            email: this.email,
            password: this.password
        })

        if (this.$store.state.product.userStatus) {
            await this.$router.push('/')
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
