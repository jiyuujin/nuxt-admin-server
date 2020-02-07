<template>
    <div>
        <LeftMenu v-if="userStatus" />
        <div v-if="userStatus" class="logout">
            <j-button
                text="ログアウト"
                variant-style="text"
                @handleClick="logout"
            />
        </div>
        <div class="main">
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

.main {
    margin: 0 2%;
    width: 96%;
}
</style>
