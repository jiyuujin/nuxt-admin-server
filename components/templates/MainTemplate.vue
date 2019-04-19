<template>
  <div>
    <LeftMenu v-if="userStatus" />
    <Loading
      v-if="userStatus"
      :loading="loading"
    />
    <div
      v-if="userStatus"
      class="logout"
    >
      <story-button
        text="logout"
        @click="logout"
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
const Loading = () => import('~/components/layout/Loading.vue')
const StoryButton = () => import('~/components/atoms/Button.vue')

@Component({
  components: {
    LeftMenu,
    Loading,
    StoryButton
  }
})
export default class MainTemplate extends Vue {
  @Prop() loading: boolean;
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
</style>
