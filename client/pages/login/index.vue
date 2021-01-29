<template>
  <main-template :user-status="userStatus">
    <!--
    <template v-for="product in products">
      <app-card
        :key="product.id"
        :title="product.title"
        :icon="product.icon"
        :tags="product.tags"
        :price="product.price"
        :tooltip="product.tooltip"
        :promotion="product.promotion"
        :rate="product.rate"
        :description="product.description"
      />
    </template>
    -->

    <div class="mb-8">
      <div class="p-4 h-64 flex flex-col justify-center item-center align-middle min-h-screen">
        <div class="my-4 flex justify-center item-center">
          <j-input
            placeholder="メールアドレス"
            :text="state.email"
            @handleInput="applyEmail"
          />
        </div>
        <div class="my-4 flex justify-center item-center">
          <j-input
            placeholder="パスワード"
            input-type="password"
            :text="state.password"
            password
            @handleInput="applyPassword"
          />
        </div>
        <div class="my-4 flex justify-center item-center">
          <j-button text="ログイン" @handleClick="login" />
        </div>
      </div>
    </div>
  </main-template>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import UserComposable from '~/composables/user'
import { useLayout } from '~/composables/layout'

const MainTemplate = () => import('~/components/MainTemplate.vue')
const AppCard = () => import('~/components/Card/App.vue')

import { products } from '~/utils/product'

export default defineComponent({
  components: {
    MainTemplate,
    AppCard
  },
  setup(props: {}, ctx: SetupContext) {
    const userModule = UserComposable(props, ctx)
    const { mode } = useLayout()
    return { ...userModule, mode, products }
  }
})
</script>
