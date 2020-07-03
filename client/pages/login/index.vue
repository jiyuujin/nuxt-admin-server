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

      <template v-for="product in products">
        <j-app-card
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

      <div class="flex flex-wrap justify-around pb-4 mx-12">
        <div class="flex-1">
          <div class="font-bold">
            このアプリの情報
          </div>
          <div
            class="p-4 h-64 justify-between rounded-lg shadow-card border-gray-200"
          >
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

// const GITHUB_USER: string = 'jiyuujin'
// const GITHUB_REPO_NAME: string = 'admin'

const MainTemplate = () => import('~/components/MainTemplate.vue')

import { client } from '~/services/githubService'
import { products } from '~/utils/product'

export default defineComponent({
  components: {
    MainTemplate
  },
  async asyncData({ app }) {
    let issues: Array<{
      repositoryName: string
      title: string
      url: string
      createdAt: string
      updatedAt: string
    }> = []

    await client
      .query({
        query: gql`
          {
            viewer {
              login
              repositories(last: 40) {
                edges {
                  node {
                    id
                    url
                    name
                    issues(last: 10, filterBy: { states: OPEN }) {
                      nodes {
                        title
                        url
                        createdAt
                        updatedAt
                      }
                    }
                  }
                }
              }
            }
          }
        `
      })
      .then((res) =>
        res.data.viewer.repositories.edges.map((e: any) => {
          e.node.issues.nodes.map((n: any) => {
            issues.push({
              repositoryName: e.node.name,
              title: n.title,
              url: n.url,
              createdAt: n.createdAt,
              updatedAt: n.updatedAt
            })
          })
        })
      )

    return {
      issues: issues.sort((a, b) => {
        if (a.updatedAt < b.updatedAt) return 1
        if (a.updatedAt > b.updatedAt) return -1
        return 0
      })
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
