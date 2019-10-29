<template>
    <div>
        <LeftMenu
            v-if="userStatus"
        />
        <div
            v-if="userStatus"
            class="logout"
        >
            <j-button
                text="ログアウト"
                variant-style="text"
                @handleClick="logout"
            ></j-button>
        </div>
        <div :class="isForm ? `form` : `main`">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
const LeftMenu = () => import('~/components/layout/LeftMenu.vue')

@Component({
    components: {
        LeftMenu
    }
})
export default class MainTemplate extends Vue {
    @Prop() userStatus: boolean;
    isForm: boolean = true;

    async logout() {
        await this.$store.dispatch('product/signOut')

        if (!this.$store.state.product.userStatus) {
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>
.logout {
    text-align: right;
    margin-bottom: 15px;
}

.form {
    margin: 0 auto;
    padding-bottom: 10px;
}
</style>
