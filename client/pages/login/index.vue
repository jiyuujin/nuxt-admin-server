<template>
  <main-template :user-status="userStatus">
    <div class="content">
      <div class="content--title-left">
        最新のお知らせ
      </div>
      <div class="content--sec">
        <div class="content--row-card-inner-description">
          現在はありません
        </div>
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

      <div class="content--row">
        <div class="content--row-card">
          <div class="content--row-card-title">
            このアプリの情報
          </div>
          <div class="content--row-card-inner">
            <div class="content--row-card-inner-description">
              <div class="subtitle">
                サポートサイト
              </div>
              <p>
                <a href="https://yuukit.me/">https://yuukit.me/</a>
              </p>
              <div class="subtitle">
                プライバシーポリシー
              </div>
              <p>
                <a href="https://webneko.dev/contact">
                  https://webneko.dev/contact
                </a>
              </p>
              <div class="subtitle">
                開発元
              </div>
              <p>nekohack inc.</p>
              <div class="subtitle">
                公開日
              </div>
              <p>2020/04/02</p>
            </div>
          </div>
        </div>
        <div class="content--row-card">
          <div class="content--row-card-title">
            ログイン
          </div>
          <div class="content--row-card-inner">
            <div class="content--row-card-inner-description">
              <div style="margin: 20px 0;">
                <j-input
                  placeholder="メールアドレス"
                  :text="state.email"
                  @handleInput="applyEmail"
                />
              </div>
              <div style="margin: 20px 0;">
                <j-input
                  placeholder="パスワード"
                  input-type="password"
                  :text="state.password"
                  password
                  @handleInput="applyPassword"
                />
              </div>
              <div style="margin: 20px 0;">
                <j-button text="ログイン" @handleClick="login" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="content--title-right">
        <j-button text="問題を報告" variant="danger" @handleClick="report" />
      </div>
    </div>
  </main-template>
</template>

<script lang="ts">
import {
  createComponent,
  SetupContext,
  reactive,
  computed
} from '@vue/composition-api'
import { products } from '~/utils/product'

const MainTemplate = () => import('~/components/MainTemplate.vue')
const Card = () => import('@/components/lp/Card.vue')

export default createComponent({
  components: {
    MainTemplate,
    Card
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
@import '@/assets/content';
</style>
