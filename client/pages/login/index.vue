<template>
  <main-template :user-status="userStatus">
    <div class="mb-8">
      <div class="mx-2 font-bold">
        最新のお知らせ
      </div>
      <div v-if="state.tips" class="flex flex-wrap flex-row">
        <template v-for="item in state.tips.item">
          <div
            v-if="item.page === state.activePage"
            :key="item.id"
            :class="$device.isDesktop ? 'w-2/4' : 'w-full'"
            class="rounded-lg border-gray-400 shadow-card px-4 py-2 mb-2 h-32"
          >
            <template>
              <a :href="item.data.url" target="_blank" rel="noopener">
                <div
                  :class="
                    $device.isDesktop
                      ? 'flex justify-start items-center align-middle'
                      : 'flex flex-col'
                  "
                >
                  <div :class="$device.isDesktop ? 'mb-2' : ''">
                    <div class="font-bold">{{ titleText(item) }}</div>
                    <div>
                      <template v-for="tag in item.data.tags">
                        <j-label
                          :key="tag"
                          :text="tagText(tag)"
                          style="margin: 2px;"
                        />
                      </template>
                    </div>
                  </div>
                </div>
              </a>
            </template>
          </div>
        </template>
        <j-pagination
          :items="state.tips.item !== undefined ? state.tips.item : []"
          :current-page="state.activePage"
          :per-page="state.perPage"
          @handlePage="applyPage"
        />
      </div>

      <div class="mx-2 font-bold">
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

      <div class="flex flex-wrap justify-around pb-4 mx-2">
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

      <div class="flex justify-end mx-2">
        <j-button text="問題を報告" @handleClick="report" />
      </div>
    </div>
  </main-template>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import UserComposable from '~/composables/user'
import TipComposable from '~/composables/tip'
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
    const tipModule = TipComposable(props, ctx)
    const { mode } = useLayout()
    return {
      ...userModule,
      ...tipModule,
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
