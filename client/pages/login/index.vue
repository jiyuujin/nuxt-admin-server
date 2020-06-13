<template>
  <main-template :user-status="userStatus">
    <div class="mb-8">
      <div class="mx-12 font-bold">
        最新のお知らせ
      </div>
      <div class="p-4 mx-12 rounded-lg shadow-card border-gray-200">
        <template v-for="issue in notifications.repository.issues.nodes">
          <div :key="issue.id" class="flex justify-between">
            <div>
              <a :href="issue.url" target="_blank" rel="noopener">
                {{ issue.title }}
              </a>
            </div>
            <div>
              {{ issue.updatedAt }}
            </div>
          </div>
        </template>
      </div>

      <template v-for="product in products">
        <j-app-card
          :key="product.id"
          :title="product.title"
          :icon="icon"
          :tags="product.tags"
          :price="product.price"
          :tooltip="product.tooltip"
          :handle-submit-click-callback="() => linkToUrl(product.url)"
          :promotion="product.promotion"
          :rate="product.rate"
          :description="product.description"
        />
      </template>

      <div class="flex justify-around pb-4 mx-12">
        <div style="width: calc(50% - 4px); margin-right: 4px;">
          <div class="font-bold">
            このアプリの情報
          </div>
          <div
            class="p-4 h-64 justify-between rounded-lg shadow-card border-gray-200"
          >
            <div class="my-4 flex justify-between">
              <div>サポートサイト</div>
              <div class="text-ellipsis">
                <a href="https://yuukit.me/">
                  https://yuukit.me/
                </a>
              </div>
            </div>
            <div class="my-4 flex justify-between">
              <div>プライバシーポリシー</div>
              <div class="text-ellipsis">
                <a href="https://nekohack-privacy-policy.netlify.app/">
                  https://nekohack-privacy-policy.netlify.app/
                </a>
              </div>
            </div>
            <div class="my-4 flex justify-between">
              <div>開発元</div>
              <div>nekohack</div>
            </div>
            <div class="my-4 flex justify-between">
              <div>公開日</div>
              <div>2020/04/02</div>
            </div>
          </div>
        </div>
        <div style="width: calc(50% - 4px);">
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
        <j-button text="問題を報告" variant="danger" @handleClick="report" />
      </div>
    </div>
  </main-template>
</template>

<script lang="ts">
import {
  defineComponent,
  SetupContext,
  reactive,
  computed
} from '@vue/composition-api'
import gql from 'graphql-tag'

const GITHUB_USER: string = 'jiyuujin'
const GITHUB_REPO_NAME: string = 'admin'

const MainTemplate = () => import('~/components/MainTemplate.vue')

import { client } from '~/services/githubService'
import { products } from '~/utils/product'

export default defineComponent({
  components: {
    MainTemplate
  },
  async asyncData({ app }) {
    let data = null

    await client
      .query({
        query: gql`{
        repository(owner: "${GITHUB_USER}", name: "${GITHUB_REPO_NAME}") {
          id,
          name,
          description,
          issues(first: 4, orderBy: {field: UPDATED_AT, direction: DESC}, states: OPEN) {
            totalCount,
            nodes {
              title,
              body,
              url,
              createdAt,
              updatedAt
            }
          },
          labels(first: 10) {
            nodes {
              name,
              id
            }
          }
        }
      }`
      })
      .then((res) => (data = res.data))

    return {
      notifications: data
    }
  },
  setup(props: {}, ctx: SetupContext) {
    const state = reactive({
      email: '',
      password: '',
      isForm: true
    })

    const userStatus = computed(() => ctx.root.$store.state.product.userStatus)

    return {
      products: products,
      icon: require('../../static/bakeneko.png'),
      state,
      userStatus,
      report() {
        location.href = 'https://webneko.dev/contact'
      },
      applyEmail(value) {
        state.email = value
      },
      applyPassword(value) {
        state.password = value
      },
      linkToUrl(url: string) {
        if (url) {
          // location.href = url
        }
      },
      async login() {
        await ctx.root.$store.dispatch('product/signIn', {
          email: state.email,
          password: state.password
        })

        if (ctx.root.$store.state.product.userStatus) {
          await ctx.root.$router.push('/')
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 120px;
}
</style>
