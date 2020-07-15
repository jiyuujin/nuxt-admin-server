<template>
  <main-template :user-status="userStatus">
    <div class="mb-8">
      <div class="mx-12 font-bold">
        最新のお知らせ
      </div>
      <div class="p-4 mx-12 rounded-lg shadow-card border-gray-200">
        <template v-for="issue in issues">
          <div
            :key="issue.id"
            :class="
              $device.isDesktop
                ? 'flex justify-between items-center align-middle'
                : 'flex flex-col'
            "
          >
            <div :class="$device.isDesktop ? 'mb-2' : ''">
              <div>{{ issue.repositoryName }}</div>
              <a :href="issue.url" target="_blank" rel="noopener">
                {{ issue.title }}
              </a>
            </div>
            <div class="mb-2">
              {{ issue.updatedAt }}
            </div>
          </div>
        </template>
      </div>

      <div class="mx-12 font-bold">
        アプリ一覧
      </div>
      <div>
        <template v-for="product in products">
          <app-card
            :key="product.id"
            :title="product.title"
            :icon="product.icon"
            :tags="product.tags"
            :price="product.price"
            :tooltip="product.tooltip"
            :handle-submit-click-callback="() => linkToUrl(product.url)"
            :promotion="product.promotion"
            :rate="product.rate"
            :description="product.description"
          />
        </template>
      </div>

      <div class="flex flex-wrap justify-around pb-4 mx-12">
        <div class="flex-1">
          <div class="font-bold">
            このアプリの情報
          </div>
          <div
            class="p-4 h-64 justify-between rounded-lg shadow-card border-gray-200"
          >
            <div class="my-4 flex justify-between">
              <div>モード</div>
              <div>{{ mode }} mode</div>
            </div>
            <div class="my-4 flex justify-between">
              <div>開発元</div>
              <div>nekohack</div>
            </div>
            <div class="my-4 flex justify-between">
              <div>公開日</div>
              <div>2018/05/04</div>
            </div>
            <div class="my-4 flex justify-between">
              <div>改訂日</div>
              <div>2020/04/02</div>
            </div>
          </div>
        </div>
        <div class="flex-1">
          <div class="font-bold">
            ログイン
          </div>
          <div
            class="p-4 h-64 justify-between rounded-lg shadow-card border-gray-200"
          >
            <div class="my-4">
              <j-input
                placeholder="メールアドレス"
                :text="state.email"
                @handleInput="applyEmail"
              />
            </div>
            <div class="my-4">
              <j-input
                placeholder="パスワード"
                input-type="password"
                :text="state.password"
                password
                @handleInput="applyPassword"
              />
            </div>
            <div class="my-4">
              <j-button text="ログイン" @handleClick="login" />
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end mx-12">
        <j-button text="問題を報告" @handleClick="report" />
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

import { fetchRepositories } from '~/services/githubService'
import { products } from '~/utils/product'

export default defineComponent({
  components: {
    MainTemplate,
    AppCard
  },
  async asyncData() {
    return {
      issues: await fetchRepositories()
    }
  },
  setup(props: {}, ctx: SetupContext) {
    const userModule = UserComposable(props, ctx)
    const { mode } = useLayout()
    return {
      ...userModule,
      mode,
      products: products,
      report() {
        location.href = 'https://webneko.dev/contact'
      },
      linkToUrl(url: string) {
        if (url) {
          // location.href = url
        }
      }
    }
  }
})
</script>
