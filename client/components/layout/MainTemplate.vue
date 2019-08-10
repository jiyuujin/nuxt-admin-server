<template>
    <div>
        <LeftMenu
            v-if="userStatus"
        />
        <div
            v-if="userStatus"
            class="logout"
        >
            <story-button
                text="logout"
                @handleClick="logout"
            />
        </div>
        <div :class="isForm ? `form` : `main`">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
const LeftMenu = () => import('~/components/layout/LeftMenu.vue')
const StoryButton = () => import('~/components/atoms/Button.vue')

@Component({
    components: {
        LeftMenu,
        StoryButton
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
