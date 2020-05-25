<template>
  <main-template :user-status="userStatus">
    <div class="mb-8">
      <div class="font-bold">
        最新のお知らせ
      </div>
      <div
        class="p-4 mb-6 border-solid border rounded-lg shadow-md border-gray-200"
      >
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

      <card
        v-for="product in products"
        :key="product.id"
        :title="product.name"
        :icon="icon"
        :tags="product.tags"
        :price="product.price"
        :tooltip="product.tooltip"
        :url="product.url"
        :disabled="product.disabled"
        :promotion="product.promotion"
        :rate="product.rate"
        :description="product.description"
      />

      <div class="flex justify-around pb-4 mb-8">
        <div style="width: calc(50% - 4px); margin-right: 4px;">
          <div class="font-bold">
            このアプリの情報
          </div>
          <div
            class="p-4 h-64 justify-between border-solid border rounded-lg shadow-md border-gray-200"
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
                <a href="https://webneko.dev/contact">
                  https://webneko.dev/contact
                </a>
              </div>
            </div>
            <div class="my-4 flex justify-between">
              <div>開発元</div>
              <div>nekohack inc.</div>
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
            class="p-4 h-64 justify-between border-solid border rounded-lg shadow-md border-gray-200"
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

      <div class="flex justify-end pb-4 mb-8">
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

const gql = require('graphql-tag')
const { ApolloClient } = require('apollo-client')
const { HttpLink } = require('apollo-link-http')
const { ApolloLink, concat } = require('apollo-link')
const { InMemoryCache } = require('apollo-cache-inmemory')
const fetch = require('node-fetch')

const GITHUB_USER: string = 'jiyuujin'
const GITHUB_REPO_NAME: string = 'admin'
const GITHUB_API_V4: string = 'https://api.github.com/graphql'

const MainTemplate = () => import('~/components/MainTemplate.vue')
const Card = () => import('@/components/lp/Card.vue')

import { products } from '~/utils/product'

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: `bearer ${process.env.NUXT_APP_GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v4.idl'
    }
  })
  return forward(operation)
})

const httpLink = new HttpLink({
  uri: GITHUB_API_V4,
  fetch
})
const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache()
})

export default defineComponent({
  components: {
    MainTemplate,
    Card
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
    // .then(console.log)

    return {
      notifications: data
    }
  },
  setup(props: {}, ctx: SetupContext) {
    const icon = require('../../static/bakeneko.png')
    const state = reactive({
      email: '',
      password: '',
      isForm: true
    })

    const userStatus = computed(() => ctx.root.$store.state.product.userStatus)

    return {
      products: products,
      icon,
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
